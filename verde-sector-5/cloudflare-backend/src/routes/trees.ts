import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';
import { storePhoto } from '../lib/photoStore';
import { optionalJwtMiddleware } from './auth';
import { awardPoints, POINTS } from '../lib/points';
import { composeTreeMessage } from '../lib/treeMessages';
import { computeWaterStatus } from '../lib/waterStatus';
import { computeImpact } from '../lib/impact';

const trees = new Hono<AppEnv>();

// Spec §6: computed on read, never stored.
function enrichTree<T extends { species: string; plantingDate?: Date | null; lastWateredAt?: Date | null; trunkDiameter?: number | null }>(tree: T) {
  return {
    ...tree,
    waterStatus: computeWaterStatus({
      species: tree.species,
      plantingDate: tree.plantingDate,
      lastWateredAt: tree.lastWateredAt,
    }),
    impact: computeImpact({
      species: tree.species,
      trunkDiameter: tree.trunkDiameter,
      plantingDate: tree.plantingDate,
    }),
  };
}

// Validation schemas
const createTreeSchema = z.object({
  species: z.enum(['OAK', 'MAPLE', 'LIME', 'POPLAR', 'WILLOW', 'BIRCH', 'ASH', 'CHESTNUT', 'PINE', 'SPRUCE', 'FIR', 'OTHER']),
  speciesOther: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  plantingDate: z.string().optional(),
  height: z.number().optional(),
  trunkDiameter: z.number().optional(),
  healthStatus: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'CRITICAL', 'DEAD']).optional(),
  greenSpaceId: z.string().optional(),
  notes: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const updateTreeSchema = z.object({
  species: z.enum(['OAK', 'MAPLE', 'LIME', 'POPLAR', 'WILLOW', 'BIRCH', 'ASH', 'CHESTNUT', 'PINE', 'SPRUCE', 'FIR', 'OTHER']).optional(),
  speciesOther: z.string().optional(),
  healthStatus: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'CRITICAL', 'DEAD']).optional(),
  height: z.number().optional(),
  trunkDiameter: z.number().optional(),
  notes: z.string().optional(),
  adoptedById: z.string().nullable().optional(),
});

// Get all trees (with filtering)
trees.get('/', async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '50');
    const species = c.req.query('species');
    const healthStatus = c.req.query('healthStatus');
    const greenSpaceId = c.req.query('greenSpaceId');

    const where: any = {};

    if (species) {
      where.species = species;
    }

    if (healthStatus) {
      where.healthStatus = healthStatus;
    }

    if (greenSpaceId) {
      where.greenSpaceId = greenSpaceId;
    }

    const skip = (page - 1) * limit;

    const trees = await prisma.tree.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        adoptedBy: {
          select: { id: true, email: true, name: true },
        },
        greenSpace: {
          select: { id: true, name: true, type: true },
        },
      },
    });
    const total = await prisma.tree.count({ where });

    return c.json({
      trees: trees.map(enrichTree),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get trees error:', error);
    return c.json({ error: error?.message || String(error) }, 500);
  }
});

// Voice-of-the-tree feed (spec §3.2)
trees.get('/:id/messages', async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');
  try {
    const messages = await prisma.treeMessage.findMany({
      where: { treeId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, text: true, createdAt: true },
    });
    return c.json({ messages });
  } catch (error) {
    console.error('Get tree messages error:', error);
    return c.json({ error: 'Failed to fetch tree messages' }, 500);
  }
});

// Get single tree
trees.get('/:id', async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');

  try {
    const tree = await prisma.tree.findUnique({
      where: { id },
      include: {
        adoptedBy: {
          select: { id: true, email: true, name: true },
        },
        greenSpace: {
          select: { id: true, name: true, type: true, address: true },
        },
      },
    });

    if (!tree) {
      return c.json({ error: 'Tree not found' }, 404);
    }

    return c.json({ tree: enrichTree(tree) });
  } catch (error) {
    console.error('Get tree error:', error);
    return c.json({ error: 'Failed to fetch tree' }, 500);
  }
});

