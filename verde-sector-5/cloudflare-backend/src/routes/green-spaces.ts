import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';

const greenSpaces = new Hono<AppEnv>();

// Validation schemas
const createGreenSpaceSchema = z.object({
  name: z.string().min(3).max(200),
  type: z.enum(['PARK', 'GARDEN', 'GREEN_STRIP', 'FOREST', 'PLAYGROUND', 'OTHER']),
  location: z.array(z.tuple([z.number(), z.number()])), // [[lat, lon], ...]
  area: z.number().positive(),
  description: z.string().optional(),
  address: z.string().optional(),
});

const updateGreenSpaceSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  type: z.enum(['PARK', 'GARDEN', 'GREEN_STRIP', 'FOREST', 'PLAYGROUND', 'OTHER']).optional(),
  location: z.array(z.tuple([z.number(), z.number()])).optional(),
  area: z.number().positive().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
});

// Get all green spaces
greenSpaces.get('/', async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const type = c.req.query('type');

    const where: any = {};

    if (type) {
      where.type = type;
    }

    const skip = (page - 1) * limit;

    const [greenSpaces, total] = await Promise.all([
      prisma.greenSpace.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          trees: {
            select: {
              id: true,
              species: true,
              healthStatus: true,
            },
            take: 5,
          },
          _count: {
            select: { trees: true },
          },
        },
      }),
      prisma.greenSpace.count({ where }),
    ]);

    return c.json({
      greenSpaces,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get green spaces error:', error);
    return c.json({ error: 'Failed to fetch green spaces' }, 500);
  }
});

// Get single green space
greenSpaces.get('/:id', async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');

  try {
    const greenSpace = await prisma.greenSpace.findUnique({
      where: { id },
      include: {
        trees: {
          select: {
            id: true,
            species: true,
            speciesOther: true,
            healthStatus: true,
            latitude: true,
            longitude: true,
            plantingDate: true,
          },
        },
        _count: {
          select: { trees: true },
        },
      },
    });

    if (!greenSpace) {
      return c.json({ error: 'Green space not found' }, 404);
    }

    return c.json({ greenSpace });
  } catch (error) {
    console.error('Get green space error:', error);
    return c.json({ error: 'Failed to fetch green space' }, 500);
  }
});

// Create green space - Admin only
greenSpaces.post('/', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', createGreenSpaceSchema), async (c) => {
  const prisma = c.get('prisma');
  const data = c.req.valid('json');

  try {
    const greenSpace = await prisma.greenSpace.create({
      data: {
        ...data,
        location: JSON.stringify(data.location),
      },
      include: {
        _count: {
          select: { trees: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'GREEN_SPACE',
        entityId: greenSpace.id,
      },
    });

    return c.json({ greenSpace }, 201);
  } catch (error) {
    console.error('Create green space error:', error);
    return c.json({ error: 'Failed to create green space' }, 500);
  }
});

// Update green space - Admin only
greenSpaces.patch('/:id', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', updateGreenSpaceSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');
  const data = c.req.valid('json');

  try {
    const updateData: any = { ...data };
    
    if (data.location) {
      updateData.location = JSON.stringify(data.location);
    }

    const updatedGreenSpace = await prisma.greenSpace.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE',
        entityType: 'GREEN_SPACE',
        entityId: id,
      },
    });

    return c.json({ greenSpace: updatedGreenSpace });
  } catch (error) {
    console.error('Update green space error:', error);
    return c.json({ error: 'Failed to update green space' }, 500);
  }
});

// Delete green space - Admin only
greenSpaces.delete('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.greenSpace.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE',
        entityType: 'GREEN_SPACE',
        entityId: id,
      },
    });

    return c.json({ message: 'Green space deleted successfully' });
  } catch (error) {
    console.error('Delete green space error:', error);
    return c.json({ error: 'Failed to delete green space' }, 500);
  }
});

export default greenSpaces;
