import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';

const campaigns = new Hono<AppEnv>();

// Validation schemas
const createCampaignSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationDesc: z.string(),
  species: z.array(z.string()),
  numberOfTrees: z.number().int().positive(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().optional(),
  responsibleId: z.string().optional(),
});

const updateCampaignSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  description: z.string().optional(),
  locationDesc: z.string().optional(),
  species: z.array(z.string()).optional(),
  numberOfTrees: z.number().int().positive().optional(),
  treesPlanted: z.number().int().nonnegative().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
  budget: z.number().optional(),
  responsibleId: z.string().optional(),
  notes: z.string().optional(),
});

// Get all campaigns
campaigns.get('/', async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const status = c.req.query('status');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const skip = (page - 1) * limit;

    const campaigns = await prisma.plantingCampaign.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startDate: 'desc' },
      include: {
        responsible: {
          select: { id: true, email: true, name: true },
        },
        volunteers: {
          select: { id: true, email: true, name: true },
          take: 5,
        },
        _count: {
          select: { volunteers: true },
        },
      },
    });
    const total = await prisma.plantingCampaign.count({ where });

    return c.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    return c.json({ error: 'Failed to fetch campaigns' }, 500);
  }
});

// Get single campaign
campaigns.get('/:id', async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');

  try {
    const campaign = await prisma.plantingCampaign.findUnique({
      where: { id },
      include: {
        responsible: {
          select: { id: true, email: true, name: true },
        },
        volunteers: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    return c.json({ campaign });
  } catch (error) {
    console.error('Get campaign error:', error);
    return c.json({ error: 'Failed to fetch campaign' }, 500);
  }
});

// Create campaign - Admin only
campaigns.post('/', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', createCampaignSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const data = c.req.valid('json');

  try {
    const campaign = await prisma.plantingCampaign.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        species: JSON.stringify(data.species),
        photos: JSON.stringify([]),
      },
      include: {
        responsible: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'PLANTING_CAMPAIGN',
        entityId: campaign.id,
      },
    });

    return c.json({ campaign }, 201);
  } catch (error) {
    console.error('Create campaign error:', error);
    return c.json({ error: 'Failed to create campaign' }, 500);
  }
});

// Update campaign - Admin only
campaigns.patch('/:id', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', updateCampaignSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');
  const data = c.req.valid('json');

  try {
    const updateData: any = { ...data };
    
    if (data.startDate) {
      updateData.startDate = new Date(data.startDate);
    }
    if (data.endDate) {
      updateData.endDate = new Date(data.endDate);
    }
    if (data.species) {
      updateData.species = JSON.stringify(data.species);
    }

    const updatedCampaign = await prisma.plantingCampaign.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE',
        entityType: 'PLANTING_CAMPAIGN',
        entityId: id,
      },
    });

    return c.json({ campaign: updatedCampaign });
  } catch (error) {
    console.error('Update campaign error:', error);
    return c.json({ error: 'Failed to update campaign' }, 500);
  }
});

// Join campaign as volunteer - Citizen
campaigns.post('/:id/join', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    if (user.role !== 'CITIZEN') {
      return c.json({ error: 'Only citizens can volunteer' }, 403);
    }

    const campaign = await prisma.plantingCampaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    // Add user to volunteers
    await prisma.plantingCampaign.update({
      where: { id },
      data: {
        volunteers: {
          connect: { id: user.id },
        },
      },
    });

    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Te-ai înscris ca voluntar!',
        message: `Te-ai înscris la campania: ${campaign.name}`,
        notificationType: 'CAMPAIGN',
        relatedObjectId: campaign.id,
        relatedObjectType: 'PLANTING_CAMPAIGN',
      },
    });

    return c.json({ message: 'Successfully joined campaign' });
  } catch (error) {
    console.error('Join campaign error:', error);
    return c.json({ error: 'Failed to join campaign' }, 500);
  }
});

// Leave campaign
campaigns.delete('/:id/join', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.plantingCampaign.update({
      where: { id },
      data: {
        volunteers: {
          disconnect: { id: user.id },
        },
      },
    });

    return c.json({ message: 'Successfully left campaign' });
  } catch (error) {
    console.error('Leave campaign error:', error);
    return c.json({ error: 'Failed to leave campaign' }, 500);
  }
});

// Delete campaign - Admin only
campaigns.delete('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.plantingCampaign.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE',
        entityType: 'PLANTING_CAMPAIGN',
        entityId: id,
      },
    });

    return c.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    return c.json({ error: 'Failed to delete campaign' }, 500);
  }
});

export default campaigns;
