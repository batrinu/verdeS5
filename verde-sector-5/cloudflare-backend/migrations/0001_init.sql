-- Verde în Sectorul 5 - Initial Schema Migration
-- D1 (SQLite) database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'CITIZEN',
  neighborhood TEXT,
  avatar TEXT,
  passwordHash TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Green spaces table
CREATE TABLE IF NOT EXISTS green_spaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'PARK',
  location TEXT NOT NULL,
  area REAL NOT NULL,
  description TEXT,
  address TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Trees table
CREATE TABLE IF NOT EXISTS trees (
  id TEXT PRIMARY KEY,
  species TEXT NOT NULL DEFAULT 'OTHER',
  speciesOther TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  plantingDate DATETIME,
  height REAL,
  trunkDiameter REAL,
  healthStatus TEXT NOT NULL DEFAULT 'GOOD',
  adoptedById TEXT REFERENCES users(id),
  adoptionDate DATETIME,
  greenSpaceId TEXT REFERENCES green_spaces(id),
  notes TEXT,
  photos TEXT NOT NULL DEFAULT '[]',
  neighborhood TEXT NOT NULL DEFAULT 'RAHOVA',
  nickname TEXT,
  lastWateredAt DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_trees_location ON trees(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_trees_neighborhood ON trees(neighborhood);

-- Watering logs table
CREATE TABLE IF NOT EXISTS watering_logs (
  id TEXT PRIMARY KEY,
  treeId TEXT NOT NULL REFERENCES trees(id) ON DELETE CASCADE,
  userName TEXT NOT NULL,
  liters INTEGER NOT NULL DEFAULT 10,
  earnedPoints INTEGER NOT NULL DEFAULT 50,
  loggedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_watering_logs_treeId ON watering_logs(treeId);

-- Care alerts table
CREATE TABLE IF NOT EXISTS care_alerts (
  id TEXT PRIMARY KEY,
  neighborhood TEXT NOT NULL,
  alertType TEXT NOT NULL DEFAULT 'HEATWAVE_DRYNESS',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_care_alerts_neighborhood ON care_alerts(neighborhood);
CREATE INDEX IF NOT EXISTS idx_care_alerts_status ON care_alerts(status);

-- Neighborhood stats table
CREATE TABLE IF NOT EXISTS neighborhood_stats (
  id TEXT PRIMARY KEY,
  neighborhood TEXT UNIQUE NOT NULL,
  totalTrees INTEGER NOT NULL DEFAULT 0,
  adoptedTrees INTEGER NOT NULL DEFAULT 0,
  wateringsCount INTEGER NOT NULL DEFAULT 0,
  ecoPoints INTEGER NOT NULL DEFAULT 0,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  issueType TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  address TEXT NOT NULL,
  photos TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'SUBMITTED',
  priority TEXT NOT NULL DEFAULT 'MEDIUM',
  assignedToId TEXT REFERENCES users(id),
  trackingNumber TEXT UNIQUE NOT NULL,
  adminNotes TEXT,
  resolutionNotes TEXT,
  rejectionReason TEXT,
  submittedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewedAt DATETIME,
  assignedAt DATETIME,
  resolvedAt DATETIME,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_issueType ON reports(issueType);
CREATE INDEX IF NOT EXISTS idx_reports_submittedAt ON reports(submittedAt);
CREATE INDEX IF NOT EXISTS idx_reports_location ON reports(latitude, longitude);

-- Report assignments table
CREATE TABLE IF NOT EXISTS report_assignments (
  id TEXT PRIMARY KEY,
  reportId TEXT NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  fieldWorkerId TEXT NOT NULL REFERENCES users(id),
  assignedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  completedAt DATETIME
);
CREATE INDEX IF NOT EXISTS idx_report_assignments_reportId ON report_assignments(reportId);
CREATE INDEX IF NOT EXISTS idx_report_assignments_fieldWorkerId ON report_assignments(fieldWorkerId);

-- Planting campaigns table
CREATE TABLE IF NOT EXISTS planting_campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  locationDesc TEXT NOT NULL,
  species TEXT NOT NULL DEFAULT '[]',
  numberOfTrees INTEGER NOT NULL DEFAULT 0,
  treesPlanted INTEGER NOT NULL DEFAULT 0,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'PLANNED',
  budget REAL,
  responsibleId TEXT REFERENCES users(id),
  photos TEXT NOT NULL DEFAULT '[]',
  notes TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_planting_campaigns_status ON planting_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_planting_campaigns_startDate ON planting_campaigns(startDate);

-- M2M join table for campaign volunteers
CREATE TABLE IF NOT EXISTS _CampaignVolunteers (
  A TEXT NOT NULL REFERENCES planting_campaigns(id),
  B TEXT NOT NULL REFERENCES users(id),
  UNIQUE(A, B)
);
CREATE INDEX IF NOT EXISTS idx_campaign_volunteers_B ON _CampaignVolunteers(B);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notificationType TEXT NOT NULL DEFAULT 'GENERAL',
  relatedObjectId TEXT,
  relatedObjectType TEXT,
  isRead INTEGER NOT NULL DEFAULT 0,
  sentAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  readAt DATETIME
);
CREATE INDEX IF NOT EXISTS idx_notifications_userId ON notifications(userId);
CREATE INDEX IF NOT EXISTS idx_notifications_isRead ON notifications(isRead);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entityType TEXT NOT NULL,
  entityId TEXT,
  changes TEXT,
  ipAddress TEXT,
  userAgent TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_userId ON audit_logs(userId);
CREATE INDEX IF NOT EXISTS idx_audit_logs_createdAt ON audit_logs(createdAt);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entityType, entityId);
