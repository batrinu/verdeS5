
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
