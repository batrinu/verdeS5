import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jwtMiddleware, roleMiddleware } from './auth';
import { AppEnv } from '../types/hono';

const reports = new Hono<AppEnv>();

// Validation schemas
const createReportSchema = z.object({
  issueType: z.enum([
    'FALLEN_TREE', 'BROKEN_BRANCHES', 'DISEASED', 'RISK_FALLING',
    'EMPTY_PIT', 'OBSTRUCTION', 'VANDALISM', 'OTHER'
  ]),
  description: z.string().min(10).max(1000),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().min(5).max(300),
  photos: z.array(z.string()).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
});

const updateReportSchema = z.object({
  status: z.enum(['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']).optional(),
  adminNotes: z.string().optional(),
  resolutionNotes: z.string().optional(),
  rejectionReason: z.string().optional(),
  assignedToId: z.string().optional(),
});

const assignReportSchema = z.object({
  fieldWorkerId: z.string(),
  notes: z.string().optional(),
});

// Get all reports (with filtering) - Admin/Field Worker only
reports.get('/', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const status = c.req.query('status');
    const issueType = c.req.query('issueType');
    const neighborhood = c.req.query('neighborhood');
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');

    const where: any = {};

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter by issue type
    if (issueType) {
      where.issueType = issueType;
    }

    // Filter by date range
    if (startDate || endDate) {
      where.submittedAt = {};
      if (startDate) where.submittedAt.gte = new Date(startDate);
      if (endDate) where.submittedAt.lte = new Date(endDate);
    }

    // Citizens can only see their own reports
    if (user.role === 'CITIZEN') {
      where.userId = user.id;
    }

    const skip = (page - 1) * limit;

    const reports = await prisma.report.findMany({
      where,
      skip,
      take: limit,
      orderBy: { submittedAt: 'desc' },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true },
        },
        assignedTo: {
          select: { id: true, email: true, name: true },
        },
      },
    });
    const total = await prisma.report.count({ where });

    return c.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get reports error:', error);
    return c.json({ error: 'Failed to fetch reports' }, 500);
  }
});

// Get single report
reports.get('/:id', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true },
        },
        assignedTo: {
          select: { id: true, email: true, name: true },
        },
        assignments: {
          include: {
            fieldWorker: {
              select: { id: true, email: true, name: true },
            },
          },
        },
      },
    });

    if (!report) {
      return c.json({ error: 'Report not found' }, 404);
    }

    // Citizens can only view their own reports
    if (user.role === 'CITIZEN' && report.userId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    return c.json({ report });
  } catch (error) {
    console.error('Get report error:', error);
    return c.json({ error: 'Failed to fetch report' }, 500);
  }
});

// Create new report - Citizen
reports.post('/', jwtMiddleware, zValidator('json', createReportSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const data = c.req.valid('json');

  try {
    // Generate tracking number
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const trackingNumber = `VS5-${timestamp}-${user.id.slice(0, 8)}`;

    // Auto-determine priority based on issue type
    let priority = data.priority || 'MEDIUM';
    if (data.issueType === 'FALLEN_TREE' || data.issueType === 'RISK_FALLING') {
      priority = 'URGENT';
    } else if (data.issueType === 'DISEASED' || data.issueType === 'BROKEN_BRANCHES') {
      priority = 'HIGH';
    }

    const report = await prisma.report.create({
      data: {
        ...data,
        userId: user.id,
        priority,
        trackingNumber,
        photos: JSON.stringify(data.photos || []),
      },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    // Create notification for admins
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
    });

    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: 'Raport nou primit',
          message: `Un nou raport a fost submit: ${trackingNumber}`,
          notificationType: 'REPORT_STATUS',
          relatedObjectId: report.id,
          relatedObjectType: 'REPORT',
        },
      });
    }

    return c.json({ report }, 201);
  } catch (error) {
    console.error('Create report error:', error);
    return c.json({ error: 'Failed to create report' }, 500);
  }
});

