
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phone: 'phone',
  name: 'name',
  role: 'role',
  neighborhood: 'neighborhood',
  avatar: 'avatar',
  passwordHash: 'passwordHash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GreenSpaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  location: 'location',
  area: 'area',
  description: 'description',
  address: 'address',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TreeScalarFieldEnum = {
  id: 'id',
  species: 'species',
  speciesOther: 'speciesOther',
  latitude: 'latitude',
  longitude: 'longitude',
  plantingDate: 'plantingDate',
  height: 'height',
  trunkDiameter: 'trunkDiameter',
  healthStatus: 'healthStatus',
  adoptedById: 'adoptedById',
  adoptionDate: 'adoptionDate',
  greenSpaceId: 'greenSpaceId',
  notes: 'notes',
  photos: 'photos',
  neighborhood: 'neighborhood',
  nickname: 'nickname',
  lastWateredAt: 'lastWateredAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WateringLogScalarFieldEnum = {
  id: 'id',
  treeId: 'treeId',
  userName: 'userName',
  liters: 'liters',
  earnedPoints: 'earnedPoints',
  photoProof: 'photoProof',
  photoVerified: 'photoVerified',
  loggedAt: 'loggedAt'
};

exports.Prisma.CareAlertScalarFieldEnum = {
  id: 'id',
  neighborhood: 'neighborhood',
  alertType: 'alertType',
  message: 'message',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.NeighborhoodStatsScalarFieldEnum = {
  id: 'id',
  neighborhood: 'neighborhood',
  totalTrees: 'totalTrees',
  adoptedTrees: 'adoptedTrees',
  wateringsCount: 'wateringsCount',
  ecoPoints: 'ecoPoints',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  issueType: 'issueType',
  description: 'description',
  latitude: 'latitude',
  longitude: 'longitude',
  address: 'address',
  photos: 'photos',
  status: 'status',
  priority: 'priority',
  assignedToId: 'assignedToId',
  trackingNumber: 'trackingNumber',
  adminNotes: 'adminNotes',
  resolutionNotes: 'resolutionNotes',
  rejectionReason: 'rejectionReason',
  submittedAt: 'submittedAt',
  reviewedAt: 'reviewedAt',
  assignedAt: 'assignedAt',
  resolvedAt: 'resolvedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReportAssignmentScalarFieldEnum = {
  id: 'id',
  reportId: 'reportId',
  fieldWorkerId: 'fieldWorkerId',
  assignedAt: 'assignedAt',
  notes: 'notes',
  completedAt: 'completedAt'
};

exports.Prisma.PlantingCampaignScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  latitude: 'latitude',
  longitude: 'longitude',
  locationDesc: 'locationDesc',
  species: 'species',
  numberOfTrees: 'numberOfTrees',
  treesPlanted: 'treesPlanted',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  budget: 'budget',
  responsibleId: 'responsibleId',
  photos: 'photos',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  notificationType: 'notificationType',
  relatedObjectId: 'relatedObjectId',
  relatedObjectType: 'relatedObjectType',
  isRead: 'isRead',
  sentAt: 'sentAt',
  readAt: 'readAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  changes: 'changes',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  GreenSpace: 'GreenSpace',
  Tree: 'Tree',
  WateringLog: 'WateringLog',
  CareAlert: 'CareAlert',
  NeighborhoodStats: 'NeighborhoodStats',
  Report: 'Report',
  ReportAssignment: 'ReportAssignment',
  PlantingCampaign: 'PlantingCampaign',
  Notification: 'Notification',
  AuditLog: 'AuditLog'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/batrinu/projects/verdeS5/verde-sector-5/cloudflare-backend/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/home/batrinu/projects/verdeS5/verde-sector-5/cloudflare-backend/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlite",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// Verde în Sectorul 5 - Database Schema for Cloudflare D1 (SQLite)\n// Note: SQLite doesn't support enums or PostGIS, so we use String fields\n// for enum-like values and store lat/lon as Float columns\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/generated/prisma\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id           String   @id @default(cuid())\n  email        String   @unique\n  phone        String?\n  name         String?\n  role         String   @default(\"CITIZEN\") // CITIZEN | FIELD_WORKER | ADMIN\n  neighborhood String? // GIULESTI | CRANGASI | DRUMUL_TABEREI | FERENTARI | RAHOVA | PROGRESUL | SEPTEMBRIE_13 | MILITARI\n  avatar       String?\n  passwordHash String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  reports            Report[]           @relation(\"ReportAuthor\")\n  adoptedTrees       Tree[]\n  assignedReports    Report[]           @relation(\"ReportAssignee\")\n  assignments        ReportAssignment[]\n  campaigns          PlantingCampaign[] @relation(\"CampaignResponsible\")\n  volunteerCampaigns PlantingCampaign[] @relation(\"CampaignVolunteers\")\n  notifications      Notification[]\n  auditLogs          AuditLog[]\n\n  @@map(\"users\")\n}\n\nmodel GreenSpace {\n  id          String   @id @default(cuid())\n  name        String\n  type        String   @default(\"PARK\") // PARK | GARDEN | GREEN_STRIP | FOREST | PLAYGROUND | OTHER\n  location    String // JSON polygon coordinates: [[lat, lon], ...]\n  area        Float // Area in square meters\n  description String?\n  address     String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  trees Tree[]\n\n  @@map(\"green_spaces\")\n}\n\nmodel Tree {\n  id            String      @id @default(cuid())\n  species       String      @default(\"OTHER\") // OAK | MAPLE | LIME | POPLAR | WILLOW | BIRCH | ASH | CHESTNUT | PINE | SPRUCE | FIR | OTHER\n  speciesOther  String?\n  latitude      Float\n  longitude     Float\n  plantingDate  DateTime?\n  height        Float?\n  trunkDiameter Float?\n  healthStatus  String      @default(\"GOOD\") // EXCELLENT | GOOD | FAIR | POOR | CRITICAL | DEAD\n  adoptedBy     User?       @relation(fields: [adoptedById], references: [id])\n  adoptedById   String?\n  adoptionDate  DateTime?\n  greenSpace    GreenSpace? @relation(fields: [greenSpaceId], references: [id])\n  greenSpaceId  String?\n  notes         String?\n  photos        String      @default(\"[]\") // JSON array of photo URLs\n  neighborhood  String      @default(\"RAHOVA\") // COTROCENI | RAHOVA | FERENTARI | SEBASTIAN | IZVOR\n  nickname      String? // Citizen nickname e.g. \"Teiul din Cotroceni\"\n  lastWateredAt DateTime?\n  createdAt     DateTime    @default(now())\n  updatedAt     DateTime    @updatedAt\n\n  wateringLogs WateringLog[]\n\n  @@index([latitude, longitude])\n  @@index([neighborhood])\n  @@map(\"trees\")\n}\n\nmodel WateringLog {\n  id            String   @id @default(cuid())\n  tree          Tree     @relation(fields: [treeId], references: [id], onDelete: Cascade)\n  treeId        String\n  userName      String\n  liters        Int      @default(10)\n  earnedPoints  Int      @default(50)\n  photoProof    String? // data-URL blob now; swap to an R2 https URL later (see docs/photo-storage.md)\n  photoVerified Boolean  @default(false)\n  loggedAt      DateTime @default(now())\n\n  @@index([treeId])\n  @@map(\"watering_logs\")\n}\n\nmodel CareAlert {\n  id           String   @id @default(cuid())\n  neighborhood String\n  alertType    String   @default(\"HEATWAVE_DRYNESS\") // HEATWAVE_DRYNESS | YOUNG_TREE_WATERING | STORM_RISK\n  message      String\n  status       String   @default(\"ACTIVE\") // ACTIVE | RESOLVED\n  createdAt    DateTime @default(now())\n\n  @@index([neighborhood])\n  @@index([status])\n  @@map(\"care_alerts\")\n}\n\nmodel NeighborhoodStats {\n  id             String   @id @default(cuid())\n  neighborhood   String   @unique // COTROCENI | RAHOVA | FERENTARI | SEBASTIAN | IZVOR\n  totalTrees     Int      @default(0)\n  adoptedTrees   Int      @default(0)\n  wateringsCount Int      @default(0)\n  ecoPoints      Int      @default(0)\n  updatedAt      DateTime @updatedAt\n\n  @@map(\"neighborhood_stats\")\n}\n\nmodel Report {\n  id              String    @id @default(cuid())\n  user            User      @relation(\"ReportAuthor\", fields: [userId], references: [id])\n  userId          String\n  issueType       String // FALLEN_TREE | BROKEN_BRANCHES | DISEASED | RISK_FALLING | EMPTY_PIT | OBSTRUCTION | VANDALISM | OTHER\n  description     String\n  latitude        Float\n  longitude       Float\n  address         String\n  photos          String    @default(\"[]\") // JSON array of photo URLs\n  status          String    @default(\"SUBMITTED\") // SUBMITTED | UNDER_REVIEW | ASSIGNED | IN_PROGRESS | RESOLVED | REJECTED\n  priority        String    @default(\"MEDIUM\") // LOW | MEDIUM | HIGH | URGENT\n  assignedTo      User?     @relation(\"ReportAssignee\", fields: [assignedToId], references: [id])\n  assignedToId    String?\n  trackingNumber  String    @unique\n  adminNotes      String?\n  resolutionNotes String?\n  rejectionReason String?\n  submittedAt     DateTime  @default(now())\n  reviewedAt      DateTime?\n  assignedAt      DateTime?\n  resolvedAt      DateTime?\n  updatedAt       DateTime  @updatedAt\n\n  assignments ReportAssignment[]\n\n  @@index([status])\n  @@index([issueType])\n  @@index([submittedAt])\n  @@index([latitude, longitude])\n  @@map(\"reports\")\n}\n\nmodel ReportAssignment {\n  id            String    @id @default(cuid())\n  report        Report    @relation(fields: [reportId], references: [id], onDelete: Cascade)\n  reportId      String\n  fieldWorker   User      @relation(fields: [fieldWorkerId], references: [id])\n  fieldWorkerId String\n  assignedAt    DateTime  @default(now())\n  notes         String?\n  completedAt   DateTime?\n\n  @@index([reportId])\n  @@index([fieldWorkerId])\n  @@map(\"report_assignments\")\n}\n\nmodel PlantingCampaign {\n  id            String   @id @default(cuid())\n  name          String\n  description   String\n  latitude      Float?\n  longitude     Float?\n  locationDesc  String\n  species       String   @default(\"[]\") // JSON array of species\n  numberOfTrees Int      @default(0)\n  treesPlanted  Int      @default(0)\n  startDate     DateTime\n  endDate       DateTime\n  status        String   @default(\"PLANNED\") // PLANNED | ONGOING | COMPLETED | CANCELLED\n  budget        Float?\n  responsible   User?    @relation(\"CampaignResponsible\", fields: [responsibleId], references: [id])\n  responsibleId String?\n  volunteers    User[]   @relation(\"CampaignVolunteers\")\n  photos        String   @default(\"[]\") // JSON array of photo URLs\n  notes         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  @@index([status])\n  @@index([startDate])\n  @@map(\"planting_campaigns\")\n}\n\nmodel Notification {\n  id                String    @id @default(cuid())\n  user              User      @relation(fields: [userId], references: [id])\n  userId            String\n  title             String\n  message           String\n  notificationType  String    @default(\"GENERAL\") // REPORT_STATUS | ASSIGNMENT | CAMPAIGN | ADOPTION | GENERAL\n  relatedObjectId   String?\n  relatedObjectType String?\n  isRead            Boolean   @default(false)\n  sentAt            DateTime  @default(now())\n  readAt            DateTime?\n\n  @@index([userId])\n  @@index([isRead])\n  @@map(\"notifications\")\n}\n\nmodel AuditLog {\n  id         String   @id @default(cuid())\n  user       User?    @relation(fields: [userId], references: [id])\n  userId     String?\n  action     String // CREATE | UPDATE | DELETE | ASSIGN | STATUS_CHANGE | LOGIN | LOGOUT\n  entityType String\n  entityId   String?\n  changes    String? // JSON object with old/new values\n  ipAddress  String?\n  userAgent  String?\n  createdAt  DateTime @default(now())\n\n  @@index([userId])\n  @@index([createdAt])\n  @@index([entityType, entityId])\n  @@map(\"audit_logs\")\n}\n",
  "inlineSchemaHash": "7922698cec102c5754c07dc9fc32535f2036c8506d56a448f158b6953d228387",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"neighborhood\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reports\",\"kind\":\"object\",\"type\":\"Report\",\"relationName\":\"ReportAuthor\"},{\"name\":\"adoptedTrees\",\"kind\":\"object\",\"type\":\"Tree\",\"relationName\":\"TreeToUser\"},{\"name\":\"assignedReports\",\"kind\":\"object\",\"type\":\"Report\",\"relationName\":\"ReportAssignee\"},{\"name\":\"assignments\",\"kind\":\"object\",\"type\":\"ReportAssignment\",\"relationName\":\"ReportAssignmentToUser\"},{\"name\":\"campaigns\",\"kind\":\"object\",\"type\":\"PlantingCampaign\",\"relationName\":\"CampaignResponsible\"},{\"name\":\"volunteerCampaigns\",\"kind\":\"object\",\"type\":\"PlantingCampaign\",\"relationName\":\"CampaignVolunteers\"},{\"name\":\"notifications\",\"kind\":\"object\",\"type\":\"Notification\",\"relationName\":\"NotificationToUser\"},{\"name\":\"auditLogs\",\"kind\":\"object\",\"type\":\"AuditLog\",\"relationName\":\"AuditLogToUser\"}],\"dbName\":\"users\"},\"GreenSpace\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"area\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"trees\",\"kind\":\"object\",\"type\":\"Tree\",\"relationName\":\"GreenSpaceToTree\"}],\"dbName\":\"green_spaces\"},\"Tree\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"species\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"speciesOther\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"plantingDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"height\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"trunkDiameter\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"healthStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"adoptedBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TreeToUser\"},{\"name\":\"adoptedById\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"adoptionDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"greenSpace\",\"kind\":\"object\",\"type\":\"GreenSpace\",\"relationName\":\"GreenSpaceToTree\"},{\"name\":\"greenSpaceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"neighborhood\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nickname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastWateredAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"wateringLogs\",\"kind\":\"object\",\"type\":\"WateringLog\",\"relationName\":\"TreeToWateringLog\"}],\"dbName\":\"trees\"},\"WateringLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tree\",\"kind\":\"object\",\"type\":\"Tree\",\"relationName\":\"TreeToWateringLog\"},{\"name\":\"treeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"liters\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"earnedPoints\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"photoProof\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photoVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"loggedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"watering_logs\"},\"CareAlert\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"neighborhood\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"alertType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"care_alerts\"},\"NeighborhoodStats\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"neighborhood\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"totalTrees\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"adoptedTrees\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"wateringsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"ecoPoints\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"neighborhood_stats\"},\"Report\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReportAuthor\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"issueType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"priority\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedTo\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReportAssignee\"},{\"name\":\"assignedToId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trackingNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"adminNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resolutionNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rejectionReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"assignedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"resolvedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"assignments\",\"kind\":\"object\",\"type\":\"ReportAssignment\",\"relationName\":\"ReportToReportAssignment\"}],\"dbName\":\"reports\"},\"ReportAssignment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"report\",\"kind\":\"object\",\"type\":\"Report\",\"relationName\":\"ReportToReportAssignment\"},{\"name\":\"reportId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fieldWorker\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReportAssignmentToUser\"},{\"name\":\"fieldWorkerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"report_assignments\"},\"PlantingCampaign\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"locationDesc\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"species\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"numberOfTrees\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"treesPlanted\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"budget\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"responsible\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CampaignResponsible\"},{\"name\":\"responsibleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"volunteers\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CampaignVolunteers\"},{\"name\":\"photos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"planting_campaigns\"},\"Notification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"NotificationToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notificationType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relatedObjectId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relatedObjectType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isRead\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"readAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"notifications\"},\"AuditLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AuditLogToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"action\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"entityType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"entityId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"changes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ipAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"audit_logs\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