// Create tree - Admin only
trees.post('/', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', createTreeSchema), async (c) => {
  const prisma = c.get('prisma');
  const data = c.req.valid('json');

  try {
    const tree = await prisma.tree.create({
      data: {
        ...data,
        plantingDate: data.plantingDate ? new Date(data.plantingDate) : null,
        photos: JSON.stringify(data.photos || []),
      },
      include: {
        greenSpace: {
          select: { id: true, name: true },
        },
      },
    });

    return c.json({ tree }, 201);
  } catch (error) {
    console.error('Create tree error:', error);
    return c.json({ error: 'Failed to create tree' }, 500);
  }
});

// Update tree - Admin/Field Worker
trees.patch('/:id', jwtMiddleware, zValidator('json', updateTreeSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');
  const data = c.req.valid('json');

  try {
    // Citizens can only update adoption status
    if (user.role === 'CITIZEN') {
      if (Object.keys(data).some(key => key !== 'adoptedById')) {
        return c.json({ error: 'Forbidden' }, 403);
      }
    }

    const updatedTree = await prisma.tree.update({
      where: { id },
      data,
      include: {
        adoptedBy: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    // Log audit for admin actions
    if (user.role !== 'CITIZEN') {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'UPDATE',
          entityType: 'TREE',
          entityId: id,
        },
      });
    }

    return c.json({ tree: updatedTree });
  } catch (error) {
    console.error('Update tree error:', error);
    return c.json({ error: 'Failed to update tree' }, 500);
  }
});

// Adopt tree - Citizen
trees.post('/:id/adopt', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    if (user.role !== 'CITIZEN') {
      return c.json({ error: 'Only citizens can adopt trees' }, 403);
    }

    let tree = await prisma.tree.findUnique({
      where: { id },
    });

    if (!tree) {
      tree = await prisma.tree.create({
        data: {
          id,
          species: 'LIME',
          latitude: 44.4268,
          longitude: 26.0814,
          neighborhood: 'Sector 5',
          healthStatus: 'GOOD',
        },
      });
    }

    const updatedTree = await prisma.tree.update({
      where: { id },
      data: {
        adoptedById: user ? user.id : null,
        adoptionDate: new Date(),
      },
    });

    // Create notification if user present
    if (user) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: 'Ai adoptat un copac!',
          message: 'Mulțumim că ai adoptat un copac. Ai grijă de el!',
          notificationType: 'ADOPTION',
          relatedObjectId: tree.id,
          relatedObjectType: 'TREE',
        },
      }).catch(() => {});
    }

    return c.json({ tree: updatedTree });
  } catch (error) {
    console.error('Adopt tree error:', error);
    return c.json({ error: 'Failed to adopt tree' }, 500);
  }
});

