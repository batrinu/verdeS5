import { Hono } from 'hono';
import { jwtMiddleware } from './auth';
import { AppEnv } from '../types/hono';

const notifications = new Hono<AppEnv>();

// Get user notifications
notifications.get('/', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const userId = c.get('user').id;

  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const unreadOnly = c.req.query('unreadOnly') === 'true';

    const where: any = { userId };
    if (unreadOnly) {
      where.isRead = false;
    }

    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sentAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    return c.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    return c.json({ error: 'Failed to fetch notifications' }, 500);
  }
});

// Mark notification as read
notifications.patch('/:id/read', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const userId = c.get('user').id;
  const id = c.req.param('id');

  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== userId) {
      return c.json({ error: 'Notification not found' }, 404);
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });

    return c.json({ notification: updated });
  } catch (error) {
    console.error('Mark read error:', error);
    return c.json({ error: 'Failed to mark notification as read' }, 500);
  }
});

// Mark all as read
notifications.post('/read-all', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const userId = c.get('user').id;

  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return c.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    return c.json({ error: 'Failed to mark notifications as read' }, 500);
  }
});

export default notifications;
