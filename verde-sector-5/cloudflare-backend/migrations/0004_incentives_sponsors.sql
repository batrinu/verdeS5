-- Incentives + sponsors (spec §5). Additive only.
CREATE TABLE sponsors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL,
  logoSvg TEXT,
  description TEXT,
  website TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groves (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sponsorId TEXT REFERENCES sponsors(id),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  merchantName TEXT NOT NULL,
  sponsorId TEXT REFERENCES sponsors(id),
  costPoints INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  active INTEGER NOT NULL DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE redemptions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  rewardId TEXT NOT NULL REFERENCES rewards(id),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'ISSUED',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_redemptions_user ON redemptions(userId);

CREATE TABLE points_events (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  points INTEGER NOT NULL,
  refType TEXT,
  refId TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_points_events_user_time ON points_events(userId, createdAt);

CREATE TABLE tree_messages (
  id TEXT PRIMARY KEY,
  treeId TEXT NOT NULL REFERENCES trees(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tree_messages_tree ON tree_messages(treeId);

CREATE TABLE challenges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  metric TEXT NOT NULL DEFAULT 'WATERINGS',
  goal INTEGER NOT NULL,
  startsAt DATETIME NOT NULL,
  endsAt DATETIME NOT NULL,
  sponsorId TEXT REFERENCES sponsors(id)
);

ALTER TABLE users ADD COLUMN pointsBalance INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN careScore INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trees ADD COLUMN groveId TEXT REFERENCES groves(id);
ALTER TABLE planting_campaigns ADD COLUMN sponsorId TEXT REFERENCES sponsors(id);
