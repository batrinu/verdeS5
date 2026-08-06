
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GreenSpace
 * 
 */
export type GreenSpace = $Result.DefaultSelection<Prisma.$GreenSpacePayload>
/**
 * Model Tree
 * 
 */
export type Tree = $Result.DefaultSelection<Prisma.$TreePayload>
/**
 * Model WateringLog
 * 
 */
export type WateringLog = $Result.DefaultSelection<Prisma.$WateringLogPayload>
/**
 * Model CareAlert
 * 
 */
export type CareAlert = $Result.DefaultSelection<Prisma.$CareAlertPayload>
/**
 * Model NeighborhoodStats
 * 
 */
export type NeighborhoodStats = $Result.DefaultSelection<Prisma.$NeighborhoodStatsPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model ReportAssignment
 * 
 */
export type ReportAssignment = $Result.DefaultSelection<Prisma.$ReportAssignmentPayload>
/**
 * Model PlantingCampaign
 * 
 */
export type PlantingCampaign = $Result.DefaultSelection<Prisma.$PlantingCampaignPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.greenSpace`: Exposes CRUD operations for the **GreenSpace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GreenSpaces
    * const greenSpaces = await prisma.greenSpace.findMany()
    * ```
    */
  get greenSpace(): Prisma.GreenSpaceDelegate<ExtArgs>;

  /**
   * `prisma.tree`: Exposes CRUD operations for the **Tree** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trees
    * const trees = await prisma.tree.findMany()
    * ```
    */
  get tree(): Prisma.TreeDelegate<ExtArgs>;

  /**
   * `prisma.wateringLog`: Exposes CRUD operations for the **WateringLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WateringLogs
    * const wateringLogs = await prisma.wateringLog.findMany()
    * ```
    */
  get wateringLog(): Prisma.WateringLogDelegate<ExtArgs>;

  /**
   * `prisma.careAlert`: Exposes CRUD operations for the **CareAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareAlerts
    * const careAlerts = await prisma.careAlert.findMany()
    * ```
    */
  get careAlert(): Prisma.CareAlertDelegate<ExtArgs>;

  /**
   * `prisma.neighborhoodStats`: Exposes CRUD operations for the **NeighborhoodStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NeighborhoodStats
    * const neighborhoodStats = await prisma.neighborhoodStats.findMany()
    * ```
    */
  get neighborhoodStats(): Prisma.NeighborhoodStatsDelegate<ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs>;

  /**
   * `prisma.reportAssignment`: Exposes CRUD operations for the **ReportAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportAssignments
    * const reportAssignments = await prisma.reportAssignment.findMany()
    * ```
    */
  get reportAssignment(): Prisma.ReportAssignmentDelegate<ExtArgs>;

  /**
   * `prisma.plantingCampaign`: Exposes CRUD operations for the **PlantingCampaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlantingCampaigns
    * const plantingCampaigns = await prisma.plantingCampaign.findMany()
    * ```
    */
  get plantingCampaign(): Prisma.PlantingCampaignDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "greenSpace" | "tree" | "wateringLog" | "careAlert" | "neighborhoodStats" | "report" | "reportAssignment" | "plantingCampaign" | "notification" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GreenSpace: {
        payload: Prisma.$GreenSpacePayload<ExtArgs>
        fields: Prisma.GreenSpaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GreenSpaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GreenSpaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          findFirst: {
            args: Prisma.GreenSpaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GreenSpaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          findMany: {
            args: Prisma.GreenSpaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>[]
          }
          create: {
            args: Prisma.GreenSpaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          createMany: {
            args: Prisma.GreenSpaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GreenSpaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>[]
          }
          delete: {
            args: Prisma.GreenSpaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          update: {
            args: Prisma.GreenSpaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          deleteMany: {
            args: Prisma.GreenSpaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GreenSpaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GreenSpaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GreenSpacePayload>
          }
          aggregate: {
            args: Prisma.GreenSpaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGreenSpace>
          }
          groupBy: {
            args: Prisma.GreenSpaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<GreenSpaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.GreenSpaceCountArgs<ExtArgs>
            result: $Utils.Optional<GreenSpaceCountAggregateOutputType> | number
          }
        }
      }
      Tree: {
        payload: Prisma.$TreePayload<ExtArgs>
        fields: Prisma.TreeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          findFirst: {
            args: Prisma.TreeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          findMany: {
            args: Prisma.TreeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>[]
          }
          create: {
            args: Prisma.TreeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          createMany: {
            args: Prisma.TreeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>[]
          }
          delete: {
            args: Prisma.TreeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          update: {
            args: Prisma.TreeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          deleteMany: {
            args: Prisma.TreeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TreeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreePayload>
          }
          aggregate: {
            args: Prisma.TreeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTree>
          }
          groupBy: {
            args: Prisma.TreeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreeCountArgs<ExtArgs>
            result: $Utils.Optional<TreeCountAggregateOutputType> | number
          }
        }
      }
      WateringLog: {
        payload: Prisma.$WateringLogPayload<ExtArgs>
        fields: Prisma.WateringLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WateringLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WateringLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          findFirst: {
            args: Prisma.WateringLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WateringLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          findMany: {
            args: Prisma.WateringLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>[]
          }
          create: {
            args: Prisma.WateringLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          createMany: {
            args: Prisma.WateringLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WateringLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>[]
          }
          delete: {
            args: Prisma.WateringLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          update: {
            args: Prisma.WateringLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          deleteMany: {
            args: Prisma.WateringLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WateringLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WateringLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WateringLogPayload>
          }
          aggregate: {
            args: Prisma.WateringLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWateringLog>
          }
          groupBy: {
            args: Prisma.WateringLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WateringLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WateringLogCountArgs<ExtArgs>
            result: $Utils.Optional<WateringLogCountAggregateOutputType> | number
          }
        }
      }
      CareAlert: {
        payload: Prisma.$CareAlertPayload<ExtArgs>
        fields: Prisma.CareAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          findFirst: {
            args: Prisma.CareAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          findMany: {
            args: Prisma.CareAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>[]
          }
          create: {
            args: Prisma.CareAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          createMany: {
            args: Prisma.CareAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>[]
          }
          delete: {
            args: Prisma.CareAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          update: {
            args: Prisma.CareAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          deleteMany: {
            args: Prisma.CareAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareAlertPayload>
          }
          aggregate: {
            args: Prisma.CareAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareAlert>
          }
          groupBy: {
            args: Prisma.CareAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareAlertCountArgs<ExtArgs>
            result: $Utils.Optional<CareAlertCountAggregateOutputType> | number
          }
        }
      }
      NeighborhoodStats: {
        payload: Prisma.$NeighborhoodStatsPayload<ExtArgs>
        fields: Prisma.NeighborhoodStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NeighborhoodStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NeighborhoodStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          findFirst: {
            args: Prisma.NeighborhoodStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NeighborhoodStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          findMany: {
            args: Prisma.NeighborhoodStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>[]
          }
          create: {
            args: Prisma.NeighborhoodStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          createMany: {
            args: Prisma.NeighborhoodStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NeighborhoodStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>[]
          }
          delete: {
            args: Prisma.NeighborhoodStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          update: {
            args: Prisma.NeighborhoodStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          deleteMany: {
            args: Prisma.NeighborhoodStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NeighborhoodStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NeighborhoodStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NeighborhoodStatsPayload>
          }
          aggregate: {
            args: Prisma.NeighborhoodStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNeighborhoodStats>
          }
          groupBy: {
            args: Prisma.NeighborhoodStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NeighborhoodStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.NeighborhoodStatsCountArgs<ExtArgs>
            result: $Utils.Optional<NeighborhoodStatsCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      ReportAssignment: {
        payload: Prisma.$ReportAssignmentPayload<ExtArgs>
        fields: Prisma.ReportAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          findFirst: {
            args: Prisma.ReportAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          findMany: {
            args: Prisma.ReportAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>[]
          }
          create: {
            args: Prisma.ReportAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          createMany: {
            args: Prisma.ReportAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>[]
          }
          delete: {
            args: Prisma.ReportAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          update: {
            args: Prisma.ReportAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.ReportAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportAssignmentPayload>
          }
          aggregate: {
            args: Prisma.ReportAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReportAssignment>
          }
          groupBy: {
            args: Prisma.ReportAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<ReportAssignmentCountAggregateOutputType> | number
          }
        }
      }
      PlantingCampaign: {
        payload: Prisma.$PlantingCampaignPayload<ExtArgs>
        fields: Prisma.PlantingCampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlantingCampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlantingCampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          findFirst: {
            args: Prisma.PlantingCampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlantingCampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          findMany: {
            args: Prisma.PlantingCampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>[]
          }
          create: {
            args: Prisma.PlantingCampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          createMany: {
            args: Prisma.PlantingCampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlantingCampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>[]
          }
          delete: {
            args: Prisma.PlantingCampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          update: {
            args: Prisma.PlantingCampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          deleteMany: {
            args: Prisma.PlantingCampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlantingCampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlantingCampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantingCampaignPayload>
          }
          aggregate: {
            args: Prisma.PlantingCampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlantingCampaign>
          }
          groupBy: {
            args: Prisma.PlantingCampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlantingCampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlantingCampaignCountArgs<ExtArgs>
            result: $Utils.Optional<PlantingCampaignCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reports: number
    adoptedTrees: number
    assignedReports: number
    assignments: number
    campaigns: number
    volunteerCampaigns: number
    notifications: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    adoptedTrees?: boolean | UserCountOutputTypeCountAdoptedTreesArgs
    assignedReports?: boolean | UserCountOutputTypeCountAssignedReportsArgs
    assignments?: boolean | UserCountOutputTypeCountAssignmentsArgs
    campaigns?: boolean | UserCountOutputTypeCountCampaignsArgs
    volunteerCampaigns?: boolean | UserCountOutputTypeCountVolunteerCampaignsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdoptedTreesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportAssignmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlantingCampaignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVolunteerCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlantingCampaignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type GreenSpaceCountOutputType
   */

  export type GreenSpaceCountOutputType = {
    trees: number
  }

  export type GreenSpaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trees?: boolean | GreenSpaceCountOutputTypeCountTreesArgs
  }

  // Custom InputTypes
  /**
   * GreenSpaceCountOutputType without action
   */
  export type GreenSpaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpaceCountOutputType
     */
    select?: GreenSpaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GreenSpaceCountOutputType without action
   */
  export type GreenSpaceCountOutputTypeCountTreesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreeWhereInput
  }


  /**
   * Count Type TreeCountOutputType
   */

  export type TreeCountOutputType = {
    wateringLogs: number
  }

  export type TreeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wateringLogs?: boolean | TreeCountOutputTypeCountWateringLogsArgs
  }

  // Custom InputTypes
  /**
   * TreeCountOutputType without action
   */
  export type TreeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreeCountOutputType
     */
    select?: TreeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TreeCountOutputType without action
   */
  export type TreeCountOutputTypeCountWateringLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WateringLogWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    assignments: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | ReportCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportAssignmentWhereInput
  }


  /**
   * Count Type PlantingCampaignCountOutputType
   */

  export type PlantingCampaignCountOutputType = {
    volunteers: number
  }

  export type PlantingCampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteers?: boolean | PlantingCampaignCountOutputTypeCountVolunteersArgs
  }

  // Custom InputTypes
  /**
   * PlantingCampaignCountOutputType without action
   */
  export type PlantingCampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaignCountOutputType
     */
    select?: PlantingCampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlantingCampaignCountOutputType without action
   */
  export type PlantingCampaignCountOutputTypeCountVolunteersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    name: string | null
    role: string | null
    neighborhood: string | null
    avatar: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    name: string | null
    role: string | null
    neighborhood: string | null
    avatar: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    name: number
    role: number
    neighborhood: number
    avatar: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    neighborhood?: true
    avatar?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    neighborhood?: true
    avatar?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    neighborhood?: true
    avatar?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    phone: string | null
    name: string | null
    role: string
    neighborhood: string | null
    avatar: string | null
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    neighborhood?: boolean
    avatar?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reports?: boolean | User$reportsArgs<ExtArgs>
    adoptedTrees?: boolean | User$adoptedTreesArgs<ExtArgs>
    assignedReports?: boolean | User$assignedReportsArgs<ExtArgs>
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    campaigns?: boolean | User$campaignsArgs<ExtArgs>
    volunteerCampaigns?: boolean | User$volunteerCampaignsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    neighborhood?: boolean
    avatar?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    neighborhood?: boolean
    avatar?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | User$reportsArgs<ExtArgs>
    adoptedTrees?: boolean | User$adoptedTreesArgs<ExtArgs>
    assignedReports?: boolean | User$assignedReportsArgs<ExtArgs>
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    campaigns?: boolean | User$campaignsArgs<ExtArgs>
    volunteerCampaigns?: boolean | User$volunteerCampaignsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      reports: Prisma.$ReportPayload<ExtArgs>[]
      adoptedTrees: Prisma.$TreePayload<ExtArgs>[]
      assignedReports: Prisma.$ReportPayload<ExtArgs>[]
      assignments: Prisma.$ReportAssignmentPayload<ExtArgs>[]
      campaigns: Prisma.$PlantingCampaignPayload<ExtArgs>[]
      volunteerCampaigns: Prisma.$PlantingCampaignPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phone: string | null
      name: string | null
      role: string
      neighborhood: string | null
      avatar: string | null
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany"> | Null>
    adoptedTrees<T extends User$adoptedTreesArgs<ExtArgs> = {}>(args?: Subset<T, User$adoptedTreesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findMany"> | Null>
    assignedReports<T extends User$assignedReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany"> | Null>
    assignments<T extends User$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findMany"> | Null>
    campaigns<T extends User$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, User$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findMany"> | Null>
    volunteerCampaigns<T extends User$volunteerCampaignsArgs<ExtArgs> = {}>(args?: Subset<T, User$volunteerCampaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly neighborhood: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.adoptedTrees
   */
  export type User$adoptedTreesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    where?: TreeWhereInput
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    cursor?: TreeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreeScalarFieldEnum | TreeScalarFieldEnum[]
  }

  /**
   * User.assignedReports
   */
  export type User$assignedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.assignments
   */
  export type User$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    where?: ReportAssignmentWhereInput
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    cursor?: ReportAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportAssignmentScalarFieldEnum | ReportAssignmentScalarFieldEnum[]
  }

  /**
   * User.campaigns
   */
  export type User$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    where?: PlantingCampaignWhereInput
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    cursor?: PlantingCampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlantingCampaignScalarFieldEnum | PlantingCampaignScalarFieldEnum[]
  }

  /**
   * User.volunteerCampaigns
   */
  export type User$volunteerCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    where?: PlantingCampaignWhereInput
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    cursor?: PlantingCampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlantingCampaignScalarFieldEnum | PlantingCampaignScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GreenSpace
   */

  export type AggregateGreenSpace = {
    _count: GreenSpaceCountAggregateOutputType | null
    _avg: GreenSpaceAvgAggregateOutputType | null
    _sum: GreenSpaceSumAggregateOutputType | null
    _min: GreenSpaceMinAggregateOutputType | null
    _max: GreenSpaceMaxAggregateOutputType | null
  }

  export type GreenSpaceAvgAggregateOutputType = {
    area: number | null
  }

  export type GreenSpaceSumAggregateOutputType = {
    area: number | null
  }

  export type GreenSpaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    location: string | null
    area: number | null
    description: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GreenSpaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    location: string | null
    area: number | null
    description: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GreenSpaceCountAggregateOutputType = {
    id: number
    name: number
    type: number
    location: number
    area: number
    description: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GreenSpaceAvgAggregateInputType = {
    area?: true
  }

  export type GreenSpaceSumAggregateInputType = {
    area?: true
  }

  export type GreenSpaceMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    location?: true
    area?: true
    description?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GreenSpaceMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    location?: true
    area?: true
    description?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GreenSpaceCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    location?: true
    area?: true
    description?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GreenSpaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GreenSpace to aggregate.
     */
    where?: GreenSpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GreenSpaces to fetch.
     */
    orderBy?: GreenSpaceOrderByWithRelationInput | GreenSpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GreenSpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GreenSpaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GreenSpaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GreenSpaces
    **/
    _count?: true | GreenSpaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GreenSpaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GreenSpaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GreenSpaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GreenSpaceMaxAggregateInputType
  }

  export type GetGreenSpaceAggregateType<T extends GreenSpaceAggregateArgs> = {
        [P in keyof T & keyof AggregateGreenSpace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGreenSpace[P]>
      : GetScalarType<T[P], AggregateGreenSpace[P]>
  }




  export type GreenSpaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GreenSpaceWhereInput
    orderBy?: GreenSpaceOrderByWithAggregationInput | GreenSpaceOrderByWithAggregationInput[]
    by: GreenSpaceScalarFieldEnum[] | GreenSpaceScalarFieldEnum
    having?: GreenSpaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GreenSpaceCountAggregateInputType | true
    _avg?: GreenSpaceAvgAggregateInputType
    _sum?: GreenSpaceSumAggregateInputType
    _min?: GreenSpaceMinAggregateInputType
    _max?: GreenSpaceMaxAggregateInputType
  }

  export type GreenSpaceGroupByOutputType = {
    id: string
    name: string
    type: string
    location: string
    area: number
    description: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: GreenSpaceCountAggregateOutputType | null
    _avg: GreenSpaceAvgAggregateOutputType | null
    _sum: GreenSpaceSumAggregateOutputType | null
    _min: GreenSpaceMinAggregateOutputType | null
    _max: GreenSpaceMaxAggregateOutputType | null
  }

  type GetGreenSpaceGroupByPayload<T extends GreenSpaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GreenSpaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GreenSpaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GreenSpaceGroupByOutputType[P]>
            : GetScalarType<T[P], GreenSpaceGroupByOutputType[P]>
        }
      >
    >


  export type GreenSpaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    area?: boolean
    description?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trees?: boolean | GreenSpace$treesArgs<ExtArgs>
    _count?: boolean | GreenSpaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["greenSpace"]>

  export type GreenSpaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    area?: boolean
    description?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["greenSpace"]>

  export type GreenSpaceSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    area?: boolean
    description?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GreenSpaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trees?: boolean | GreenSpace$treesArgs<ExtArgs>
    _count?: boolean | GreenSpaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GreenSpaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GreenSpacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GreenSpace"
    objects: {
      trees: Prisma.$TreePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      location: string
      area: number
      description: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["greenSpace"]>
    composites: {}
  }

  type GreenSpaceGetPayload<S extends boolean | null | undefined | GreenSpaceDefaultArgs> = $Result.GetResult<Prisma.$GreenSpacePayload, S>

  type GreenSpaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GreenSpaceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GreenSpaceCountAggregateInputType | true
    }

  export interface GreenSpaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GreenSpace'], meta: { name: 'GreenSpace' } }
    /**
     * Find zero or one GreenSpace that matches the filter.
     * @param {GreenSpaceFindUniqueArgs} args - Arguments to find a GreenSpace
     * @example
     * // Get one GreenSpace
     * const greenSpace = await prisma.greenSpace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GreenSpaceFindUniqueArgs>(args: SelectSubset<T, GreenSpaceFindUniqueArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GreenSpace that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GreenSpaceFindUniqueOrThrowArgs} args - Arguments to find a GreenSpace
     * @example
     * // Get one GreenSpace
     * const greenSpace = await prisma.greenSpace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GreenSpaceFindUniqueOrThrowArgs>(args: SelectSubset<T, GreenSpaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GreenSpace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceFindFirstArgs} args - Arguments to find a GreenSpace
     * @example
     * // Get one GreenSpace
     * const greenSpace = await prisma.greenSpace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GreenSpaceFindFirstArgs>(args?: SelectSubset<T, GreenSpaceFindFirstArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GreenSpace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceFindFirstOrThrowArgs} args - Arguments to find a GreenSpace
     * @example
     * // Get one GreenSpace
     * const greenSpace = await prisma.greenSpace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GreenSpaceFindFirstOrThrowArgs>(args?: SelectSubset<T, GreenSpaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GreenSpaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GreenSpaces
     * const greenSpaces = await prisma.greenSpace.findMany()
     * 
     * // Get first 10 GreenSpaces
     * const greenSpaces = await prisma.greenSpace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const greenSpaceWithIdOnly = await prisma.greenSpace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GreenSpaceFindManyArgs>(args?: SelectSubset<T, GreenSpaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GreenSpace.
     * @param {GreenSpaceCreateArgs} args - Arguments to create a GreenSpace.
     * @example
     * // Create one GreenSpace
     * const GreenSpace = await prisma.greenSpace.create({
     *   data: {
     *     // ... data to create a GreenSpace
     *   }
     * })
     * 
     */
    create<T extends GreenSpaceCreateArgs>(args: SelectSubset<T, GreenSpaceCreateArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GreenSpaces.
     * @param {GreenSpaceCreateManyArgs} args - Arguments to create many GreenSpaces.
     * @example
     * // Create many GreenSpaces
     * const greenSpace = await prisma.greenSpace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GreenSpaceCreateManyArgs>(args?: SelectSubset<T, GreenSpaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GreenSpaces and returns the data saved in the database.
     * @param {GreenSpaceCreateManyAndReturnArgs} args - Arguments to create many GreenSpaces.
     * @example
     * // Create many GreenSpaces
     * const greenSpace = await prisma.greenSpace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GreenSpaces and only return the `id`
     * const greenSpaceWithIdOnly = await prisma.greenSpace.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GreenSpaceCreateManyAndReturnArgs>(args?: SelectSubset<T, GreenSpaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GreenSpace.
     * @param {GreenSpaceDeleteArgs} args - Arguments to delete one GreenSpace.
     * @example
     * // Delete one GreenSpace
     * const GreenSpace = await prisma.greenSpace.delete({
     *   where: {
     *     // ... filter to delete one GreenSpace
     *   }
     * })
     * 
     */
    delete<T extends GreenSpaceDeleteArgs>(args: SelectSubset<T, GreenSpaceDeleteArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GreenSpace.
     * @param {GreenSpaceUpdateArgs} args - Arguments to update one GreenSpace.
     * @example
     * // Update one GreenSpace
     * const greenSpace = await prisma.greenSpace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GreenSpaceUpdateArgs>(args: SelectSubset<T, GreenSpaceUpdateArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GreenSpaces.
     * @param {GreenSpaceDeleteManyArgs} args - Arguments to filter GreenSpaces to delete.
     * @example
     * // Delete a few GreenSpaces
     * const { count } = await prisma.greenSpace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GreenSpaceDeleteManyArgs>(args?: SelectSubset<T, GreenSpaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GreenSpaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GreenSpaces
     * const greenSpace = await prisma.greenSpace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GreenSpaceUpdateManyArgs>(args: SelectSubset<T, GreenSpaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GreenSpace.
     * @param {GreenSpaceUpsertArgs} args - Arguments to update or create a GreenSpace.
     * @example
     * // Update or create a GreenSpace
     * const greenSpace = await prisma.greenSpace.upsert({
     *   create: {
     *     // ... data to create a GreenSpace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GreenSpace we want to update
     *   }
     * })
     */
    upsert<T extends GreenSpaceUpsertArgs>(args: SelectSubset<T, GreenSpaceUpsertArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GreenSpaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceCountArgs} args - Arguments to filter GreenSpaces to count.
     * @example
     * // Count the number of GreenSpaces
     * const count = await prisma.greenSpace.count({
     *   where: {
     *     // ... the filter for the GreenSpaces we want to count
     *   }
     * })
    **/
    count<T extends GreenSpaceCountArgs>(
      args?: Subset<T, GreenSpaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GreenSpaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GreenSpace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GreenSpaceAggregateArgs>(args: Subset<T, GreenSpaceAggregateArgs>): Prisma.PrismaPromise<GetGreenSpaceAggregateType<T>>

    /**
     * Group by GreenSpace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GreenSpaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GreenSpaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GreenSpaceGroupByArgs['orderBy'] }
        : { orderBy?: GreenSpaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GreenSpaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGreenSpaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GreenSpace model
   */
  readonly fields: GreenSpaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GreenSpace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GreenSpaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trees<T extends GreenSpace$treesArgs<ExtArgs> = {}>(args?: Subset<T, GreenSpace$treesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GreenSpace model
   */ 
  interface GreenSpaceFieldRefs {
    readonly id: FieldRef<"GreenSpace", 'String'>
    readonly name: FieldRef<"GreenSpace", 'String'>
    readonly type: FieldRef<"GreenSpace", 'String'>
    readonly location: FieldRef<"GreenSpace", 'String'>
    readonly area: FieldRef<"GreenSpace", 'Float'>
    readonly description: FieldRef<"GreenSpace", 'String'>
    readonly address: FieldRef<"GreenSpace", 'String'>
    readonly createdAt: FieldRef<"GreenSpace", 'DateTime'>
    readonly updatedAt: FieldRef<"GreenSpace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GreenSpace findUnique
   */
  export type GreenSpaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter, which GreenSpace to fetch.
     */
    where: GreenSpaceWhereUniqueInput
  }

  /**
   * GreenSpace findUniqueOrThrow
   */
  export type GreenSpaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter, which GreenSpace to fetch.
     */
    where: GreenSpaceWhereUniqueInput
  }

  /**
   * GreenSpace findFirst
   */
  export type GreenSpaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter, which GreenSpace to fetch.
     */
    where?: GreenSpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GreenSpaces to fetch.
     */
    orderBy?: GreenSpaceOrderByWithRelationInput | GreenSpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GreenSpaces.
     */
    cursor?: GreenSpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GreenSpaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GreenSpaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GreenSpaces.
     */
    distinct?: GreenSpaceScalarFieldEnum | GreenSpaceScalarFieldEnum[]
  }

  /**
   * GreenSpace findFirstOrThrow
   */
  export type GreenSpaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter, which GreenSpace to fetch.
     */
    where?: GreenSpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GreenSpaces to fetch.
     */
    orderBy?: GreenSpaceOrderByWithRelationInput | GreenSpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GreenSpaces.
     */
    cursor?: GreenSpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GreenSpaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GreenSpaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GreenSpaces.
     */
    distinct?: GreenSpaceScalarFieldEnum | GreenSpaceScalarFieldEnum[]
  }

  /**
   * GreenSpace findMany
   */
  export type GreenSpaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter, which GreenSpaces to fetch.
     */
    where?: GreenSpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GreenSpaces to fetch.
     */
    orderBy?: GreenSpaceOrderByWithRelationInput | GreenSpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GreenSpaces.
     */
    cursor?: GreenSpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GreenSpaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GreenSpaces.
     */
    skip?: number
    distinct?: GreenSpaceScalarFieldEnum | GreenSpaceScalarFieldEnum[]
  }

  /**
   * GreenSpace create
   */
  export type GreenSpaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * The data needed to create a GreenSpace.
     */
    data: XOR<GreenSpaceCreateInput, GreenSpaceUncheckedCreateInput>
  }

  /**
   * GreenSpace createMany
   */
  export type GreenSpaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GreenSpaces.
     */
    data: GreenSpaceCreateManyInput | GreenSpaceCreateManyInput[]
  }

  /**
   * GreenSpace createManyAndReturn
   */
  export type GreenSpaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GreenSpaces.
     */
    data: GreenSpaceCreateManyInput | GreenSpaceCreateManyInput[]
  }

  /**
   * GreenSpace update
   */
  export type GreenSpaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * The data needed to update a GreenSpace.
     */
    data: XOR<GreenSpaceUpdateInput, GreenSpaceUncheckedUpdateInput>
    /**
     * Choose, which GreenSpace to update.
     */
    where: GreenSpaceWhereUniqueInput
  }

  /**
   * GreenSpace updateMany
   */
  export type GreenSpaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GreenSpaces.
     */
    data: XOR<GreenSpaceUpdateManyMutationInput, GreenSpaceUncheckedUpdateManyInput>
    /**
     * Filter which GreenSpaces to update
     */
    where?: GreenSpaceWhereInput
  }

  /**
   * GreenSpace upsert
   */
  export type GreenSpaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * The filter to search for the GreenSpace to update in case it exists.
     */
    where: GreenSpaceWhereUniqueInput
    /**
     * In case the GreenSpace found by the `where` argument doesn't exist, create a new GreenSpace with this data.
     */
    create: XOR<GreenSpaceCreateInput, GreenSpaceUncheckedCreateInput>
    /**
     * In case the GreenSpace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GreenSpaceUpdateInput, GreenSpaceUncheckedUpdateInput>
  }

  /**
   * GreenSpace delete
   */
  export type GreenSpaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    /**
     * Filter which GreenSpace to delete.
     */
    where: GreenSpaceWhereUniqueInput
  }

  /**
   * GreenSpace deleteMany
   */
  export type GreenSpaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GreenSpaces to delete
     */
    where?: GreenSpaceWhereInput
  }

  /**
   * GreenSpace.trees
   */
  export type GreenSpace$treesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    where?: TreeWhereInput
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    cursor?: TreeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreeScalarFieldEnum | TreeScalarFieldEnum[]
  }

  /**
   * GreenSpace without action
   */
  export type GreenSpaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
  }


  /**
   * Model Tree
   */

  export type AggregateTree = {
    _count: TreeCountAggregateOutputType | null
    _avg: TreeAvgAggregateOutputType | null
    _sum: TreeSumAggregateOutputType | null
    _min: TreeMinAggregateOutputType | null
    _max: TreeMaxAggregateOutputType | null
  }

  export type TreeAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    height: number | null
    trunkDiameter: number | null
  }

  export type TreeSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    height: number | null
    trunkDiameter: number | null
  }

  export type TreeMinAggregateOutputType = {
    id: string | null
    species: string | null
    speciesOther: string | null
    latitude: number | null
    longitude: number | null
    plantingDate: Date | null
    height: number | null
    trunkDiameter: number | null
    healthStatus: string | null
    adoptedById: string | null
    adoptionDate: Date | null
    greenSpaceId: string | null
    notes: string | null
    photos: string | null
    neighborhood: string | null
    nickname: string | null
    lastWateredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TreeMaxAggregateOutputType = {
    id: string | null
    species: string | null
    speciesOther: string | null
    latitude: number | null
    longitude: number | null
    plantingDate: Date | null
    height: number | null
    trunkDiameter: number | null
    healthStatus: string | null
    adoptedById: string | null
    adoptionDate: Date | null
    greenSpaceId: string | null
    notes: string | null
    photos: string | null
    neighborhood: string | null
    nickname: string | null
    lastWateredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TreeCountAggregateOutputType = {
    id: number
    species: number
    speciesOther: number
    latitude: number
    longitude: number
    plantingDate: number
    height: number
    trunkDiameter: number
    healthStatus: number
    adoptedById: number
    adoptionDate: number
    greenSpaceId: number
    notes: number
    photos: number
    neighborhood: number
    nickname: number
    lastWateredAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TreeAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    height?: true
    trunkDiameter?: true
  }

  export type TreeSumAggregateInputType = {
    latitude?: true
    longitude?: true
    height?: true
    trunkDiameter?: true
  }

  export type TreeMinAggregateInputType = {
    id?: true
    species?: true
    speciesOther?: true
    latitude?: true
    longitude?: true
    plantingDate?: true
    height?: true
    trunkDiameter?: true
    healthStatus?: true
    adoptedById?: true
    adoptionDate?: true
    greenSpaceId?: true
    notes?: true
    photos?: true
    neighborhood?: true
    nickname?: true
    lastWateredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TreeMaxAggregateInputType = {
    id?: true
    species?: true
    speciesOther?: true
    latitude?: true
    longitude?: true
    plantingDate?: true
    height?: true
    trunkDiameter?: true
    healthStatus?: true
    adoptedById?: true
    adoptionDate?: true
    greenSpaceId?: true
    notes?: true
    photos?: true
    neighborhood?: true
    nickname?: true
    lastWateredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TreeCountAggregateInputType = {
    id?: true
    species?: true
    speciesOther?: true
    latitude?: true
    longitude?: true
    plantingDate?: true
    height?: true
    trunkDiameter?: true
    healthStatus?: true
    adoptedById?: true
    adoptionDate?: true
    greenSpaceId?: true
    notes?: true
    photos?: true
    neighborhood?: true
    nickname?: true
    lastWateredAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TreeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tree to aggregate.
     */
    where?: TreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trees to fetch.
     */
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trees
    **/
    _count?: true | TreeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreeMaxAggregateInputType
  }

  export type GetTreeAggregateType<T extends TreeAggregateArgs> = {
        [P in keyof T & keyof AggregateTree]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTree[P]>
      : GetScalarType<T[P], AggregateTree[P]>
  }




  export type TreeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreeWhereInput
    orderBy?: TreeOrderByWithAggregationInput | TreeOrderByWithAggregationInput[]
    by: TreeScalarFieldEnum[] | TreeScalarFieldEnum
    having?: TreeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreeCountAggregateInputType | true
    _avg?: TreeAvgAggregateInputType
    _sum?: TreeSumAggregateInputType
    _min?: TreeMinAggregateInputType
    _max?: TreeMaxAggregateInputType
  }

  export type TreeGroupByOutputType = {
    id: string
    species: string
    speciesOther: string | null
    latitude: number
    longitude: number
    plantingDate: Date | null
    height: number | null
    trunkDiameter: number | null
    healthStatus: string
    adoptedById: string | null
    adoptionDate: Date | null
    greenSpaceId: string | null
    notes: string | null
    photos: string
    neighborhood: string
    nickname: string | null
    lastWateredAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TreeCountAggregateOutputType | null
    _avg: TreeAvgAggregateOutputType | null
    _sum: TreeSumAggregateOutputType | null
    _min: TreeMinAggregateOutputType | null
    _max: TreeMaxAggregateOutputType | null
  }

  type GetTreeGroupByPayload<T extends TreeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreeGroupByOutputType[P]>
            : GetScalarType<T[P], TreeGroupByOutputType[P]>
        }
      >
    >


  export type TreeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    species?: boolean
    speciesOther?: boolean
    latitude?: boolean
    longitude?: boolean
    plantingDate?: boolean
    height?: boolean
    trunkDiameter?: boolean
    healthStatus?: boolean
    adoptedById?: boolean
    adoptionDate?: boolean
    greenSpaceId?: boolean
    notes?: boolean
    photos?: boolean
    neighborhood?: boolean
    nickname?: boolean
    lastWateredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adoptedBy?: boolean | Tree$adoptedByArgs<ExtArgs>
    greenSpace?: boolean | Tree$greenSpaceArgs<ExtArgs>
    wateringLogs?: boolean | Tree$wateringLogsArgs<ExtArgs>
    _count?: boolean | TreeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tree"]>

  export type TreeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    species?: boolean
    speciesOther?: boolean
    latitude?: boolean
    longitude?: boolean
    plantingDate?: boolean
    height?: boolean
    trunkDiameter?: boolean
    healthStatus?: boolean
    adoptedById?: boolean
    adoptionDate?: boolean
    greenSpaceId?: boolean
    notes?: boolean
    photos?: boolean
    neighborhood?: boolean
    nickname?: boolean
    lastWateredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adoptedBy?: boolean | Tree$adoptedByArgs<ExtArgs>
    greenSpace?: boolean | Tree$greenSpaceArgs<ExtArgs>
  }, ExtArgs["result"]["tree"]>

  export type TreeSelectScalar = {
    id?: boolean
    species?: boolean
    speciesOther?: boolean
    latitude?: boolean
    longitude?: boolean
    plantingDate?: boolean
    height?: boolean
    trunkDiameter?: boolean
    healthStatus?: boolean
    adoptedById?: boolean
    adoptionDate?: boolean
    greenSpaceId?: boolean
    notes?: boolean
    photos?: boolean
    neighborhood?: boolean
    nickname?: boolean
    lastWateredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TreeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adoptedBy?: boolean | Tree$adoptedByArgs<ExtArgs>
    greenSpace?: boolean | Tree$greenSpaceArgs<ExtArgs>
    wateringLogs?: boolean | Tree$wateringLogsArgs<ExtArgs>
    _count?: boolean | TreeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TreeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adoptedBy?: boolean | Tree$adoptedByArgs<ExtArgs>
    greenSpace?: boolean | Tree$greenSpaceArgs<ExtArgs>
  }

  export type $TreePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tree"
    objects: {
      adoptedBy: Prisma.$UserPayload<ExtArgs> | null
      greenSpace: Prisma.$GreenSpacePayload<ExtArgs> | null
      wateringLogs: Prisma.$WateringLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      species: string
      speciesOther: string | null
      latitude: number
      longitude: number
      plantingDate: Date | null
      height: number | null
      trunkDiameter: number | null
      healthStatus: string
      adoptedById: string | null
      adoptionDate: Date | null
      greenSpaceId: string | null
      notes: string | null
      photos: string
      neighborhood: string
      nickname: string | null
      lastWateredAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tree"]>
    composites: {}
  }

  type TreeGetPayload<S extends boolean | null | undefined | TreeDefaultArgs> = $Result.GetResult<Prisma.$TreePayload, S>

  type TreeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TreeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TreeCountAggregateInputType | true
    }

  export interface TreeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tree'], meta: { name: 'Tree' } }
    /**
     * Find zero or one Tree that matches the filter.
     * @param {TreeFindUniqueArgs} args - Arguments to find a Tree
     * @example
     * // Get one Tree
     * const tree = await prisma.tree.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreeFindUniqueArgs>(args: SelectSubset<T, TreeFindUniqueArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tree that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TreeFindUniqueOrThrowArgs} args - Arguments to find a Tree
     * @example
     * // Get one Tree
     * const tree = await prisma.tree.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreeFindUniqueOrThrowArgs>(args: SelectSubset<T, TreeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tree that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeFindFirstArgs} args - Arguments to find a Tree
     * @example
     * // Get one Tree
     * const tree = await prisma.tree.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreeFindFirstArgs>(args?: SelectSubset<T, TreeFindFirstArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tree that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeFindFirstOrThrowArgs} args - Arguments to find a Tree
     * @example
     * // Get one Tree
     * const tree = await prisma.tree.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreeFindFirstOrThrowArgs>(args?: SelectSubset<T, TreeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Trees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trees
     * const trees = await prisma.tree.findMany()
     * 
     * // Get first 10 Trees
     * const trees = await prisma.tree.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treeWithIdOnly = await prisma.tree.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreeFindManyArgs>(args?: SelectSubset<T, TreeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tree.
     * @param {TreeCreateArgs} args - Arguments to create a Tree.
     * @example
     * // Create one Tree
     * const Tree = await prisma.tree.create({
     *   data: {
     *     // ... data to create a Tree
     *   }
     * })
     * 
     */
    create<T extends TreeCreateArgs>(args: SelectSubset<T, TreeCreateArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Trees.
     * @param {TreeCreateManyArgs} args - Arguments to create many Trees.
     * @example
     * // Create many Trees
     * const tree = await prisma.tree.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreeCreateManyArgs>(args?: SelectSubset<T, TreeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trees and returns the data saved in the database.
     * @param {TreeCreateManyAndReturnArgs} args - Arguments to create many Trees.
     * @example
     * // Create many Trees
     * const tree = await prisma.tree.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trees and only return the `id`
     * const treeWithIdOnly = await prisma.tree.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreeCreateManyAndReturnArgs>(args?: SelectSubset<T, TreeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tree.
     * @param {TreeDeleteArgs} args - Arguments to delete one Tree.
     * @example
     * // Delete one Tree
     * const Tree = await prisma.tree.delete({
     *   where: {
     *     // ... filter to delete one Tree
     *   }
     * })
     * 
     */
    delete<T extends TreeDeleteArgs>(args: SelectSubset<T, TreeDeleteArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tree.
     * @param {TreeUpdateArgs} args - Arguments to update one Tree.
     * @example
     * // Update one Tree
     * const tree = await prisma.tree.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreeUpdateArgs>(args: SelectSubset<T, TreeUpdateArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Trees.
     * @param {TreeDeleteManyArgs} args - Arguments to filter Trees to delete.
     * @example
     * // Delete a few Trees
     * const { count } = await prisma.tree.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreeDeleteManyArgs>(args?: SelectSubset<T, TreeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trees
     * const tree = await prisma.tree.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreeUpdateManyArgs>(args: SelectSubset<T, TreeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tree.
     * @param {TreeUpsertArgs} args - Arguments to update or create a Tree.
     * @example
     * // Update or create a Tree
     * const tree = await prisma.tree.upsert({
     *   create: {
     *     // ... data to create a Tree
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tree we want to update
     *   }
     * })
     */
    upsert<T extends TreeUpsertArgs>(args: SelectSubset<T, TreeUpsertArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Trees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeCountArgs} args - Arguments to filter Trees to count.
     * @example
     * // Count the number of Trees
     * const count = await prisma.tree.count({
     *   where: {
     *     // ... the filter for the Trees we want to count
     *   }
     * })
    **/
    count<T extends TreeCountArgs>(
      args?: Subset<T, TreeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreeAggregateArgs>(args: Subset<T, TreeAggregateArgs>): Prisma.PrismaPromise<GetTreeAggregateType<T>>

    /**
     * Group by Tree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreeGroupByArgs['orderBy'] }
        : { orderBy?: TreeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tree model
   */
  readonly fields: TreeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tree.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adoptedBy<T extends Tree$adoptedByArgs<ExtArgs> = {}>(args?: Subset<T, Tree$adoptedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    greenSpace<T extends Tree$greenSpaceArgs<ExtArgs> = {}>(args?: Subset<T, Tree$greenSpaceArgs<ExtArgs>>): Prisma__GreenSpaceClient<$Result.GetResult<Prisma.$GreenSpacePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    wateringLogs<T extends Tree$wateringLogsArgs<ExtArgs> = {}>(args?: Subset<T, Tree$wateringLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tree model
   */ 
  interface TreeFieldRefs {
    readonly id: FieldRef<"Tree", 'String'>
    readonly species: FieldRef<"Tree", 'String'>
    readonly speciesOther: FieldRef<"Tree", 'String'>
    readonly latitude: FieldRef<"Tree", 'Float'>
    readonly longitude: FieldRef<"Tree", 'Float'>
    readonly plantingDate: FieldRef<"Tree", 'DateTime'>
    readonly height: FieldRef<"Tree", 'Float'>
    readonly trunkDiameter: FieldRef<"Tree", 'Float'>
    readonly healthStatus: FieldRef<"Tree", 'String'>
    readonly adoptedById: FieldRef<"Tree", 'String'>
    readonly adoptionDate: FieldRef<"Tree", 'DateTime'>
    readonly greenSpaceId: FieldRef<"Tree", 'String'>
    readonly notes: FieldRef<"Tree", 'String'>
    readonly photos: FieldRef<"Tree", 'String'>
    readonly neighborhood: FieldRef<"Tree", 'String'>
    readonly nickname: FieldRef<"Tree", 'String'>
    readonly lastWateredAt: FieldRef<"Tree", 'DateTime'>
    readonly createdAt: FieldRef<"Tree", 'DateTime'>
    readonly updatedAt: FieldRef<"Tree", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tree findUnique
   */
  export type TreeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter, which Tree to fetch.
     */
    where: TreeWhereUniqueInput
  }

  /**
   * Tree findUniqueOrThrow
   */
  export type TreeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter, which Tree to fetch.
     */
    where: TreeWhereUniqueInput
  }

  /**
   * Tree findFirst
   */
  export type TreeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter, which Tree to fetch.
     */
    where?: TreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trees to fetch.
     */
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trees.
     */
    cursor?: TreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trees.
     */
    distinct?: TreeScalarFieldEnum | TreeScalarFieldEnum[]
  }

  /**
   * Tree findFirstOrThrow
   */
  export type TreeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter, which Tree to fetch.
     */
    where?: TreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trees to fetch.
     */
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trees.
     */
    cursor?: TreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trees.
     */
    distinct?: TreeScalarFieldEnum | TreeScalarFieldEnum[]
  }

  /**
   * Tree findMany
   */
  export type TreeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter, which Trees to fetch.
     */
    where?: TreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trees to fetch.
     */
    orderBy?: TreeOrderByWithRelationInput | TreeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trees.
     */
    cursor?: TreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trees.
     */
    skip?: number
    distinct?: TreeScalarFieldEnum | TreeScalarFieldEnum[]
  }

  /**
   * Tree create
   */
  export type TreeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * The data needed to create a Tree.
     */
    data: XOR<TreeCreateInput, TreeUncheckedCreateInput>
  }

  /**
   * Tree createMany
   */
  export type TreeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trees.
     */
    data: TreeCreateManyInput | TreeCreateManyInput[]
  }

  /**
   * Tree createManyAndReturn
   */
  export type TreeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Trees.
     */
    data: TreeCreateManyInput | TreeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tree update
   */
  export type TreeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * The data needed to update a Tree.
     */
    data: XOR<TreeUpdateInput, TreeUncheckedUpdateInput>
    /**
     * Choose, which Tree to update.
     */
    where: TreeWhereUniqueInput
  }

  /**
   * Tree updateMany
   */
  export type TreeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trees.
     */
    data: XOR<TreeUpdateManyMutationInput, TreeUncheckedUpdateManyInput>
    /**
     * Filter which Trees to update
     */
    where?: TreeWhereInput
  }

  /**
   * Tree upsert
   */
  export type TreeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * The filter to search for the Tree to update in case it exists.
     */
    where: TreeWhereUniqueInput
    /**
     * In case the Tree found by the `where` argument doesn't exist, create a new Tree with this data.
     */
    create: XOR<TreeCreateInput, TreeUncheckedCreateInput>
    /**
     * In case the Tree was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreeUpdateInput, TreeUncheckedUpdateInput>
  }

  /**
   * Tree delete
   */
  export type TreeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
    /**
     * Filter which Tree to delete.
     */
    where: TreeWhereUniqueInput
  }

  /**
   * Tree deleteMany
   */
  export type TreeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trees to delete
     */
    where?: TreeWhereInput
  }

  /**
   * Tree.adoptedBy
   */
  export type Tree$adoptedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Tree.greenSpace
   */
  export type Tree$greenSpaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GreenSpace
     */
    select?: GreenSpaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GreenSpaceInclude<ExtArgs> | null
    where?: GreenSpaceWhereInput
  }

  /**
   * Tree.wateringLogs
   */
  export type Tree$wateringLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    where?: WateringLogWhereInput
    orderBy?: WateringLogOrderByWithRelationInput | WateringLogOrderByWithRelationInput[]
    cursor?: WateringLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WateringLogScalarFieldEnum | WateringLogScalarFieldEnum[]
  }

  /**
   * Tree without action
   */
  export type TreeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tree
     */
    select?: TreeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreeInclude<ExtArgs> | null
  }


  /**
   * Model WateringLog
   */

  export type AggregateWateringLog = {
    _count: WateringLogCountAggregateOutputType | null
    _avg: WateringLogAvgAggregateOutputType | null
    _sum: WateringLogSumAggregateOutputType | null
    _min: WateringLogMinAggregateOutputType | null
    _max: WateringLogMaxAggregateOutputType | null
  }

  export type WateringLogAvgAggregateOutputType = {
    liters: number | null
    earnedPoints: number | null
  }

  export type WateringLogSumAggregateOutputType = {
    liters: number | null
    earnedPoints: number | null
  }

  export type WateringLogMinAggregateOutputType = {
    id: string | null
    treeId: string | null
    userName: string | null
    liters: number | null
    earnedPoints: number | null
    photoProof: string | null
    photoVerified: boolean | null
    loggedAt: Date | null
  }

  export type WateringLogMaxAggregateOutputType = {
    id: string | null
    treeId: string | null
    userName: string | null
    liters: number | null
    earnedPoints: number | null
    photoProof: string | null
    photoVerified: boolean | null
    loggedAt: Date | null
  }

  export type WateringLogCountAggregateOutputType = {
    id: number
    treeId: number
    userName: number
    liters: number
    earnedPoints: number
    photoProof: number
    photoVerified: number
    loggedAt: number
    _all: number
  }


  export type WateringLogAvgAggregateInputType = {
    liters?: true
    earnedPoints?: true
  }

  export type WateringLogSumAggregateInputType = {
    liters?: true
    earnedPoints?: true
  }

  export type WateringLogMinAggregateInputType = {
    id?: true
    treeId?: true
    userName?: true
    liters?: true
    earnedPoints?: true
    photoProof?: true
    photoVerified?: true
    loggedAt?: true
  }

  export type WateringLogMaxAggregateInputType = {
    id?: true
    treeId?: true
    userName?: true
    liters?: true
    earnedPoints?: true
    photoProof?: true
    photoVerified?: true
    loggedAt?: true
  }

  export type WateringLogCountAggregateInputType = {
    id?: true
    treeId?: true
    userName?: true
    liters?: true
    earnedPoints?: true
    photoProof?: true
    photoVerified?: true
    loggedAt?: true
    _all?: true
  }

  export type WateringLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WateringLog to aggregate.
     */
    where?: WateringLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WateringLogs to fetch.
     */
    orderBy?: WateringLogOrderByWithRelationInput | WateringLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WateringLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WateringLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WateringLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WateringLogs
    **/
    _count?: true | WateringLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WateringLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WateringLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WateringLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WateringLogMaxAggregateInputType
  }

  export type GetWateringLogAggregateType<T extends WateringLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWateringLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWateringLog[P]>
      : GetScalarType<T[P], AggregateWateringLog[P]>
  }




  export type WateringLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WateringLogWhereInput
    orderBy?: WateringLogOrderByWithAggregationInput | WateringLogOrderByWithAggregationInput[]
    by: WateringLogScalarFieldEnum[] | WateringLogScalarFieldEnum
    having?: WateringLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WateringLogCountAggregateInputType | true
    _avg?: WateringLogAvgAggregateInputType
    _sum?: WateringLogSumAggregateInputType
    _min?: WateringLogMinAggregateInputType
    _max?: WateringLogMaxAggregateInputType
  }

  export type WateringLogGroupByOutputType = {
    id: string
    treeId: string
    userName: string
    liters: number
    earnedPoints: number
    photoProof: string | null
    photoVerified: boolean
    loggedAt: Date
    _count: WateringLogCountAggregateOutputType | null
    _avg: WateringLogAvgAggregateOutputType | null
    _sum: WateringLogSumAggregateOutputType | null
    _min: WateringLogMinAggregateOutputType | null
    _max: WateringLogMaxAggregateOutputType | null
  }

  type GetWateringLogGroupByPayload<T extends WateringLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WateringLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WateringLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WateringLogGroupByOutputType[P]>
            : GetScalarType<T[P], WateringLogGroupByOutputType[P]>
        }
      >
    >


  export type WateringLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    treeId?: boolean
    userName?: boolean
    liters?: boolean
    earnedPoints?: boolean
    photoProof?: boolean
    photoVerified?: boolean
    loggedAt?: boolean
    tree?: boolean | TreeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wateringLog"]>

  export type WateringLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    treeId?: boolean
    userName?: boolean
    liters?: boolean
    earnedPoints?: boolean
    photoProof?: boolean
    photoVerified?: boolean
    loggedAt?: boolean
    tree?: boolean | TreeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wateringLog"]>

  export type WateringLogSelectScalar = {
    id?: boolean
    treeId?: boolean
    userName?: boolean
    liters?: boolean
    earnedPoints?: boolean
    photoProof?: boolean
    photoVerified?: boolean
    loggedAt?: boolean
  }

  export type WateringLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tree?: boolean | TreeDefaultArgs<ExtArgs>
  }
  export type WateringLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tree?: boolean | TreeDefaultArgs<ExtArgs>
  }

  export type $WateringLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WateringLog"
    objects: {
      tree: Prisma.$TreePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      treeId: string
      userName: string
      liters: number
      earnedPoints: number
      photoProof: string | null
      photoVerified: boolean
      loggedAt: Date
    }, ExtArgs["result"]["wateringLog"]>
    composites: {}
  }

  type WateringLogGetPayload<S extends boolean | null | undefined | WateringLogDefaultArgs> = $Result.GetResult<Prisma.$WateringLogPayload, S>

  type WateringLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WateringLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WateringLogCountAggregateInputType | true
    }

  export interface WateringLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WateringLog'], meta: { name: 'WateringLog' } }
    /**
     * Find zero or one WateringLog that matches the filter.
     * @param {WateringLogFindUniqueArgs} args - Arguments to find a WateringLog
     * @example
     * // Get one WateringLog
     * const wateringLog = await prisma.wateringLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WateringLogFindUniqueArgs>(args: SelectSubset<T, WateringLogFindUniqueArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WateringLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WateringLogFindUniqueOrThrowArgs} args - Arguments to find a WateringLog
     * @example
     * // Get one WateringLog
     * const wateringLog = await prisma.wateringLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WateringLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WateringLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WateringLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogFindFirstArgs} args - Arguments to find a WateringLog
     * @example
     * // Get one WateringLog
     * const wateringLog = await prisma.wateringLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WateringLogFindFirstArgs>(args?: SelectSubset<T, WateringLogFindFirstArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WateringLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogFindFirstOrThrowArgs} args - Arguments to find a WateringLog
     * @example
     * // Get one WateringLog
     * const wateringLog = await prisma.wateringLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WateringLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WateringLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WateringLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WateringLogs
     * const wateringLogs = await prisma.wateringLog.findMany()
     * 
     * // Get first 10 WateringLogs
     * const wateringLogs = await prisma.wateringLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wateringLogWithIdOnly = await prisma.wateringLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WateringLogFindManyArgs>(args?: SelectSubset<T, WateringLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WateringLog.
     * @param {WateringLogCreateArgs} args - Arguments to create a WateringLog.
     * @example
     * // Create one WateringLog
     * const WateringLog = await prisma.wateringLog.create({
     *   data: {
     *     // ... data to create a WateringLog
     *   }
     * })
     * 
     */
    create<T extends WateringLogCreateArgs>(args: SelectSubset<T, WateringLogCreateArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WateringLogs.
     * @param {WateringLogCreateManyArgs} args - Arguments to create many WateringLogs.
     * @example
     * // Create many WateringLogs
     * const wateringLog = await prisma.wateringLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WateringLogCreateManyArgs>(args?: SelectSubset<T, WateringLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WateringLogs and returns the data saved in the database.
     * @param {WateringLogCreateManyAndReturnArgs} args - Arguments to create many WateringLogs.
     * @example
     * // Create many WateringLogs
     * const wateringLog = await prisma.wateringLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WateringLogs and only return the `id`
     * const wateringLogWithIdOnly = await prisma.wateringLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WateringLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WateringLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WateringLog.
     * @param {WateringLogDeleteArgs} args - Arguments to delete one WateringLog.
     * @example
     * // Delete one WateringLog
     * const WateringLog = await prisma.wateringLog.delete({
     *   where: {
     *     // ... filter to delete one WateringLog
     *   }
     * })
     * 
     */
    delete<T extends WateringLogDeleteArgs>(args: SelectSubset<T, WateringLogDeleteArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WateringLog.
     * @param {WateringLogUpdateArgs} args - Arguments to update one WateringLog.
     * @example
     * // Update one WateringLog
     * const wateringLog = await prisma.wateringLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WateringLogUpdateArgs>(args: SelectSubset<T, WateringLogUpdateArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WateringLogs.
     * @param {WateringLogDeleteManyArgs} args - Arguments to filter WateringLogs to delete.
     * @example
     * // Delete a few WateringLogs
     * const { count } = await prisma.wateringLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WateringLogDeleteManyArgs>(args?: SelectSubset<T, WateringLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WateringLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WateringLogs
     * const wateringLog = await prisma.wateringLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WateringLogUpdateManyArgs>(args: SelectSubset<T, WateringLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WateringLog.
     * @param {WateringLogUpsertArgs} args - Arguments to update or create a WateringLog.
     * @example
     * // Update or create a WateringLog
     * const wateringLog = await prisma.wateringLog.upsert({
     *   create: {
     *     // ... data to create a WateringLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WateringLog we want to update
     *   }
     * })
     */
    upsert<T extends WateringLogUpsertArgs>(args: SelectSubset<T, WateringLogUpsertArgs<ExtArgs>>): Prisma__WateringLogClient<$Result.GetResult<Prisma.$WateringLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WateringLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogCountArgs} args - Arguments to filter WateringLogs to count.
     * @example
     * // Count the number of WateringLogs
     * const count = await prisma.wateringLog.count({
     *   where: {
     *     // ... the filter for the WateringLogs we want to count
     *   }
     * })
    **/
    count<T extends WateringLogCountArgs>(
      args?: Subset<T, WateringLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WateringLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WateringLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WateringLogAggregateArgs>(args: Subset<T, WateringLogAggregateArgs>): Prisma.PrismaPromise<GetWateringLogAggregateType<T>>

    /**
     * Group by WateringLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WateringLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WateringLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WateringLogGroupByArgs['orderBy'] }
        : { orderBy?: WateringLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WateringLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWateringLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WateringLog model
   */
  readonly fields: WateringLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WateringLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WateringLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tree<T extends TreeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreeDefaultArgs<ExtArgs>>): Prisma__TreeClient<$Result.GetResult<Prisma.$TreePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WateringLog model
   */ 
  interface WateringLogFieldRefs {
    readonly id: FieldRef<"WateringLog", 'String'>
    readonly treeId: FieldRef<"WateringLog", 'String'>
    readonly userName: FieldRef<"WateringLog", 'String'>
    readonly liters: FieldRef<"WateringLog", 'Int'>
    readonly earnedPoints: FieldRef<"WateringLog", 'Int'>
    readonly photoProof: FieldRef<"WateringLog", 'String'>
    readonly photoVerified: FieldRef<"WateringLog", 'Boolean'>
    readonly loggedAt: FieldRef<"WateringLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WateringLog findUnique
   */
  export type WateringLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter, which WateringLog to fetch.
     */
    where: WateringLogWhereUniqueInput
  }

  /**
   * WateringLog findUniqueOrThrow
   */
  export type WateringLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter, which WateringLog to fetch.
     */
    where: WateringLogWhereUniqueInput
  }

  /**
   * WateringLog findFirst
   */
  export type WateringLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter, which WateringLog to fetch.
     */
    where?: WateringLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WateringLogs to fetch.
     */
    orderBy?: WateringLogOrderByWithRelationInput | WateringLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WateringLogs.
     */
    cursor?: WateringLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WateringLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WateringLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WateringLogs.
     */
    distinct?: WateringLogScalarFieldEnum | WateringLogScalarFieldEnum[]
  }

  /**
   * WateringLog findFirstOrThrow
   */
  export type WateringLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter, which WateringLog to fetch.
     */
    where?: WateringLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WateringLogs to fetch.
     */
    orderBy?: WateringLogOrderByWithRelationInput | WateringLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WateringLogs.
     */
    cursor?: WateringLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WateringLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WateringLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WateringLogs.
     */
    distinct?: WateringLogScalarFieldEnum | WateringLogScalarFieldEnum[]
  }

  /**
   * WateringLog findMany
   */
  export type WateringLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter, which WateringLogs to fetch.
     */
    where?: WateringLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WateringLogs to fetch.
     */
    orderBy?: WateringLogOrderByWithRelationInput | WateringLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WateringLogs.
     */
    cursor?: WateringLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WateringLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WateringLogs.
     */
    skip?: number
    distinct?: WateringLogScalarFieldEnum | WateringLogScalarFieldEnum[]
  }

  /**
   * WateringLog create
   */
  export type WateringLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WateringLog.
     */
    data: XOR<WateringLogCreateInput, WateringLogUncheckedCreateInput>
  }

  /**
   * WateringLog createMany
   */
  export type WateringLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WateringLogs.
     */
    data: WateringLogCreateManyInput | WateringLogCreateManyInput[]
  }

  /**
   * WateringLog createManyAndReturn
   */
  export type WateringLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WateringLogs.
     */
    data: WateringLogCreateManyInput | WateringLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WateringLog update
   */
  export type WateringLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WateringLog.
     */
    data: XOR<WateringLogUpdateInput, WateringLogUncheckedUpdateInput>
    /**
     * Choose, which WateringLog to update.
     */
    where: WateringLogWhereUniqueInput
  }

  /**
   * WateringLog updateMany
   */
  export type WateringLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WateringLogs.
     */
    data: XOR<WateringLogUpdateManyMutationInput, WateringLogUncheckedUpdateManyInput>
    /**
     * Filter which WateringLogs to update
     */
    where?: WateringLogWhereInput
  }

  /**
   * WateringLog upsert
   */
  export type WateringLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WateringLog to update in case it exists.
     */
    where: WateringLogWhereUniqueInput
    /**
     * In case the WateringLog found by the `where` argument doesn't exist, create a new WateringLog with this data.
     */
    create: XOR<WateringLogCreateInput, WateringLogUncheckedCreateInput>
    /**
     * In case the WateringLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WateringLogUpdateInput, WateringLogUncheckedUpdateInput>
  }

  /**
   * WateringLog delete
   */
  export type WateringLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
    /**
     * Filter which WateringLog to delete.
     */
    where: WateringLogWhereUniqueInput
  }

  /**
   * WateringLog deleteMany
   */
  export type WateringLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WateringLogs to delete
     */
    where?: WateringLogWhereInput
  }

  /**
   * WateringLog without action
   */
  export type WateringLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WateringLog
     */
    select?: WateringLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WateringLogInclude<ExtArgs> | null
  }


  /**
   * Model CareAlert
   */

  export type AggregateCareAlert = {
    _count: CareAlertCountAggregateOutputType | null
    _min: CareAlertMinAggregateOutputType | null
    _max: CareAlertMaxAggregateOutputType | null
  }

  export type CareAlertMinAggregateOutputType = {
    id: string | null
    neighborhood: string | null
    alertType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
  }

  export type CareAlertMaxAggregateOutputType = {
    id: string | null
    neighborhood: string | null
    alertType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
  }

  export type CareAlertCountAggregateOutputType = {
    id: number
    neighborhood: number
    alertType: number
    message: number
    status: number
    createdAt: number
    _all: number
  }


  export type CareAlertMinAggregateInputType = {
    id?: true
    neighborhood?: true
    alertType?: true
    message?: true
    status?: true
    createdAt?: true
  }

  export type CareAlertMaxAggregateInputType = {
    id?: true
    neighborhood?: true
    alertType?: true
    message?: true
    status?: true
    createdAt?: true
  }

  export type CareAlertCountAggregateInputType = {
    id?: true
    neighborhood?: true
    alertType?: true
    message?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type CareAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareAlert to aggregate.
     */
    where?: CareAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareAlerts to fetch.
     */
    orderBy?: CareAlertOrderByWithRelationInput | CareAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareAlerts
    **/
    _count?: true | CareAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareAlertMaxAggregateInputType
  }

  export type GetCareAlertAggregateType<T extends CareAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateCareAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareAlert[P]>
      : GetScalarType<T[P], AggregateCareAlert[P]>
  }




  export type CareAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareAlertWhereInput
    orderBy?: CareAlertOrderByWithAggregationInput | CareAlertOrderByWithAggregationInput[]
    by: CareAlertScalarFieldEnum[] | CareAlertScalarFieldEnum
    having?: CareAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareAlertCountAggregateInputType | true
    _min?: CareAlertMinAggregateInputType
    _max?: CareAlertMaxAggregateInputType
  }

  export type CareAlertGroupByOutputType = {
    id: string
    neighborhood: string
    alertType: string
    message: string
    status: string
    createdAt: Date
    _count: CareAlertCountAggregateOutputType | null
    _min: CareAlertMinAggregateOutputType | null
    _max: CareAlertMaxAggregateOutputType | null
  }

  type GetCareAlertGroupByPayload<T extends CareAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareAlertGroupByOutputType[P]>
            : GetScalarType<T[P], CareAlertGroupByOutputType[P]>
        }
      >
    >


  export type CareAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    neighborhood?: boolean
    alertType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["careAlert"]>

  export type CareAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    neighborhood?: boolean
    alertType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["careAlert"]>

  export type CareAlertSelectScalar = {
    id?: boolean
    neighborhood?: boolean
    alertType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
  }


  export type $CareAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareAlert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      neighborhood: string
      alertType: string
      message: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["careAlert"]>
    composites: {}
  }

  type CareAlertGetPayload<S extends boolean | null | undefined | CareAlertDefaultArgs> = $Result.GetResult<Prisma.$CareAlertPayload, S>

  type CareAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareAlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareAlertCountAggregateInputType | true
    }

  export interface CareAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareAlert'], meta: { name: 'CareAlert' } }
    /**
     * Find zero or one CareAlert that matches the filter.
     * @param {CareAlertFindUniqueArgs} args - Arguments to find a CareAlert
     * @example
     * // Get one CareAlert
     * const careAlert = await prisma.careAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareAlertFindUniqueArgs>(args: SelectSubset<T, CareAlertFindUniqueArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareAlert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareAlertFindUniqueOrThrowArgs} args - Arguments to find a CareAlert
     * @example
     * // Get one CareAlert
     * const careAlert = await prisma.careAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, CareAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertFindFirstArgs} args - Arguments to find a CareAlert
     * @example
     * // Get one CareAlert
     * const careAlert = await prisma.careAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareAlertFindFirstArgs>(args?: SelectSubset<T, CareAlertFindFirstArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertFindFirstOrThrowArgs} args - Arguments to find a CareAlert
     * @example
     * // Get one CareAlert
     * const careAlert = await prisma.careAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, CareAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareAlerts
     * const careAlerts = await prisma.careAlert.findMany()
     * 
     * // Get first 10 CareAlerts
     * const careAlerts = await prisma.careAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careAlertWithIdOnly = await prisma.careAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareAlertFindManyArgs>(args?: SelectSubset<T, CareAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareAlert.
     * @param {CareAlertCreateArgs} args - Arguments to create a CareAlert.
     * @example
     * // Create one CareAlert
     * const CareAlert = await prisma.careAlert.create({
     *   data: {
     *     // ... data to create a CareAlert
     *   }
     * })
     * 
     */
    create<T extends CareAlertCreateArgs>(args: SelectSubset<T, CareAlertCreateArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareAlerts.
     * @param {CareAlertCreateManyArgs} args - Arguments to create many CareAlerts.
     * @example
     * // Create many CareAlerts
     * const careAlert = await prisma.careAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareAlertCreateManyArgs>(args?: SelectSubset<T, CareAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareAlerts and returns the data saved in the database.
     * @param {CareAlertCreateManyAndReturnArgs} args - Arguments to create many CareAlerts.
     * @example
     * // Create many CareAlerts
     * const careAlert = await prisma.careAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareAlerts and only return the `id`
     * const careAlertWithIdOnly = await prisma.careAlert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, CareAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CareAlert.
     * @param {CareAlertDeleteArgs} args - Arguments to delete one CareAlert.
     * @example
     * // Delete one CareAlert
     * const CareAlert = await prisma.careAlert.delete({
     *   where: {
     *     // ... filter to delete one CareAlert
     *   }
     * })
     * 
     */
    delete<T extends CareAlertDeleteArgs>(args: SelectSubset<T, CareAlertDeleteArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareAlert.
     * @param {CareAlertUpdateArgs} args - Arguments to update one CareAlert.
     * @example
     * // Update one CareAlert
     * const careAlert = await prisma.careAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareAlertUpdateArgs>(args: SelectSubset<T, CareAlertUpdateArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareAlerts.
     * @param {CareAlertDeleteManyArgs} args - Arguments to filter CareAlerts to delete.
     * @example
     * // Delete a few CareAlerts
     * const { count } = await prisma.careAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareAlertDeleteManyArgs>(args?: SelectSubset<T, CareAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareAlerts
     * const careAlert = await prisma.careAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareAlertUpdateManyArgs>(args: SelectSubset<T, CareAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareAlert.
     * @param {CareAlertUpsertArgs} args - Arguments to update or create a CareAlert.
     * @example
     * // Update or create a CareAlert
     * const careAlert = await prisma.careAlert.upsert({
     *   create: {
     *     // ... data to create a CareAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareAlert we want to update
     *   }
     * })
     */
    upsert<T extends CareAlertUpsertArgs>(args: SelectSubset<T, CareAlertUpsertArgs<ExtArgs>>): Prisma__CareAlertClient<$Result.GetResult<Prisma.$CareAlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertCountArgs} args - Arguments to filter CareAlerts to count.
     * @example
     * // Count the number of CareAlerts
     * const count = await prisma.careAlert.count({
     *   where: {
     *     // ... the filter for the CareAlerts we want to count
     *   }
     * })
    **/
    count<T extends CareAlertCountArgs>(
      args?: Subset<T, CareAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareAlertAggregateArgs>(args: Subset<T, CareAlertAggregateArgs>): Prisma.PrismaPromise<GetCareAlertAggregateType<T>>

    /**
     * Group by CareAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareAlertGroupByArgs['orderBy'] }
        : { orderBy?: CareAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareAlert model
   */
  readonly fields: CareAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareAlert model
   */ 
  interface CareAlertFieldRefs {
    readonly id: FieldRef<"CareAlert", 'String'>
    readonly neighborhood: FieldRef<"CareAlert", 'String'>
    readonly alertType: FieldRef<"CareAlert", 'String'>
    readonly message: FieldRef<"CareAlert", 'String'>
    readonly status: FieldRef<"CareAlert", 'String'>
    readonly createdAt: FieldRef<"CareAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareAlert findUnique
   */
  export type CareAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter, which CareAlert to fetch.
     */
    where: CareAlertWhereUniqueInput
  }

  /**
   * CareAlert findUniqueOrThrow
   */
  export type CareAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter, which CareAlert to fetch.
     */
    where: CareAlertWhereUniqueInput
  }

  /**
   * CareAlert findFirst
   */
  export type CareAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter, which CareAlert to fetch.
     */
    where?: CareAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareAlerts to fetch.
     */
    orderBy?: CareAlertOrderByWithRelationInput | CareAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareAlerts.
     */
    cursor?: CareAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareAlerts.
     */
    distinct?: CareAlertScalarFieldEnum | CareAlertScalarFieldEnum[]
  }

  /**
   * CareAlert findFirstOrThrow
   */
  export type CareAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter, which CareAlert to fetch.
     */
    where?: CareAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareAlerts to fetch.
     */
    orderBy?: CareAlertOrderByWithRelationInput | CareAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareAlerts.
     */
    cursor?: CareAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareAlerts.
     */
    distinct?: CareAlertScalarFieldEnum | CareAlertScalarFieldEnum[]
  }

  /**
   * CareAlert findMany
   */
  export type CareAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter, which CareAlerts to fetch.
     */
    where?: CareAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareAlerts to fetch.
     */
    orderBy?: CareAlertOrderByWithRelationInput | CareAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareAlerts.
     */
    cursor?: CareAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareAlerts.
     */
    skip?: number
    distinct?: CareAlertScalarFieldEnum | CareAlertScalarFieldEnum[]
  }

  /**
   * CareAlert create
   */
  export type CareAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * The data needed to create a CareAlert.
     */
    data: XOR<CareAlertCreateInput, CareAlertUncheckedCreateInput>
  }

  /**
   * CareAlert createMany
   */
  export type CareAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareAlerts.
     */
    data: CareAlertCreateManyInput | CareAlertCreateManyInput[]
  }

  /**
   * CareAlert createManyAndReturn
   */
  export type CareAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CareAlerts.
     */
    data: CareAlertCreateManyInput | CareAlertCreateManyInput[]
  }

  /**
   * CareAlert update
   */
  export type CareAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * The data needed to update a CareAlert.
     */
    data: XOR<CareAlertUpdateInput, CareAlertUncheckedUpdateInput>
    /**
     * Choose, which CareAlert to update.
     */
    where: CareAlertWhereUniqueInput
  }

  /**
   * CareAlert updateMany
   */
  export type CareAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareAlerts.
     */
    data: XOR<CareAlertUpdateManyMutationInput, CareAlertUncheckedUpdateManyInput>
    /**
     * Filter which CareAlerts to update
     */
    where?: CareAlertWhereInput
  }

  /**
   * CareAlert upsert
   */
  export type CareAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * The filter to search for the CareAlert to update in case it exists.
     */
    where: CareAlertWhereUniqueInput
    /**
     * In case the CareAlert found by the `where` argument doesn't exist, create a new CareAlert with this data.
     */
    create: XOR<CareAlertCreateInput, CareAlertUncheckedCreateInput>
    /**
     * In case the CareAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareAlertUpdateInput, CareAlertUncheckedUpdateInput>
  }

  /**
   * CareAlert delete
   */
  export type CareAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
    /**
     * Filter which CareAlert to delete.
     */
    where: CareAlertWhereUniqueInput
  }

  /**
   * CareAlert deleteMany
   */
  export type CareAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareAlerts to delete
     */
    where?: CareAlertWhereInput
  }

  /**
   * CareAlert without action
   */
  export type CareAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareAlert
     */
    select?: CareAlertSelect<ExtArgs> | null
  }


  /**
   * Model NeighborhoodStats
   */

  export type AggregateNeighborhoodStats = {
    _count: NeighborhoodStatsCountAggregateOutputType | null
    _avg: NeighborhoodStatsAvgAggregateOutputType | null
    _sum: NeighborhoodStatsSumAggregateOutputType | null
    _min: NeighborhoodStatsMinAggregateOutputType | null
    _max: NeighborhoodStatsMaxAggregateOutputType | null
  }

  export type NeighborhoodStatsAvgAggregateOutputType = {
    totalTrees: number | null
    adoptedTrees: number | null
    wateringsCount: number | null
    ecoPoints: number | null
  }

  export type NeighborhoodStatsSumAggregateOutputType = {
    totalTrees: number | null
    adoptedTrees: number | null
    wateringsCount: number | null
    ecoPoints: number | null
  }

  export type NeighborhoodStatsMinAggregateOutputType = {
    id: string | null
    neighborhood: string | null
    totalTrees: number | null
    adoptedTrees: number | null
    wateringsCount: number | null
    ecoPoints: number | null
    updatedAt: Date | null
  }

  export type NeighborhoodStatsMaxAggregateOutputType = {
    id: string | null
    neighborhood: string | null
    totalTrees: number | null
    adoptedTrees: number | null
    wateringsCount: number | null
    ecoPoints: number | null
    updatedAt: Date | null
  }

  export type NeighborhoodStatsCountAggregateOutputType = {
    id: number
    neighborhood: number
    totalTrees: number
    adoptedTrees: number
    wateringsCount: number
    ecoPoints: number
    updatedAt: number
    _all: number
  }


  export type NeighborhoodStatsAvgAggregateInputType = {
    totalTrees?: true
    adoptedTrees?: true
    wateringsCount?: true
    ecoPoints?: true
  }

  export type NeighborhoodStatsSumAggregateInputType = {
    totalTrees?: true
    adoptedTrees?: true
    wateringsCount?: true
    ecoPoints?: true
  }

  export type NeighborhoodStatsMinAggregateInputType = {
    id?: true
    neighborhood?: true
    totalTrees?: true
    adoptedTrees?: true
    wateringsCount?: true
    ecoPoints?: true
    updatedAt?: true
  }

  export type NeighborhoodStatsMaxAggregateInputType = {
    id?: true
    neighborhood?: true
    totalTrees?: true
    adoptedTrees?: true
    wateringsCount?: true
    ecoPoints?: true
    updatedAt?: true
  }

  export type NeighborhoodStatsCountAggregateInputType = {
    id?: true
    neighborhood?: true
    totalTrees?: true
    adoptedTrees?: true
    wateringsCount?: true
    ecoPoints?: true
    updatedAt?: true
    _all?: true
  }

  export type NeighborhoodStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NeighborhoodStats to aggregate.
     */
    where?: NeighborhoodStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeighborhoodStats to fetch.
     */
    orderBy?: NeighborhoodStatsOrderByWithRelationInput | NeighborhoodStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NeighborhoodStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeighborhoodStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeighborhoodStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NeighborhoodStats
    **/
    _count?: true | NeighborhoodStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NeighborhoodStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NeighborhoodStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NeighborhoodStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NeighborhoodStatsMaxAggregateInputType
  }

  export type GetNeighborhoodStatsAggregateType<T extends NeighborhoodStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateNeighborhoodStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNeighborhoodStats[P]>
      : GetScalarType<T[P], AggregateNeighborhoodStats[P]>
  }




  export type NeighborhoodStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NeighborhoodStatsWhereInput
    orderBy?: NeighborhoodStatsOrderByWithAggregationInput | NeighborhoodStatsOrderByWithAggregationInput[]
    by: NeighborhoodStatsScalarFieldEnum[] | NeighborhoodStatsScalarFieldEnum
    having?: NeighborhoodStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NeighborhoodStatsCountAggregateInputType | true
    _avg?: NeighborhoodStatsAvgAggregateInputType
    _sum?: NeighborhoodStatsSumAggregateInputType
    _min?: NeighborhoodStatsMinAggregateInputType
    _max?: NeighborhoodStatsMaxAggregateInputType
  }

  export type NeighborhoodStatsGroupByOutputType = {
    id: string
    neighborhood: string
    totalTrees: number
    adoptedTrees: number
    wateringsCount: number
    ecoPoints: number
    updatedAt: Date
    _count: NeighborhoodStatsCountAggregateOutputType | null
    _avg: NeighborhoodStatsAvgAggregateOutputType | null
    _sum: NeighborhoodStatsSumAggregateOutputType | null
    _min: NeighborhoodStatsMinAggregateOutputType | null
    _max: NeighborhoodStatsMaxAggregateOutputType | null
  }

  type GetNeighborhoodStatsGroupByPayload<T extends NeighborhoodStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NeighborhoodStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NeighborhoodStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NeighborhoodStatsGroupByOutputType[P]>
            : GetScalarType<T[P], NeighborhoodStatsGroupByOutputType[P]>
        }
      >
    >


  export type NeighborhoodStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    neighborhood?: boolean
    totalTrees?: boolean
    adoptedTrees?: boolean
    wateringsCount?: boolean
    ecoPoints?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["neighborhoodStats"]>

  export type NeighborhoodStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    neighborhood?: boolean
    totalTrees?: boolean
    adoptedTrees?: boolean
    wateringsCount?: boolean
    ecoPoints?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["neighborhoodStats"]>

  export type NeighborhoodStatsSelectScalar = {
    id?: boolean
    neighborhood?: boolean
    totalTrees?: boolean
    adoptedTrees?: boolean
    wateringsCount?: boolean
    ecoPoints?: boolean
    updatedAt?: boolean
  }


  export type $NeighborhoodStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NeighborhoodStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      neighborhood: string
      totalTrees: number
      adoptedTrees: number
      wateringsCount: number
      ecoPoints: number
      updatedAt: Date
    }, ExtArgs["result"]["neighborhoodStats"]>
    composites: {}
  }

  type NeighborhoodStatsGetPayload<S extends boolean | null | undefined | NeighborhoodStatsDefaultArgs> = $Result.GetResult<Prisma.$NeighborhoodStatsPayload, S>

  type NeighborhoodStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NeighborhoodStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NeighborhoodStatsCountAggregateInputType | true
    }

  export interface NeighborhoodStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NeighborhoodStats'], meta: { name: 'NeighborhoodStats' } }
    /**
     * Find zero or one NeighborhoodStats that matches the filter.
     * @param {NeighborhoodStatsFindUniqueArgs} args - Arguments to find a NeighborhoodStats
     * @example
     * // Get one NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NeighborhoodStatsFindUniqueArgs>(args: SelectSubset<T, NeighborhoodStatsFindUniqueArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NeighborhoodStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NeighborhoodStatsFindUniqueOrThrowArgs} args - Arguments to find a NeighborhoodStats
     * @example
     * // Get one NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NeighborhoodStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, NeighborhoodStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NeighborhoodStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsFindFirstArgs} args - Arguments to find a NeighborhoodStats
     * @example
     * // Get one NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NeighborhoodStatsFindFirstArgs>(args?: SelectSubset<T, NeighborhoodStatsFindFirstArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NeighborhoodStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsFindFirstOrThrowArgs} args - Arguments to find a NeighborhoodStats
     * @example
     * // Get one NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NeighborhoodStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, NeighborhoodStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NeighborhoodStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findMany()
     * 
     * // Get first 10 NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const neighborhoodStatsWithIdOnly = await prisma.neighborhoodStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NeighborhoodStatsFindManyArgs>(args?: SelectSubset<T, NeighborhoodStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NeighborhoodStats.
     * @param {NeighborhoodStatsCreateArgs} args - Arguments to create a NeighborhoodStats.
     * @example
     * // Create one NeighborhoodStats
     * const NeighborhoodStats = await prisma.neighborhoodStats.create({
     *   data: {
     *     // ... data to create a NeighborhoodStats
     *   }
     * })
     * 
     */
    create<T extends NeighborhoodStatsCreateArgs>(args: SelectSubset<T, NeighborhoodStatsCreateArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NeighborhoodStats.
     * @param {NeighborhoodStatsCreateManyArgs} args - Arguments to create many NeighborhoodStats.
     * @example
     * // Create many NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NeighborhoodStatsCreateManyArgs>(args?: SelectSubset<T, NeighborhoodStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NeighborhoodStats and returns the data saved in the database.
     * @param {NeighborhoodStatsCreateManyAndReturnArgs} args - Arguments to create many NeighborhoodStats.
     * @example
     * // Create many NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NeighborhoodStats and only return the `id`
     * const neighborhoodStatsWithIdOnly = await prisma.neighborhoodStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NeighborhoodStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, NeighborhoodStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NeighborhoodStats.
     * @param {NeighborhoodStatsDeleteArgs} args - Arguments to delete one NeighborhoodStats.
     * @example
     * // Delete one NeighborhoodStats
     * const NeighborhoodStats = await prisma.neighborhoodStats.delete({
     *   where: {
     *     // ... filter to delete one NeighborhoodStats
     *   }
     * })
     * 
     */
    delete<T extends NeighborhoodStatsDeleteArgs>(args: SelectSubset<T, NeighborhoodStatsDeleteArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NeighborhoodStats.
     * @param {NeighborhoodStatsUpdateArgs} args - Arguments to update one NeighborhoodStats.
     * @example
     * // Update one NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NeighborhoodStatsUpdateArgs>(args: SelectSubset<T, NeighborhoodStatsUpdateArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NeighborhoodStats.
     * @param {NeighborhoodStatsDeleteManyArgs} args - Arguments to filter NeighborhoodStats to delete.
     * @example
     * // Delete a few NeighborhoodStats
     * const { count } = await prisma.neighborhoodStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NeighborhoodStatsDeleteManyArgs>(args?: SelectSubset<T, NeighborhoodStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NeighborhoodStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NeighborhoodStatsUpdateManyArgs>(args: SelectSubset<T, NeighborhoodStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NeighborhoodStats.
     * @param {NeighborhoodStatsUpsertArgs} args - Arguments to update or create a NeighborhoodStats.
     * @example
     * // Update or create a NeighborhoodStats
     * const neighborhoodStats = await prisma.neighborhoodStats.upsert({
     *   create: {
     *     // ... data to create a NeighborhoodStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NeighborhoodStats we want to update
     *   }
     * })
     */
    upsert<T extends NeighborhoodStatsUpsertArgs>(args: SelectSubset<T, NeighborhoodStatsUpsertArgs<ExtArgs>>): Prisma__NeighborhoodStatsClient<$Result.GetResult<Prisma.$NeighborhoodStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NeighborhoodStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsCountArgs} args - Arguments to filter NeighborhoodStats to count.
     * @example
     * // Count the number of NeighborhoodStats
     * const count = await prisma.neighborhoodStats.count({
     *   where: {
     *     // ... the filter for the NeighborhoodStats we want to count
     *   }
     * })
    **/
    count<T extends NeighborhoodStatsCountArgs>(
      args?: Subset<T, NeighborhoodStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NeighborhoodStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NeighborhoodStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NeighborhoodStatsAggregateArgs>(args: Subset<T, NeighborhoodStatsAggregateArgs>): Prisma.PrismaPromise<GetNeighborhoodStatsAggregateType<T>>

    /**
     * Group by NeighborhoodStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NeighborhoodStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NeighborhoodStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NeighborhoodStatsGroupByArgs['orderBy'] }
        : { orderBy?: NeighborhoodStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NeighborhoodStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNeighborhoodStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NeighborhoodStats model
   */
  readonly fields: NeighborhoodStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NeighborhoodStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NeighborhoodStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NeighborhoodStats model
   */ 
  interface NeighborhoodStatsFieldRefs {
    readonly id: FieldRef<"NeighborhoodStats", 'String'>
    readonly neighborhood: FieldRef<"NeighborhoodStats", 'String'>
    readonly totalTrees: FieldRef<"NeighborhoodStats", 'Int'>
    readonly adoptedTrees: FieldRef<"NeighborhoodStats", 'Int'>
    readonly wateringsCount: FieldRef<"NeighborhoodStats", 'Int'>
    readonly ecoPoints: FieldRef<"NeighborhoodStats", 'Int'>
    readonly updatedAt: FieldRef<"NeighborhoodStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NeighborhoodStats findUnique
   */
  export type NeighborhoodStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter, which NeighborhoodStats to fetch.
     */
    where: NeighborhoodStatsWhereUniqueInput
  }

  /**
   * NeighborhoodStats findUniqueOrThrow
   */
  export type NeighborhoodStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter, which NeighborhoodStats to fetch.
     */
    where: NeighborhoodStatsWhereUniqueInput
  }

  /**
   * NeighborhoodStats findFirst
   */
  export type NeighborhoodStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter, which NeighborhoodStats to fetch.
     */
    where?: NeighborhoodStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeighborhoodStats to fetch.
     */
    orderBy?: NeighborhoodStatsOrderByWithRelationInput | NeighborhoodStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NeighborhoodStats.
     */
    cursor?: NeighborhoodStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeighborhoodStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeighborhoodStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NeighborhoodStats.
     */
    distinct?: NeighborhoodStatsScalarFieldEnum | NeighborhoodStatsScalarFieldEnum[]
  }

  /**
   * NeighborhoodStats findFirstOrThrow
   */
  export type NeighborhoodStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter, which NeighborhoodStats to fetch.
     */
    where?: NeighborhoodStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeighborhoodStats to fetch.
     */
    orderBy?: NeighborhoodStatsOrderByWithRelationInput | NeighborhoodStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NeighborhoodStats.
     */
    cursor?: NeighborhoodStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeighborhoodStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeighborhoodStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NeighborhoodStats.
     */
    distinct?: NeighborhoodStatsScalarFieldEnum | NeighborhoodStatsScalarFieldEnum[]
  }

  /**
   * NeighborhoodStats findMany
   */
  export type NeighborhoodStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter, which NeighborhoodStats to fetch.
     */
    where?: NeighborhoodStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NeighborhoodStats to fetch.
     */
    orderBy?: NeighborhoodStatsOrderByWithRelationInput | NeighborhoodStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NeighborhoodStats.
     */
    cursor?: NeighborhoodStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NeighborhoodStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NeighborhoodStats.
     */
    skip?: number
    distinct?: NeighborhoodStatsScalarFieldEnum | NeighborhoodStatsScalarFieldEnum[]
  }

  /**
   * NeighborhoodStats create
   */
  export type NeighborhoodStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * The data needed to create a NeighborhoodStats.
     */
    data: XOR<NeighborhoodStatsCreateInput, NeighborhoodStatsUncheckedCreateInput>
  }

  /**
   * NeighborhoodStats createMany
   */
  export type NeighborhoodStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NeighborhoodStats.
     */
    data: NeighborhoodStatsCreateManyInput | NeighborhoodStatsCreateManyInput[]
  }

  /**
   * NeighborhoodStats createManyAndReturn
   */
  export type NeighborhoodStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NeighborhoodStats.
     */
    data: NeighborhoodStatsCreateManyInput | NeighborhoodStatsCreateManyInput[]
  }

  /**
   * NeighborhoodStats update
   */
  export type NeighborhoodStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * The data needed to update a NeighborhoodStats.
     */
    data: XOR<NeighborhoodStatsUpdateInput, NeighborhoodStatsUncheckedUpdateInput>
    /**
     * Choose, which NeighborhoodStats to update.
     */
    where: NeighborhoodStatsWhereUniqueInput
  }

  /**
   * NeighborhoodStats updateMany
   */
  export type NeighborhoodStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NeighborhoodStats.
     */
    data: XOR<NeighborhoodStatsUpdateManyMutationInput, NeighborhoodStatsUncheckedUpdateManyInput>
    /**
     * Filter which NeighborhoodStats to update
     */
    where?: NeighborhoodStatsWhereInput
  }

  /**
   * NeighborhoodStats upsert
   */
  export type NeighborhoodStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * The filter to search for the NeighborhoodStats to update in case it exists.
     */
    where: NeighborhoodStatsWhereUniqueInput
    /**
     * In case the NeighborhoodStats found by the `where` argument doesn't exist, create a new NeighborhoodStats with this data.
     */
    create: XOR<NeighborhoodStatsCreateInput, NeighborhoodStatsUncheckedCreateInput>
    /**
     * In case the NeighborhoodStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NeighborhoodStatsUpdateInput, NeighborhoodStatsUncheckedUpdateInput>
  }

  /**
   * NeighborhoodStats delete
   */
  export type NeighborhoodStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
    /**
     * Filter which NeighborhoodStats to delete.
     */
    where: NeighborhoodStatsWhereUniqueInput
  }

  /**
   * NeighborhoodStats deleteMany
   */
  export type NeighborhoodStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NeighborhoodStats to delete
     */
    where?: NeighborhoodStatsWhereInput
  }

  /**
   * NeighborhoodStats without action
   */
  export type NeighborhoodStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NeighborhoodStats
     */
    select?: NeighborhoodStatsSelect<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ReportSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    userId: string | null
    issueType: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    photos: string | null
    status: string | null
    priority: string | null
    assignedToId: string | null
    trackingNumber: string | null
    adminNotes: string | null
    resolutionNotes: string | null
    rejectionReason: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    assignedAt: Date | null
    resolvedAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    issueType: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    photos: string | null
    status: string | null
    priority: string | null
    assignedToId: string | null
    trackingNumber: string | null
    adminNotes: string | null
    resolutionNotes: string | null
    rejectionReason: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    assignedAt: Date | null
    resolvedAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    userId: number
    issueType: number
    description: number
    latitude: number
    longitude: number
    address: number
    photos: number
    status: number
    priority: number
    assignedToId: number
    trackingNumber: number
    adminNotes: number
    resolutionNotes: number
    rejectionReason: number
    submittedAt: number
    reviewedAt: number
    assignedAt: number
    resolvedAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ReportSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    userId?: true
    issueType?: true
    description?: true
    latitude?: true
    longitude?: true
    address?: true
    photos?: true
    status?: true
    priority?: true
    assignedToId?: true
    trackingNumber?: true
    adminNotes?: true
    resolutionNotes?: true
    rejectionReason?: true
    submittedAt?: true
    reviewedAt?: true
    assignedAt?: true
    resolvedAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    userId?: true
    issueType?: true
    description?: true
    latitude?: true
    longitude?: true
    address?: true
    photos?: true
    status?: true
    priority?: true
    assignedToId?: true
    trackingNumber?: true
    adminNotes?: true
    resolutionNotes?: true
    rejectionReason?: true
    submittedAt?: true
    reviewedAt?: true
    assignedAt?: true
    resolvedAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    userId?: true
    issueType?: true
    description?: true
    latitude?: true
    longitude?: true
    address?: true
    photos?: true
    status?: true
    priority?: true
    assignedToId?: true
    trackingNumber?: true
    adminNotes?: true
    resolutionNotes?: true
    rejectionReason?: true
    submittedAt?: true
    reviewedAt?: true
    assignedAt?: true
    resolvedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos: string
    status: string
    priority: string
    assignedToId: string | null
    trackingNumber: string
    adminNotes: string | null
    resolutionNotes: string | null
    rejectionReason: string | null
    submittedAt: Date
    reviewedAt: Date | null
    assignedAt: Date | null
    resolvedAt: Date | null
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    issueType?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    photos?: boolean
    status?: boolean
    priority?: boolean
    assignedToId?: boolean
    trackingNumber?: boolean
    adminNotes?: boolean
    resolutionNotes?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Report$assignedToArgs<ExtArgs>
    assignments?: boolean | Report$assignmentsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    issueType?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    photos?: boolean
    status?: boolean
    priority?: boolean
    assignedToId?: boolean
    trackingNumber?: boolean
    adminNotes?: boolean
    resolutionNotes?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Report$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    userId?: boolean
    issueType?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    photos?: boolean
    status?: boolean
    priority?: boolean
    assignedToId?: boolean
    trackingNumber?: boolean
    adminNotes?: boolean
    resolutionNotes?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    assignedAt?: boolean
    resolvedAt?: boolean
    updatedAt?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Report$assignedToArgs<ExtArgs>
    assignments?: boolean | Report$assignmentsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedTo?: boolean | Report$assignedToArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      assignments: Prisma.$ReportAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      issueType: string
      description: string
      latitude: number
      longitude: number
      address: string
      photos: string
      status: string
      priority: string
      assignedToId: string | null
      trackingNumber: string
      adminNotes: string | null
      resolutionNotes: string | null
      rejectionReason: string | null
      submittedAt: Date
      reviewedAt: Date | null
      assignedAt: Date | null
      resolvedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    assignedTo<T extends Report$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, Report$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    assignments<T extends Report$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Report$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */ 
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly userId: FieldRef<"Report", 'String'>
    readonly issueType: FieldRef<"Report", 'String'>
    readonly description: FieldRef<"Report", 'String'>
    readonly latitude: FieldRef<"Report", 'Float'>
    readonly longitude: FieldRef<"Report", 'Float'>
    readonly address: FieldRef<"Report", 'String'>
    readonly photos: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'String'>
    readonly priority: FieldRef<"Report", 'String'>
    readonly assignedToId: FieldRef<"Report", 'String'>
    readonly trackingNumber: FieldRef<"Report", 'String'>
    readonly adminNotes: FieldRef<"Report", 'String'>
    readonly resolutionNotes: FieldRef<"Report", 'String'>
    readonly rejectionReason: FieldRef<"Report", 'String'>
    readonly submittedAt: FieldRef<"Report", 'DateTime'>
    readonly reviewedAt: FieldRef<"Report", 'DateTime'>
    readonly assignedAt: FieldRef<"Report", 'DateTime'>
    readonly resolvedAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }

  /**
   * Report.assignedTo
   */
  export type Report$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report.assignments
   */
  export type Report$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    where?: ReportAssignmentWhereInput
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    cursor?: ReportAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportAssignmentScalarFieldEnum | ReportAssignmentScalarFieldEnum[]
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model ReportAssignment
   */

  export type AggregateReportAssignment = {
    _count: ReportAssignmentCountAggregateOutputType | null
    _min: ReportAssignmentMinAggregateOutputType | null
    _max: ReportAssignmentMaxAggregateOutputType | null
  }

  export type ReportAssignmentMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    fieldWorkerId: string | null
    assignedAt: Date | null
    notes: string | null
    completedAt: Date | null
  }

  export type ReportAssignmentMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    fieldWorkerId: string | null
    assignedAt: Date | null
    notes: string | null
    completedAt: Date | null
  }

  export type ReportAssignmentCountAggregateOutputType = {
    id: number
    reportId: number
    fieldWorkerId: number
    assignedAt: number
    notes: number
    completedAt: number
    _all: number
  }


  export type ReportAssignmentMinAggregateInputType = {
    id?: true
    reportId?: true
    fieldWorkerId?: true
    assignedAt?: true
    notes?: true
    completedAt?: true
  }

  export type ReportAssignmentMaxAggregateInputType = {
    id?: true
    reportId?: true
    fieldWorkerId?: true
    assignedAt?: true
    notes?: true
    completedAt?: true
  }

  export type ReportAssignmentCountAggregateInputType = {
    id?: true
    reportId?: true
    fieldWorkerId?: true
    assignedAt?: true
    notes?: true
    completedAt?: true
    _all?: true
  }

  export type ReportAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportAssignment to aggregate.
     */
    where?: ReportAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportAssignments to fetch.
     */
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportAssignments
    **/
    _count?: true | ReportAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportAssignmentMaxAggregateInputType
  }

  export type GetReportAssignmentAggregateType<T extends ReportAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateReportAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportAssignment[P]>
      : GetScalarType<T[P], AggregateReportAssignment[P]>
  }




  export type ReportAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportAssignmentWhereInput
    orderBy?: ReportAssignmentOrderByWithAggregationInput | ReportAssignmentOrderByWithAggregationInput[]
    by: ReportAssignmentScalarFieldEnum[] | ReportAssignmentScalarFieldEnum
    having?: ReportAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportAssignmentCountAggregateInputType | true
    _min?: ReportAssignmentMinAggregateInputType
    _max?: ReportAssignmentMaxAggregateInputType
  }

  export type ReportAssignmentGroupByOutputType = {
    id: string
    reportId: string
    fieldWorkerId: string
    assignedAt: Date
    notes: string | null
    completedAt: Date | null
    _count: ReportAssignmentCountAggregateOutputType | null
    _min: ReportAssignmentMinAggregateOutputType | null
    _max: ReportAssignmentMaxAggregateOutputType | null
  }

  type GetReportAssignmentGroupByPayload<T extends ReportAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], ReportAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type ReportAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    fieldWorkerId?: boolean
    assignedAt?: boolean
    notes?: boolean
    completedAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    fieldWorker?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reportAssignment"]>

  export type ReportAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    fieldWorkerId?: boolean
    assignedAt?: boolean
    notes?: boolean
    completedAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    fieldWorker?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reportAssignment"]>

  export type ReportAssignmentSelectScalar = {
    id?: boolean
    reportId?: boolean
    fieldWorkerId?: boolean
    assignedAt?: boolean
    notes?: boolean
    completedAt?: boolean
  }

  export type ReportAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    fieldWorker?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReportAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    fieldWorker?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReportAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReportAssignment"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      fieldWorker: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      fieldWorkerId: string
      assignedAt: Date
      notes: string | null
      completedAt: Date | null
    }, ExtArgs["result"]["reportAssignment"]>
    composites: {}
  }

  type ReportAssignmentGetPayload<S extends boolean | null | undefined | ReportAssignmentDefaultArgs> = $Result.GetResult<Prisma.$ReportAssignmentPayload, S>

  type ReportAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportAssignmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportAssignmentCountAggregateInputType | true
    }

  export interface ReportAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportAssignment'], meta: { name: 'ReportAssignment' } }
    /**
     * Find zero or one ReportAssignment that matches the filter.
     * @param {ReportAssignmentFindUniqueArgs} args - Arguments to find a ReportAssignment
     * @example
     * // Get one ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportAssignmentFindUniqueArgs>(args: SelectSubset<T, ReportAssignmentFindUniqueArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReportAssignment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReportAssignmentFindUniqueOrThrowArgs} args - Arguments to find a ReportAssignment
     * @example
     * // Get one ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReportAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentFindFirstArgs} args - Arguments to find a ReportAssignment
     * @example
     * // Get one ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportAssignmentFindFirstArgs>(args?: SelectSubset<T, ReportAssignmentFindFirstArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReportAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentFindFirstOrThrowArgs} args - Arguments to find a ReportAssignment
     * @example
     * // Get one ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReportAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportAssignments
     * const reportAssignments = await prisma.reportAssignment.findMany()
     * 
     * // Get first 10 ReportAssignments
     * const reportAssignments = await prisma.reportAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportAssignmentWithIdOnly = await prisma.reportAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportAssignmentFindManyArgs>(args?: SelectSubset<T, ReportAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReportAssignment.
     * @param {ReportAssignmentCreateArgs} args - Arguments to create a ReportAssignment.
     * @example
     * // Create one ReportAssignment
     * const ReportAssignment = await prisma.reportAssignment.create({
     *   data: {
     *     // ... data to create a ReportAssignment
     *   }
     * })
     * 
     */
    create<T extends ReportAssignmentCreateArgs>(args: SelectSubset<T, ReportAssignmentCreateArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReportAssignments.
     * @param {ReportAssignmentCreateManyArgs} args - Arguments to create many ReportAssignments.
     * @example
     * // Create many ReportAssignments
     * const reportAssignment = await prisma.reportAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportAssignmentCreateManyArgs>(args?: SelectSubset<T, ReportAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReportAssignments and returns the data saved in the database.
     * @param {ReportAssignmentCreateManyAndReturnArgs} args - Arguments to create many ReportAssignments.
     * @example
     * // Create many ReportAssignments
     * const reportAssignment = await prisma.reportAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReportAssignments and only return the `id`
     * const reportAssignmentWithIdOnly = await prisma.reportAssignment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReportAssignment.
     * @param {ReportAssignmentDeleteArgs} args - Arguments to delete one ReportAssignment.
     * @example
     * // Delete one ReportAssignment
     * const ReportAssignment = await prisma.reportAssignment.delete({
     *   where: {
     *     // ... filter to delete one ReportAssignment
     *   }
     * })
     * 
     */
    delete<T extends ReportAssignmentDeleteArgs>(args: SelectSubset<T, ReportAssignmentDeleteArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReportAssignment.
     * @param {ReportAssignmentUpdateArgs} args - Arguments to update one ReportAssignment.
     * @example
     * // Update one ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportAssignmentUpdateArgs>(args: SelectSubset<T, ReportAssignmentUpdateArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReportAssignments.
     * @param {ReportAssignmentDeleteManyArgs} args - Arguments to filter ReportAssignments to delete.
     * @example
     * // Delete a few ReportAssignments
     * const { count } = await prisma.reportAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportAssignmentDeleteManyArgs>(args?: SelectSubset<T, ReportAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportAssignments
     * const reportAssignment = await prisma.reportAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportAssignmentUpdateManyArgs>(args: SelectSubset<T, ReportAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReportAssignment.
     * @param {ReportAssignmentUpsertArgs} args - Arguments to update or create a ReportAssignment.
     * @example
     * // Update or create a ReportAssignment
     * const reportAssignment = await prisma.reportAssignment.upsert({
     *   create: {
     *     // ... data to create a ReportAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportAssignment we want to update
     *   }
     * })
     */
    upsert<T extends ReportAssignmentUpsertArgs>(args: SelectSubset<T, ReportAssignmentUpsertArgs<ExtArgs>>): Prisma__ReportAssignmentClient<$Result.GetResult<Prisma.$ReportAssignmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReportAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentCountArgs} args - Arguments to filter ReportAssignments to count.
     * @example
     * // Count the number of ReportAssignments
     * const count = await prisma.reportAssignment.count({
     *   where: {
     *     // ... the filter for the ReportAssignments we want to count
     *   }
     * })
    **/
    count<T extends ReportAssignmentCountArgs>(
      args?: Subset<T, ReportAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAssignmentAggregateArgs>(args: Subset<T, ReportAssignmentAggregateArgs>): Prisma.PrismaPromise<GetReportAssignmentAggregateType<T>>

    /**
     * Group by ReportAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: ReportAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReportAssignment model
   */
  readonly fields: ReportAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fieldWorker<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReportAssignment model
   */ 
  interface ReportAssignmentFieldRefs {
    readonly id: FieldRef<"ReportAssignment", 'String'>
    readonly reportId: FieldRef<"ReportAssignment", 'String'>
    readonly fieldWorkerId: FieldRef<"ReportAssignment", 'String'>
    readonly assignedAt: FieldRef<"ReportAssignment", 'DateTime'>
    readonly notes: FieldRef<"ReportAssignment", 'String'>
    readonly completedAt: FieldRef<"ReportAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReportAssignment findUnique
   */
  export type ReportAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ReportAssignment to fetch.
     */
    where: ReportAssignmentWhereUniqueInput
  }

  /**
   * ReportAssignment findUniqueOrThrow
   */
  export type ReportAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ReportAssignment to fetch.
     */
    where: ReportAssignmentWhereUniqueInput
  }

  /**
   * ReportAssignment findFirst
   */
  export type ReportAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ReportAssignment to fetch.
     */
    where?: ReportAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportAssignments to fetch.
     */
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportAssignments.
     */
    cursor?: ReportAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportAssignments.
     */
    distinct?: ReportAssignmentScalarFieldEnum | ReportAssignmentScalarFieldEnum[]
  }

  /**
   * ReportAssignment findFirstOrThrow
   */
  export type ReportAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ReportAssignment to fetch.
     */
    where?: ReportAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportAssignments to fetch.
     */
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportAssignments.
     */
    cursor?: ReportAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportAssignments.
     */
    distinct?: ReportAssignmentScalarFieldEnum | ReportAssignmentScalarFieldEnum[]
  }

  /**
   * ReportAssignment findMany
   */
  export type ReportAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ReportAssignments to fetch.
     */
    where?: ReportAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportAssignments to fetch.
     */
    orderBy?: ReportAssignmentOrderByWithRelationInput | ReportAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportAssignments.
     */
    cursor?: ReportAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportAssignments.
     */
    skip?: number
    distinct?: ReportAssignmentScalarFieldEnum | ReportAssignmentScalarFieldEnum[]
  }

  /**
   * ReportAssignment create
   */
  export type ReportAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ReportAssignment.
     */
    data: XOR<ReportAssignmentCreateInput, ReportAssignmentUncheckedCreateInput>
  }

  /**
   * ReportAssignment createMany
   */
  export type ReportAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportAssignments.
     */
    data: ReportAssignmentCreateManyInput | ReportAssignmentCreateManyInput[]
  }

  /**
   * ReportAssignment createManyAndReturn
   */
  export type ReportAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReportAssignments.
     */
    data: ReportAssignmentCreateManyInput | ReportAssignmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReportAssignment update
   */
  export type ReportAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ReportAssignment.
     */
    data: XOR<ReportAssignmentUpdateInput, ReportAssignmentUncheckedUpdateInput>
    /**
     * Choose, which ReportAssignment to update.
     */
    where: ReportAssignmentWhereUniqueInput
  }

  /**
   * ReportAssignment updateMany
   */
  export type ReportAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportAssignments.
     */
    data: XOR<ReportAssignmentUpdateManyMutationInput, ReportAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ReportAssignments to update
     */
    where?: ReportAssignmentWhereInput
  }

  /**
   * ReportAssignment upsert
   */
  export type ReportAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ReportAssignment to update in case it exists.
     */
    where: ReportAssignmentWhereUniqueInput
    /**
     * In case the ReportAssignment found by the `where` argument doesn't exist, create a new ReportAssignment with this data.
     */
    create: XOR<ReportAssignmentCreateInput, ReportAssignmentUncheckedCreateInput>
    /**
     * In case the ReportAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportAssignmentUpdateInput, ReportAssignmentUncheckedUpdateInput>
  }

  /**
   * ReportAssignment delete
   */
  export type ReportAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
    /**
     * Filter which ReportAssignment to delete.
     */
    where: ReportAssignmentWhereUniqueInput
  }

  /**
   * ReportAssignment deleteMany
   */
  export type ReportAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportAssignments to delete
     */
    where?: ReportAssignmentWhereInput
  }

  /**
   * ReportAssignment without action
   */
  export type ReportAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportAssignment
     */
    select?: ReportAssignmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model PlantingCampaign
   */

  export type AggregatePlantingCampaign = {
    _count: PlantingCampaignCountAggregateOutputType | null
    _avg: PlantingCampaignAvgAggregateOutputType | null
    _sum: PlantingCampaignSumAggregateOutputType | null
    _min: PlantingCampaignMinAggregateOutputType | null
    _max: PlantingCampaignMaxAggregateOutputType | null
  }

  export type PlantingCampaignAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    numberOfTrees: number | null
    treesPlanted: number | null
    budget: number | null
  }

  export type PlantingCampaignSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    numberOfTrees: number | null
    treesPlanted: number | null
    budget: number | null
  }

  export type PlantingCampaignMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    locationDesc: string | null
    species: string | null
    numberOfTrees: number | null
    treesPlanted: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    budget: number | null
    responsibleId: string | null
    photos: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlantingCampaignMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    locationDesc: string | null
    species: string | null
    numberOfTrees: number | null
    treesPlanted: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    budget: number | null
    responsibleId: string | null
    photos: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlantingCampaignCountAggregateOutputType = {
    id: number
    name: number
    description: number
    latitude: number
    longitude: number
    locationDesc: number
    species: number
    numberOfTrees: number
    treesPlanted: number
    startDate: number
    endDate: number
    status: number
    budget: number
    responsibleId: number
    photos: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlantingCampaignAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    numberOfTrees?: true
    treesPlanted?: true
    budget?: true
  }

  export type PlantingCampaignSumAggregateInputType = {
    latitude?: true
    longitude?: true
    numberOfTrees?: true
    treesPlanted?: true
    budget?: true
  }

  export type PlantingCampaignMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    latitude?: true
    longitude?: true
    locationDesc?: true
    species?: true
    numberOfTrees?: true
    treesPlanted?: true
    startDate?: true
    endDate?: true
    status?: true
    budget?: true
    responsibleId?: true
    photos?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlantingCampaignMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    latitude?: true
    longitude?: true
    locationDesc?: true
    species?: true
    numberOfTrees?: true
    treesPlanted?: true
    startDate?: true
    endDate?: true
    status?: true
    budget?: true
    responsibleId?: true
    photos?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlantingCampaignCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    latitude?: true
    longitude?: true
    locationDesc?: true
    species?: true
    numberOfTrees?: true
    treesPlanted?: true
    startDate?: true
    endDate?: true
    status?: true
    budget?: true
    responsibleId?: true
    photos?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlantingCampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlantingCampaign to aggregate.
     */
    where?: PlantingCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlantingCampaigns to fetch.
     */
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlantingCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlantingCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlantingCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlantingCampaigns
    **/
    _count?: true | PlantingCampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlantingCampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlantingCampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlantingCampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlantingCampaignMaxAggregateInputType
  }

  export type GetPlantingCampaignAggregateType<T extends PlantingCampaignAggregateArgs> = {
        [P in keyof T & keyof AggregatePlantingCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlantingCampaign[P]>
      : GetScalarType<T[P], AggregatePlantingCampaign[P]>
  }




  export type PlantingCampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlantingCampaignWhereInput
    orderBy?: PlantingCampaignOrderByWithAggregationInput | PlantingCampaignOrderByWithAggregationInput[]
    by: PlantingCampaignScalarFieldEnum[] | PlantingCampaignScalarFieldEnum
    having?: PlantingCampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlantingCampaignCountAggregateInputType | true
    _avg?: PlantingCampaignAvgAggregateInputType
    _sum?: PlantingCampaignSumAggregateInputType
    _min?: PlantingCampaignMinAggregateInputType
    _max?: PlantingCampaignMaxAggregateInputType
  }

  export type PlantingCampaignGroupByOutputType = {
    id: string
    name: string
    description: string
    latitude: number | null
    longitude: number | null
    locationDesc: string
    species: string
    numberOfTrees: number
    treesPlanted: number
    startDate: Date
    endDate: Date
    status: string
    budget: number | null
    responsibleId: string | null
    photos: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlantingCampaignCountAggregateOutputType | null
    _avg: PlantingCampaignAvgAggregateOutputType | null
    _sum: PlantingCampaignSumAggregateOutputType | null
    _min: PlantingCampaignMinAggregateOutputType | null
    _max: PlantingCampaignMaxAggregateOutputType | null
  }

  type GetPlantingCampaignGroupByPayload<T extends PlantingCampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlantingCampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlantingCampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlantingCampaignGroupByOutputType[P]>
            : GetScalarType<T[P], PlantingCampaignGroupByOutputType[P]>
        }
      >
    >


  export type PlantingCampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    locationDesc?: boolean
    species?: boolean
    numberOfTrees?: boolean
    treesPlanted?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    budget?: boolean
    responsibleId?: boolean
    photos?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    responsible?: boolean | PlantingCampaign$responsibleArgs<ExtArgs>
    volunteers?: boolean | PlantingCampaign$volunteersArgs<ExtArgs>
    _count?: boolean | PlantingCampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plantingCampaign"]>

  export type PlantingCampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    locationDesc?: boolean
    species?: boolean
    numberOfTrees?: boolean
    treesPlanted?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    budget?: boolean
    responsibleId?: boolean
    photos?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    responsible?: boolean | PlantingCampaign$responsibleArgs<ExtArgs>
  }, ExtArgs["result"]["plantingCampaign"]>

  export type PlantingCampaignSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    locationDesc?: boolean
    species?: boolean
    numberOfTrees?: boolean
    treesPlanted?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    budget?: boolean
    responsibleId?: boolean
    photos?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlantingCampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsible?: boolean | PlantingCampaign$responsibleArgs<ExtArgs>
    volunteers?: boolean | PlantingCampaign$volunteersArgs<ExtArgs>
    _count?: boolean | PlantingCampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlantingCampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsible?: boolean | PlantingCampaign$responsibleArgs<ExtArgs>
  }

  export type $PlantingCampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlantingCampaign"
    objects: {
      responsible: Prisma.$UserPayload<ExtArgs> | null
      volunteers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      latitude: number | null
      longitude: number | null
      locationDesc: string
      species: string
      numberOfTrees: number
      treesPlanted: number
      startDate: Date
      endDate: Date
      status: string
      budget: number | null
      responsibleId: string | null
      photos: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plantingCampaign"]>
    composites: {}
  }

  type PlantingCampaignGetPayload<S extends boolean | null | undefined | PlantingCampaignDefaultArgs> = $Result.GetResult<Prisma.$PlantingCampaignPayload, S>

  type PlantingCampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlantingCampaignFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlantingCampaignCountAggregateInputType | true
    }

  export interface PlantingCampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlantingCampaign'], meta: { name: 'PlantingCampaign' } }
    /**
     * Find zero or one PlantingCampaign that matches the filter.
     * @param {PlantingCampaignFindUniqueArgs} args - Arguments to find a PlantingCampaign
     * @example
     * // Get one PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlantingCampaignFindUniqueArgs>(args: SelectSubset<T, PlantingCampaignFindUniqueArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlantingCampaign that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlantingCampaignFindUniqueOrThrowArgs} args - Arguments to find a PlantingCampaign
     * @example
     * // Get one PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlantingCampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, PlantingCampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlantingCampaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignFindFirstArgs} args - Arguments to find a PlantingCampaign
     * @example
     * // Get one PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlantingCampaignFindFirstArgs>(args?: SelectSubset<T, PlantingCampaignFindFirstArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlantingCampaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignFindFirstOrThrowArgs} args - Arguments to find a PlantingCampaign
     * @example
     * // Get one PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlantingCampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, PlantingCampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlantingCampaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlantingCampaigns
     * const plantingCampaigns = await prisma.plantingCampaign.findMany()
     * 
     * // Get first 10 PlantingCampaigns
     * const plantingCampaigns = await prisma.plantingCampaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const plantingCampaignWithIdOnly = await prisma.plantingCampaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlantingCampaignFindManyArgs>(args?: SelectSubset<T, PlantingCampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlantingCampaign.
     * @param {PlantingCampaignCreateArgs} args - Arguments to create a PlantingCampaign.
     * @example
     * // Create one PlantingCampaign
     * const PlantingCampaign = await prisma.plantingCampaign.create({
     *   data: {
     *     // ... data to create a PlantingCampaign
     *   }
     * })
     * 
     */
    create<T extends PlantingCampaignCreateArgs>(args: SelectSubset<T, PlantingCampaignCreateArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlantingCampaigns.
     * @param {PlantingCampaignCreateManyArgs} args - Arguments to create many PlantingCampaigns.
     * @example
     * // Create many PlantingCampaigns
     * const plantingCampaign = await prisma.plantingCampaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlantingCampaignCreateManyArgs>(args?: SelectSubset<T, PlantingCampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlantingCampaigns and returns the data saved in the database.
     * @param {PlantingCampaignCreateManyAndReturnArgs} args - Arguments to create many PlantingCampaigns.
     * @example
     * // Create many PlantingCampaigns
     * const plantingCampaign = await prisma.plantingCampaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlantingCampaigns and only return the `id`
     * const plantingCampaignWithIdOnly = await prisma.plantingCampaign.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlantingCampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, PlantingCampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlantingCampaign.
     * @param {PlantingCampaignDeleteArgs} args - Arguments to delete one PlantingCampaign.
     * @example
     * // Delete one PlantingCampaign
     * const PlantingCampaign = await prisma.plantingCampaign.delete({
     *   where: {
     *     // ... filter to delete one PlantingCampaign
     *   }
     * })
     * 
     */
    delete<T extends PlantingCampaignDeleteArgs>(args: SelectSubset<T, PlantingCampaignDeleteArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlantingCampaign.
     * @param {PlantingCampaignUpdateArgs} args - Arguments to update one PlantingCampaign.
     * @example
     * // Update one PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlantingCampaignUpdateArgs>(args: SelectSubset<T, PlantingCampaignUpdateArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlantingCampaigns.
     * @param {PlantingCampaignDeleteManyArgs} args - Arguments to filter PlantingCampaigns to delete.
     * @example
     * // Delete a few PlantingCampaigns
     * const { count } = await prisma.plantingCampaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlantingCampaignDeleteManyArgs>(args?: SelectSubset<T, PlantingCampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlantingCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlantingCampaigns
     * const plantingCampaign = await prisma.plantingCampaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlantingCampaignUpdateManyArgs>(args: SelectSubset<T, PlantingCampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlantingCampaign.
     * @param {PlantingCampaignUpsertArgs} args - Arguments to update or create a PlantingCampaign.
     * @example
     * // Update or create a PlantingCampaign
     * const plantingCampaign = await prisma.plantingCampaign.upsert({
     *   create: {
     *     // ... data to create a PlantingCampaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlantingCampaign we want to update
     *   }
     * })
     */
    upsert<T extends PlantingCampaignUpsertArgs>(args: SelectSubset<T, PlantingCampaignUpsertArgs<ExtArgs>>): Prisma__PlantingCampaignClient<$Result.GetResult<Prisma.$PlantingCampaignPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlantingCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignCountArgs} args - Arguments to filter PlantingCampaigns to count.
     * @example
     * // Count the number of PlantingCampaigns
     * const count = await prisma.plantingCampaign.count({
     *   where: {
     *     // ... the filter for the PlantingCampaigns we want to count
     *   }
     * })
    **/
    count<T extends PlantingCampaignCountArgs>(
      args?: Subset<T, PlantingCampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlantingCampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlantingCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlantingCampaignAggregateArgs>(args: Subset<T, PlantingCampaignAggregateArgs>): Prisma.PrismaPromise<GetPlantingCampaignAggregateType<T>>

    /**
     * Group by PlantingCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantingCampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlantingCampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlantingCampaignGroupByArgs['orderBy'] }
        : { orderBy?: PlantingCampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlantingCampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlantingCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlantingCampaign model
   */
  readonly fields: PlantingCampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlantingCampaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlantingCampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responsible<T extends PlantingCampaign$responsibleArgs<ExtArgs> = {}>(args?: Subset<T, PlantingCampaign$responsibleArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    volunteers<T extends PlantingCampaign$volunteersArgs<ExtArgs> = {}>(args?: Subset<T, PlantingCampaign$volunteersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlantingCampaign model
   */ 
  interface PlantingCampaignFieldRefs {
    readonly id: FieldRef<"PlantingCampaign", 'String'>
    readonly name: FieldRef<"PlantingCampaign", 'String'>
    readonly description: FieldRef<"PlantingCampaign", 'String'>
    readonly latitude: FieldRef<"PlantingCampaign", 'Float'>
    readonly longitude: FieldRef<"PlantingCampaign", 'Float'>
    readonly locationDesc: FieldRef<"PlantingCampaign", 'String'>
    readonly species: FieldRef<"PlantingCampaign", 'String'>
    readonly numberOfTrees: FieldRef<"PlantingCampaign", 'Int'>
    readonly treesPlanted: FieldRef<"PlantingCampaign", 'Int'>
    readonly startDate: FieldRef<"PlantingCampaign", 'DateTime'>
    readonly endDate: FieldRef<"PlantingCampaign", 'DateTime'>
    readonly status: FieldRef<"PlantingCampaign", 'String'>
    readonly budget: FieldRef<"PlantingCampaign", 'Float'>
    readonly responsibleId: FieldRef<"PlantingCampaign", 'String'>
    readonly photos: FieldRef<"PlantingCampaign", 'String'>
    readonly notes: FieldRef<"PlantingCampaign", 'String'>
    readonly createdAt: FieldRef<"PlantingCampaign", 'DateTime'>
    readonly updatedAt: FieldRef<"PlantingCampaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlantingCampaign findUnique
   */
  export type PlantingCampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter, which PlantingCampaign to fetch.
     */
    where: PlantingCampaignWhereUniqueInput
  }

  /**
   * PlantingCampaign findUniqueOrThrow
   */
  export type PlantingCampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter, which PlantingCampaign to fetch.
     */
    where: PlantingCampaignWhereUniqueInput
  }

  /**
   * PlantingCampaign findFirst
   */
  export type PlantingCampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter, which PlantingCampaign to fetch.
     */
    where?: PlantingCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlantingCampaigns to fetch.
     */
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlantingCampaigns.
     */
    cursor?: PlantingCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlantingCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlantingCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlantingCampaigns.
     */
    distinct?: PlantingCampaignScalarFieldEnum | PlantingCampaignScalarFieldEnum[]
  }

  /**
   * PlantingCampaign findFirstOrThrow
   */
  export type PlantingCampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter, which PlantingCampaign to fetch.
     */
    where?: PlantingCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlantingCampaigns to fetch.
     */
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlantingCampaigns.
     */
    cursor?: PlantingCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlantingCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlantingCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlantingCampaigns.
     */
    distinct?: PlantingCampaignScalarFieldEnum | PlantingCampaignScalarFieldEnum[]
  }

  /**
   * PlantingCampaign findMany
   */
  export type PlantingCampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter, which PlantingCampaigns to fetch.
     */
    where?: PlantingCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlantingCampaigns to fetch.
     */
    orderBy?: PlantingCampaignOrderByWithRelationInput | PlantingCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlantingCampaigns.
     */
    cursor?: PlantingCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlantingCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlantingCampaigns.
     */
    skip?: number
    distinct?: PlantingCampaignScalarFieldEnum | PlantingCampaignScalarFieldEnum[]
  }

  /**
   * PlantingCampaign create
   */
  export type PlantingCampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a PlantingCampaign.
     */
    data: XOR<PlantingCampaignCreateInput, PlantingCampaignUncheckedCreateInput>
  }

  /**
   * PlantingCampaign createMany
   */
  export type PlantingCampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlantingCampaigns.
     */
    data: PlantingCampaignCreateManyInput | PlantingCampaignCreateManyInput[]
  }

  /**
   * PlantingCampaign createManyAndReturn
   */
  export type PlantingCampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlantingCampaigns.
     */
    data: PlantingCampaignCreateManyInput | PlantingCampaignCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlantingCampaign update
   */
  export type PlantingCampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a PlantingCampaign.
     */
    data: XOR<PlantingCampaignUpdateInput, PlantingCampaignUncheckedUpdateInput>
    /**
     * Choose, which PlantingCampaign to update.
     */
    where: PlantingCampaignWhereUniqueInput
  }

  /**
   * PlantingCampaign updateMany
   */
  export type PlantingCampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlantingCampaigns.
     */
    data: XOR<PlantingCampaignUpdateManyMutationInput, PlantingCampaignUncheckedUpdateManyInput>
    /**
     * Filter which PlantingCampaigns to update
     */
    where?: PlantingCampaignWhereInput
  }

  /**
   * PlantingCampaign upsert
   */
  export type PlantingCampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the PlantingCampaign to update in case it exists.
     */
    where: PlantingCampaignWhereUniqueInput
    /**
     * In case the PlantingCampaign found by the `where` argument doesn't exist, create a new PlantingCampaign with this data.
     */
    create: XOR<PlantingCampaignCreateInput, PlantingCampaignUncheckedCreateInput>
    /**
     * In case the PlantingCampaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlantingCampaignUpdateInput, PlantingCampaignUncheckedUpdateInput>
  }

  /**
   * PlantingCampaign delete
   */
  export type PlantingCampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
    /**
     * Filter which PlantingCampaign to delete.
     */
    where: PlantingCampaignWhereUniqueInput
  }

  /**
   * PlantingCampaign deleteMany
   */
  export type PlantingCampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlantingCampaigns to delete
     */
    where?: PlantingCampaignWhereInput
  }

  /**
   * PlantingCampaign.responsible
   */
  export type PlantingCampaign$responsibleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PlantingCampaign.volunteers
   */
  export type PlantingCampaign$volunteersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * PlantingCampaign without action
   */
  export type PlantingCampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantingCampaign
     */
    select?: PlantingCampaignSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantingCampaignInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    notificationType: string | null
    relatedObjectId: string | null
    relatedObjectType: string | null
    isRead: boolean | null
    sentAt: Date | null
    readAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    notificationType: string | null
    relatedObjectId: string | null
    relatedObjectType: string | null
    isRead: boolean | null
    sentAt: Date | null
    readAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    notificationType: number
    relatedObjectId: number
    relatedObjectType: number
    isRead: number
    sentAt: number
    readAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    notificationType?: true
    relatedObjectId?: true
    relatedObjectType?: true
    isRead?: true
    sentAt?: true
    readAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    notificationType?: true
    relatedObjectId?: true
    relatedObjectType?: true
    isRead?: true
    sentAt?: true
    readAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    notificationType?: true
    relatedObjectId?: true
    relatedObjectType?: true
    isRead?: true
    sentAt?: true
    readAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    notificationType: string
    relatedObjectId: string | null
    relatedObjectType: string | null
    isRead: boolean
    sentAt: Date
    readAt: Date | null
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    notificationType?: boolean
    relatedObjectId?: boolean
    relatedObjectType?: boolean
    isRead?: boolean
    sentAt?: boolean
    readAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    notificationType?: boolean
    relatedObjectId?: boolean
    relatedObjectType?: boolean
    isRead?: boolean
    sentAt?: boolean
    readAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    notificationType?: boolean
    relatedObjectId?: boolean
    relatedObjectType?: boolean
    isRead?: boolean
    sentAt?: boolean
    readAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      notificationType: string
      relatedObjectId: string | null
      relatedObjectType: string | null
      isRead: boolean
      sentAt: Date
      readAt: Date | null
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly notificationType: FieldRef<"Notification", 'String'>
    readonly relatedObjectId: FieldRef<"Notification", 'String'>
    readonly relatedObjectType: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly sentAt: FieldRef<"Notification", 'DateTime'>
    readonly readAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    changes: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    changes: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    changes: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    changes?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    changes?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    changes?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    entityType: string
    entityId: string | null
    changes: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    changes?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    changes?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    changes?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      entityType: string
      entityId: string | null
      changes: string | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly changes: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GreenSpaceScalarFieldEnum: {
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

  export type GreenSpaceScalarFieldEnum = (typeof GreenSpaceScalarFieldEnum)[keyof typeof GreenSpaceScalarFieldEnum]


  export const TreeScalarFieldEnum: {
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

  export type TreeScalarFieldEnum = (typeof TreeScalarFieldEnum)[keyof typeof TreeScalarFieldEnum]


  export const WateringLogScalarFieldEnum: {
    id: 'id',
    treeId: 'treeId',
    userName: 'userName',
    liters: 'liters',
    earnedPoints: 'earnedPoints',
    photoProof: 'photoProof',
    photoVerified: 'photoVerified',
    loggedAt: 'loggedAt'
  };

  export type WateringLogScalarFieldEnum = (typeof WateringLogScalarFieldEnum)[keyof typeof WateringLogScalarFieldEnum]


  export const CareAlertScalarFieldEnum: {
    id: 'id',
    neighborhood: 'neighborhood',
    alertType: 'alertType',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type CareAlertScalarFieldEnum = (typeof CareAlertScalarFieldEnum)[keyof typeof CareAlertScalarFieldEnum]


  export const NeighborhoodStatsScalarFieldEnum: {
    id: 'id',
    neighborhood: 'neighborhood',
    totalTrees: 'totalTrees',
    adoptedTrees: 'adoptedTrees',
    wateringsCount: 'wateringsCount',
    ecoPoints: 'ecoPoints',
    updatedAt: 'updatedAt'
  };

  export type NeighborhoodStatsScalarFieldEnum = (typeof NeighborhoodStatsScalarFieldEnum)[keyof typeof NeighborhoodStatsScalarFieldEnum]


  export const ReportScalarFieldEnum: {
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

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ReportAssignmentScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    fieldWorkerId: 'fieldWorkerId',
    assignedAt: 'assignedAt',
    notes: 'notes',
    completedAt: 'completedAt'
  };

  export type ReportAssignmentScalarFieldEnum = (typeof ReportAssignmentScalarFieldEnum)[keyof typeof ReportAssignmentScalarFieldEnum]


  export const PlantingCampaignScalarFieldEnum: {
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

  export type PlantingCampaignScalarFieldEnum = (typeof PlantingCampaignScalarFieldEnum)[keyof typeof PlantingCampaignScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
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

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
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

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    neighborhood?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: ReportListRelationFilter
    adoptedTrees?: TreeListRelationFilter
    assignedReports?: ReportListRelationFilter
    assignments?: ReportAssignmentListRelationFilter
    campaigns?: PlantingCampaignListRelationFilter
    volunteerCampaigns?: PlantingCampaignListRelationFilter
    notifications?: NotificationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    neighborhood?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reports?: ReportOrderByRelationAggregateInput
    adoptedTrees?: TreeOrderByRelationAggregateInput
    assignedReports?: ReportOrderByRelationAggregateInput
    assignments?: ReportAssignmentOrderByRelationAggregateInput
    campaigns?: PlantingCampaignOrderByRelationAggregateInput
    volunteerCampaigns?: PlantingCampaignOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    phone?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    neighborhood?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: ReportListRelationFilter
    adoptedTrees?: TreeListRelationFilter
    assignedReports?: ReportListRelationFilter
    assignments?: ReportAssignmentListRelationFilter
    campaigns?: PlantingCampaignListRelationFilter
    volunteerCampaigns?: PlantingCampaignListRelationFilter
    notifications?: NotificationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    neighborhood?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    neighborhood?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GreenSpaceWhereInput = {
    AND?: GreenSpaceWhereInput | GreenSpaceWhereInput[]
    OR?: GreenSpaceWhereInput[]
    NOT?: GreenSpaceWhereInput | GreenSpaceWhereInput[]
    id?: StringFilter<"GreenSpace"> | string
    name?: StringFilter<"GreenSpace"> | string
    type?: StringFilter<"GreenSpace"> | string
    location?: StringFilter<"GreenSpace"> | string
    area?: FloatFilter<"GreenSpace"> | number
    description?: StringNullableFilter<"GreenSpace"> | string | null
    address?: StringNullableFilter<"GreenSpace"> | string | null
    createdAt?: DateTimeFilter<"GreenSpace"> | Date | string
    updatedAt?: DateTimeFilter<"GreenSpace"> | Date | string
    trees?: TreeListRelationFilter
  }

  export type GreenSpaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    area?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trees?: TreeOrderByRelationAggregateInput
  }

  export type GreenSpaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GreenSpaceWhereInput | GreenSpaceWhereInput[]
    OR?: GreenSpaceWhereInput[]
    NOT?: GreenSpaceWhereInput | GreenSpaceWhereInput[]
    name?: StringFilter<"GreenSpace"> | string
    type?: StringFilter<"GreenSpace"> | string
    location?: StringFilter<"GreenSpace"> | string
    area?: FloatFilter<"GreenSpace"> | number
    description?: StringNullableFilter<"GreenSpace"> | string | null
    address?: StringNullableFilter<"GreenSpace"> | string | null
    createdAt?: DateTimeFilter<"GreenSpace"> | Date | string
    updatedAt?: DateTimeFilter<"GreenSpace"> | Date | string
    trees?: TreeListRelationFilter
  }, "id">

  export type GreenSpaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    area?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GreenSpaceCountOrderByAggregateInput
    _avg?: GreenSpaceAvgOrderByAggregateInput
    _max?: GreenSpaceMaxOrderByAggregateInput
    _min?: GreenSpaceMinOrderByAggregateInput
    _sum?: GreenSpaceSumOrderByAggregateInput
  }

  export type GreenSpaceScalarWhereWithAggregatesInput = {
    AND?: GreenSpaceScalarWhereWithAggregatesInput | GreenSpaceScalarWhereWithAggregatesInput[]
    OR?: GreenSpaceScalarWhereWithAggregatesInput[]
    NOT?: GreenSpaceScalarWhereWithAggregatesInput | GreenSpaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GreenSpace"> | string
    name?: StringWithAggregatesFilter<"GreenSpace"> | string
    type?: StringWithAggregatesFilter<"GreenSpace"> | string
    location?: StringWithAggregatesFilter<"GreenSpace"> | string
    area?: FloatWithAggregatesFilter<"GreenSpace"> | number
    description?: StringNullableWithAggregatesFilter<"GreenSpace"> | string | null
    address?: StringNullableWithAggregatesFilter<"GreenSpace"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GreenSpace"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GreenSpace"> | Date | string
  }

  export type TreeWhereInput = {
    AND?: TreeWhereInput | TreeWhereInput[]
    OR?: TreeWhereInput[]
    NOT?: TreeWhereInput | TreeWhereInput[]
    id?: StringFilter<"Tree"> | string
    species?: StringFilter<"Tree"> | string
    speciesOther?: StringNullableFilter<"Tree"> | string | null
    latitude?: FloatFilter<"Tree"> | number
    longitude?: FloatFilter<"Tree"> | number
    plantingDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    height?: FloatNullableFilter<"Tree"> | number | null
    trunkDiameter?: FloatNullableFilter<"Tree"> | number | null
    healthStatus?: StringFilter<"Tree"> | string
    adoptedById?: StringNullableFilter<"Tree"> | string | null
    adoptionDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    greenSpaceId?: StringNullableFilter<"Tree"> | string | null
    notes?: StringNullableFilter<"Tree"> | string | null
    photos?: StringFilter<"Tree"> | string
    neighborhood?: StringFilter<"Tree"> | string
    nickname?: StringNullableFilter<"Tree"> | string | null
    lastWateredAt?: DateTimeNullableFilter<"Tree"> | Date | string | null
    createdAt?: DateTimeFilter<"Tree"> | Date | string
    updatedAt?: DateTimeFilter<"Tree"> | Date | string
    adoptedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    greenSpace?: XOR<GreenSpaceNullableRelationFilter, GreenSpaceWhereInput> | null
    wateringLogs?: WateringLogListRelationFilter
  }

  export type TreeOrderByWithRelationInput = {
    id?: SortOrder
    species?: SortOrder
    speciesOther?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    plantingDate?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    trunkDiameter?: SortOrderInput | SortOrder
    healthStatus?: SortOrder
    adoptedById?: SortOrderInput | SortOrder
    adoptionDate?: SortOrderInput | SortOrder
    greenSpaceId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photos?: SortOrder
    neighborhood?: SortOrder
    nickname?: SortOrderInput | SortOrder
    lastWateredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adoptedBy?: UserOrderByWithRelationInput
    greenSpace?: GreenSpaceOrderByWithRelationInput
    wateringLogs?: WateringLogOrderByRelationAggregateInput
  }

  export type TreeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreeWhereInput | TreeWhereInput[]
    OR?: TreeWhereInput[]
    NOT?: TreeWhereInput | TreeWhereInput[]
    species?: StringFilter<"Tree"> | string
    speciesOther?: StringNullableFilter<"Tree"> | string | null
    latitude?: FloatFilter<"Tree"> | number
    longitude?: FloatFilter<"Tree"> | number
    plantingDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    height?: FloatNullableFilter<"Tree"> | number | null
    trunkDiameter?: FloatNullableFilter<"Tree"> | number | null
    healthStatus?: StringFilter<"Tree"> | string
    adoptedById?: StringNullableFilter<"Tree"> | string | null
    adoptionDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    greenSpaceId?: StringNullableFilter<"Tree"> | string | null
    notes?: StringNullableFilter<"Tree"> | string | null
    photos?: StringFilter<"Tree"> | string
    neighborhood?: StringFilter<"Tree"> | string
    nickname?: StringNullableFilter<"Tree"> | string | null
    lastWateredAt?: DateTimeNullableFilter<"Tree"> | Date | string | null
    createdAt?: DateTimeFilter<"Tree"> | Date | string
    updatedAt?: DateTimeFilter<"Tree"> | Date | string
    adoptedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    greenSpace?: XOR<GreenSpaceNullableRelationFilter, GreenSpaceWhereInput> | null
    wateringLogs?: WateringLogListRelationFilter
  }, "id">

  export type TreeOrderByWithAggregationInput = {
    id?: SortOrder
    species?: SortOrder
    speciesOther?: SortOrderInput | SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    plantingDate?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    trunkDiameter?: SortOrderInput | SortOrder
    healthStatus?: SortOrder
    adoptedById?: SortOrderInput | SortOrder
    adoptionDate?: SortOrderInput | SortOrder
    greenSpaceId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photos?: SortOrder
    neighborhood?: SortOrder
    nickname?: SortOrderInput | SortOrder
    lastWateredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TreeCountOrderByAggregateInput
    _avg?: TreeAvgOrderByAggregateInput
    _max?: TreeMaxOrderByAggregateInput
    _min?: TreeMinOrderByAggregateInput
    _sum?: TreeSumOrderByAggregateInput
  }

  export type TreeScalarWhereWithAggregatesInput = {
    AND?: TreeScalarWhereWithAggregatesInput | TreeScalarWhereWithAggregatesInput[]
    OR?: TreeScalarWhereWithAggregatesInput[]
    NOT?: TreeScalarWhereWithAggregatesInput | TreeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tree"> | string
    species?: StringWithAggregatesFilter<"Tree"> | string
    speciesOther?: StringNullableWithAggregatesFilter<"Tree"> | string | null
    latitude?: FloatWithAggregatesFilter<"Tree"> | number
    longitude?: FloatWithAggregatesFilter<"Tree"> | number
    plantingDate?: DateTimeNullableWithAggregatesFilter<"Tree"> | Date | string | null
    height?: FloatNullableWithAggregatesFilter<"Tree"> | number | null
    trunkDiameter?: FloatNullableWithAggregatesFilter<"Tree"> | number | null
    healthStatus?: StringWithAggregatesFilter<"Tree"> | string
    adoptedById?: StringNullableWithAggregatesFilter<"Tree"> | string | null
    adoptionDate?: DateTimeNullableWithAggregatesFilter<"Tree"> | Date | string | null
    greenSpaceId?: StringNullableWithAggregatesFilter<"Tree"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Tree"> | string | null
    photos?: StringWithAggregatesFilter<"Tree"> | string
    neighborhood?: StringWithAggregatesFilter<"Tree"> | string
    nickname?: StringNullableWithAggregatesFilter<"Tree"> | string | null
    lastWateredAt?: DateTimeNullableWithAggregatesFilter<"Tree"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tree"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tree"> | Date | string
  }

  export type WateringLogWhereInput = {
    AND?: WateringLogWhereInput | WateringLogWhereInput[]
    OR?: WateringLogWhereInput[]
    NOT?: WateringLogWhereInput | WateringLogWhereInput[]
    id?: StringFilter<"WateringLog"> | string
    treeId?: StringFilter<"WateringLog"> | string
    userName?: StringFilter<"WateringLog"> | string
    liters?: IntFilter<"WateringLog"> | number
    earnedPoints?: IntFilter<"WateringLog"> | number
    photoProof?: StringNullableFilter<"WateringLog"> | string | null
    photoVerified?: BoolFilter<"WateringLog"> | boolean
    loggedAt?: DateTimeFilter<"WateringLog"> | Date | string
    tree?: XOR<TreeRelationFilter, TreeWhereInput>
  }

  export type WateringLogOrderByWithRelationInput = {
    id?: SortOrder
    treeId?: SortOrder
    userName?: SortOrder
    liters?: SortOrder
    earnedPoints?: SortOrder
    photoProof?: SortOrderInput | SortOrder
    photoVerified?: SortOrder
    loggedAt?: SortOrder
    tree?: TreeOrderByWithRelationInput
  }

  export type WateringLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WateringLogWhereInput | WateringLogWhereInput[]
    OR?: WateringLogWhereInput[]
    NOT?: WateringLogWhereInput | WateringLogWhereInput[]
    treeId?: StringFilter<"WateringLog"> | string
    userName?: StringFilter<"WateringLog"> | string
    liters?: IntFilter<"WateringLog"> | number
    earnedPoints?: IntFilter<"WateringLog"> | number
    photoProof?: StringNullableFilter<"WateringLog"> | string | null
    photoVerified?: BoolFilter<"WateringLog"> | boolean
    loggedAt?: DateTimeFilter<"WateringLog"> | Date | string
    tree?: XOR<TreeRelationFilter, TreeWhereInput>
  }, "id">

  export type WateringLogOrderByWithAggregationInput = {
    id?: SortOrder
    treeId?: SortOrder
    userName?: SortOrder
    liters?: SortOrder
    earnedPoints?: SortOrder
    photoProof?: SortOrderInput | SortOrder
    photoVerified?: SortOrder
    loggedAt?: SortOrder
    _count?: WateringLogCountOrderByAggregateInput
    _avg?: WateringLogAvgOrderByAggregateInput
    _max?: WateringLogMaxOrderByAggregateInput
    _min?: WateringLogMinOrderByAggregateInput
    _sum?: WateringLogSumOrderByAggregateInput
  }

  export type WateringLogScalarWhereWithAggregatesInput = {
    AND?: WateringLogScalarWhereWithAggregatesInput | WateringLogScalarWhereWithAggregatesInput[]
    OR?: WateringLogScalarWhereWithAggregatesInput[]
    NOT?: WateringLogScalarWhereWithAggregatesInput | WateringLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WateringLog"> | string
    treeId?: StringWithAggregatesFilter<"WateringLog"> | string
    userName?: StringWithAggregatesFilter<"WateringLog"> | string
    liters?: IntWithAggregatesFilter<"WateringLog"> | number
    earnedPoints?: IntWithAggregatesFilter<"WateringLog"> | number
    photoProof?: StringNullableWithAggregatesFilter<"WateringLog"> | string | null
    photoVerified?: BoolWithAggregatesFilter<"WateringLog"> | boolean
    loggedAt?: DateTimeWithAggregatesFilter<"WateringLog"> | Date | string
  }

  export type CareAlertWhereInput = {
    AND?: CareAlertWhereInput | CareAlertWhereInput[]
    OR?: CareAlertWhereInput[]
    NOT?: CareAlertWhereInput | CareAlertWhereInput[]
    id?: StringFilter<"CareAlert"> | string
    neighborhood?: StringFilter<"CareAlert"> | string
    alertType?: StringFilter<"CareAlert"> | string
    message?: StringFilter<"CareAlert"> | string
    status?: StringFilter<"CareAlert"> | string
    createdAt?: DateTimeFilter<"CareAlert"> | Date | string
  }

  export type CareAlertOrderByWithRelationInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    alertType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareAlertWhereInput | CareAlertWhereInput[]
    OR?: CareAlertWhereInput[]
    NOT?: CareAlertWhereInput | CareAlertWhereInput[]
    neighborhood?: StringFilter<"CareAlert"> | string
    alertType?: StringFilter<"CareAlert"> | string
    message?: StringFilter<"CareAlert"> | string
    status?: StringFilter<"CareAlert"> | string
    createdAt?: DateTimeFilter<"CareAlert"> | Date | string
  }, "id">

  export type CareAlertOrderByWithAggregationInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    alertType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: CareAlertCountOrderByAggregateInput
    _max?: CareAlertMaxOrderByAggregateInput
    _min?: CareAlertMinOrderByAggregateInput
  }

  export type CareAlertScalarWhereWithAggregatesInput = {
    AND?: CareAlertScalarWhereWithAggregatesInput | CareAlertScalarWhereWithAggregatesInput[]
    OR?: CareAlertScalarWhereWithAggregatesInput[]
    NOT?: CareAlertScalarWhereWithAggregatesInput | CareAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareAlert"> | string
    neighborhood?: StringWithAggregatesFilter<"CareAlert"> | string
    alertType?: StringWithAggregatesFilter<"CareAlert"> | string
    message?: StringWithAggregatesFilter<"CareAlert"> | string
    status?: StringWithAggregatesFilter<"CareAlert"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareAlert"> | Date | string
  }

  export type NeighborhoodStatsWhereInput = {
    AND?: NeighborhoodStatsWhereInput | NeighborhoodStatsWhereInput[]
    OR?: NeighborhoodStatsWhereInput[]
    NOT?: NeighborhoodStatsWhereInput | NeighborhoodStatsWhereInput[]
    id?: StringFilter<"NeighborhoodStats"> | string
    neighborhood?: StringFilter<"NeighborhoodStats"> | string
    totalTrees?: IntFilter<"NeighborhoodStats"> | number
    adoptedTrees?: IntFilter<"NeighborhoodStats"> | number
    wateringsCount?: IntFilter<"NeighborhoodStats"> | number
    ecoPoints?: IntFilter<"NeighborhoodStats"> | number
    updatedAt?: DateTimeFilter<"NeighborhoodStats"> | Date | string
  }

  export type NeighborhoodStatsOrderByWithRelationInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeighborhoodStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    neighborhood?: string
    AND?: NeighborhoodStatsWhereInput | NeighborhoodStatsWhereInput[]
    OR?: NeighborhoodStatsWhereInput[]
    NOT?: NeighborhoodStatsWhereInput | NeighborhoodStatsWhereInput[]
    totalTrees?: IntFilter<"NeighborhoodStats"> | number
    adoptedTrees?: IntFilter<"NeighborhoodStats"> | number
    wateringsCount?: IntFilter<"NeighborhoodStats"> | number
    ecoPoints?: IntFilter<"NeighborhoodStats"> | number
    updatedAt?: DateTimeFilter<"NeighborhoodStats"> | Date | string
  }, "id" | "neighborhood">

  export type NeighborhoodStatsOrderByWithAggregationInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
    updatedAt?: SortOrder
    _count?: NeighborhoodStatsCountOrderByAggregateInput
    _avg?: NeighborhoodStatsAvgOrderByAggregateInput
    _max?: NeighborhoodStatsMaxOrderByAggregateInput
    _min?: NeighborhoodStatsMinOrderByAggregateInput
    _sum?: NeighborhoodStatsSumOrderByAggregateInput
  }

  export type NeighborhoodStatsScalarWhereWithAggregatesInput = {
    AND?: NeighborhoodStatsScalarWhereWithAggregatesInput | NeighborhoodStatsScalarWhereWithAggregatesInput[]
    OR?: NeighborhoodStatsScalarWhereWithAggregatesInput[]
    NOT?: NeighborhoodStatsScalarWhereWithAggregatesInput | NeighborhoodStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NeighborhoodStats"> | string
    neighborhood?: StringWithAggregatesFilter<"NeighborhoodStats"> | string
    totalTrees?: IntWithAggregatesFilter<"NeighborhoodStats"> | number
    adoptedTrees?: IntWithAggregatesFilter<"NeighborhoodStats"> | number
    wateringsCount?: IntWithAggregatesFilter<"NeighborhoodStats"> | number
    ecoPoints?: IntWithAggregatesFilter<"NeighborhoodStats"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"NeighborhoodStats"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    userId?: StringFilter<"Report"> | string
    issueType?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    latitude?: FloatFilter<"Report"> | number
    longitude?: FloatFilter<"Report"> | number
    address?: StringFilter<"Report"> | string
    photos?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    priority?: StringFilter<"Report"> | string
    assignedToId?: StringNullableFilter<"Report"> | string | null
    trackingNumber?: StringFilter<"Report"> | string
    adminNotes?: StringNullableFilter<"Report"> | string | null
    resolutionNotes?: StringNullableFilter<"Report"> | string | null
    rejectionReason?: StringNullableFilter<"Report"> | string | null
    submittedAt?: DateTimeFilter<"Report"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    assignedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    assignments?: ReportAssignmentListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    issueType?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    photos?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    trackingNumber?: SortOrder
    adminNotes?: SortOrderInput | SortOrder
    resolutionNotes?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    assignedTo?: UserOrderByWithRelationInput
    assignments?: ReportAssignmentOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trackingNumber?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    userId?: StringFilter<"Report"> | string
    issueType?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    latitude?: FloatFilter<"Report"> | number
    longitude?: FloatFilter<"Report"> | number
    address?: StringFilter<"Report"> | string
    photos?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    priority?: StringFilter<"Report"> | string
    assignedToId?: StringNullableFilter<"Report"> | string | null
    adminNotes?: StringNullableFilter<"Report"> | string | null
    resolutionNotes?: StringNullableFilter<"Report"> | string | null
    rejectionReason?: StringNullableFilter<"Report"> | string | null
    submittedAt?: DateTimeFilter<"Report"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    assignedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    assignedTo?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    assignments?: ReportAssignmentListRelationFilter
  }, "id" | "trackingNumber">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    issueType?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    photos?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    trackingNumber?: SortOrder
    adminNotes?: SortOrderInput | SortOrder
    resolutionNotes?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    userId?: StringWithAggregatesFilter<"Report"> | string
    issueType?: StringWithAggregatesFilter<"Report"> | string
    description?: StringWithAggregatesFilter<"Report"> | string
    latitude?: FloatWithAggregatesFilter<"Report"> | number
    longitude?: FloatWithAggregatesFilter<"Report"> | number
    address?: StringWithAggregatesFilter<"Report"> | string
    photos?: StringWithAggregatesFilter<"Report"> | string
    status?: StringWithAggregatesFilter<"Report"> | string
    priority?: StringWithAggregatesFilter<"Report"> | string
    assignedToId?: StringNullableWithAggregatesFilter<"Report"> | string | null
    trackingNumber?: StringWithAggregatesFilter<"Report"> | string
    adminNotes?: StringNullableWithAggregatesFilter<"Report"> | string | null
    resolutionNotes?: StringNullableWithAggregatesFilter<"Report"> | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"Report"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    assignedAt?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type ReportAssignmentWhereInput = {
    AND?: ReportAssignmentWhereInput | ReportAssignmentWhereInput[]
    OR?: ReportAssignmentWhereInput[]
    NOT?: ReportAssignmentWhereInput | ReportAssignmentWhereInput[]
    id?: StringFilter<"ReportAssignment"> | string
    reportId?: StringFilter<"ReportAssignment"> | string
    fieldWorkerId?: StringFilter<"ReportAssignment"> | string
    assignedAt?: DateTimeFilter<"ReportAssignment"> | Date | string
    notes?: StringNullableFilter<"ReportAssignment"> | string | null
    completedAt?: DateTimeNullableFilter<"ReportAssignment"> | Date | string | null
    report?: XOR<ReportRelationFilter, ReportWhereInput>
    fieldWorker?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReportAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    fieldWorkerId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    report?: ReportOrderByWithRelationInput
    fieldWorker?: UserOrderByWithRelationInput
  }

  export type ReportAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportAssignmentWhereInput | ReportAssignmentWhereInput[]
    OR?: ReportAssignmentWhereInput[]
    NOT?: ReportAssignmentWhereInput | ReportAssignmentWhereInput[]
    reportId?: StringFilter<"ReportAssignment"> | string
    fieldWorkerId?: StringFilter<"ReportAssignment"> | string
    assignedAt?: DateTimeFilter<"ReportAssignment"> | Date | string
    notes?: StringNullableFilter<"ReportAssignment"> | string | null
    completedAt?: DateTimeNullableFilter<"ReportAssignment"> | Date | string | null
    report?: XOR<ReportRelationFilter, ReportWhereInput>
    fieldWorker?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ReportAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    fieldWorkerId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ReportAssignmentCountOrderByAggregateInput
    _max?: ReportAssignmentMaxOrderByAggregateInput
    _min?: ReportAssignmentMinOrderByAggregateInput
  }

  export type ReportAssignmentScalarWhereWithAggregatesInput = {
    AND?: ReportAssignmentScalarWhereWithAggregatesInput | ReportAssignmentScalarWhereWithAggregatesInput[]
    OR?: ReportAssignmentScalarWhereWithAggregatesInput[]
    NOT?: ReportAssignmentScalarWhereWithAggregatesInput | ReportAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReportAssignment"> | string
    reportId?: StringWithAggregatesFilter<"ReportAssignment"> | string
    fieldWorkerId?: StringWithAggregatesFilter<"ReportAssignment"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"ReportAssignment"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"ReportAssignment"> | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"ReportAssignment"> | Date | string | null
  }

  export type PlantingCampaignWhereInput = {
    AND?: PlantingCampaignWhereInput | PlantingCampaignWhereInput[]
    OR?: PlantingCampaignWhereInput[]
    NOT?: PlantingCampaignWhereInput | PlantingCampaignWhereInput[]
    id?: StringFilter<"PlantingCampaign"> | string
    name?: StringFilter<"PlantingCampaign"> | string
    description?: StringFilter<"PlantingCampaign"> | string
    latitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    longitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    locationDesc?: StringFilter<"PlantingCampaign"> | string
    species?: StringFilter<"PlantingCampaign"> | string
    numberOfTrees?: IntFilter<"PlantingCampaign"> | number
    treesPlanted?: IntFilter<"PlantingCampaign"> | number
    startDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    endDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    status?: StringFilter<"PlantingCampaign"> | string
    budget?: FloatNullableFilter<"PlantingCampaign"> | number | null
    responsibleId?: StringNullableFilter<"PlantingCampaign"> | string | null
    photos?: StringFilter<"PlantingCampaign"> | string
    notes?: StringNullableFilter<"PlantingCampaign"> | string | null
    createdAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
    responsible?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    volunteers?: UserListRelationFilter
  }

  export type PlantingCampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    locationDesc?: SortOrder
    species?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    budget?: SortOrderInput | SortOrder
    responsibleId?: SortOrderInput | SortOrder
    photos?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    responsible?: UserOrderByWithRelationInput
    volunteers?: UserOrderByRelationAggregateInput
  }

  export type PlantingCampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlantingCampaignWhereInput | PlantingCampaignWhereInput[]
    OR?: PlantingCampaignWhereInput[]
    NOT?: PlantingCampaignWhereInput | PlantingCampaignWhereInput[]
    name?: StringFilter<"PlantingCampaign"> | string
    description?: StringFilter<"PlantingCampaign"> | string
    latitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    longitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    locationDesc?: StringFilter<"PlantingCampaign"> | string
    species?: StringFilter<"PlantingCampaign"> | string
    numberOfTrees?: IntFilter<"PlantingCampaign"> | number
    treesPlanted?: IntFilter<"PlantingCampaign"> | number
    startDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    endDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    status?: StringFilter<"PlantingCampaign"> | string
    budget?: FloatNullableFilter<"PlantingCampaign"> | number | null
    responsibleId?: StringNullableFilter<"PlantingCampaign"> | string | null
    photos?: StringFilter<"PlantingCampaign"> | string
    notes?: StringNullableFilter<"PlantingCampaign"> | string | null
    createdAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
    responsible?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    volunteers?: UserListRelationFilter
  }, "id">

  export type PlantingCampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    locationDesc?: SortOrder
    species?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    budget?: SortOrderInput | SortOrder
    responsibleId?: SortOrderInput | SortOrder
    photos?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlantingCampaignCountOrderByAggregateInput
    _avg?: PlantingCampaignAvgOrderByAggregateInput
    _max?: PlantingCampaignMaxOrderByAggregateInput
    _min?: PlantingCampaignMinOrderByAggregateInput
    _sum?: PlantingCampaignSumOrderByAggregateInput
  }

  export type PlantingCampaignScalarWhereWithAggregatesInput = {
    AND?: PlantingCampaignScalarWhereWithAggregatesInput | PlantingCampaignScalarWhereWithAggregatesInput[]
    OR?: PlantingCampaignScalarWhereWithAggregatesInput[]
    NOT?: PlantingCampaignScalarWhereWithAggregatesInput | PlantingCampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    name?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    description?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    latitude?: FloatNullableWithAggregatesFilter<"PlantingCampaign"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"PlantingCampaign"> | number | null
    locationDesc?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    species?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    numberOfTrees?: IntWithAggregatesFilter<"PlantingCampaign"> | number
    treesPlanted?: IntWithAggregatesFilter<"PlantingCampaign"> | number
    startDate?: DateTimeWithAggregatesFilter<"PlantingCampaign"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"PlantingCampaign"> | Date | string
    status?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    budget?: FloatNullableWithAggregatesFilter<"PlantingCampaign"> | number | null
    responsibleId?: StringNullableWithAggregatesFilter<"PlantingCampaign"> | string | null
    photos?: StringWithAggregatesFilter<"PlantingCampaign"> | string
    notes?: StringNullableWithAggregatesFilter<"PlantingCampaign"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlantingCampaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlantingCampaign"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    notificationType?: StringFilter<"Notification"> | string
    relatedObjectId?: StringNullableFilter<"Notification"> | string | null
    relatedObjectType?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    notificationType?: SortOrder
    relatedObjectId?: SortOrderInput | SortOrder
    relatedObjectType?: SortOrderInput | SortOrder
    isRead?: SortOrder
    sentAt?: SortOrder
    readAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    notificationType?: StringFilter<"Notification"> | string
    relatedObjectId?: StringNullableFilter<"Notification"> | string | null
    relatedObjectType?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    notificationType?: SortOrder
    relatedObjectId?: SortOrderInput | SortOrder
    relatedObjectType?: SortOrderInput | SortOrder
    isRead?: SortOrder
    sentAt?: SortOrder
    readAt?: SortOrderInput | SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    notificationType?: StringWithAggregatesFilter<"Notification"> | string
    relatedObjectId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    relatedObjectType?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    sentAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    readAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    changes?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GreenSpaceCreateInput = {
    id?: string
    name: string
    type?: string
    location: string
    area: number
    description?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trees?: TreeCreateNestedManyWithoutGreenSpaceInput
  }

  export type GreenSpaceUncheckedCreateInput = {
    id?: string
    name: string
    type?: string
    location: string
    area: number
    description?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trees?: TreeUncheckedCreateNestedManyWithoutGreenSpaceInput
  }

  export type GreenSpaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trees?: TreeUpdateManyWithoutGreenSpaceNestedInput
  }

  export type GreenSpaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trees?: TreeUncheckedUpdateManyWithoutGreenSpaceNestedInput
  }

  export type GreenSpaceCreateManyInput = {
    id?: string
    name: string
    type?: string
    location: string
    area: number
    description?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GreenSpaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GreenSpaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreeCreateInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    adoptedBy?: UserCreateNestedOneWithoutAdoptedTreesInput
    greenSpace?: GreenSpaceCreateNestedOneWithoutTreesInput
    wateringLogs?: WateringLogCreateNestedManyWithoutTreeInput
  }

  export type TreeUncheckedCreateInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptedById?: string | null
    adoptionDate?: Date | string | null
    greenSpaceId?: string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wateringLogs?: WateringLogUncheckedCreateNestedManyWithoutTreeInput
  }

  export type TreeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adoptedBy?: UserUpdateOneWithoutAdoptedTreesNestedInput
    greenSpace?: GreenSpaceUpdateOneWithoutTreesNestedInput
    wateringLogs?: WateringLogUpdateManyWithoutTreeNestedInput
  }

  export type TreeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptedById?: NullableStringFieldUpdateOperationsInput | string | null
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    greenSpaceId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wateringLogs?: WateringLogUncheckedUpdateManyWithoutTreeNestedInput
  }

  export type TreeCreateManyInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptedById?: string | null
    adoptionDate?: Date | string | null
    greenSpaceId?: string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptedById?: NullableStringFieldUpdateOperationsInput | string | null
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    greenSpaceId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogCreateInput = {
    id?: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
    tree: TreeCreateNestedOneWithoutWateringLogsInput
  }

  export type WateringLogUncheckedCreateInput = {
    id?: string
    treeId: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
  }

  export type WateringLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tree?: TreeUpdateOneRequiredWithoutWateringLogsNestedInput
  }

  export type WateringLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    treeId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogCreateManyInput = {
    id?: string
    treeId: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
  }

  export type WateringLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    treeId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareAlertCreateInput = {
    id?: string
    neighborhood: string
    alertType?: string
    message: string
    status?: string
    createdAt?: Date | string
  }

  export type CareAlertUncheckedCreateInput = {
    id?: string
    neighborhood: string
    alertType?: string
    message: string
    status?: string
    createdAt?: Date | string
  }

  export type CareAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareAlertCreateManyInput = {
    id?: string
    neighborhood: string
    alertType?: string
    message: string
    status?: string
    createdAt?: Date | string
  }

  export type CareAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeighborhoodStatsCreateInput = {
    id?: string
    neighborhood: string
    totalTrees?: number
    adoptedTrees?: number
    wateringsCount?: number
    ecoPoints?: number
    updatedAt?: Date | string
  }

  export type NeighborhoodStatsUncheckedCreateInput = {
    id?: string
    neighborhood: string
    totalTrees?: number
    adoptedTrees?: number
    wateringsCount?: number
    ecoPoints?: number
    updatedAt?: Date | string
  }

  export type NeighborhoodStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    totalTrees?: IntFieldUpdateOperationsInput | number
    adoptedTrees?: IntFieldUpdateOperationsInput | number
    wateringsCount?: IntFieldUpdateOperationsInput | number
    ecoPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeighborhoodStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    totalTrees?: IntFieldUpdateOperationsInput | number
    adoptedTrees?: IntFieldUpdateOperationsInput | number
    wateringsCount?: IntFieldUpdateOperationsInput | number
    ecoPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeighborhoodStatsCreateManyInput = {
    id?: string
    neighborhood: string
    totalTrees?: number
    adoptedTrees?: number
    wateringsCount?: number
    ecoPoints?: number
    updatedAt?: Date | string
  }

  export type NeighborhoodStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    totalTrees?: IntFieldUpdateOperationsInput | number
    adoptedTrees?: IntFieldUpdateOperationsInput | number
    wateringsCount?: IntFieldUpdateOperationsInput | number
    ecoPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NeighborhoodStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    totalTrees?: IntFieldUpdateOperationsInput | number
    adoptedTrees?: IntFieldUpdateOperationsInput | number
    wateringsCount?: IntFieldUpdateOperationsInput | number
    ecoPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReportsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedReportsInput
    assignments?: ReportAssignmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    assignedToId?: string | null
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedReportsNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    assignedToId?: string | null
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportAssignmentCreateInput = {
    id?: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
    report: ReportCreateNestedOneWithoutAssignmentsInput
    fieldWorker: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type ReportAssignmentUncheckedCreateInput = {
    id?: string
    reportId: string
    fieldWorkerId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type ReportAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    report?: ReportUpdateOneRequiredWithoutAssignmentsNestedInput
    fieldWorker?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ReportAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    fieldWorkerId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportAssignmentCreateManyInput = {
    id?: string
    reportId: string
    fieldWorkerId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type ReportAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    fieldWorkerId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PlantingCampaignCreateInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responsible?: UserCreateNestedOneWithoutCampaignsInput
    volunteers?: UserCreateNestedManyWithoutVolunteerCampaignsInput
  }

  export type PlantingCampaignUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    responsibleId?: string | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteers?: UserUncheckedCreateNestedManyWithoutVolunteerCampaignsInput
  }

  export type PlantingCampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responsible?: UserUpdateOneWithoutCampaignsNestedInput
    volunteers?: UserUpdateManyWithoutVolunteerCampaignsNestedInput
  }

  export type PlantingCampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteers?: UserUncheckedUpdateManyWithoutVolunteerCampaignsNestedInput
  }

  export type PlantingCampaignCreateManyInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    responsibleId?: string | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlantingCampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlantingCampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type TreeListRelationFilter = {
    every?: TreeWhereInput
    some?: TreeWhereInput
    none?: TreeWhereInput
  }

  export type ReportAssignmentListRelationFilter = {
    every?: ReportAssignmentWhereInput
    some?: ReportAssignmentWhereInput
    none?: ReportAssignmentWhereInput
  }

  export type PlantingCampaignListRelationFilter = {
    every?: PlantingCampaignWhereInput
    some?: PlantingCampaignWhereInput
    none?: PlantingCampaignWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlantingCampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    neighborhood?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    neighborhood?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    neighborhood?: SortOrder
    avatar?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GreenSpaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    area?: SortOrder
    description?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GreenSpaceAvgOrderByAggregateInput = {
    area?: SortOrder
  }

  export type GreenSpaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    area?: SortOrder
    description?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GreenSpaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    area?: SortOrder
    description?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GreenSpaceSumOrderByAggregateInput = {
    area?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GreenSpaceNullableRelationFilter = {
    is?: GreenSpaceWhereInput | null
    isNot?: GreenSpaceWhereInput | null
  }

  export type WateringLogListRelationFilter = {
    every?: WateringLogWhereInput
    some?: WateringLogWhereInput
    none?: WateringLogWhereInput
  }

  export type WateringLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreeCountOrderByAggregateInput = {
    id?: SortOrder
    species?: SortOrder
    speciesOther?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    plantingDate?: SortOrder
    height?: SortOrder
    trunkDiameter?: SortOrder
    healthStatus?: SortOrder
    adoptedById?: SortOrder
    adoptionDate?: SortOrder
    greenSpaceId?: SortOrder
    notes?: SortOrder
    photos?: SortOrder
    neighborhood?: SortOrder
    nickname?: SortOrder
    lastWateredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreeAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    height?: SortOrder
    trunkDiameter?: SortOrder
  }

  export type TreeMaxOrderByAggregateInput = {
    id?: SortOrder
    species?: SortOrder
    speciesOther?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    plantingDate?: SortOrder
    height?: SortOrder
    trunkDiameter?: SortOrder
    healthStatus?: SortOrder
    adoptedById?: SortOrder
    adoptionDate?: SortOrder
    greenSpaceId?: SortOrder
    notes?: SortOrder
    photos?: SortOrder
    neighborhood?: SortOrder
    nickname?: SortOrder
    lastWateredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreeMinOrderByAggregateInput = {
    id?: SortOrder
    species?: SortOrder
    speciesOther?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    plantingDate?: SortOrder
    height?: SortOrder
    trunkDiameter?: SortOrder
    healthStatus?: SortOrder
    adoptedById?: SortOrder
    adoptionDate?: SortOrder
    greenSpaceId?: SortOrder
    notes?: SortOrder
    photos?: SortOrder
    neighborhood?: SortOrder
    nickname?: SortOrder
    lastWateredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TreeSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    height?: SortOrder
    trunkDiameter?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TreeRelationFilter = {
    is?: TreeWhereInput
    isNot?: TreeWhereInput
  }

  export type WateringLogCountOrderByAggregateInput = {
    id?: SortOrder
    treeId?: SortOrder
    userName?: SortOrder
    liters?: SortOrder
    earnedPoints?: SortOrder
    photoProof?: SortOrder
    photoVerified?: SortOrder
    loggedAt?: SortOrder
  }

  export type WateringLogAvgOrderByAggregateInput = {
    liters?: SortOrder
    earnedPoints?: SortOrder
  }

  export type WateringLogMaxOrderByAggregateInput = {
    id?: SortOrder
    treeId?: SortOrder
    userName?: SortOrder
    liters?: SortOrder
    earnedPoints?: SortOrder
    photoProof?: SortOrder
    photoVerified?: SortOrder
    loggedAt?: SortOrder
  }

  export type WateringLogMinOrderByAggregateInput = {
    id?: SortOrder
    treeId?: SortOrder
    userName?: SortOrder
    liters?: SortOrder
    earnedPoints?: SortOrder
    photoProof?: SortOrder
    photoVerified?: SortOrder
    loggedAt?: SortOrder
  }

  export type WateringLogSumOrderByAggregateInput = {
    liters?: SortOrder
    earnedPoints?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CareAlertCountOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    alertType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    alertType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareAlertMinOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    alertType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type NeighborhoodStatsCountOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeighborhoodStatsAvgOrderByAggregateInput = {
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
  }

  export type NeighborhoodStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeighborhoodStatsMinOrderByAggregateInput = {
    id?: SortOrder
    neighborhood?: SortOrder
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type NeighborhoodStatsSumOrderByAggregateInput = {
    totalTrees?: SortOrder
    adoptedTrees?: SortOrder
    wateringsCount?: SortOrder
    ecoPoints?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    issueType?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    photos?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assignedToId?: SortOrder
    trackingNumber?: SortOrder
    adminNotes?: SortOrder
    resolutionNotes?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    issueType?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    photos?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assignedToId?: SortOrder
    trackingNumber?: SortOrder
    adminNotes?: SortOrder
    resolutionNotes?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    issueType?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    photos?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assignedToId?: SortOrder
    trackingNumber?: SortOrder
    adminNotes?: SortOrder
    resolutionNotes?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    assignedAt?: SortOrder
    resolvedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ReportRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type ReportAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    fieldWorkerId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    fieldWorkerId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    fieldWorkerId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    completedAt?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlantingCampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    locationDesc?: SortOrder
    species?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    responsibleId?: SortOrder
    photos?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlantingCampaignAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    budget?: SortOrder
  }

  export type PlantingCampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    locationDesc?: SortOrder
    species?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    responsibleId?: SortOrder
    photos?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlantingCampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    locationDesc?: SortOrder
    species?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    budget?: SortOrder
    responsibleId?: SortOrder
    photos?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlantingCampaignSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    numberOfTrees?: SortOrder
    treesPlanted?: SortOrder
    budget?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    notificationType?: SortOrder
    relatedObjectId?: SortOrder
    relatedObjectType?: SortOrder
    isRead?: SortOrder
    sentAt?: SortOrder
    readAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    notificationType?: SortOrder
    relatedObjectId?: SortOrder
    relatedObjectType?: SortOrder
    isRead?: SortOrder
    sentAt?: SortOrder
    readAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    notificationType?: SortOrder
    relatedObjectId?: SortOrder
    relatedObjectType?: SortOrder
    isRead?: SortOrder
    sentAt?: SortOrder
    readAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    changes?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    changes?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    changes?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type TreeCreateNestedManyWithoutAdoptedByInput = {
    create?: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput> | TreeCreateWithoutAdoptedByInput[] | TreeUncheckedCreateWithoutAdoptedByInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutAdoptedByInput | TreeCreateOrConnectWithoutAdoptedByInput[]
    createMany?: TreeCreateManyAdoptedByInputEnvelope
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput> | ReportCreateWithoutAssignedToInput[] | ReportUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedToInput | ReportCreateOrConnectWithoutAssignedToInput[]
    createMany?: ReportCreateManyAssignedToInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportAssignmentCreateNestedManyWithoutFieldWorkerInput = {
    create?: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput> | ReportAssignmentCreateWithoutFieldWorkerInput[] | ReportAssignmentUncheckedCreateWithoutFieldWorkerInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutFieldWorkerInput | ReportAssignmentCreateOrConnectWithoutFieldWorkerInput[]
    createMany?: ReportAssignmentCreateManyFieldWorkerInputEnvelope
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
  }

  export type PlantingCampaignCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput> | PlantingCampaignCreateWithoutResponsibleInput[] | PlantingCampaignUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutResponsibleInput | PlantingCampaignCreateOrConnectWithoutResponsibleInput[]
    createMany?: PlantingCampaignCreateManyResponsibleInputEnvelope
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
  }

  export type PlantingCampaignCreateNestedManyWithoutVolunteersInput = {
    create?: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput> | PlantingCampaignCreateWithoutVolunteersInput[] | PlantingCampaignUncheckedCreateWithoutVolunteersInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutVolunteersInput | PlantingCampaignCreateOrConnectWithoutVolunteersInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type TreeUncheckedCreateNestedManyWithoutAdoptedByInput = {
    create?: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput> | TreeCreateWithoutAdoptedByInput[] | TreeUncheckedCreateWithoutAdoptedByInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutAdoptedByInput | TreeCreateOrConnectWithoutAdoptedByInput[]
    createMany?: TreeCreateManyAdoptedByInputEnvelope
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput> | ReportCreateWithoutAssignedToInput[] | ReportUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedToInput | ReportCreateOrConnectWithoutAssignedToInput[]
    createMany?: ReportCreateManyAssignedToInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput = {
    create?: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput> | ReportAssignmentCreateWithoutFieldWorkerInput[] | ReportAssignmentUncheckedCreateWithoutFieldWorkerInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutFieldWorkerInput | ReportAssignmentCreateOrConnectWithoutFieldWorkerInput[]
    createMany?: ReportAssignmentCreateManyFieldWorkerInputEnvelope
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
  }

  export type PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput> | PlantingCampaignCreateWithoutResponsibleInput[] | PlantingCampaignUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutResponsibleInput | PlantingCampaignCreateOrConnectWithoutResponsibleInput[]
    createMany?: PlantingCampaignCreateManyResponsibleInputEnvelope
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
  }

  export type PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput = {
    create?: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput> | PlantingCampaignCreateWithoutVolunteersInput[] | PlantingCampaignUncheckedCreateWithoutVolunteersInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutVolunteersInput | PlantingCampaignCreateOrConnectWithoutVolunteersInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type TreeUpdateManyWithoutAdoptedByNestedInput = {
    create?: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput> | TreeCreateWithoutAdoptedByInput[] | TreeUncheckedCreateWithoutAdoptedByInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutAdoptedByInput | TreeCreateOrConnectWithoutAdoptedByInput[]
    upsert?: TreeUpsertWithWhereUniqueWithoutAdoptedByInput | TreeUpsertWithWhereUniqueWithoutAdoptedByInput[]
    createMany?: TreeCreateManyAdoptedByInputEnvelope
    set?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    disconnect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    delete?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    update?: TreeUpdateWithWhereUniqueWithoutAdoptedByInput | TreeUpdateWithWhereUniqueWithoutAdoptedByInput[]
    updateMany?: TreeUpdateManyWithWhereWithoutAdoptedByInput | TreeUpdateManyWithWhereWithoutAdoptedByInput[]
    deleteMany?: TreeScalarWhereInput | TreeScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput> | ReportCreateWithoutAssignedToInput[] | ReportUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedToInput | ReportCreateOrConnectWithoutAssignedToInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAssignedToInput | ReportUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: ReportCreateManyAssignedToInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAssignedToInput | ReportUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAssignedToInput | ReportUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput = {
    create?: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput> | ReportAssignmentCreateWithoutFieldWorkerInput[] | ReportAssignmentUncheckedCreateWithoutFieldWorkerInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutFieldWorkerInput | ReportAssignmentCreateOrConnectWithoutFieldWorkerInput[]
    upsert?: ReportAssignmentUpsertWithWhereUniqueWithoutFieldWorkerInput | ReportAssignmentUpsertWithWhereUniqueWithoutFieldWorkerInput[]
    createMany?: ReportAssignmentCreateManyFieldWorkerInputEnvelope
    set?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    disconnect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    delete?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    update?: ReportAssignmentUpdateWithWhereUniqueWithoutFieldWorkerInput | ReportAssignmentUpdateWithWhereUniqueWithoutFieldWorkerInput[]
    updateMany?: ReportAssignmentUpdateManyWithWhereWithoutFieldWorkerInput | ReportAssignmentUpdateManyWithWhereWithoutFieldWorkerInput[]
    deleteMany?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
  }

  export type PlantingCampaignUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput> | PlantingCampaignCreateWithoutResponsibleInput[] | PlantingCampaignUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutResponsibleInput | PlantingCampaignCreateOrConnectWithoutResponsibleInput[]
    upsert?: PlantingCampaignUpsertWithWhereUniqueWithoutResponsibleInput | PlantingCampaignUpsertWithWhereUniqueWithoutResponsibleInput[]
    createMany?: PlantingCampaignCreateManyResponsibleInputEnvelope
    set?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    disconnect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    delete?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    update?: PlantingCampaignUpdateWithWhereUniqueWithoutResponsibleInput | PlantingCampaignUpdateWithWhereUniqueWithoutResponsibleInput[]
    updateMany?: PlantingCampaignUpdateManyWithWhereWithoutResponsibleInput | PlantingCampaignUpdateManyWithWhereWithoutResponsibleInput[]
    deleteMany?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
  }

  export type PlantingCampaignUpdateManyWithoutVolunteersNestedInput = {
    create?: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput> | PlantingCampaignCreateWithoutVolunteersInput[] | PlantingCampaignUncheckedCreateWithoutVolunteersInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutVolunteersInput | PlantingCampaignCreateOrConnectWithoutVolunteersInput[]
    upsert?: PlantingCampaignUpsertWithWhereUniqueWithoutVolunteersInput | PlantingCampaignUpsertWithWhereUniqueWithoutVolunteersInput[]
    set?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    disconnect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    delete?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    update?: PlantingCampaignUpdateWithWhereUniqueWithoutVolunteersInput | PlantingCampaignUpdateWithWhereUniqueWithoutVolunteersInput[]
    updateMany?: PlantingCampaignUpdateManyWithWhereWithoutVolunteersInput | PlantingCampaignUpdateManyWithWhereWithoutVolunteersInput[]
    deleteMany?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type TreeUncheckedUpdateManyWithoutAdoptedByNestedInput = {
    create?: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput> | TreeCreateWithoutAdoptedByInput[] | TreeUncheckedCreateWithoutAdoptedByInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutAdoptedByInput | TreeCreateOrConnectWithoutAdoptedByInput[]
    upsert?: TreeUpsertWithWhereUniqueWithoutAdoptedByInput | TreeUpsertWithWhereUniqueWithoutAdoptedByInput[]
    createMany?: TreeCreateManyAdoptedByInputEnvelope
    set?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    disconnect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    delete?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    update?: TreeUpdateWithWhereUniqueWithoutAdoptedByInput | TreeUpdateWithWhereUniqueWithoutAdoptedByInput[]
    updateMany?: TreeUpdateManyWithWhereWithoutAdoptedByInput | TreeUpdateManyWithWhereWithoutAdoptedByInput[]
    deleteMany?: TreeScalarWhereInput | TreeScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput> | ReportCreateWithoutAssignedToInput[] | ReportUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedToInput | ReportCreateOrConnectWithoutAssignedToInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAssignedToInput | ReportUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: ReportCreateManyAssignedToInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAssignedToInput | ReportUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAssignedToInput | ReportUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput = {
    create?: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput> | ReportAssignmentCreateWithoutFieldWorkerInput[] | ReportAssignmentUncheckedCreateWithoutFieldWorkerInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutFieldWorkerInput | ReportAssignmentCreateOrConnectWithoutFieldWorkerInput[]
    upsert?: ReportAssignmentUpsertWithWhereUniqueWithoutFieldWorkerInput | ReportAssignmentUpsertWithWhereUniqueWithoutFieldWorkerInput[]
    createMany?: ReportAssignmentCreateManyFieldWorkerInputEnvelope
    set?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    disconnect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    delete?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    update?: ReportAssignmentUpdateWithWhereUniqueWithoutFieldWorkerInput | ReportAssignmentUpdateWithWhereUniqueWithoutFieldWorkerInput[]
    updateMany?: ReportAssignmentUpdateManyWithWhereWithoutFieldWorkerInput | ReportAssignmentUpdateManyWithWhereWithoutFieldWorkerInput[]
    deleteMany?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
  }

  export type PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput> | PlantingCampaignCreateWithoutResponsibleInput[] | PlantingCampaignUncheckedCreateWithoutResponsibleInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutResponsibleInput | PlantingCampaignCreateOrConnectWithoutResponsibleInput[]
    upsert?: PlantingCampaignUpsertWithWhereUniqueWithoutResponsibleInput | PlantingCampaignUpsertWithWhereUniqueWithoutResponsibleInput[]
    createMany?: PlantingCampaignCreateManyResponsibleInputEnvelope
    set?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    disconnect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    delete?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    update?: PlantingCampaignUpdateWithWhereUniqueWithoutResponsibleInput | PlantingCampaignUpdateWithWhereUniqueWithoutResponsibleInput[]
    updateMany?: PlantingCampaignUpdateManyWithWhereWithoutResponsibleInput | PlantingCampaignUpdateManyWithWhereWithoutResponsibleInput[]
    deleteMany?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
  }

  export type PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput = {
    create?: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput> | PlantingCampaignCreateWithoutVolunteersInput[] | PlantingCampaignUncheckedCreateWithoutVolunteersInput[]
    connectOrCreate?: PlantingCampaignCreateOrConnectWithoutVolunteersInput | PlantingCampaignCreateOrConnectWithoutVolunteersInput[]
    upsert?: PlantingCampaignUpsertWithWhereUniqueWithoutVolunteersInput | PlantingCampaignUpsertWithWhereUniqueWithoutVolunteersInput[]
    set?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    disconnect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    delete?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    connect?: PlantingCampaignWhereUniqueInput | PlantingCampaignWhereUniqueInput[]
    update?: PlantingCampaignUpdateWithWhereUniqueWithoutVolunteersInput | PlantingCampaignUpdateWithWhereUniqueWithoutVolunteersInput[]
    updateMany?: PlantingCampaignUpdateManyWithWhereWithoutVolunteersInput | PlantingCampaignUpdateManyWithWhereWithoutVolunteersInput[]
    deleteMany?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type TreeCreateNestedManyWithoutGreenSpaceInput = {
    create?: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput> | TreeCreateWithoutGreenSpaceInput[] | TreeUncheckedCreateWithoutGreenSpaceInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutGreenSpaceInput | TreeCreateOrConnectWithoutGreenSpaceInput[]
    createMany?: TreeCreateManyGreenSpaceInputEnvelope
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
  }

  export type TreeUncheckedCreateNestedManyWithoutGreenSpaceInput = {
    create?: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput> | TreeCreateWithoutGreenSpaceInput[] | TreeUncheckedCreateWithoutGreenSpaceInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutGreenSpaceInput | TreeCreateOrConnectWithoutGreenSpaceInput[]
    createMany?: TreeCreateManyGreenSpaceInputEnvelope
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TreeUpdateManyWithoutGreenSpaceNestedInput = {
    create?: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput> | TreeCreateWithoutGreenSpaceInput[] | TreeUncheckedCreateWithoutGreenSpaceInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutGreenSpaceInput | TreeCreateOrConnectWithoutGreenSpaceInput[]
    upsert?: TreeUpsertWithWhereUniqueWithoutGreenSpaceInput | TreeUpsertWithWhereUniqueWithoutGreenSpaceInput[]
    createMany?: TreeCreateManyGreenSpaceInputEnvelope
    set?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    disconnect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    delete?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    update?: TreeUpdateWithWhereUniqueWithoutGreenSpaceInput | TreeUpdateWithWhereUniqueWithoutGreenSpaceInput[]
    updateMany?: TreeUpdateManyWithWhereWithoutGreenSpaceInput | TreeUpdateManyWithWhereWithoutGreenSpaceInput[]
    deleteMany?: TreeScalarWhereInput | TreeScalarWhereInput[]
  }

  export type TreeUncheckedUpdateManyWithoutGreenSpaceNestedInput = {
    create?: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput> | TreeCreateWithoutGreenSpaceInput[] | TreeUncheckedCreateWithoutGreenSpaceInput[]
    connectOrCreate?: TreeCreateOrConnectWithoutGreenSpaceInput | TreeCreateOrConnectWithoutGreenSpaceInput[]
    upsert?: TreeUpsertWithWhereUniqueWithoutGreenSpaceInput | TreeUpsertWithWhereUniqueWithoutGreenSpaceInput[]
    createMany?: TreeCreateManyGreenSpaceInputEnvelope
    set?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    disconnect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    delete?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    connect?: TreeWhereUniqueInput | TreeWhereUniqueInput[]
    update?: TreeUpdateWithWhereUniqueWithoutGreenSpaceInput | TreeUpdateWithWhereUniqueWithoutGreenSpaceInput[]
    updateMany?: TreeUpdateManyWithWhereWithoutGreenSpaceInput | TreeUpdateManyWithWhereWithoutGreenSpaceInput[]
    deleteMany?: TreeScalarWhereInput | TreeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdoptedTreesInput = {
    create?: XOR<UserCreateWithoutAdoptedTreesInput, UserUncheckedCreateWithoutAdoptedTreesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdoptedTreesInput
    connect?: UserWhereUniqueInput
  }

  export type GreenSpaceCreateNestedOneWithoutTreesInput = {
    create?: XOR<GreenSpaceCreateWithoutTreesInput, GreenSpaceUncheckedCreateWithoutTreesInput>
    connectOrCreate?: GreenSpaceCreateOrConnectWithoutTreesInput
    connect?: GreenSpaceWhereUniqueInput
  }

  export type WateringLogCreateNestedManyWithoutTreeInput = {
    create?: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput> | WateringLogCreateWithoutTreeInput[] | WateringLogUncheckedCreateWithoutTreeInput[]
    connectOrCreate?: WateringLogCreateOrConnectWithoutTreeInput | WateringLogCreateOrConnectWithoutTreeInput[]
    createMany?: WateringLogCreateManyTreeInputEnvelope
    connect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
  }

  export type WateringLogUncheckedCreateNestedManyWithoutTreeInput = {
    create?: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput> | WateringLogCreateWithoutTreeInput[] | WateringLogUncheckedCreateWithoutTreeInput[]
    connectOrCreate?: WateringLogCreateOrConnectWithoutTreeInput | WateringLogCreateOrConnectWithoutTreeInput[]
    createMany?: WateringLogCreateManyTreeInputEnvelope
    connect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutAdoptedTreesNestedInput = {
    create?: XOR<UserCreateWithoutAdoptedTreesInput, UserUncheckedCreateWithoutAdoptedTreesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdoptedTreesInput
    upsert?: UserUpsertWithoutAdoptedTreesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdoptedTreesInput, UserUpdateWithoutAdoptedTreesInput>, UserUncheckedUpdateWithoutAdoptedTreesInput>
  }

  export type GreenSpaceUpdateOneWithoutTreesNestedInput = {
    create?: XOR<GreenSpaceCreateWithoutTreesInput, GreenSpaceUncheckedCreateWithoutTreesInput>
    connectOrCreate?: GreenSpaceCreateOrConnectWithoutTreesInput
    upsert?: GreenSpaceUpsertWithoutTreesInput
    disconnect?: GreenSpaceWhereInput | boolean
    delete?: GreenSpaceWhereInput | boolean
    connect?: GreenSpaceWhereUniqueInput
    update?: XOR<XOR<GreenSpaceUpdateToOneWithWhereWithoutTreesInput, GreenSpaceUpdateWithoutTreesInput>, GreenSpaceUncheckedUpdateWithoutTreesInput>
  }

  export type WateringLogUpdateManyWithoutTreeNestedInput = {
    create?: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput> | WateringLogCreateWithoutTreeInput[] | WateringLogUncheckedCreateWithoutTreeInput[]
    connectOrCreate?: WateringLogCreateOrConnectWithoutTreeInput | WateringLogCreateOrConnectWithoutTreeInput[]
    upsert?: WateringLogUpsertWithWhereUniqueWithoutTreeInput | WateringLogUpsertWithWhereUniqueWithoutTreeInput[]
    createMany?: WateringLogCreateManyTreeInputEnvelope
    set?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    disconnect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    delete?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    connect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    update?: WateringLogUpdateWithWhereUniqueWithoutTreeInput | WateringLogUpdateWithWhereUniqueWithoutTreeInput[]
    updateMany?: WateringLogUpdateManyWithWhereWithoutTreeInput | WateringLogUpdateManyWithWhereWithoutTreeInput[]
    deleteMany?: WateringLogScalarWhereInput | WateringLogScalarWhereInput[]
  }

  export type WateringLogUncheckedUpdateManyWithoutTreeNestedInput = {
    create?: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput> | WateringLogCreateWithoutTreeInput[] | WateringLogUncheckedCreateWithoutTreeInput[]
    connectOrCreate?: WateringLogCreateOrConnectWithoutTreeInput | WateringLogCreateOrConnectWithoutTreeInput[]
    upsert?: WateringLogUpsertWithWhereUniqueWithoutTreeInput | WateringLogUpsertWithWhereUniqueWithoutTreeInput[]
    createMany?: WateringLogCreateManyTreeInputEnvelope
    set?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    disconnect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    delete?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    connect?: WateringLogWhereUniqueInput | WateringLogWhereUniqueInput[]
    update?: WateringLogUpdateWithWhereUniqueWithoutTreeInput | WateringLogUpdateWithWhereUniqueWithoutTreeInput[]
    updateMany?: WateringLogUpdateManyWithWhereWithoutTreeInput | WateringLogUpdateManyWithWhereWithoutTreeInput[]
    deleteMany?: WateringLogScalarWhereInput | WateringLogScalarWhereInput[]
  }

  export type TreeCreateNestedOneWithoutWateringLogsInput = {
    create?: XOR<TreeCreateWithoutWateringLogsInput, TreeUncheckedCreateWithoutWateringLogsInput>
    connectOrCreate?: TreeCreateOrConnectWithoutWateringLogsInput
    connect?: TreeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TreeUpdateOneRequiredWithoutWateringLogsNestedInput = {
    create?: XOR<TreeCreateWithoutWateringLogsInput, TreeUncheckedCreateWithoutWateringLogsInput>
    connectOrCreate?: TreeCreateOrConnectWithoutWateringLogsInput
    upsert?: TreeUpsertWithoutWateringLogsInput
    connect?: TreeWhereUniqueInput
    update?: XOR<XOR<TreeUpdateToOneWithWhereWithoutWateringLogsInput, TreeUpdateWithoutWateringLogsInput>, TreeUncheckedUpdateWithoutWateringLogsInput>
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedReportsInput = {
    create?: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedReportsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportAssignmentCreateNestedManyWithoutReportInput = {
    create?: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput> | ReportAssignmentCreateWithoutReportInput[] | ReportAssignmentUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutReportInput | ReportAssignmentCreateOrConnectWithoutReportInput[]
    createMany?: ReportAssignmentCreateManyReportInputEnvelope
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
  }

  export type ReportAssignmentUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput> | ReportAssignmentCreateWithoutReportInput[] | ReportAssignmentUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutReportInput | ReportAssignmentCreateOrConnectWithoutReportInput[]
    createMany?: ReportAssignmentCreateManyReportInputEnvelope
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateOneWithoutAssignedReportsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedReportsInput
    upsert?: UserUpsertWithoutAssignedReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedReportsInput, UserUpdateWithoutAssignedReportsInput>, UserUncheckedUpdateWithoutAssignedReportsInput>
  }

  export type ReportAssignmentUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput> | ReportAssignmentCreateWithoutReportInput[] | ReportAssignmentUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutReportInput | ReportAssignmentCreateOrConnectWithoutReportInput[]
    upsert?: ReportAssignmentUpsertWithWhereUniqueWithoutReportInput | ReportAssignmentUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReportAssignmentCreateManyReportInputEnvelope
    set?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    disconnect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    delete?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    update?: ReportAssignmentUpdateWithWhereUniqueWithoutReportInput | ReportAssignmentUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReportAssignmentUpdateManyWithWhereWithoutReportInput | ReportAssignmentUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
  }

  export type ReportAssignmentUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput> | ReportAssignmentCreateWithoutReportInput[] | ReportAssignmentUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportAssignmentCreateOrConnectWithoutReportInput | ReportAssignmentCreateOrConnectWithoutReportInput[]
    upsert?: ReportAssignmentUpsertWithWhereUniqueWithoutReportInput | ReportAssignmentUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReportAssignmentCreateManyReportInputEnvelope
    set?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    disconnect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    delete?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    connect?: ReportAssignmentWhereUniqueInput | ReportAssignmentWhereUniqueInput[]
    update?: ReportAssignmentUpdateWithWhereUniqueWithoutReportInput | ReportAssignmentUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReportAssignmentUpdateManyWithWhereWithoutReportInput | ReportAssignmentUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ReportCreateWithoutAssignmentsInput, ReportUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAssignmentsInput
    connect?: ReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ReportCreateWithoutAssignmentsInput, ReportUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAssignmentsInput
    upsert?: ReportUpsertWithoutAssignmentsInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutAssignmentsInput, ReportUpdateWithoutAssignmentsInput>, ReportUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    upsert?: UserUpsertWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignmentsInput, UserUpdateWithoutAssignmentsInput>, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutVolunteerCampaignsInput = {
    create?: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput> | UserCreateWithoutVolunteerCampaignsInput[] | UserUncheckedCreateWithoutVolunteerCampaignsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutVolunteerCampaignsInput | UserCreateOrConnectWithoutVolunteerCampaignsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutVolunteerCampaignsInput = {
    create?: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput> | UserCreateWithoutVolunteerCampaignsInput[] | UserUncheckedCreateWithoutVolunteerCampaignsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutVolunteerCampaignsInput | UserCreateOrConnectWithoutVolunteerCampaignsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCampaignsNestedInput = {
    create?: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignsInput
    upsert?: UserUpsertWithoutCampaignsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampaignsInput, UserUpdateWithoutCampaignsInput>, UserUncheckedUpdateWithoutCampaignsInput>
  }

  export type UserUpdateManyWithoutVolunteerCampaignsNestedInput = {
    create?: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput> | UserCreateWithoutVolunteerCampaignsInput[] | UserUncheckedCreateWithoutVolunteerCampaignsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutVolunteerCampaignsInput | UserCreateOrConnectWithoutVolunteerCampaignsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutVolunteerCampaignsInput | UserUpsertWithWhereUniqueWithoutVolunteerCampaignsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutVolunteerCampaignsInput | UserUpdateWithWhereUniqueWithoutVolunteerCampaignsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutVolunteerCampaignsInput | UserUpdateManyWithWhereWithoutVolunteerCampaignsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutVolunteerCampaignsNestedInput = {
    create?: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput> | UserCreateWithoutVolunteerCampaignsInput[] | UserUncheckedCreateWithoutVolunteerCampaignsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutVolunteerCampaignsInput | UserCreateOrConnectWithoutVolunteerCampaignsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutVolunteerCampaignsInput | UserUpsertWithWhereUniqueWithoutVolunteerCampaignsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutVolunteerCampaignsInput | UserUpdateWithWhereUniqueWithoutVolunteerCampaignsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutVolunteerCampaignsInput | UserUpdateManyWithWhereWithoutVolunteerCampaignsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ReportCreateWithoutUserInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    assignedTo?: UserCreateNestedOneWithoutAssignedReportsInput
    assignments?: ReportAssignmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutUserInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    assignedToId?: string | null
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutUserInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateManyUserInputEnvelope = {
    data: ReportCreateManyUserInput | ReportCreateManyUserInput[]
  }

  export type TreeCreateWithoutAdoptedByInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    greenSpace?: GreenSpaceCreateNestedOneWithoutTreesInput
    wateringLogs?: WateringLogCreateNestedManyWithoutTreeInput
  }

  export type TreeUncheckedCreateWithoutAdoptedByInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    greenSpaceId?: string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wateringLogs?: WateringLogUncheckedCreateNestedManyWithoutTreeInput
  }

  export type TreeCreateOrConnectWithoutAdoptedByInput = {
    where: TreeWhereUniqueInput
    create: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput>
  }

  export type TreeCreateManyAdoptedByInputEnvelope = {
    data: TreeCreateManyAdoptedByInput | TreeCreateManyAdoptedByInput[]
  }

  export type ReportCreateWithoutAssignedToInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReportsInput
    assignments?: ReportAssignmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutAssignedToInput = {
    id?: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutAssignedToInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput>
  }

  export type ReportCreateManyAssignedToInputEnvelope = {
    data: ReportCreateManyAssignedToInput | ReportCreateManyAssignedToInput[]
  }

  export type ReportAssignmentCreateWithoutFieldWorkerInput = {
    id?: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
    report: ReportCreateNestedOneWithoutAssignmentsInput
  }

  export type ReportAssignmentUncheckedCreateWithoutFieldWorkerInput = {
    id?: string
    reportId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type ReportAssignmentCreateOrConnectWithoutFieldWorkerInput = {
    where: ReportAssignmentWhereUniqueInput
    create: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput>
  }

  export type ReportAssignmentCreateManyFieldWorkerInputEnvelope = {
    data: ReportAssignmentCreateManyFieldWorkerInput | ReportAssignmentCreateManyFieldWorkerInput[]
  }

  export type PlantingCampaignCreateWithoutResponsibleInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteers?: UserCreateNestedManyWithoutVolunteerCampaignsInput
  }

  export type PlantingCampaignUncheckedCreateWithoutResponsibleInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteers?: UserUncheckedCreateNestedManyWithoutVolunteerCampaignsInput
  }

  export type PlantingCampaignCreateOrConnectWithoutResponsibleInput = {
    where: PlantingCampaignWhereUniqueInput
    create: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput>
  }

  export type PlantingCampaignCreateManyResponsibleInputEnvelope = {
    data: PlantingCampaignCreateManyResponsibleInput | PlantingCampaignCreateManyResponsibleInput[]
  }

  export type PlantingCampaignCreateWithoutVolunteersInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responsible?: UserCreateNestedOneWithoutCampaignsInput
  }

  export type PlantingCampaignUncheckedCreateWithoutVolunteersInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    responsibleId?: string | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlantingCampaignCreateOrConnectWithoutVolunteersInput = {
    where: PlantingCampaignWhereUniqueInput
    create: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput>
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
  }

  export type ReportUpsertWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
  }

  export type ReportUpdateManyWithWhereWithoutUserInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutUserInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    userId?: StringFilter<"Report"> | string
    issueType?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    latitude?: FloatFilter<"Report"> | number
    longitude?: FloatFilter<"Report"> | number
    address?: StringFilter<"Report"> | string
    photos?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    priority?: StringFilter<"Report"> | string
    assignedToId?: StringNullableFilter<"Report"> | string | null
    trackingNumber?: StringFilter<"Report"> | string
    adminNotes?: StringNullableFilter<"Report"> | string | null
    resolutionNotes?: StringNullableFilter<"Report"> | string | null
    rejectionReason?: StringNullableFilter<"Report"> | string | null
    submittedAt?: DateTimeFilter<"Report"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    assignedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Report"> | Date | string | null
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type TreeUpsertWithWhereUniqueWithoutAdoptedByInput = {
    where: TreeWhereUniqueInput
    update: XOR<TreeUpdateWithoutAdoptedByInput, TreeUncheckedUpdateWithoutAdoptedByInput>
    create: XOR<TreeCreateWithoutAdoptedByInput, TreeUncheckedCreateWithoutAdoptedByInput>
  }

  export type TreeUpdateWithWhereUniqueWithoutAdoptedByInput = {
    where: TreeWhereUniqueInput
    data: XOR<TreeUpdateWithoutAdoptedByInput, TreeUncheckedUpdateWithoutAdoptedByInput>
  }

  export type TreeUpdateManyWithWhereWithoutAdoptedByInput = {
    where: TreeScalarWhereInput
    data: XOR<TreeUpdateManyMutationInput, TreeUncheckedUpdateManyWithoutAdoptedByInput>
  }

  export type TreeScalarWhereInput = {
    AND?: TreeScalarWhereInput | TreeScalarWhereInput[]
    OR?: TreeScalarWhereInput[]
    NOT?: TreeScalarWhereInput | TreeScalarWhereInput[]
    id?: StringFilter<"Tree"> | string
    species?: StringFilter<"Tree"> | string
    speciesOther?: StringNullableFilter<"Tree"> | string | null
    latitude?: FloatFilter<"Tree"> | number
    longitude?: FloatFilter<"Tree"> | number
    plantingDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    height?: FloatNullableFilter<"Tree"> | number | null
    trunkDiameter?: FloatNullableFilter<"Tree"> | number | null
    healthStatus?: StringFilter<"Tree"> | string
    adoptedById?: StringNullableFilter<"Tree"> | string | null
    adoptionDate?: DateTimeNullableFilter<"Tree"> | Date | string | null
    greenSpaceId?: StringNullableFilter<"Tree"> | string | null
    notes?: StringNullableFilter<"Tree"> | string | null
    photos?: StringFilter<"Tree"> | string
    neighborhood?: StringFilter<"Tree"> | string
    nickname?: StringNullableFilter<"Tree"> | string | null
    lastWateredAt?: DateTimeNullableFilter<"Tree"> | Date | string | null
    createdAt?: DateTimeFilter<"Tree"> | Date | string
    updatedAt?: DateTimeFilter<"Tree"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutAssignedToInput, ReportUncheckedUpdateWithoutAssignedToInput>
    create: XOR<ReportCreateWithoutAssignedToInput, ReportUncheckedCreateWithoutAssignedToInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutAssignedToInput, ReportUncheckedUpdateWithoutAssignedToInput>
  }

  export type ReportUpdateManyWithWhereWithoutAssignedToInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type ReportAssignmentUpsertWithWhereUniqueWithoutFieldWorkerInput = {
    where: ReportAssignmentWhereUniqueInput
    update: XOR<ReportAssignmentUpdateWithoutFieldWorkerInput, ReportAssignmentUncheckedUpdateWithoutFieldWorkerInput>
    create: XOR<ReportAssignmentCreateWithoutFieldWorkerInput, ReportAssignmentUncheckedCreateWithoutFieldWorkerInput>
  }

  export type ReportAssignmentUpdateWithWhereUniqueWithoutFieldWorkerInput = {
    where: ReportAssignmentWhereUniqueInput
    data: XOR<ReportAssignmentUpdateWithoutFieldWorkerInput, ReportAssignmentUncheckedUpdateWithoutFieldWorkerInput>
  }

  export type ReportAssignmentUpdateManyWithWhereWithoutFieldWorkerInput = {
    where: ReportAssignmentScalarWhereInput
    data: XOR<ReportAssignmentUpdateManyMutationInput, ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerInput>
  }

  export type ReportAssignmentScalarWhereInput = {
    AND?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
    OR?: ReportAssignmentScalarWhereInput[]
    NOT?: ReportAssignmentScalarWhereInput | ReportAssignmentScalarWhereInput[]
    id?: StringFilter<"ReportAssignment"> | string
    reportId?: StringFilter<"ReportAssignment"> | string
    fieldWorkerId?: StringFilter<"ReportAssignment"> | string
    assignedAt?: DateTimeFilter<"ReportAssignment"> | Date | string
    notes?: StringNullableFilter<"ReportAssignment"> | string | null
    completedAt?: DateTimeNullableFilter<"ReportAssignment"> | Date | string | null
  }

  export type PlantingCampaignUpsertWithWhereUniqueWithoutResponsibleInput = {
    where: PlantingCampaignWhereUniqueInput
    update: XOR<PlantingCampaignUpdateWithoutResponsibleInput, PlantingCampaignUncheckedUpdateWithoutResponsibleInput>
    create: XOR<PlantingCampaignCreateWithoutResponsibleInput, PlantingCampaignUncheckedCreateWithoutResponsibleInput>
  }

  export type PlantingCampaignUpdateWithWhereUniqueWithoutResponsibleInput = {
    where: PlantingCampaignWhereUniqueInput
    data: XOR<PlantingCampaignUpdateWithoutResponsibleInput, PlantingCampaignUncheckedUpdateWithoutResponsibleInput>
  }

  export type PlantingCampaignUpdateManyWithWhereWithoutResponsibleInput = {
    where: PlantingCampaignScalarWhereInput
    data: XOR<PlantingCampaignUpdateManyMutationInput, PlantingCampaignUncheckedUpdateManyWithoutResponsibleInput>
  }

  export type PlantingCampaignScalarWhereInput = {
    AND?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
    OR?: PlantingCampaignScalarWhereInput[]
    NOT?: PlantingCampaignScalarWhereInput | PlantingCampaignScalarWhereInput[]
    id?: StringFilter<"PlantingCampaign"> | string
    name?: StringFilter<"PlantingCampaign"> | string
    description?: StringFilter<"PlantingCampaign"> | string
    latitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    longitude?: FloatNullableFilter<"PlantingCampaign"> | number | null
    locationDesc?: StringFilter<"PlantingCampaign"> | string
    species?: StringFilter<"PlantingCampaign"> | string
    numberOfTrees?: IntFilter<"PlantingCampaign"> | number
    treesPlanted?: IntFilter<"PlantingCampaign"> | number
    startDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    endDate?: DateTimeFilter<"PlantingCampaign"> | Date | string
    status?: StringFilter<"PlantingCampaign"> | string
    budget?: FloatNullableFilter<"PlantingCampaign"> | number | null
    responsibleId?: StringNullableFilter<"PlantingCampaign"> | string | null
    photos?: StringFilter<"PlantingCampaign"> | string
    notes?: StringNullableFilter<"PlantingCampaign"> | string | null
    createdAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"PlantingCampaign"> | Date | string
  }

  export type PlantingCampaignUpsertWithWhereUniqueWithoutVolunteersInput = {
    where: PlantingCampaignWhereUniqueInput
    update: XOR<PlantingCampaignUpdateWithoutVolunteersInput, PlantingCampaignUncheckedUpdateWithoutVolunteersInput>
    create: XOR<PlantingCampaignCreateWithoutVolunteersInput, PlantingCampaignUncheckedCreateWithoutVolunteersInput>
  }

  export type PlantingCampaignUpdateWithWhereUniqueWithoutVolunteersInput = {
    where: PlantingCampaignWhereUniqueInput
    data: XOR<PlantingCampaignUpdateWithoutVolunteersInput, PlantingCampaignUncheckedUpdateWithoutVolunteersInput>
  }

  export type PlantingCampaignUpdateManyWithWhereWithoutVolunteersInput = {
    where: PlantingCampaignScalarWhereInput
    data: XOR<PlantingCampaignUpdateManyMutationInput, PlantingCampaignUncheckedUpdateManyWithoutVolunteersInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    notificationType?: StringFilter<"Notification"> | string
    relatedObjectId?: StringNullableFilter<"Notification"> | string | null
    relatedObjectType?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    changes?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type TreeCreateWithoutGreenSpaceInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    adoptedBy?: UserCreateNestedOneWithoutAdoptedTreesInput
    wateringLogs?: WateringLogCreateNestedManyWithoutTreeInput
  }

  export type TreeUncheckedCreateWithoutGreenSpaceInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptedById?: string | null
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wateringLogs?: WateringLogUncheckedCreateNestedManyWithoutTreeInput
  }

  export type TreeCreateOrConnectWithoutGreenSpaceInput = {
    where: TreeWhereUniqueInput
    create: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput>
  }

  export type TreeCreateManyGreenSpaceInputEnvelope = {
    data: TreeCreateManyGreenSpaceInput | TreeCreateManyGreenSpaceInput[]
  }

  export type TreeUpsertWithWhereUniqueWithoutGreenSpaceInput = {
    where: TreeWhereUniqueInput
    update: XOR<TreeUpdateWithoutGreenSpaceInput, TreeUncheckedUpdateWithoutGreenSpaceInput>
    create: XOR<TreeCreateWithoutGreenSpaceInput, TreeUncheckedCreateWithoutGreenSpaceInput>
  }

  export type TreeUpdateWithWhereUniqueWithoutGreenSpaceInput = {
    where: TreeWhereUniqueInput
    data: XOR<TreeUpdateWithoutGreenSpaceInput, TreeUncheckedUpdateWithoutGreenSpaceInput>
  }

  export type TreeUpdateManyWithWhereWithoutGreenSpaceInput = {
    where: TreeScalarWhereInput
    data: XOR<TreeUpdateManyMutationInput, TreeUncheckedUpdateManyWithoutGreenSpaceInput>
  }

  export type UserCreateWithoutAdoptedTreesInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdoptedTreesInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdoptedTreesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdoptedTreesInput, UserUncheckedCreateWithoutAdoptedTreesInput>
  }

  export type GreenSpaceCreateWithoutTreesInput = {
    id?: string
    name: string
    type?: string
    location: string
    area: number
    description?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GreenSpaceUncheckedCreateWithoutTreesInput = {
    id?: string
    name: string
    type?: string
    location: string
    area: number
    description?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GreenSpaceCreateOrConnectWithoutTreesInput = {
    where: GreenSpaceWhereUniqueInput
    create: XOR<GreenSpaceCreateWithoutTreesInput, GreenSpaceUncheckedCreateWithoutTreesInput>
  }

  export type WateringLogCreateWithoutTreeInput = {
    id?: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
  }

  export type WateringLogUncheckedCreateWithoutTreeInput = {
    id?: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
  }

  export type WateringLogCreateOrConnectWithoutTreeInput = {
    where: WateringLogWhereUniqueInput
    create: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput>
  }

  export type WateringLogCreateManyTreeInputEnvelope = {
    data: WateringLogCreateManyTreeInput | WateringLogCreateManyTreeInput[]
  }

  export type UserUpsertWithoutAdoptedTreesInput = {
    update: XOR<UserUpdateWithoutAdoptedTreesInput, UserUncheckedUpdateWithoutAdoptedTreesInput>
    create: XOR<UserCreateWithoutAdoptedTreesInput, UserUncheckedCreateWithoutAdoptedTreesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdoptedTreesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdoptedTreesInput, UserUncheckedUpdateWithoutAdoptedTreesInput>
  }

  export type UserUpdateWithoutAdoptedTreesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdoptedTreesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GreenSpaceUpsertWithoutTreesInput = {
    update: XOR<GreenSpaceUpdateWithoutTreesInput, GreenSpaceUncheckedUpdateWithoutTreesInput>
    create: XOR<GreenSpaceCreateWithoutTreesInput, GreenSpaceUncheckedCreateWithoutTreesInput>
    where?: GreenSpaceWhereInput
  }

  export type GreenSpaceUpdateToOneWithWhereWithoutTreesInput = {
    where?: GreenSpaceWhereInput
    data: XOR<GreenSpaceUpdateWithoutTreesInput, GreenSpaceUncheckedUpdateWithoutTreesInput>
  }

  export type GreenSpaceUpdateWithoutTreesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GreenSpaceUncheckedUpdateWithoutTreesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogUpsertWithWhereUniqueWithoutTreeInput = {
    where: WateringLogWhereUniqueInput
    update: XOR<WateringLogUpdateWithoutTreeInput, WateringLogUncheckedUpdateWithoutTreeInput>
    create: XOR<WateringLogCreateWithoutTreeInput, WateringLogUncheckedCreateWithoutTreeInput>
  }

  export type WateringLogUpdateWithWhereUniqueWithoutTreeInput = {
    where: WateringLogWhereUniqueInput
    data: XOR<WateringLogUpdateWithoutTreeInput, WateringLogUncheckedUpdateWithoutTreeInput>
  }

  export type WateringLogUpdateManyWithWhereWithoutTreeInput = {
    where: WateringLogScalarWhereInput
    data: XOR<WateringLogUpdateManyMutationInput, WateringLogUncheckedUpdateManyWithoutTreeInput>
  }

  export type WateringLogScalarWhereInput = {
    AND?: WateringLogScalarWhereInput | WateringLogScalarWhereInput[]
    OR?: WateringLogScalarWhereInput[]
    NOT?: WateringLogScalarWhereInput | WateringLogScalarWhereInput[]
    id?: StringFilter<"WateringLog"> | string
    treeId?: StringFilter<"WateringLog"> | string
    userName?: StringFilter<"WateringLog"> | string
    liters?: IntFilter<"WateringLog"> | number
    earnedPoints?: IntFilter<"WateringLog"> | number
    photoProof?: StringNullableFilter<"WateringLog"> | string | null
    photoVerified?: BoolFilter<"WateringLog"> | boolean
    loggedAt?: DateTimeFilter<"WateringLog"> | Date | string
  }

  export type TreeCreateWithoutWateringLogsInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    adoptedBy?: UserCreateNestedOneWithoutAdoptedTreesInput
    greenSpace?: GreenSpaceCreateNestedOneWithoutTreesInput
  }

  export type TreeUncheckedCreateWithoutWateringLogsInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptedById?: string | null
    adoptionDate?: Date | string | null
    greenSpaceId?: string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreeCreateOrConnectWithoutWateringLogsInput = {
    where: TreeWhereUniqueInput
    create: XOR<TreeCreateWithoutWateringLogsInput, TreeUncheckedCreateWithoutWateringLogsInput>
  }

  export type TreeUpsertWithoutWateringLogsInput = {
    update: XOR<TreeUpdateWithoutWateringLogsInput, TreeUncheckedUpdateWithoutWateringLogsInput>
    create: XOR<TreeCreateWithoutWateringLogsInput, TreeUncheckedCreateWithoutWateringLogsInput>
    where?: TreeWhereInput
  }

  export type TreeUpdateToOneWithWhereWithoutWateringLogsInput = {
    where?: TreeWhereInput
    data: XOR<TreeUpdateWithoutWateringLogsInput, TreeUncheckedUpdateWithoutWateringLogsInput>
  }

  export type TreeUpdateWithoutWateringLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adoptedBy?: UserUpdateOneWithoutAdoptedTreesNestedInput
    greenSpace?: GreenSpaceUpdateOneWithoutTreesNestedInput
  }

  export type TreeUncheckedUpdateWithoutWateringLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptedById?: NullableStringFieldUpdateOperationsInput | string | null
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    greenSpaceId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type UserCreateWithoutAssignedReportsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedReportsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
  }

  export type ReportAssignmentCreateWithoutReportInput = {
    id?: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
    fieldWorker: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type ReportAssignmentUncheckedCreateWithoutReportInput = {
    id?: string
    fieldWorkerId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type ReportAssignmentCreateOrConnectWithoutReportInput = {
    where: ReportAssignmentWhereUniqueInput
    create: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput>
  }

  export type ReportAssignmentCreateManyReportInputEnvelope = {
    data: ReportAssignmentCreateManyReportInput | ReportAssignmentCreateManyReportInput[]
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAssignedReportsInput = {
    update: XOR<UserUpdateWithoutAssignedReportsInput, UserUncheckedUpdateWithoutAssignedReportsInput>
    create: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedReportsInput, UserUncheckedUpdateWithoutAssignedReportsInput>
  }

  export type UserUpdateWithoutAssignedReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReportAssignmentUpsertWithWhereUniqueWithoutReportInput = {
    where: ReportAssignmentWhereUniqueInput
    update: XOR<ReportAssignmentUpdateWithoutReportInput, ReportAssignmentUncheckedUpdateWithoutReportInput>
    create: XOR<ReportAssignmentCreateWithoutReportInput, ReportAssignmentUncheckedCreateWithoutReportInput>
  }

  export type ReportAssignmentUpdateWithWhereUniqueWithoutReportInput = {
    where: ReportAssignmentWhereUniqueInput
    data: XOR<ReportAssignmentUpdateWithoutReportInput, ReportAssignmentUncheckedUpdateWithoutReportInput>
  }

  export type ReportAssignmentUpdateManyWithWhereWithoutReportInput = {
    where: ReportAssignmentScalarWhereInput
    data: XOR<ReportAssignmentUpdateManyMutationInput, ReportAssignmentUncheckedUpdateManyWithoutReportInput>
  }

  export type ReportCreateWithoutAssignmentsInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReportsInput
    assignedTo?: UserCreateNestedOneWithoutAssignedReportsInput
  }

  export type ReportUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    assignedToId?: string | null
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutAssignmentsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAssignmentsInput, ReportUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserCreateWithoutAssignmentsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
  }

  export type ReportUpsertWithoutAssignmentsInput = {
    update: XOR<ReportUpdateWithoutAssignmentsInput, ReportUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ReportCreateWithoutAssignmentsInput, ReportUncheckedCreateWithoutAssignmentsInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutAssignmentsInput, ReportUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ReportUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAssignmentsInput = {
    update: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCampaignsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCampaignsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCampaignsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
  }

  export type UserCreateWithoutVolunteerCampaignsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVolunteerCampaignsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVolunteerCampaignsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput>
  }

  export type UserUpsertWithoutCampaignsInput = {
    update: XOR<UserUpdateWithoutCampaignsInput, UserUncheckedUpdateWithoutCampaignsInput>
    create: XOR<UserCreateWithoutCampaignsInput, UserUncheckedCreateWithoutCampaignsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampaignsInput, UserUncheckedUpdateWithoutCampaignsInput>
  }

  export type UserUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutVolunteerCampaignsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutVolunteerCampaignsInput, UserUncheckedUpdateWithoutVolunteerCampaignsInput>
    create: XOR<UserCreateWithoutVolunteerCampaignsInput, UserUncheckedCreateWithoutVolunteerCampaignsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutVolunteerCampaignsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutVolunteerCampaignsInput, UserUncheckedUpdateWithoutVolunteerCampaignsInput>
  }

  export type UserUpdateManyWithWhereWithoutVolunteerCampaignsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutVolunteerCampaignsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    neighborhood?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    phone?: string | null
    name?: string | null
    role?: string
    neighborhood?: string | null
    avatar?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    adoptedTrees?: TreeUncheckedCreateNestedManyWithoutAdoptedByInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedToInput
    assignments?: ReportAssignmentUncheckedCreateNestedManyWithoutFieldWorkerInput
    campaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutResponsibleInput
    volunteerCampaigns?: PlantingCampaignUncheckedCreateNestedManyWithoutVolunteersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    volunteerCampaigns?: PlantingCampaignUncheckedUpdateManyWithoutVolunteersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReportCreateManyUserInput = {
    id?: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    assignedToId?: string | null
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type TreeCreateManyAdoptedByInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptionDate?: Date | string | null
    greenSpaceId?: string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateManyAssignedToInput = {
    id?: string
    userId: string
    issueType: string
    description: string
    latitude: number
    longitude: number
    address: string
    photos?: string
    status?: string
    priority?: string
    trackingNumber: string
    adminNotes?: string | null
    resolutionNotes?: string | null
    rejectionReason?: string | null
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    assignedAt?: Date | string | null
    resolvedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ReportAssignmentCreateManyFieldWorkerInput = {
    id?: string
    reportId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type PlantingCampaignCreateManyResponsibleInput = {
    id?: string
    name: string
    description: string
    latitude?: number | null
    longitude?: number | null
    locationDesc: string
    species?: string
    numberOfTrees?: number
    treesPlanted?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    budget?: number | null
    photos?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    notificationType?: string
    relatedObjectId?: string | null
    relatedObjectType?: string | null
    isRead?: boolean
    sentAt?: Date | string
    readAt?: Date | string | null
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entityType: string
    entityId?: string | null
    changes?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type ReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: UserUpdateOneWithoutAssignedReportsNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreeUpdateWithoutAdoptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    greenSpace?: GreenSpaceUpdateOneWithoutTreesNestedInput
    wateringLogs?: WateringLogUpdateManyWithoutTreeNestedInput
  }

  export type TreeUncheckedUpdateWithoutAdoptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    greenSpaceId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wateringLogs?: WateringLogUncheckedUpdateManyWithoutTreeNestedInput
  }

  export type TreeUncheckedUpdateManyWithoutAdoptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    greenSpaceId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issueType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    trackingNumber?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    resolutionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportAssignmentUpdateWithoutFieldWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    report?: ReportUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ReportAssignmentUncheckedUpdateWithoutFieldWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PlantingCampaignUpdateWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteers?: UserUpdateManyWithoutVolunteerCampaignsNestedInput
  }

  export type PlantingCampaignUncheckedUpdateWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteers?: UserUncheckedUpdateManyWithoutVolunteerCampaignsNestedInput
  }

  export type PlantingCampaignUncheckedUpdateManyWithoutResponsibleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlantingCampaignUpdateWithoutVolunteersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responsible?: UserUpdateOneWithoutCampaignsNestedInput
  }

  export type PlantingCampaignUncheckedUpdateWithoutVolunteersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlantingCampaignUncheckedUpdateManyWithoutVolunteersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationDesc?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    numberOfTrees?: IntFieldUpdateOperationsInput | number
    treesPlanted?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    budget?: NullableFloatFieldUpdateOperationsInput | number | null
    responsibleId?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notificationType?: StringFieldUpdateOperationsInput | string
    relatedObjectId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedObjectType?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreeCreateManyGreenSpaceInput = {
    id?: string
    species?: string
    speciesOther?: string | null
    latitude: number
    longitude: number
    plantingDate?: Date | string | null
    height?: number | null
    trunkDiameter?: number | null
    healthStatus?: string
    adoptedById?: string | null
    adoptionDate?: Date | string | null
    notes?: string | null
    photos?: string
    neighborhood?: string
    nickname?: string | null
    lastWateredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TreeUpdateWithoutGreenSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adoptedBy?: UserUpdateOneWithoutAdoptedTreesNestedInput
    wateringLogs?: WateringLogUpdateManyWithoutTreeNestedInput
  }

  export type TreeUncheckedUpdateWithoutGreenSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptedById?: NullableStringFieldUpdateOperationsInput | string | null
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wateringLogs?: WateringLogUncheckedUpdateManyWithoutTreeNestedInput
  }

  export type TreeUncheckedUpdateManyWithoutGreenSpaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    speciesOther?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    plantingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    trunkDiameter?: NullableFloatFieldUpdateOperationsInput | number | null
    healthStatus?: StringFieldUpdateOperationsInput | string
    adoptedById?: NullableStringFieldUpdateOperationsInput | string | null
    adoptionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: StringFieldUpdateOperationsInput | string
    neighborhood?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogCreateManyTreeInput = {
    id?: string
    userName: string
    liters?: number
    earnedPoints?: number
    photoProof?: string | null
    photoVerified?: boolean
    loggedAt?: Date | string
  }

  export type WateringLogUpdateWithoutTreeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogUncheckedUpdateWithoutTreeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WateringLogUncheckedUpdateManyWithoutTreeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    liters?: IntFieldUpdateOperationsInput | number
    earnedPoints?: IntFieldUpdateOperationsInput | number
    photoProof?: NullableStringFieldUpdateOperationsInput | string | null
    photoVerified?: BoolFieldUpdateOperationsInput | boolean
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportAssignmentCreateManyReportInput = {
    id?: string
    fieldWorkerId: string
    assignedAt?: Date | string
    notes?: string | null
    completedAt?: Date | string | null
  }

  export type ReportAssignmentUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fieldWorker?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ReportAssignmentUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldWorkerId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportAssignmentUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    fieldWorkerId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpdateWithoutVolunteerCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUpdateManyWithoutResponsibleNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVolunteerCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    adoptedTrees?: TreeUncheckedUpdateManyWithoutAdoptedByNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedToNestedInput
    assignments?: ReportAssignmentUncheckedUpdateManyWithoutFieldWorkerNestedInput
    campaigns?: PlantingCampaignUncheckedUpdateManyWithoutResponsibleNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutVolunteerCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GreenSpaceCountOutputTypeDefaultArgs instead
     */
    export type GreenSpaceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GreenSpaceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreeCountOutputTypeDefaultArgs instead
     */
    export type TreeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportCountOutputTypeDefaultArgs instead
     */
    export type ReportCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlantingCampaignCountOutputTypeDefaultArgs instead
     */
    export type PlantingCampaignCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlantingCampaignCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GreenSpaceDefaultArgs instead
     */
    export type GreenSpaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GreenSpaceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreeDefaultArgs instead
     */
    export type TreeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WateringLogDefaultArgs instead
     */
    export type WateringLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WateringLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareAlertDefaultArgs instead
     */
    export type CareAlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareAlertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NeighborhoodStatsDefaultArgs instead
     */
    export type NeighborhoodStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NeighborhoodStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportDefaultArgs instead
     */
    export type ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportAssignmentDefaultArgs instead
     */
    export type ReportAssignmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportAssignmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlantingCampaignDefaultArgs instead
     */
    export type PlantingCampaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlantingCampaignDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}