import { Hono } from 'hono';
import { jwtMiddleware, roleMiddleware } from './auth';

const analytics = new Hono();

// Dashboard analytics - Admin only
analytics.get('/dashboard', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');

  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total counts
    const [totalReports, totalTrees, totalUsers, totalGreenSpaces, totalCampaigns] = await Promise.all([
      prisma.report.count(),
      prisma.tree.count(),
      prisma.user.count(),
      prisma.greenSpace.count(),
      prisma.plantingCampaign.count(),
    ]);

    // Reports by status
    const reportsByStatus = await prisma.report.groupBy({
      by: ['status'],
      _count: true,
    });

    // Reports by issue type
    const reportsByIssueType = await prisma.report.groupBy({
      by: ['issueType'],
      _count: true,
      orderBy: {
        _count: { issueType: 'desc' },
      },
    });

    // Reports in last 30 days
    const recentReports = await prisma.report.count({
      where: {
        submittedAt: { gte: last30Days },
      },
    });

    // Reports resolved in last 30 days
    const resolvedReports = await prisma.report.count({
      where: {
        status: 'RESOLVED',
        resolvedAt: { gte: last30Days },
      },
    });

    // Average resolution time (in days)
    const resolvedWithTime = await prisma.report.findMany({
      where: {
        status: 'RESOLVED',
        resolvedAt: { not: null },
      },
      select: {
        submittedAt: true,
        resolvedAt: true,
      },
      take: 100,
    });

    let avgResolutionTime = 0;
    if (resolvedWithTime.length > 0) {
      const totalDays = resolvedWithTime.reduce((sum, r) => {
        if (r.resolvedAt && r.submittedAt) {
          return sum + (r.resolvedAt.getTime() - r.submittedAt.getTime()) / (1000 * 60 * 60 * 24);
        }
        return sum;
      }, 0);
      avgResolutionTime = Math.round((totalDays / resolvedWithTime.length) * 10) / 10;
    }

    // Reports by neighborhood (user's neighborhood)
    const reportsByNeighborhood = await prisma.user.groupBy({
      by: ['neighborhood'],
      _count: {
        reports: true,
      },
      where: {
        reports: {
          some: {},
        },
      },
      orderBy: {
        _count: {
          reports: 'desc',
        },
      },
    });

    // Trees by health status
    const treesByHealth = await prisma.tree.groupBy({
      by: ['healthStatus'],
      _count: true,
    });

    // Trees by species
    const treesBySpecies = await prisma.tree.groupBy({
      by: ['species'],
      _count: true,
      orderBy: {
        _count: { species: 'desc' },
      },
      take: 10,
    });

    // Campaign progress
    const ongoingCampaigns = await prisma.plantingCampaign.findMany({
      where: { status: 'ONGOING' },
      select: {
        id: true,
        name: true,
        numberOfTrees: true,
        treesPlanted: true,
        startDate: true,
        endDate: true,
      },
    });

    return c.json({
      overview: {
        totalReports,
        totalTrees,
        totalUsers,
        totalGreenSpaces,
        totalCampaigns,
        recentReports,
        resolvedReports,
        avgResolutionTime,
      },
      reports: {
        byStatus: reportsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count;
          return acc;
        }, {} as Record<string, number>),
        byIssueType: reportsByIssueType.map(item => ({
          type: item.issueType,
          count: item._count,
        })),
        byNeighborhood: reportsByNeighborhood.map(item => ({
          neighborhood: item.neighborhood,
          count: item._count.reports,
        })),
      },
      trees: {
        byHealth: treesByHealth.reduce((acc, item) => {
          acc[item.healthStatus] = item._count;
          return acc;
        }, {} as Record<string, number>),
        bySpecies: treesBySpecies.map(item => ({
          species: item.species,
          count: item._count,
        })),
      },
      campaigns: ongoingCampaigns.map(c => ({
        ...c,
        progressPercentage: Math.round((c.treesPlanted / c.numberOfTrees) * 100),
      })),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Export reports data - Admin only
analytics.get('/export/reports', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');

  try {
    const reports = await prisma.report.findMany({
      include: {
        user: {
          select: { email: true, name: true, phone: true },
        },
        assignedTo: {
          select: { email: true, name: true },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    // Convert to CSV
    const headers = [
      'Tracking Number',
      'Issue Type',
      'Status',
      'Priority',
      'Description',
      'Address',
      'Latitude',
      'Longitude',
      'Reporter Email',
      'Reporter Name',
      'Assigned To',
      'Submitted At',
      'Resolved At',
    ];

    const rows = reports.map(r => [
      r.trackingNumber,
      r.issueType,
      r.status,
      r.priority,
      `"${r.description.replace(/"/g, '""')}"`,
      `"${r.address.replace(/"/g, '""')}"`,
      r.latitude,
      r.longitude,
      r.user.email,
      r.user.name || '',
      r.assignedTo?.email || '',
      r.submittedAt.toISOString(),
      r.resolvedAt?.toISOString() || '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    c.header('Content-Type', 'text/csv');
    c.header('Content-Disposition', 'attachment; filename="reports.csv"');
    
    return c.body(csv);
  } catch (error) {
    console.error('Export error:', error);
    return c.json({ error: 'Failed to export reports' }, 500);
  }
});

// Get activity log - Admin only
analytics.get('/activity', jwtMiddleware, roleMiddleware('ADMIN'), async (c) => {
  const prisma = c.get('prisma');

  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '50');
    const action = c.req.query('action');
    const entityType = c.req.query('entityType');

    const where: any = {};

    if (action) {
      where.action = action;
    }

    if (entityType) {
      where.entityType = entityType;
    }

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return c.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Activity log error:', error);
    return c.json({ error: 'Failed to fetch activity log' }, 500);
  }
});

export default analytics;
