import { Hono } from 'hono';
import { AppEnv } from '../types/hono';

const alerts = new Hono<AppEnv>();

// Get active care alerts
alerts.get('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const activeAlerts = await (prisma as any).careAlert.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });
    return c.json({ alerts: activeAlerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    return c.json({ error: 'Failed to fetch alerts' }, 500);
  }
});

// Create new care alert (Council Admin)
alerts.post('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const body = await c.req.json();
    const { neighborhood, alertType, message } = body;

    const alert = await (prisma as any).careAlert.create({
      data: {
        neighborhood: neighborhood || 'RAHOVA',
        alertType: alertType || 'HEATWAVE_DRYNESS',
        message: message || 'Atenție! Arborii tineri au nevoie de udare urgentă.',
        status: 'ACTIVE',
      },
    });

    return c.json({ alert }, 201);
  } catch (error) {
    console.error('Create alert error:', error);
    return c.json({ error: 'Failed to create alert' }, 500);
  }
});

export default alerts;