// Update report - Admin/Field Worker
reports.patch('/:id', jwtMiddleware, zValidator('json', updateReportSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');
  const data = c.req.valid('json');

  try {
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return c.json({ error: 'Report not found' }, 404);
    }

    // Check permissions
    if (user.role === 'CITIZEN') {
      return c.json({ error: 'Forbidden' }, 403);
    }

    // Update status timestamps
    const updateData: any = { ...data };
    
    if (data.status === 'UNDER_REVIEW' && !report.reviewedAt) {
      updateData.reviewedAt = new Date();
    }
    
    if (data.status === 'ASSIGNED' && !report.assignedAt) {
      updateData.assignedAt = new Date();
    }
    
    if (data.status === 'RESOLVED' && !report.resolvedAt) {
      updateData.resolvedAt = new Date();
    }

    const updatedReport = await prisma.report.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        assignedTo: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    // Notify citizen about status change
    await prisma.notification.create({
      data: {
        userId: report.userId,
        title: 'Status raport actualizat',
        message: `Raportul tău ${report.trackingNumber} are acum statusul: ${updatedReport.status}`,
        notificationType: 'REPORT_STATUS',
        relatedObjectId: report.id,
        relatedObjectType: 'REPORT',
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'STATUS_CHANGE',
        entityType: 'REPORT',
        entityId: report.id,
        changes: JSON.stringify({ oldStatus: report.status, newStatus: updatedReport.status }),
      },
    });

    return c.json({ report: updatedReport });
  } catch (error) {
    console.error('Update report error:', error);
    return c.json({ error: 'Failed to update report' }, 500);
  }
});

// Assign report to field worker - Admin only
reports.post('/:id/assign', jwtMiddleware, roleMiddleware('ADMIN'), zValidator('json', assignReportSchema), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');
  const { fieldWorkerId, notes } = c.req.valid('json');

  try {
    // Verify field worker exists and has correct role
    const fieldWorker = await prisma.user.findUnique({
      where: { id: fieldWorkerId },
    });

    if (!fieldWorker || fieldWorker.role !== 'FIELD_WORKER') {
      return c.json({ error: 'Invalid field worker' }, 400);
    }

    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return c.json({ error: 'Report not found' }, 404);
    }

    // Update report status and assigned user
    const updatedReport = await prisma.report.update({
      where: { id },
      data: {
        assignedToId: fieldWorkerId,
        status: 'ASSIGNED',
        assignedAt: new Date(),
      },
    });

    // Create assignment record
    await prisma.reportAssignment.create({
      data: {
        reportId: id,
        fieldWorkerId,
        notes: notes || '',
      },
    });

    // Notify field worker
    await prisma.notification.create({
      data: {
        userId: fieldWorkerId,
        title: 'Raport asignat',
        message: `Ai fost asignat la raportul ${report.trackingNumber}`,
        notificationType: 'ASSIGNMENT',
        relatedObjectId: report.id,
        relatedObjectType: 'REPORT',
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ASSIGN',
        entityType: 'REPORT',
        entityId: report.id,
        changes: JSON.stringify({ assignedTo: fieldWorkerId }),
      },
    });

    return c.json({ report: updatedReport });
  } catch (error) {
    console.error('Assign report error:', error);
    return c.json({ error: 'Failed to assign report' }, 500);
  }
});

// Delete report - Admin only
reports.delete('/:id', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    await prisma.report.delete({
      where: { id },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE',
        entityType: 'REPORT',
        entityId: id,
      },
    });

    return c.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    return c.json({ error: 'Failed to delete report' }, 500);
  }
});

// Get reports near location (for map view)
reports.get('/nearby', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  
  try {
    const lat = parseFloat(c.req.query('lat') || '0');
    const lon = parseFloat(c.req.query('lon') || '0');
    const radius = parseFloat(c.req.query('radius') || '5'); // km

    if (!lat || !lon) {
      return c.json({ error: 'Latitude and longitude required' }, 400);
    }

    // Simple bounding box query (SQLite doesn't have Haversine built-in)
    const latDelta = radius / 111.32; // 1 degree ≈ 111.32 km
    const lonDelta = radius / (111.32 * Math.cos((lat * Math.PI) / 180));

    const reports = await prisma.report.findMany({
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
      take: 50,
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return c.json({ reports });
  } catch (error) {
    console.error('Get nearby reports error:', error);
    return c.json({ error: 'Failed to fetch nearby reports' }, 500);
  }
});

export default reports;
