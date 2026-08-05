import { Hono } from 'hono';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';

const upload = new Hono<AppEnv>();

// Upload photo to R2
upload.post('/photo', jwtMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as unknown as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }, 400);
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File too large. Maximum size is 5MB.' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `photos/${timestamp}-${crypto.randomUUID()}.${extension}`;

    // Get R2 bucket from env
    const bucket = c.env.PHOTOS;
    
    if (!bucket) {
      console.error('R2 bucket not configured');
      // For development without R2, return a placeholder URL
      return c.json({ 
        url: `https://placeholder.com/${filename}`,
        filename,
        size: file.size,
      });
    }

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await bucket.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Generate public URL
    const publicUrl = `https://verde-sector-5-photos.r2.dev/${filename}`;

    return c.json({
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Delete photo from R2
upload.delete('/photo', jwtMiddleware, async (c) => {
  try {
    const { url } = await c.req.json();

    if (!url) {
      return c.json({ error: 'URL required' }, 400);
    }

    // Extract filename from URL
    const filename = url.replace('https://verde-sector-5-photos.r2.dev/', '');

    const bucket = c.env.PHOTOS;
    
    if (!bucket) {
      return c.json({ message: 'Photo deleted (simulated)' });
    }

    await bucket.delete(filename);

    return c.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    return c.json({ error: 'Failed to delete photo' }, 500);
  }
});

// Get upload statistics - Admin only
upload.get('/stats', jwtMiddleware, async (c) => {
  try {
    const user = c.get('user');
    
    if (user.role !== 'ADMIN') {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const bucket = c.env.PHOTOS;
    
    if (!bucket) {
      return c.json({
        totalFiles: 0,
        totalSize: 0,
        message: 'R2 not configured',
      });
    }

    // List all objects in the photos directory
    let truncated = false;
    let cursor: string | undefined;
    let totalFiles = 0;
    let totalSize = 0;

    do {
      const listed = await bucket.list({
        prefix: 'photos/',
        cursor,
      });

      totalFiles += listed.objects.length;
      totalSize += listed.objects.reduce((sum, obj) => sum + (obj.size || 0), 0);
      
      truncated = listed.truncated;
      cursor = (listed as any).cursor;
    } while (truncated);

    return c.json({
      totalFiles,
      totalSize,
      totalSizeFormatted: `${(totalSize / (1024 * 1024)).toFixed(2)} MB`,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return c.json({ error: 'Failed to get upload stats' }, 500);
  }
});

export default upload;