// Water tree
trees.post('/:id/water', optionalJwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');

  try {
    const body = await c.req.json().catch(() => ({}));
    // Bound/validate untrusted input — this is a public, unauthenticated endpoint.
    const liters = Math.min(Math.max(Math.round(Number(body.liters)) || 10, 1), 100);
    const userName = String(body.userName || 'Cetățean Anonim').slice(0, 80);
    // Accept only a reasonably sized image data-URL blob; drop anything else so a
    // client can't bloat D1 or persist arbitrary payloads. (~1 MB base64 ≈ 750 KB image.)
    const rawPhoto = typeof body.photoProofUrl === 'string' ? body.photoProofUrl : '';
    const photoOk = /^data:image\/(png|jpe?g|webp);base64,/.test(rawPhoto) && rawPhoto.length <= 1_000_000;
    // Blob mode: persist the compressed data URL inline (see lib/photoStore).
    const photoProof = photoOk ? await storePhoto(rawPhoto, c.env) : null;
    // The photo "verification" is a client-side demo signal; only grant the bonus
    // when an actual valid image blob is stored, so it can't be farmed flag-only.
    const photoVerified = Boolean(body.isPhotoVerified) && photoOk;
    const earnedPoints = liters * 5 + (photoVerified ? 50 : 0);

    let tree = await prisma.tree.findUnique({ where: { id } });
    if (!tree) {
      tree = await prisma.tree.create({
        data: {
          id,
          species: 'LIME',
          latitude: 44.4268,
          longitude: 26.0814,
          neighborhood: 'Sector 5',
          healthStatus: 'GOOD',
        },
      });
    }

    const updatedTree = await prisma.tree.update({
      where: { id },
      data: {
        lastWateredAt: new Date(),
        healthStatus: 'EXCELLENT',
      },
    });

    const wateringLog = await prisma.wateringLog.create({
      data: {
        treeId: id,
        userName,
        liters,
        earnedPoints,
        photoProof,
        photoVerified,
      },
    });

    // Voice of the tree (spec §3.2): status BEFORE this watering drives the tone.
    const statusBefore = computeWaterStatus({
      species: tree.species,
      plantingDate: tree.plantingDate,
      lastWateredAt: tree.lastWateredAt,
    });
    const treeMessage = composeTreeMessage({
      nickname: tree.nickname,
      waterStatusBefore: statusBefore,
      month: new Date().getMonth(),
      liters,
    });
    await prisma.treeMessage.create({
      data: { treeId: id, text: treeMessage },
    }).catch(() => {});

    // Notify the adopter that their tree "wrote" to them.
    if (tree.adoptedById) {
      await prisma.notification.create({
        data: {
          userId: tree.adoptedById,
          title: 'Mesaj de la copacul tău 🌳',
          message: treeMessage,
          notificationType: 'TREE_MESSAGE',
          relatedObjectId: id,
          relatedObjectType: 'TREE',
        },
      }).catch(() => {});
    }

    // Personal points only for authenticated citizens (spec §3.5); anonymous
    // waterings still count for the tree, neighborhood and challenge.
    const user = c.get('user') as { id: string } | undefined;
    if (user?.id) {
      await awardPoints(prisma, {
        userId: user.id,
        action: 'WATERING',
        points: earnedPoints,
        refType: 'WATERING_LOG',
        refId: wateringLog.id,
      }).catch((err) => console.error('awardPoints failed:', err));
    }

    return c.json({ tree: updatedTree, wateringLog, treeMessage });
  } catch (error) {
    console.error('Water tree error:', error);
    return c.json({ error: 'Failed to log tree watering' }, 500);
  }
});

// Release adopted tree
trees.delete('/:id/adopt', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    const tree = await prisma.tree.findUnique({
      where: { id },
    });

    if (!tree) {
      return c.json({ error: 'Tree not found' }, 404);
    }

    // Only the adopter or admin can release
    if (user.role !== 'ADMIN' && tree.adoptedById !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const updatedTree = await prisma.tree.update({
      where: { id },
      data: {
        adoptedById: null,
        adoptionDate: null,
      },
    });

    return c.json({ tree: updatedTree });
  } catch (error) {
    console.error('Release tree error:', error);
    return c.json({ error: 'Failed to release tree' }, 500);
  }
});

// Delete tree - Admin only
trees.delete('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.tree.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE',
        entityType: 'TREE',
        entityId: id,
      },
    });

    return c.json({ message: 'Tree deleted successfully' });
  } catch (error) {
    console.error('Delete tree error:', error);
    return c.json({ error: 'Failed to delete tree' }, 500);
  }
});

// Get trees near location
trees.get('/nearby', async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const lat = parseFloat(c.req.query('lat') || '0');
    const lon = parseFloat(c.req.query('lon') || '0');
    const radius = parseFloat(c.req.query('radius') || '1'); // km

    if (!lat || !lon) {
      return c.json({ error: 'Latitude and longitude required' }, 400);
    }

    const latDelta = radius / 111.32;
    const lonDelta = radius / (111.32 * Math.cos((lat * Math.PI) / 180));

    const trees = await prisma.tree.findMany({
      where: {
        latitude: {
          gte: lat - latDelta,
          lte: lat + latDelta,
        },
        longitude: {
          gte: lon - lonDelta,
          lte: lon + lonDelta,
        },
      },
      take: 100,
      include: {
        adoptedBy: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return c.json({ trees });
  } catch (error) {
    console.error('Get nearby trees error:', error);
    return c.json({ error: 'Failed to fetch nearby trees' }, 500);
  }
});

export default trees;
