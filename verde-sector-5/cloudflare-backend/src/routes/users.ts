import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';
import { computeWaterStatus } from '../lib/waterStatus';
import { computeImpact } from '../lib/impact';
import { guardianLevelFor, nextLevelProgress } from '../lib/guardianLevel';

const users = new Hono<AppEnv>();

// Get user profile
users.get('/me', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const userId = c.get('user').id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update user profile
users.patch('/me', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const userId = c.get('user').id;
  
  try {
    const body = await c.req.json();
    const { name, phone, neighborhood, avatar } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        neighborhood,
        avatar,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        avatar: true,
      },
    });

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// My guardian card (spec §6)
users.get('/me/impact', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { adoptedTrees: true },
    });
    if (!dbUser) return c.json({ error: 'User not found' }, 404);

    const trees = dbUser.adoptedTrees.map((t: any) => ({
      id: t.id,
      nickname: t.nickname,
      waterStatus: computeWaterStatus({ species: t.species, plantingDate: t.plantingDate, lastWateredAt: t.lastWateredAt }),
      impact: computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate }),
    }));
    const totals = trees.reduce(
      (acc: any, t: any) => ({
        co2KgPerYear: Math.round((acc.co2KgPerYear + t.impact.co2KgPerYear) * 10) / 10,
        shadeM2: Math.round((acc.shadeM2 + t.impact.shadeM2) * 10) / 10,
      }),
      { co2KgPerYear: 0, shadeM2: 0 }
    );
    const { next, progress } = nextLevelProgress(dbUser.careScore);
    return c.json({
      pointsBalance: dbUser.pointsBalance,
      careScore: dbUser.careScore,
      level: guardianLevelFor(dbUser.careScore),
      next,
      progress,
      trees,
      totals,
    });
  } catch (error) {
    console.error('Me impact error:', error);
    return c.json({ error: 'Failed to build impact summary' }, 500);
  }
});

// Get all users - Admin only
users.get('/', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const role = c.req.query('role');
    const neighborhood = c.req.query('neighborhood');

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (neighborhood) {
      where.neighborhood = neighborhood;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          neighborhood: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return c.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Create user - Admin only
users.post('/', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  
  try {
    const body = await c.req.json();
    const { email, password, name, phone, role, neighborhood } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ error: 'User already exists' }, 400);
    }

    // Hash password (you'll need to add bcryptjs)
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone,
        role: role || 'CITIZEN',
        neighborhood,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'USER',
        entityId: newUser.id,
      },
    });

    return c.json({ user: newUser }, 201);
  } catch (error) {
    console.error('Create user error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Get single user - Admin only
users.get('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        avatar: true,
        createdAt: true,
        reports: {
          select: {
            id: true,
            trackingNumber: true,
            status: true,
            submittedAt: true,
          },
        },
        adoptedTrees: {
          select: {
            id: true,
            species: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Update user role - Admin only
users.patch('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const adminUser = c.get('user');
  const id = c.req.param('id');
  
  try {
    const body = await c.req.json();
    const { role, neighborhood } = body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role,
        neighborhood,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        neighborhood: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'UPDATE',
        entityType: 'USER',
        entityId: id,
        changes: JSON.stringify({ role, neighborhood }),
      },
    });

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Delete user - Admin only
users.delete('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const adminUser = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.user.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'DELETE',
        entityType: 'USER',
        entityId: id,
      },
    });

    return c.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

export default users;
