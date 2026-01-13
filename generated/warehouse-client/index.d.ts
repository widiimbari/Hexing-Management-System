
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
 * Model warehouse_location
 * 
 */
export type warehouse_location = $Result.DefaultSelection<Prisma.$warehouse_locationPayload>
/**
 * Model stock_opname
 * 
 */
export type stock_opname = $Result.DefaultSelection<Prisma.$stock_opnamePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Warehouse_locations
 * const warehouse_locations = await prisma.warehouse_location.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
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
   * // Fetch zero or more Warehouse_locations
   * const warehouse_locations = await prisma.warehouse_location.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
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


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.warehouse_location`: Exposes CRUD operations for the **warehouse_location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warehouse_locations
    * const warehouse_locations = await prisma.warehouse_location.findMany()
    * ```
    */
  get warehouse_location(): Prisma.warehouse_locationDelegate<ExtArgs>;

  /**
   * `prisma.stock_opname`: Exposes CRUD operations for the **stock_opname** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stock_opnames
    * const stock_opnames = await prisma.stock_opname.findMany()
    * ```
    */
  get stock_opname(): Prisma.stock_opnameDelegate<ExtArgs>;
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
   * Prisma Client JS version: 5.10.0
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
    warehouse_location: 'warehouse_location',
    stock_opname: 'stock_opname'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'warehouse_location' | 'stock_opname'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      warehouse_location: {
        payload: Prisma.$warehouse_locationPayload<ExtArgs>
        fields: Prisma.warehouse_locationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.warehouse_locationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.warehouse_locationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          findFirst: {
            args: Prisma.warehouse_locationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.warehouse_locationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          findMany: {
            args: Prisma.warehouse_locationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>[]
          }
          create: {
            args: Prisma.warehouse_locationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          createMany: {
            args: Prisma.warehouse_locationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.warehouse_locationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          update: {
            args: Prisma.warehouse_locationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          deleteMany: {
            args: Prisma.warehouse_locationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.warehouse_locationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.warehouse_locationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$warehouse_locationPayload>
          }
          aggregate: {
            args: Prisma.Warehouse_locationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWarehouse_location>
          }
          groupBy: {
            args: Prisma.warehouse_locationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Warehouse_locationGroupByOutputType>[]
          }
          count: {
            args: Prisma.warehouse_locationCountArgs<ExtArgs>,
            result: $Utils.Optional<Warehouse_locationCountAggregateOutputType> | number
          }
        }
      }
      stock_opname: {
        payload: Prisma.$stock_opnamePayload<ExtArgs>
        fields: Prisma.stock_opnameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.stock_opnameFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.stock_opnameFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          findFirst: {
            args: Prisma.stock_opnameFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.stock_opnameFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          findMany: {
            args: Prisma.stock_opnameFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>[]
          }
          create: {
            args: Prisma.stock_opnameCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          createMany: {
            args: Prisma.stock_opnameCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.stock_opnameDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          update: {
            args: Prisma.stock_opnameUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          deleteMany: {
            args: Prisma.stock_opnameDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.stock_opnameUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.stock_opnameUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$stock_opnamePayload>
          }
          aggregate: {
            args: Prisma.Stock_opnameAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateStock_opname>
          }
          groupBy: {
            args: Prisma.stock_opnameGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Stock_opnameGroupByOutputType>[]
          }
          count: {
            args: Prisma.stock_opnameCountArgs<ExtArgs>,
            result: $Utils.Optional<Stock_opnameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
   * Models
   */

  /**
   * Model warehouse_location
   */

  export type AggregateWarehouse_location = {
    _count: Warehouse_locationCountAggregateOutputType | null
    _avg: Warehouse_locationAvgAggregateOutputType | null
    _sum: Warehouse_locationSumAggregateOutputType | null
    _min: Warehouse_locationMinAggregateOutputType | null
    _max: Warehouse_locationMaxAggregateOutputType | null
  }

  export type Warehouse_locationAvgAggregateOutputType = {
    id: number | null
  }

  export type Warehouse_locationSumAggregateOutputType = {
    id: number | null
  }

  export type Warehouse_locationMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
  }

  export type Warehouse_locationMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
  }

  export type Warehouse_locationCountAggregateOutputType = {
    id: number
    code: number
    name: number
    _all: number
  }


  export type Warehouse_locationAvgAggregateInputType = {
    id?: true
  }

  export type Warehouse_locationSumAggregateInputType = {
    id?: true
  }

  export type Warehouse_locationMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
  }

  export type Warehouse_locationMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
  }

  export type Warehouse_locationCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    _all?: true
  }

  export type Warehouse_locationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which warehouse_location to aggregate.
     */
    where?: warehouse_locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouse_locations to fetch.
     */
    orderBy?: warehouse_locationOrderByWithRelationInput | warehouse_locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: warehouse_locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouse_locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouse_locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned warehouse_locations
    **/
    _count?: true | Warehouse_locationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Warehouse_locationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Warehouse_locationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Warehouse_locationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Warehouse_locationMaxAggregateInputType
  }

  export type GetWarehouse_locationAggregateType<T extends Warehouse_locationAggregateArgs> = {
        [P in keyof T & keyof AggregateWarehouse_location]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarehouse_location[P]>
      : GetScalarType<T[P], AggregateWarehouse_location[P]>
  }




  export type warehouse_locationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: warehouse_locationWhereInput
    orderBy?: warehouse_locationOrderByWithAggregationInput | warehouse_locationOrderByWithAggregationInput[]
    by: Warehouse_locationScalarFieldEnum[] | Warehouse_locationScalarFieldEnum
    having?: warehouse_locationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Warehouse_locationCountAggregateInputType | true
    _avg?: Warehouse_locationAvgAggregateInputType
    _sum?: Warehouse_locationSumAggregateInputType
    _min?: Warehouse_locationMinAggregateInputType
    _max?: Warehouse_locationMaxAggregateInputType
  }

  export type Warehouse_locationGroupByOutputType = {
    id: number
    code: string
    name: string
    _count: Warehouse_locationCountAggregateOutputType | null
    _avg: Warehouse_locationAvgAggregateOutputType | null
    _sum: Warehouse_locationSumAggregateOutputType | null
    _min: Warehouse_locationMinAggregateOutputType | null
    _max: Warehouse_locationMaxAggregateOutputType | null
  }

  type GetWarehouse_locationGroupByPayload<T extends warehouse_locationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Warehouse_locationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Warehouse_locationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Warehouse_locationGroupByOutputType[P]>
            : GetScalarType<T[P], Warehouse_locationGroupByOutputType[P]>
        }
      >
    >


  export type warehouse_locationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
  }, ExtArgs["result"]["warehouse_location"]>

  export type warehouse_locationSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
  }


  export type $warehouse_locationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "warehouse_location"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
    }, ExtArgs["result"]["warehouse_location"]>
    composites: {}
  }


  type warehouse_locationGetPayload<S extends boolean | null | undefined | warehouse_locationDefaultArgs> = $Result.GetResult<Prisma.$warehouse_locationPayload, S>

  type warehouse_locationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<warehouse_locationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Warehouse_locationCountAggregateInputType | true
    }

  export interface warehouse_locationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['warehouse_location'], meta: { name: 'warehouse_location' } }
    /**
     * Find zero or one Warehouse_location that matches the filter.
     * @param {warehouse_locationFindUniqueArgs} args - Arguments to find a Warehouse_location
     * @example
     * // Get one Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends warehouse_locationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationFindUniqueArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Warehouse_location that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {warehouse_locationFindUniqueOrThrowArgs} args - Arguments to find a Warehouse_location
     * @example
     * // Get one Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends warehouse_locationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Warehouse_location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationFindFirstArgs} args - Arguments to find a Warehouse_location
     * @example
     * // Get one Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends warehouse_locationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationFindFirstArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Warehouse_location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationFindFirstOrThrowArgs} args - Arguments to find a Warehouse_location
     * @example
     * // Get one Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends warehouse_locationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Warehouse_locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warehouse_locations
     * const warehouse_locations = await prisma.warehouse_location.findMany()
     * 
     * // Get first 10 Warehouse_locations
     * const warehouse_locations = await prisma.warehouse_location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warehouse_locationWithIdOnly = await prisma.warehouse_location.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends warehouse_locationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Warehouse_location.
     * @param {warehouse_locationCreateArgs} args - Arguments to create a Warehouse_location.
     * @example
     * // Create one Warehouse_location
     * const Warehouse_location = await prisma.warehouse_location.create({
     *   data: {
     *     // ... data to create a Warehouse_location
     *   }
     * })
     * 
    **/
    create<T extends warehouse_locationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationCreateArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Warehouse_locations.
     *     @param {warehouse_locationCreateManyArgs} args - Arguments to create many Warehouse_locations.
     *     @example
     *     // Create many Warehouse_locations
     *     const warehouse_location = await prisma.warehouse_location.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends warehouse_locationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Warehouse_location.
     * @param {warehouse_locationDeleteArgs} args - Arguments to delete one Warehouse_location.
     * @example
     * // Delete one Warehouse_location
     * const Warehouse_location = await prisma.warehouse_location.delete({
     *   where: {
     *     // ... filter to delete one Warehouse_location
     *   }
     * })
     * 
    **/
    delete<T extends warehouse_locationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationDeleteArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Warehouse_location.
     * @param {warehouse_locationUpdateArgs} args - Arguments to update one Warehouse_location.
     * @example
     * // Update one Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends warehouse_locationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationUpdateArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Warehouse_locations.
     * @param {warehouse_locationDeleteManyArgs} args - Arguments to filter Warehouse_locations to delete.
     * @example
     * // Delete a few Warehouse_locations
     * const { count } = await prisma.warehouse_location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends warehouse_locationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, warehouse_locationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouse_locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warehouse_locations
     * const warehouse_location = await prisma.warehouse_location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends warehouse_locationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Warehouse_location.
     * @param {warehouse_locationUpsertArgs} args - Arguments to update or create a Warehouse_location.
     * @example
     * // Update or create a Warehouse_location
     * const warehouse_location = await prisma.warehouse_location.upsert({
     *   create: {
     *     // ... data to create a Warehouse_location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warehouse_location we want to update
     *   }
     * })
    **/
    upsert<T extends warehouse_locationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, warehouse_locationUpsertArgs<ExtArgs>>
    ): Prisma__warehouse_locationClient<$Result.GetResult<Prisma.$warehouse_locationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Warehouse_locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationCountArgs} args - Arguments to filter Warehouse_locations to count.
     * @example
     * // Count the number of Warehouse_locations
     * const count = await prisma.warehouse_location.count({
     *   where: {
     *     // ... the filter for the Warehouse_locations we want to count
     *   }
     * })
    **/
    count<T extends warehouse_locationCountArgs>(
      args?: Subset<T, warehouse_locationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Warehouse_locationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warehouse_location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Warehouse_locationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Warehouse_locationAggregateArgs>(args: Subset<T, Warehouse_locationAggregateArgs>): Prisma.PrismaPromise<GetWarehouse_locationAggregateType<T>>

    /**
     * Group by Warehouse_location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehouse_locationGroupByArgs} args - Group by arguments.
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
      T extends warehouse_locationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: warehouse_locationGroupByArgs['orderBy'] }
        : { orderBy?: warehouse_locationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, warehouse_locationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehouse_locationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the warehouse_location model
   */
  readonly fields: warehouse_locationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for warehouse_location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__warehouse_locationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the warehouse_location model
   */ 
  interface warehouse_locationFieldRefs {
    readonly id: FieldRef<"warehouse_location", 'Int'>
    readonly code: FieldRef<"warehouse_location", 'String'>
    readonly name: FieldRef<"warehouse_location", 'String'>
  }
    

  // Custom InputTypes

  /**
   * warehouse_location findUnique
   */
  export type warehouse_locationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter, which warehouse_location to fetch.
     */
    where: warehouse_locationWhereUniqueInput
  }


  /**
   * warehouse_location findUniqueOrThrow
   */
  export type warehouse_locationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter, which warehouse_location to fetch.
     */
    where: warehouse_locationWhereUniqueInput
  }


  /**
   * warehouse_location findFirst
   */
  export type warehouse_locationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter, which warehouse_location to fetch.
     */
    where?: warehouse_locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouse_locations to fetch.
     */
    orderBy?: warehouse_locationOrderByWithRelationInput | warehouse_locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warehouse_locations.
     */
    cursor?: warehouse_locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouse_locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouse_locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warehouse_locations.
     */
    distinct?: Warehouse_locationScalarFieldEnum | Warehouse_locationScalarFieldEnum[]
  }


  /**
   * warehouse_location findFirstOrThrow
   */
  export type warehouse_locationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter, which warehouse_location to fetch.
     */
    where?: warehouse_locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouse_locations to fetch.
     */
    orderBy?: warehouse_locationOrderByWithRelationInput | warehouse_locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warehouse_locations.
     */
    cursor?: warehouse_locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouse_locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouse_locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warehouse_locations.
     */
    distinct?: Warehouse_locationScalarFieldEnum | Warehouse_locationScalarFieldEnum[]
  }


  /**
   * warehouse_location findMany
   */
  export type warehouse_locationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter, which warehouse_locations to fetch.
     */
    where?: warehouse_locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouse_locations to fetch.
     */
    orderBy?: warehouse_locationOrderByWithRelationInput | warehouse_locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing warehouse_locations.
     */
    cursor?: warehouse_locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouse_locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouse_locations.
     */
    skip?: number
    distinct?: Warehouse_locationScalarFieldEnum | Warehouse_locationScalarFieldEnum[]
  }


  /**
   * warehouse_location create
   */
  export type warehouse_locationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * The data needed to create a warehouse_location.
     */
    data: XOR<warehouse_locationCreateInput, warehouse_locationUncheckedCreateInput>
  }


  /**
   * warehouse_location createMany
   */
  export type warehouse_locationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many warehouse_locations.
     */
    data: warehouse_locationCreateManyInput | warehouse_locationCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * warehouse_location update
   */
  export type warehouse_locationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * The data needed to update a warehouse_location.
     */
    data: XOR<warehouse_locationUpdateInput, warehouse_locationUncheckedUpdateInput>
    /**
     * Choose, which warehouse_location to update.
     */
    where: warehouse_locationWhereUniqueInput
  }


  /**
   * warehouse_location updateMany
   */
  export type warehouse_locationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update warehouse_locations.
     */
    data: XOR<warehouse_locationUpdateManyMutationInput, warehouse_locationUncheckedUpdateManyInput>
    /**
     * Filter which warehouse_locations to update
     */
    where?: warehouse_locationWhereInput
  }


  /**
   * warehouse_location upsert
   */
  export type warehouse_locationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * The filter to search for the warehouse_location to update in case it exists.
     */
    where: warehouse_locationWhereUniqueInput
    /**
     * In case the warehouse_location found by the `where` argument doesn't exist, create a new warehouse_location with this data.
     */
    create: XOR<warehouse_locationCreateInput, warehouse_locationUncheckedCreateInput>
    /**
     * In case the warehouse_location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<warehouse_locationUpdateInput, warehouse_locationUncheckedUpdateInput>
  }


  /**
   * warehouse_location delete
   */
  export type warehouse_locationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
    /**
     * Filter which warehouse_location to delete.
     */
    where: warehouse_locationWhereUniqueInput
  }


  /**
   * warehouse_location deleteMany
   */
  export type warehouse_locationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which warehouse_locations to delete
     */
    where?: warehouse_locationWhereInput
  }


  /**
   * warehouse_location without action
   */
  export type warehouse_locationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouse_location
     */
    select?: warehouse_locationSelect<ExtArgs> | null
  }



  /**
   * Model stock_opname
   */

  export type AggregateStock_opname = {
    _count: Stock_opnameCountAggregateOutputType | null
    _avg: Stock_opnameAvgAggregateOutputType | null
    _sum: Stock_opnameSumAggregateOutputType | null
    _min: Stock_opnameMinAggregateOutputType | null
    _max: Stock_opnameMaxAggregateOutputType | null
  }

  export type Stock_opnameAvgAggregateOutputType = {
    id: number | null
  }

  export type Stock_opnameSumAggregateOutputType = {
    id: number | null
  }

  export type Stock_opnameMinAggregateOutputType = {
    id: number | null
    date: Date | null
    status: string | null
  }

  export type Stock_opnameMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    status: string | null
  }

  export type Stock_opnameCountAggregateOutputType = {
    id: number
    date: number
    status: number
    _all: number
  }


  export type Stock_opnameAvgAggregateInputType = {
    id?: true
  }

  export type Stock_opnameSumAggregateInputType = {
    id?: true
  }

  export type Stock_opnameMinAggregateInputType = {
    id?: true
    date?: true
    status?: true
  }

  export type Stock_opnameMaxAggregateInputType = {
    id?: true
    date?: true
    status?: true
  }

  export type Stock_opnameCountAggregateInputType = {
    id?: true
    date?: true
    status?: true
    _all?: true
  }

  export type Stock_opnameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which stock_opname to aggregate.
     */
    where?: stock_opnameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stock_opnames to fetch.
     */
    orderBy?: stock_opnameOrderByWithRelationInput | stock_opnameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: stock_opnameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stock_opnames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stock_opnames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned stock_opnames
    **/
    _count?: true | Stock_opnameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Stock_opnameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Stock_opnameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Stock_opnameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Stock_opnameMaxAggregateInputType
  }

  export type GetStock_opnameAggregateType<T extends Stock_opnameAggregateArgs> = {
        [P in keyof T & keyof AggregateStock_opname]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock_opname[P]>
      : GetScalarType<T[P], AggregateStock_opname[P]>
  }




  export type stock_opnameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: stock_opnameWhereInput
    orderBy?: stock_opnameOrderByWithAggregationInput | stock_opnameOrderByWithAggregationInput[]
    by: Stock_opnameScalarFieldEnum[] | Stock_opnameScalarFieldEnum
    having?: stock_opnameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Stock_opnameCountAggregateInputType | true
    _avg?: Stock_opnameAvgAggregateInputType
    _sum?: Stock_opnameSumAggregateInputType
    _min?: Stock_opnameMinAggregateInputType
    _max?: Stock_opnameMaxAggregateInputType
  }

  export type Stock_opnameGroupByOutputType = {
    id: number
    date: Date
    status: string
    _count: Stock_opnameCountAggregateOutputType | null
    _avg: Stock_opnameAvgAggregateOutputType | null
    _sum: Stock_opnameSumAggregateOutputType | null
    _min: Stock_opnameMinAggregateOutputType | null
    _max: Stock_opnameMaxAggregateOutputType | null
  }

  type GetStock_opnameGroupByPayload<T extends stock_opnameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Stock_opnameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Stock_opnameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Stock_opnameGroupByOutputType[P]>
            : GetScalarType<T[P], Stock_opnameGroupByOutputType[P]>
        }
      >
    >


  export type stock_opnameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    status?: boolean
  }, ExtArgs["result"]["stock_opname"]>

  export type stock_opnameSelectScalar = {
    id?: boolean
    date?: boolean
    status?: boolean
  }


  export type $stock_opnamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "stock_opname"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      status: string
    }, ExtArgs["result"]["stock_opname"]>
    composites: {}
  }


  type stock_opnameGetPayload<S extends boolean | null | undefined | stock_opnameDefaultArgs> = $Result.GetResult<Prisma.$stock_opnamePayload, S>

  type stock_opnameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<stock_opnameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Stock_opnameCountAggregateInputType | true
    }

  export interface stock_opnameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['stock_opname'], meta: { name: 'stock_opname' } }
    /**
     * Find zero or one Stock_opname that matches the filter.
     * @param {stock_opnameFindUniqueArgs} args - Arguments to find a Stock_opname
     * @example
     * // Get one Stock_opname
     * const stock_opname = await prisma.stock_opname.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends stock_opnameFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameFindUniqueArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Stock_opname that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {stock_opnameFindUniqueOrThrowArgs} args - Arguments to find a Stock_opname
     * @example
     * // Get one Stock_opname
     * const stock_opname = await prisma.stock_opname.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends stock_opnameFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Stock_opname that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameFindFirstArgs} args - Arguments to find a Stock_opname
     * @example
     * // Get one Stock_opname
     * const stock_opname = await prisma.stock_opname.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends stock_opnameFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameFindFirstArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Stock_opname that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameFindFirstOrThrowArgs} args - Arguments to find a Stock_opname
     * @example
     * // Get one Stock_opname
     * const stock_opname = await prisma.stock_opname.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends stock_opnameFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Stock_opnames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stock_opnames
     * const stock_opnames = await prisma.stock_opname.findMany()
     * 
     * // Get first 10 Stock_opnames
     * const stock_opnames = await prisma.stock_opname.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stock_opnameWithIdOnly = await prisma.stock_opname.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends stock_opnameFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Stock_opname.
     * @param {stock_opnameCreateArgs} args - Arguments to create a Stock_opname.
     * @example
     * // Create one Stock_opname
     * const Stock_opname = await prisma.stock_opname.create({
     *   data: {
     *     // ... data to create a Stock_opname
     *   }
     * })
     * 
    **/
    create<T extends stock_opnameCreateArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameCreateArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Stock_opnames.
     *     @param {stock_opnameCreateManyArgs} args - Arguments to create many Stock_opnames.
     *     @example
     *     // Create many Stock_opnames
     *     const stock_opname = await prisma.stock_opname.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends stock_opnameCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Stock_opname.
     * @param {stock_opnameDeleteArgs} args - Arguments to delete one Stock_opname.
     * @example
     * // Delete one Stock_opname
     * const Stock_opname = await prisma.stock_opname.delete({
     *   where: {
     *     // ... filter to delete one Stock_opname
     *   }
     * })
     * 
    **/
    delete<T extends stock_opnameDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameDeleteArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Stock_opname.
     * @param {stock_opnameUpdateArgs} args - Arguments to update one Stock_opname.
     * @example
     * // Update one Stock_opname
     * const stock_opname = await prisma.stock_opname.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends stock_opnameUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameUpdateArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Stock_opnames.
     * @param {stock_opnameDeleteManyArgs} args - Arguments to filter Stock_opnames to delete.
     * @example
     * // Delete a few Stock_opnames
     * const { count } = await prisma.stock_opname.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends stock_opnameDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, stock_opnameDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stock_opnames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stock_opnames
     * const stock_opname = await prisma.stock_opname.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends stock_opnameUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stock_opname.
     * @param {stock_opnameUpsertArgs} args - Arguments to update or create a Stock_opname.
     * @example
     * // Update or create a Stock_opname
     * const stock_opname = await prisma.stock_opname.upsert({
     *   create: {
     *     // ... data to create a Stock_opname
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock_opname we want to update
     *   }
     * })
    **/
    upsert<T extends stock_opnameUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, stock_opnameUpsertArgs<ExtArgs>>
    ): Prisma__stock_opnameClient<$Result.GetResult<Prisma.$stock_opnamePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Stock_opnames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameCountArgs} args - Arguments to filter Stock_opnames to count.
     * @example
     * // Count the number of Stock_opnames
     * const count = await prisma.stock_opname.count({
     *   where: {
     *     // ... the filter for the Stock_opnames we want to count
     *   }
     * })
    **/
    count<T extends stock_opnameCountArgs>(
      args?: Subset<T, stock_opnameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Stock_opnameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock_opname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Stock_opnameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Stock_opnameAggregateArgs>(args: Subset<T, Stock_opnameAggregateArgs>): Prisma.PrismaPromise<GetStock_opnameAggregateType<T>>

    /**
     * Group by Stock_opname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stock_opnameGroupByArgs} args - Group by arguments.
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
      T extends stock_opnameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: stock_opnameGroupByArgs['orderBy'] }
        : { orderBy?: stock_opnameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, stock_opnameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStock_opnameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the stock_opname model
   */
  readonly fields: stock_opnameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for stock_opname.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__stock_opnameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the stock_opname model
   */ 
  interface stock_opnameFieldRefs {
    readonly id: FieldRef<"stock_opname", 'Int'>
    readonly date: FieldRef<"stock_opname", 'DateTime'>
    readonly status: FieldRef<"stock_opname", 'String'>
  }
    

  // Custom InputTypes

  /**
   * stock_opname findUnique
   */
  export type stock_opnameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter, which stock_opname to fetch.
     */
    where: stock_opnameWhereUniqueInput
  }


  /**
   * stock_opname findUniqueOrThrow
   */
  export type stock_opnameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter, which stock_opname to fetch.
     */
    where: stock_opnameWhereUniqueInput
  }


  /**
   * stock_opname findFirst
   */
  export type stock_opnameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter, which stock_opname to fetch.
     */
    where?: stock_opnameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stock_opnames to fetch.
     */
    orderBy?: stock_opnameOrderByWithRelationInput | stock_opnameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for stock_opnames.
     */
    cursor?: stock_opnameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stock_opnames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stock_opnames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of stock_opnames.
     */
    distinct?: Stock_opnameScalarFieldEnum | Stock_opnameScalarFieldEnum[]
  }


  /**
   * stock_opname findFirstOrThrow
   */
  export type stock_opnameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter, which stock_opname to fetch.
     */
    where?: stock_opnameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stock_opnames to fetch.
     */
    orderBy?: stock_opnameOrderByWithRelationInput | stock_opnameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for stock_opnames.
     */
    cursor?: stock_opnameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stock_opnames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stock_opnames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of stock_opnames.
     */
    distinct?: Stock_opnameScalarFieldEnum | Stock_opnameScalarFieldEnum[]
  }


  /**
   * stock_opname findMany
   */
  export type stock_opnameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter, which stock_opnames to fetch.
     */
    where?: stock_opnameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stock_opnames to fetch.
     */
    orderBy?: stock_opnameOrderByWithRelationInput | stock_opnameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing stock_opnames.
     */
    cursor?: stock_opnameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stock_opnames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stock_opnames.
     */
    skip?: number
    distinct?: Stock_opnameScalarFieldEnum | Stock_opnameScalarFieldEnum[]
  }


  /**
   * stock_opname create
   */
  export type stock_opnameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * The data needed to create a stock_opname.
     */
    data: XOR<stock_opnameCreateInput, stock_opnameUncheckedCreateInput>
  }


  /**
   * stock_opname createMany
   */
  export type stock_opnameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many stock_opnames.
     */
    data: stock_opnameCreateManyInput | stock_opnameCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * stock_opname update
   */
  export type stock_opnameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * The data needed to update a stock_opname.
     */
    data: XOR<stock_opnameUpdateInput, stock_opnameUncheckedUpdateInput>
    /**
     * Choose, which stock_opname to update.
     */
    where: stock_opnameWhereUniqueInput
  }


  /**
   * stock_opname updateMany
   */
  export type stock_opnameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update stock_opnames.
     */
    data: XOR<stock_opnameUpdateManyMutationInput, stock_opnameUncheckedUpdateManyInput>
    /**
     * Filter which stock_opnames to update
     */
    where?: stock_opnameWhereInput
  }


  /**
   * stock_opname upsert
   */
  export type stock_opnameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * The filter to search for the stock_opname to update in case it exists.
     */
    where: stock_opnameWhereUniqueInput
    /**
     * In case the stock_opname found by the `where` argument doesn't exist, create a new stock_opname with this data.
     */
    create: XOR<stock_opnameCreateInput, stock_opnameUncheckedCreateInput>
    /**
     * In case the stock_opname was found with the provided `where` argument, update it with this data.
     */
    update: XOR<stock_opnameUpdateInput, stock_opnameUncheckedUpdateInput>
  }


  /**
   * stock_opname delete
   */
  export type stock_opnameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
    /**
     * Filter which stock_opname to delete.
     */
    where: stock_opnameWhereUniqueInput
  }


  /**
   * stock_opname deleteMany
   */
  export type stock_opnameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which stock_opnames to delete
     */
    where?: stock_opnameWhereInput
  }


  /**
   * stock_opname without action
   */
  export type stock_opnameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the stock_opname
     */
    select?: stock_opnameSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Warehouse_locationScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name'
  };

  export type Warehouse_locationScalarFieldEnum = (typeof Warehouse_locationScalarFieldEnum)[keyof typeof Warehouse_locationScalarFieldEnum]


  export const Stock_opnameScalarFieldEnum: {
    id: 'id',
    date: 'date',
    status: 'status'
  };

  export type Stock_opnameScalarFieldEnum = (typeof Stock_opnameScalarFieldEnum)[keyof typeof Stock_opnameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type warehouse_locationWhereInput = {
    AND?: warehouse_locationWhereInput | warehouse_locationWhereInput[]
    OR?: warehouse_locationWhereInput[]
    NOT?: warehouse_locationWhereInput | warehouse_locationWhereInput[]
    id?: IntFilter<"warehouse_location"> | number
    code?: StringFilter<"warehouse_location"> | string
    name?: StringFilter<"warehouse_location"> | string
  }

  export type warehouse_locationOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type warehouse_locationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: warehouse_locationWhereInput | warehouse_locationWhereInput[]
    OR?: warehouse_locationWhereInput[]
    NOT?: warehouse_locationWhereInput | warehouse_locationWhereInput[]
    name?: StringFilter<"warehouse_location"> | string
  }, "id" | "code">

  export type warehouse_locationOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    _count?: warehouse_locationCountOrderByAggregateInput
    _avg?: warehouse_locationAvgOrderByAggregateInput
    _max?: warehouse_locationMaxOrderByAggregateInput
    _min?: warehouse_locationMinOrderByAggregateInput
    _sum?: warehouse_locationSumOrderByAggregateInput
  }

  export type warehouse_locationScalarWhereWithAggregatesInput = {
    AND?: warehouse_locationScalarWhereWithAggregatesInput | warehouse_locationScalarWhereWithAggregatesInput[]
    OR?: warehouse_locationScalarWhereWithAggregatesInput[]
    NOT?: warehouse_locationScalarWhereWithAggregatesInput | warehouse_locationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"warehouse_location"> | number
    code?: StringWithAggregatesFilter<"warehouse_location"> | string
    name?: StringWithAggregatesFilter<"warehouse_location"> | string
  }

  export type stock_opnameWhereInput = {
    AND?: stock_opnameWhereInput | stock_opnameWhereInput[]
    OR?: stock_opnameWhereInput[]
    NOT?: stock_opnameWhereInput | stock_opnameWhereInput[]
    id?: IntFilter<"stock_opname"> | number
    date?: DateTimeFilter<"stock_opname"> | Date | string
    status?: StringFilter<"stock_opname"> | string
  }

  export type stock_opnameOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type stock_opnameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: stock_opnameWhereInput | stock_opnameWhereInput[]
    OR?: stock_opnameWhereInput[]
    NOT?: stock_opnameWhereInput | stock_opnameWhereInput[]
    date?: DateTimeFilter<"stock_opname"> | Date | string
    status?: StringFilter<"stock_opname"> | string
  }, "id">

  export type stock_opnameOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    _count?: stock_opnameCountOrderByAggregateInput
    _avg?: stock_opnameAvgOrderByAggregateInput
    _max?: stock_opnameMaxOrderByAggregateInput
    _min?: stock_opnameMinOrderByAggregateInput
    _sum?: stock_opnameSumOrderByAggregateInput
  }

  export type stock_opnameScalarWhereWithAggregatesInput = {
    AND?: stock_opnameScalarWhereWithAggregatesInput | stock_opnameScalarWhereWithAggregatesInput[]
    OR?: stock_opnameScalarWhereWithAggregatesInput[]
    NOT?: stock_opnameScalarWhereWithAggregatesInput | stock_opnameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"stock_opname"> | number
    date?: DateTimeWithAggregatesFilter<"stock_opname"> | Date | string
    status?: StringWithAggregatesFilter<"stock_opname"> | string
  }

  export type warehouse_locationCreateInput = {
    code: string
    name: string
  }

  export type warehouse_locationUncheckedCreateInput = {
    id?: number
    code: string
    name: string
  }

  export type warehouse_locationUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type warehouse_locationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type warehouse_locationCreateManyInput = {
    id?: number
    code: string
    name: string
  }

  export type warehouse_locationUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type warehouse_locationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type stock_opnameCreateInput = {
    date?: Date | string
    status: string
  }

  export type stock_opnameUncheckedCreateInput = {
    id?: number
    date?: Date | string
    status: string
  }

  export type stock_opnameUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type stock_opnameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type stock_opnameCreateManyInput = {
    id?: number
    date?: Date | string
    status: string
  }

  export type stock_opnameUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type stock_opnameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type warehouse_locationCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type warehouse_locationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type warehouse_locationMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type warehouse_locationMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type warehouse_locationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type stock_opnameCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type stock_opnameAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type stock_opnameMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type stock_opnameMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type stock_opnameSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use warehouse_locationDefaultArgs instead
     */
    export type warehouse_locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = warehouse_locationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use stock_opnameDefaultArgs instead
     */
    export type stock_opnameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = stock_opnameDefaultArgs<ExtArgs>

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