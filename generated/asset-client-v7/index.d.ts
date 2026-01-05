
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
 * Model areas
 * 
 */
export type areas = $Result.DefaultSelection<Prisma.$areasPayload>
/**
 * Model asset_transactions
 * 
 */
export type asset_transactions = $Result.DefaultSelection<Prisma.$asset_transactionsPayload>
/**
 * Model assets
 * 
 */
export type assets = $Result.DefaultSelection<Prisma.$assetsPayload>
/**
 * Model activity_log
 * 
 */
export type activity_log = $Result.DefaultSelection<Prisma.$activity_logPayload>
/**
 * Model asset_types
 * 
 */
export type asset_types = $Result.DefaultSelection<Prisma.$asset_typesPayload>
/**
 * Model asset_images
 * 
 */
export type asset_images = $Result.DefaultSelection<Prisma.$asset_imagesPayload>
/**
 * Model brands
 * 
 */
export type brands = $Result.DefaultSelection<Prisma.$brandsPayload>
/**
 * Model categories
 * 
 */
export type categories = $Result.DefaultSelection<Prisma.$categoriesPayload>
/**
 * Model departments
 * 
 */
export type departments = $Result.DefaultSelection<Prisma.$departmentsPayload>
/**
 * Model employees
 * 
 */
export type employees = $Result.DefaultSelection<Prisma.$employeesPayload>
/**
 * Model locations
 * 
 */
export type locations = $Result.DefaultSelection<Prisma.$locationsPayload>
/**
 * Model log_crud
 * 
 */
export type log_crud = $Result.DefaultSelection<Prisma.$log_crudPayload>
/**
 * Model suppliers
 * 
 */
export type suppliers = $Result.DefaultSelection<Prisma.$suppliersPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AssetCondition: {
  GOOD: 'GOOD',
  SLIGHTLY_DAMAGED: 'SLIGHTLY_DAMAGED',
  DAMAGED: 'DAMAGED',
  BROKEN: 'BROKEN',
  DISPOSED: 'DISPOSED',
  MAINTENANCE: 'MAINTENANCE',
  LOST: 'LOST'
};

export type AssetCondition = (typeof AssetCondition)[keyof typeof AssetCondition]

}

export type AssetCondition = $Enums.AssetCondition

export const AssetCondition: typeof $Enums.AssetCondition

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Areas
 * const areas = await prisma.areas.findMany()
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
   * // Fetch zero or more Areas
   * const areas = await prisma.areas.findMany()
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
   * `prisma.areas`: Exposes CRUD operations for the **areas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Areas
    * const areas = await prisma.areas.findMany()
    * ```
    */
  get areas(): Prisma.areasDelegate<ExtArgs>;

  /**
   * `prisma.asset_transactions`: Exposes CRUD operations for the **asset_transactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asset_transactions
    * const asset_transactions = await prisma.asset_transactions.findMany()
    * ```
    */
  get asset_transactions(): Prisma.asset_transactionsDelegate<ExtArgs>;

  /**
   * `prisma.assets`: Exposes CRUD operations for the **assets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.assets.findMany()
    * ```
    */
  get assets(): Prisma.assetsDelegate<ExtArgs>;

  /**
   * `prisma.activity_log`: Exposes CRUD operations for the **activity_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activity_logs
    * const activity_logs = await prisma.activity_log.findMany()
    * ```
    */
  get activity_log(): Prisma.activity_logDelegate<ExtArgs>;

  /**
   * `prisma.asset_types`: Exposes CRUD operations for the **asset_types** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asset_types
    * const asset_types = await prisma.asset_types.findMany()
    * ```
    */
  get asset_types(): Prisma.asset_typesDelegate<ExtArgs>;

  /**
   * `prisma.asset_images`: Exposes CRUD operations for the **asset_images** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asset_images
    * const asset_images = await prisma.asset_images.findMany()
    * ```
    */
  get asset_images(): Prisma.asset_imagesDelegate<ExtArgs>;

  /**
   * `prisma.brands`: Exposes CRUD operations for the **brands** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brands.findMany()
    * ```
    */
  get brands(): Prisma.brandsDelegate<ExtArgs>;

  /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.categoriesDelegate<ExtArgs>;

  /**
   * `prisma.departments`: Exposes CRUD operations for the **departments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.departments.findMany()
    * ```
    */
  get departments(): Prisma.departmentsDelegate<ExtArgs>;

  /**
   * `prisma.employees`: Exposes CRUD operations for the **employees** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employees.findMany()
    * ```
    */
  get employees(): Prisma.employeesDelegate<ExtArgs>;

  /**
   * `prisma.locations`: Exposes CRUD operations for the **locations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.locations.findMany()
    * ```
    */
  get locations(): Prisma.locationsDelegate<ExtArgs>;

  /**
   * `prisma.log_crud`: Exposes CRUD operations for the **log_crud** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Log_cruds
    * const log_cruds = await prisma.log_crud.findMany()
    * ```
    */
  get log_crud(): Prisma.log_crudDelegate<ExtArgs>;

  /**
   * `prisma.suppliers`: Exposes CRUD operations for the **suppliers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.suppliers.findMany()
    * ```
    */
  get suppliers(): Prisma.suppliersDelegate<ExtArgs>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs>;
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
    areas: 'areas',
    asset_transactions: 'asset_transactions',
    assets: 'assets',
    activity_log: 'activity_log',
    asset_types: 'asset_types',
    asset_images: 'asset_images',
    brands: 'brands',
    categories: 'categories',
    departments: 'departments',
    employees: 'employees',
    locations: 'locations',
    log_crud: 'log_crud',
    suppliers: 'suppliers',
    users: 'users'
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
      modelProps: 'areas' | 'asset_transactions' | 'assets' | 'activity_log' | 'asset_types' | 'asset_images' | 'brands' | 'categories' | 'departments' | 'employees' | 'locations' | 'log_crud' | 'suppliers' | 'users'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      areas: {
        payload: Prisma.$areasPayload<ExtArgs>
        fields: Prisma.areasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.areasFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.areasFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          findFirst: {
            args: Prisma.areasFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.areasFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          findMany: {
            args: Prisma.areasFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>[]
          }
          create: {
            args: Prisma.areasCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          createMany: {
            args: Prisma.areasCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.areasDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          update: {
            args: Prisma.areasUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          deleteMany: {
            args: Prisma.areasDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.areasUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.areasUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$areasPayload>
          }
          aggregate: {
            args: Prisma.AreasAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAreas>
          }
          groupBy: {
            args: Prisma.areasGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AreasGroupByOutputType>[]
          }
          count: {
            args: Prisma.areasCountArgs<ExtArgs>,
            result: $Utils.Optional<AreasCountAggregateOutputType> | number
          }
        }
      }
      asset_transactions: {
        payload: Prisma.$asset_transactionsPayload<ExtArgs>
        fields: Prisma.asset_transactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.asset_transactionsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.asset_transactionsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          findFirst: {
            args: Prisma.asset_transactionsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.asset_transactionsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          findMany: {
            args: Prisma.asset_transactionsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>[]
          }
          create: {
            args: Prisma.asset_transactionsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          createMany: {
            args: Prisma.asset_transactionsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.asset_transactionsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          update: {
            args: Prisma.asset_transactionsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          deleteMany: {
            args: Prisma.asset_transactionsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.asset_transactionsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.asset_transactionsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_transactionsPayload>
          }
          aggregate: {
            args: Prisma.Asset_transactionsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAsset_transactions>
          }
          groupBy: {
            args: Prisma.asset_transactionsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Asset_transactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.asset_transactionsCountArgs<ExtArgs>,
            result: $Utils.Optional<Asset_transactionsCountAggregateOutputType> | number
          }
        }
      }
      assets: {
        payload: Prisma.$assetsPayload<ExtArgs>
        fields: Prisma.assetsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.assetsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.assetsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          findFirst: {
            args: Prisma.assetsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.assetsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          findMany: {
            args: Prisma.assetsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>[]
          }
          create: {
            args: Prisma.assetsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          createMany: {
            args: Prisma.assetsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.assetsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          update: {
            args: Prisma.assetsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          deleteMany: {
            args: Prisma.assetsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.assetsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.assetsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          aggregate: {
            args: Prisma.AssetsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAssets>
          }
          groupBy: {
            args: Prisma.assetsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AssetsGroupByOutputType>[]
          }
          count: {
            args: Prisma.assetsCountArgs<ExtArgs>,
            result: $Utils.Optional<AssetsCountAggregateOutputType> | number
          }
        }
      }
      activity_log: {
        payload: Prisma.$activity_logPayload<ExtArgs>
        fields: Prisma.activity_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.activity_logFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.activity_logFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          findFirst: {
            args: Prisma.activity_logFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.activity_logFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          findMany: {
            args: Prisma.activity_logFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>[]
          }
          create: {
            args: Prisma.activity_logCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          createMany: {
            args: Prisma.activity_logCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.activity_logDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          update: {
            args: Prisma.activity_logUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          deleteMany: {
            args: Prisma.activity_logDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.activity_logUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.activity_logUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activity_logPayload>
          }
          aggregate: {
            args: Prisma.Activity_logAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateActivity_log>
          }
          groupBy: {
            args: Prisma.activity_logGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Activity_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.activity_logCountArgs<ExtArgs>,
            result: $Utils.Optional<Activity_logCountAggregateOutputType> | number
          }
        }
      }
      asset_types: {
        payload: Prisma.$asset_typesPayload<ExtArgs>
        fields: Prisma.asset_typesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.asset_typesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.asset_typesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          findFirst: {
            args: Prisma.asset_typesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.asset_typesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          findMany: {
            args: Prisma.asset_typesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>[]
          }
          create: {
            args: Prisma.asset_typesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          createMany: {
            args: Prisma.asset_typesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.asset_typesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          update: {
            args: Prisma.asset_typesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          deleteMany: {
            args: Prisma.asset_typesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.asset_typesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.asset_typesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_typesPayload>
          }
          aggregate: {
            args: Prisma.Asset_typesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAsset_types>
          }
          groupBy: {
            args: Prisma.asset_typesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Asset_typesGroupByOutputType>[]
          }
          count: {
            args: Prisma.asset_typesCountArgs<ExtArgs>,
            result: $Utils.Optional<Asset_typesCountAggregateOutputType> | number
          }
        }
      }
      asset_images: {
        payload: Prisma.$asset_imagesPayload<ExtArgs>
        fields: Prisma.asset_imagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.asset_imagesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.asset_imagesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          findFirst: {
            args: Prisma.asset_imagesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.asset_imagesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          findMany: {
            args: Prisma.asset_imagesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>[]
          }
          create: {
            args: Prisma.asset_imagesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          createMany: {
            args: Prisma.asset_imagesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.asset_imagesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          update: {
            args: Prisma.asset_imagesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          deleteMany: {
            args: Prisma.asset_imagesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.asset_imagesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.asset_imagesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$asset_imagesPayload>
          }
          aggregate: {
            args: Prisma.Asset_imagesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAsset_images>
          }
          groupBy: {
            args: Prisma.asset_imagesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Asset_imagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.asset_imagesCountArgs<ExtArgs>,
            result: $Utils.Optional<Asset_imagesCountAggregateOutputType> | number
          }
        }
      }
      brands: {
        payload: Prisma.$brandsPayload<ExtArgs>
        fields: Prisma.brandsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.brandsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.brandsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          findFirst: {
            args: Prisma.brandsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.brandsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          findMany: {
            args: Prisma.brandsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>[]
          }
          create: {
            args: Prisma.brandsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          createMany: {
            args: Prisma.brandsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.brandsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          update: {
            args: Prisma.brandsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          deleteMany: {
            args: Prisma.brandsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.brandsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.brandsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$brandsPayload>
          }
          aggregate: {
            args: Prisma.BrandsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBrands>
          }
          groupBy: {
            args: Prisma.brandsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BrandsGroupByOutputType>[]
          }
          count: {
            args: Prisma.brandsCountArgs<ExtArgs>,
            result: $Utils.Optional<BrandsCountAggregateOutputType> | number
          }
        }
      }
      categories: {
        payload: Prisma.$categoriesPayload<ExtArgs>
        fields: Prisma.categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findFirst: {
            args: Prisma.categoriesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findMany: {
            args: Prisma.categoriesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          create: {
            args: Prisma.categoriesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          createMany: {
            args: Prisma.categoriesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.categoriesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          update: {
            args: Prisma.categoriesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          deleteMany: {
            args: Prisma.categoriesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.categoriesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.categoriesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.categoriesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriesCountArgs<ExtArgs>,
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      departments: {
        payload: Prisma.$departmentsPayload<ExtArgs>
        fields: Prisma.departmentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.departmentsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.departmentsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          findFirst: {
            args: Prisma.departmentsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.departmentsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          findMany: {
            args: Prisma.departmentsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>[]
          }
          create: {
            args: Prisma.departmentsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          createMany: {
            args: Prisma.departmentsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.departmentsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          update: {
            args: Prisma.departmentsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          deleteMany: {
            args: Prisma.departmentsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.departmentsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.departmentsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          aggregate: {
            args: Prisma.DepartmentsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDepartments>
          }
          groupBy: {
            args: Prisma.departmentsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.departmentsCountArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentsCountAggregateOutputType> | number
          }
        }
      }
      employees: {
        payload: Prisma.$employeesPayload<ExtArgs>
        fields: Prisma.employeesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findFirst: {
            args: Prisma.employeesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findMany: {
            args: Prisma.employeesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>[]
          }
          create: {
            args: Prisma.employeesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          createMany: {
            args: Prisma.employeesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.employeesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          update: {
            args: Prisma.employeesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          deleteMany: {
            args: Prisma.employeesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.employeesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.employeesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          aggregate: {
            args: Prisma.EmployeesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEmployees>
          }
          groupBy: {
            args: Prisma.employeesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EmployeesGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeesCountArgs<ExtArgs>,
            result: $Utils.Optional<EmployeesCountAggregateOutputType> | number
          }
        }
      }
      locations: {
        payload: Prisma.$locationsPayload<ExtArgs>
        fields: Prisma.locationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.locationsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.locationsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          findFirst: {
            args: Prisma.locationsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.locationsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          findMany: {
            args: Prisma.locationsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>[]
          }
          create: {
            args: Prisma.locationsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          createMany: {
            args: Prisma.locationsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.locationsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          update: {
            args: Prisma.locationsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          deleteMany: {
            args: Prisma.locationsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.locationsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.locationsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$locationsPayload>
          }
          aggregate: {
            args: Prisma.LocationsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLocations>
          }
          groupBy: {
            args: Prisma.locationsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LocationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.locationsCountArgs<ExtArgs>,
            result: $Utils.Optional<LocationsCountAggregateOutputType> | number
          }
        }
      }
      log_crud: {
        payload: Prisma.$log_crudPayload<ExtArgs>
        fields: Prisma.log_crudFieldRefs
        operations: {
          findUnique: {
            args: Prisma.log_crudFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.log_crudFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          findFirst: {
            args: Prisma.log_crudFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.log_crudFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          findMany: {
            args: Prisma.log_crudFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>[]
          }
          create: {
            args: Prisma.log_crudCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          createMany: {
            args: Prisma.log_crudCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.log_crudDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          update: {
            args: Prisma.log_crudUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          deleteMany: {
            args: Prisma.log_crudDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.log_crudUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.log_crudUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$log_crudPayload>
          }
          aggregate: {
            args: Prisma.Log_crudAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLog_crud>
          }
          groupBy: {
            args: Prisma.log_crudGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Log_crudGroupByOutputType>[]
          }
          count: {
            args: Prisma.log_crudCountArgs<ExtArgs>,
            result: $Utils.Optional<Log_crudCountAggregateOutputType> | number
          }
        }
      }
      suppliers: {
        payload: Prisma.$suppliersPayload<ExtArgs>
        fields: Prisma.suppliersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.suppliersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.suppliersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          findFirst: {
            args: Prisma.suppliersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.suppliersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          findMany: {
            args: Prisma.suppliersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>[]
          }
          create: {
            args: Prisma.suppliersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          createMany: {
            args: Prisma.suppliersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.suppliersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          update: {
            args: Prisma.suppliersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          deleteMany: {
            args: Prisma.suppliersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.suppliersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.suppliersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$suppliersPayload>
          }
          aggregate: {
            args: Prisma.SuppliersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSuppliers>
          }
          groupBy: {
            args: Prisma.suppliersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SuppliersGroupByOutputType>[]
          }
          count: {
            args: Prisma.suppliersCountArgs<ExtArgs>,
            result: $Utils.Optional<SuppliersCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>,
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
   * Count Type AreasCountOutputType
   */

  export type AreasCountOutputType = {
    locations: number
    assets: number
  }

  export type AreasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | AreasCountOutputTypeCountLocationsArgs
    assets?: boolean | AreasCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * AreasCountOutputType without action
   */
  export type AreasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AreasCountOutputType
     */
    select?: AreasCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * AreasCountOutputType without action
   */
  export type AreasCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationsWhereInput
  }


  /**
   * AreasCountOutputType without action
   */
  export type AreasCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type AssetsCountOutputType
   */

  export type AssetsCountOutputType = {
    transactions: number
    log_cruds: number
    asset_images: number
  }

  export type AssetsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | AssetsCountOutputTypeCountTransactionsArgs
    log_cruds?: boolean | AssetsCountOutputTypeCountLog_crudsArgs
    asset_images?: boolean | AssetsCountOutputTypeCountAsset_imagesArgs
  }

  // Custom InputTypes

  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetsCountOutputType
     */
    select?: AssetsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_transactionsWhereInput
  }


  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeCountLog_crudsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: log_crudWhereInput
  }


  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeCountAsset_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_imagesWhereInput
  }



  /**
   * Count Type Asset_typesCountOutputType
   */

  export type Asset_typesCountOutputType = {
    assets: number
  }

  export type Asset_typesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | Asset_typesCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * Asset_typesCountOutputType without action
   */
  export type Asset_typesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset_typesCountOutputType
     */
    select?: Asset_typesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * Asset_typesCountOutputType without action
   */
  export type Asset_typesCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type BrandsCountOutputType
   */

  export type BrandsCountOutputType = {
    assets: number
  }

  export type BrandsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | BrandsCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * BrandsCountOutputType without action
   */
  export type BrandsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandsCountOutputType
     */
    select?: BrandsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * BrandsCountOutputType without action
   */
  export type BrandsCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    assets: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | CategoriesCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type DepartmentsCountOutputType
   */

  export type DepartmentsCountOutputType = {
    employees: number
  }

  export type DepartmentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | DepartmentsCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes

  /**
   * DepartmentsCountOutputType without action
   */
  export type DepartmentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentsCountOutputType
     */
    select?: DepartmentsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DepartmentsCountOutputType without action
   */
  export type DepartmentsCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeesWhereInput
  }



  /**
   * Count Type EmployeesCountOutputType
   */

  export type EmployeesCountOutputType = {
    previous_trans: number
    new_trans: number
    assets: number
  }

  export type EmployeesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    previous_trans?: boolean | EmployeesCountOutputTypeCountPrevious_transArgs
    new_trans?: boolean | EmployeesCountOutputTypeCountNew_transArgs
    assets?: boolean | EmployeesCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeesCountOutputType
     */
    select?: EmployeesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeCountPrevious_transArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_transactionsWhereInput
  }


  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeCountNew_transArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_transactionsWhereInput
  }


  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type LocationsCountOutputType
   */

  export type LocationsCountOutputType = {
    assets: number
  }

  export type LocationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | LocationsCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * LocationsCountOutputType without action
   */
  export type LocationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationsCountOutputType
     */
    select?: LocationsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * LocationsCountOutputType without action
   */
  export type LocationsCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type Log_crudCountOutputType
   */

  export type Log_crudCountOutputType = {
    assets: number
  }

  export type Log_crudCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | Log_crudCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * Log_crudCountOutputType without action
   */
  export type Log_crudCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log_crudCountOutputType
     */
    select?: Log_crudCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * Log_crudCountOutputType without action
   */
  export type Log_crudCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type SuppliersCountOutputType
   */

  export type SuppliersCountOutputType = {
    assets: number
  }

  export type SuppliersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | SuppliersCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes

  /**
   * SuppliersCountOutputType without action
   */
  export type SuppliersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuppliersCountOutputType
     */
    select?: SuppliersCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * SuppliersCountOutputType without action
   */
  export type SuppliersCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }



  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    log_cruds: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    log_cruds?: boolean | UsersCountOutputTypeCountLog_crudsArgs
  }

  // Custom InputTypes

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLog_crudsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: log_crudWhereInput
  }



  /**
   * Models
   */

  /**
   * Model areas
   */

  export type AggregateAreas = {
    _count: AreasCountAggregateOutputType | null
    _avg: AreasAvgAggregateOutputType | null
    _sum: AreasSumAggregateOutputType | null
    _min: AreasMinAggregateOutputType | null
    _max: AreasMaxAggregateOutputType | null
  }

  export type AreasAvgAggregateOutputType = {
    id: number | null
  }

  export type AreasSumAggregateOutputType = {
    id: bigint | null
  }

  export type AreasMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AreasMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AreasCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AreasAvgAggregateInputType = {
    id?: true
  }

  export type AreasSumAggregateInputType = {
    id?: true
  }

  export type AreasMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type AreasMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type AreasCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AreasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which areas to aggregate.
     */
    where?: areasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areasOrderByWithRelationInput | areasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: areasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned areas
    **/
    _count?: true | AreasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AreasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AreasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AreasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AreasMaxAggregateInputType
  }

  export type GetAreasAggregateType<T extends AreasAggregateArgs> = {
        [P in keyof T & keyof AggregateAreas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAreas[P]>
      : GetScalarType<T[P], AggregateAreas[P]>
  }




  export type areasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: areasWhereInput
    orderBy?: areasOrderByWithAggregationInput | areasOrderByWithAggregationInput[]
    by: AreasScalarFieldEnum[] | AreasScalarFieldEnum
    having?: areasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AreasCountAggregateInputType | true
    _avg?: AreasAvgAggregateInputType
    _sum?: AreasSumAggregateInputType
    _min?: AreasMinAggregateInputType
    _max?: AreasMaxAggregateInputType
  }

  export type AreasGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date | null
    updated_at: Date | null
    _count: AreasCountAggregateOutputType | null
    _avg: AreasAvgAggregateOutputType | null
    _sum: AreasSumAggregateOutputType | null
    _min: AreasMinAggregateOutputType | null
    _max: AreasMaxAggregateOutputType | null
  }

  type GetAreasGroupByPayload<T extends areasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AreasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AreasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AreasGroupByOutputType[P]>
            : GetScalarType<T[P], AreasGroupByOutputType[P]>
        }
      >
    >


  export type areasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    locations?: boolean | areas$locationsArgs<ExtArgs>
    assets?: boolean | areas$assetsArgs<ExtArgs>
    _count?: boolean | AreasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["areas"]>

  export type areasSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type areasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | areas$locationsArgs<ExtArgs>
    assets?: boolean | areas$assetsArgs<ExtArgs>
    _count?: boolean | AreasCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $areasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "areas"
    objects: {
      locations: Prisma.$locationsPayload<ExtArgs>[]
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["areas"]>
    composites: {}
  }


  type areasGetPayload<S extends boolean | null | undefined | areasDefaultArgs> = $Result.GetResult<Prisma.$areasPayload, S>

  type areasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<areasFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AreasCountAggregateInputType | true
    }

  export interface areasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['areas'], meta: { name: 'areas' } }
    /**
     * Find zero or one Areas that matches the filter.
     * @param {areasFindUniqueArgs} args - Arguments to find a Areas
     * @example
     * // Get one Areas
     * const areas = await prisma.areas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends areasFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, areasFindUniqueArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Areas that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {areasFindUniqueOrThrowArgs} args - Arguments to find a Areas
     * @example
     * // Get one Areas
     * const areas = await prisma.areas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends areasFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, areasFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasFindFirstArgs} args - Arguments to find a Areas
     * @example
     * // Get one Areas
     * const areas = await prisma.areas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends areasFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, areasFindFirstArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Areas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasFindFirstOrThrowArgs} args - Arguments to find a Areas
     * @example
     * // Get one Areas
     * const areas = await prisma.areas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends areasFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, areasFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Areas
     * const areas = await prisma.areas.findMany()
     * 
     * // Get first 10 Areas
     * const areas = await prisma.areas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const areasWithIdOnly = await prisma.areas.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends areasFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, areasFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Areas.
     * @param {areasCreateArgs} args - Arguments to create a Areas.
     * @example
     * // Create one Areas
     * const Areas = await prisma.areas.create({
     *   data: {
     *     // ... data to create a Areas
     *   }
     * })
     * 
    **/
    create<T extends areasCreateArgs<ExtArgs>>(
      args: SelectSubset<T, areasCreateArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Areas.
     *     @param {areasCreateManyArgs} args - Arguments to create many Areas.
     *     @example
     *     // Create many Areas
     *     const areas = await prisma.areas.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends areasCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, areasCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Areas.
     * @param {areasDeleteArgs} args - Arguments to delete one Areas.
     * @example
     * // Delete one Areas
     * const Areas = await prisma.areas.delete({
     *   where: {
     *     // ... filter to delete one Areas
     *   }
     * })
     * 
    **/
    delete<T extends areasDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, areasDeleteArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Areas.
     * @param {areasUpdateArgs} args - Arguments to update one Areas.
     * @example
     * // Update one Areas
     * const areas = await prisma.areas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends areasUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, areasUpdateArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Areas.
     * @param {areasDeleteManyArgs} args - Arguments to filter Areas to delete.
     * @example
     * // Delete a few Areas
     * const { count } = await prisma.areas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends areasDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, areasDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Areas
     * const areas = await prisma.areas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends areasUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, areasUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Areas.
     * @param {areasUpsertArgs} args - Arguments to update or create a Areas.
     * @example
     * // Update or create a Areas
     * const areas = await prisma.areas.upsert({
     *   create: {
     *     // ... data to create a Areas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Areas we want to update
     *   }
     * })
    **/
    upsert<T extends areasUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, areasUpsertArgs<ExtArgs>>
    ): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasCountArgs} args - Arguments to filter Areas to count.
     * @example
     * // Count the number of Areas
     * const count = await prisma.areas.count({
     *   where: {
     *     // ... the filter for the Areas we want to count
     *   }
     * })
    **/
    count<T extends areasCountArgs>(
      args?: Subset<T, areasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AreasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AreasAggregateArgs>(args: Subset<T, AreasAggregateArgs>): Prisma.PrismaPromise<GetAreasAggregateType<T>>

    /**
     * Group by Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areasGroupByArgs} args - Group by arguments.
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
      T extends areasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: areasGroupByArgs['orderBy'] }
        : { orderBy?: areasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, areasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the areas model
   */
  readonly fields: areasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for areas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__areasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    locations<T extends areas$locationsArgs<ExtArgs> = {}>(args?: Subset<T, areas$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findMany'> | Null>;

    assets<T extends areas$assetsArgs<ExtArgs> = {}>(args?: Subset<T, areas$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the areas model
   */ 
  interface areasFieldRefs {
    readonly id: FieldRef<"areas", 'BigInt'>
    readonly name: FieldRef<"areas", 'String'>
    readonly created_at: FieldRef<"areas", 'DateTime'>
    readonly updated_at: FieldRef<"areas", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * areas findUnique
   */
  export type areasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where: areasWhereUniqueInput
  }


  /**
   * areas findUniqueOrThrow
   */
  export type areasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where: areasWhereUniqueInput
  }


  /**
   * areas findFirst
   */
  export type areasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where?: areasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areasOrderByWithRelationInput | areasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for areas.
     */
    cursor?: areasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of areas.
     */
    distinct?: AreasScalarFieldEnum | AreasScalarFieldEnum[]
  }


  /**
   * areas findFirstOrThrow
   */
  export type areasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where?: areasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areasOrderByWithRelationInput | areasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for areas.
     */
    cursor?: areasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of areas.
     */
    distinct?: AreasScalarFieldEnum | AreasScalarFieldEnum[]
  }


  /**
   * areas findMany
   */
  export type areasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where?: areasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areasOrderByWithRelationInput | areasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing areas.
     */
    cursor?: areasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    distinct?: AreasScalarFieldEnum | AreasScalarFieldEnum[]
  }


  /**
   * areas create
   */
  export type areasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * The data needed to create a areas.
     */
    data: XOR<areasCreateInput, areasUncheckedCreateInput>
  }


  /**
   * areas createMany
   */
  export type areasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many areas.
     */
    data: areasCreateManyInput | areasCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * areas update
   */
  export type areasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * The data needed to update a areas.
     */
    data: XOR<areasUpdateInput, areasUncheckedUpdateInput>
    /**
     * Choose, which areas to update.
     */
    where: areasWhereUniqueInput
  }


  /**
   * areas updateMany
   */
  export type areasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update areas.
     */
    data: XOR<areasUpdateManyMutationInput, areasUncheckedUpdateManyInput>
    /**
     * Filter which areas to update
     */
    where?: areasWhereInput
  }


  /**
   * areas upsert
   */
  export type areasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * The filter to search for the areas to update in case it exists.
     */
    where: areasWhereUniqueInput
    /**
     * In case the areas found by the `where` argument doesn't exist, create a new areas with this data.
     */
    create: XOR<areasCreateInput, areasUncheckedCreateInput>
    /**
     * In case the areas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<areasUpdateInput, areasUncheckedUpdateInput>
  }


  /**
   * areas delete
   */
  export type areasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    /**
     * Filter which areas to delete.
     */
    where: areasWhereUniqueInput
  }


  /**
   * areas deleteMany
   */
  export type areasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which areas to delete
     */
    where?: areasWhereInput
  }


  /**
   * areas.locations
   */
  export type areas$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    where?: locationsWhereInput
    orderBy?: locationsOrderByWithRelationInput | locationsOrderByWithRelationInput[]
    cursor?: locationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationsScalarFieldEnum | LocationsScalarFieldEnum[]
  }


  /**
   * areas.assets
   */
  export type areas$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * areas without action
   */
  export type areasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
  }



  /**
   * Model asset_transactions
   */

  export type AggregateAsset_transactions = {
    _count: Asset_transactionsCountAggregateOutputType | null
    _avg: Asset_transactionsAvgAggregateOutputType | null
    _sum: Asset_transactionsSumAggregateOutputType | null
    _min: Asset_transactionsMinAggregateOutputType | null
    _max: Asset_transactionsMaxAggregateOutputType | null
  }

  export type Asset_transactionsAvgAggregateOutputType = {
    id: number | null
    asset_id: number | null
    previous_holder_id: number | null
    new_holder_id: number | null
    created_by: number | null
  }

  export type Asset_transactionsSumAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
    previous_holder_id: bigint | null
    new_holder_id: bigint | null
    created_by: bigint | null
  }

  export type Asset_transactionsMinAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
    transaction_type: string | null
    previous_holder_id: bigint | null
    new_holder_id: bigint | null
    previous_location: string | null
    new_location: string | null
    previous_condition: string | null
    new_condition: string | null
    remarks: string | null
    transaction_date: Date | null
    created_by: bigint | null
    creator_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Asset_transactionsMaxAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
    transaction_type: string | null
    previous_holder_id: bigint | null
    new_holder_id: bigint | null
    previous_location: string | null
    new_location: string | null
    previous_condition: string | null
    new_condition: string | null
    remarks: string | null
    transaction_date: Date | null
    created_by: bigint | null
    creator_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Asset_transactionsCountAggregateOutputType = {
    id: number
    asset_id: number
    transaction_type: number
    previous_holder_id: number
    new_holder_id: number
    previous_location: number
    new_location: number
    previous_condition: number
    new_condition: number
    remarks: number
    transaction_date: number
    created_by: number
    creator_name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Asset_transactionsAvgAggregateInputType = {
    id?: true
    asset_id?: true
    previous_holder_id?: true
    new_holder_id?: true
    created_by?: true
  }

  export type Asset_transactionsSumAggregateInputType = {
    id?: true
    asset_id?: true
    previous_holder_id?: true
    new_holder_id?: true
    created_by?: true
  }

  export type Asset_transactionsMinAggregateInputType = {
    id?: true
    asset_id?: true
    transaction_type?: true
    previous_holder_id?: true
    new_holder_id?: true
    previous_location?: true
    new_location?: true
    previous_condition?: true
    new_condition?: true
    remarks?: true
    transaction_date?: true
    created_by?: true
    creator_name?: true
    created_at?: true
    updated_at?: true
  }

  export type Asset_transactionsMaxAggregateInputType = {
    id?: true
    asset_id?: true
    transaction_type?: true
    previous_holder_id?: true
    new_holder_id?: true
    previous_location?: true
    new_location?: true
    previous_condition?: true
    new_condition?: true
    remarks?: true
    transaction_date?: true
    created_by?: true
    creator_name?: true
    created_at?: true
    updated_at?: true
  }

  export type Asset_transactionsCountAggregateInputType = {
    id?: true
    asset_id?: true
    transaction_type?: true
    previous_holder_id?: true
    new_holder_id?: true
    previous_location?: true
    new_location?: true
    previous_condition?: true
    new_condition?: true
    remarks?: true
    transaction_date?: true
    created_by?: true
    creator_name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Asset_transactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_transactions to aggregate.
     */
    where?: asset_transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_transactions to fetch.
     */
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: asset_transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned asset_transactions
    **/
    _count?: true | Asset_transactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Asset_transactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Asset_transactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Asset_transactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Asset_transactionsMaxAggregateInputType
  }

  export type GetAsset_transactionsAggregateType<T extends Asset_transactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset_transactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset_transactions[P]>
      : GetScalarType<T[P], AggregateAsset_transactions[P]>
  }




  export type asset_transactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_transactionsWhereInput
    orderBy?: asset_transactionsOrderByWithAggregationInput | asset_transactionsOrderByWithAggregationInput[]
    by: Asset_transactionsScalarFieldEnum[] | Asset_transactionsScalarFieldEnum
    having?: asset_transactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Asset_transactionsCountAggregateInputType | true
    _avg?: Asset_transactionsAvgAggregateInputType
    _sum?: Asset_transactionsSumAggregateInputType
    _min?: Asset_transactionsMinAggregateInputType
    _max?: Asset_transactionsMaxAggregateInputType
  }

  export type Asset_transactionsGroupByOutputType = {
    id: bigint
    asset_id: bigint
    transaction_type: string
    previous_holder_id: bigint | null
    new_holder_id: bigint | null
    previous_location: string | null
    new_location: string | null
    previous_condition: string | null
    new_condition: string | null
    remarks: string | null
    transaction_date: Date
    created_by: bigint | null
    creator_name: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: Asset_transactionsCountAggregateOutputType | null
    _avg: Asset_transactionsAvgAggregateOutputType | null
    _sum: Asset_transactionsSumAggregateOutputType | null
    _min: Asset_transactionsMinAggregateOutputType | null
    _max: Asset_transactionsMaxAggregateOutputType | null
  }

  type GetAsset_transactionsGroupByPayload<T extends asset_transactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Asset_transactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Asset_transactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Asset_transactionsGroupByOutputType[P]>
            : GetScalarType<T[P], Asset_transactionsGroupByOutputType[P]>
        }
      >
    >


  export type asset_transactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_id?: boolean
    transaction_type?: boolean
    previous_holder_id?: boolean
    new_holder_id?: boolean
    previous_location?: boolean
    new_location?: boolean
    previous_condition?: boolean
    new_condition?: boolean
    remarks?: boolean
    transaction_date?: boolean
    created_by?: boolean
    creator_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    asset?: boolean | assetsDefaultArgs<ExtArgs>
    previous_holder?: boolean | asset_transactions$previous_holderArgs<ExtArgs>
    new_holder?: boolean | asset_transactions$new_holderArgs<ExtArgs>
  }, ExtArgs["result"]["asset_transactions"]>

  export type asset_transactionsSelectScalar = {
    id?: boolean
    asset_id?: boolean
    transaction_type?: boolean
    previous_holder_id?: boolean
    new_holder_id?: boolean
    previous_location?: boolean
    new_location?: boolean
    previous_condition?: boolean
    new_condition?: boolean
    remarks?: boolean
    transaction_date?: boolean
    created_by?: boolean
    creator_name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type asset_transactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asset?: boolean | assetsDefaultArgs<ExtArgs>
    previous_holder?: boolean | asset_transactions$previous_holderArgs<ExtArgs>
    new_holder?: boolean | asset_transactions$new_holderArgs<ExtArgs>
  }


  export type $asset_transactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "asset_transactions"
    objects: {
      asset: Prisma.$assetsPayload<ExtArgs>
      previous_holder: Prisma.$employeesPayload<ExtArgs> | null
      new_holder: Prisma.$employeesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      asset_id: bigint
      transaction_type: string
      previous_holder_id: bigint | null
      new_holder_id: bigint | null
      previous_location: string | null
      new_location: string | null
      previous_condition: string | null
      new_condition: string | null
      remarks: string | null
      transaction_date: Date
      created_by: bigint | null
      creator_name: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["asset_transactions"]>
    composites: {}
  }


  type asset_transactionsGetPayload<S extends boolean | null | undefined | asset_transactionsDefaultArgs> = $Result.GetResult<Prisma.$asset_transactionsPayload, S>

  type asset_transactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<asset_transactionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Asset_transactionsCountAggregateInputType | true
    }

  export interface asset_transactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['asset_transactions'], meta: { name: 'asset_transactions' } }
    /**
     * Find zero or one Asset_transactions that matches the filter.
     * @param {asset_transactionsFindUniqueArgs} args - Arguments to find a Asset_transactions
     * @example
     * // Get one Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends asset_transactionsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsFindUniqueArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Asset_transactions that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {asset_transactionsFindUniqueOrThrowArgs} args - Arguments to find a Asset_transactions
     * @example
     * // Get one Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends asset_transactionsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Asset_transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsFindFirstArgs} args - Arguments to find a Asset_transactions
     * @example
     * // Get one Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends asset_transactionsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsFindFirstArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Asset_transactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsFindFirstOrThrowArgs} args - Arguments to find a Asset_transactions
     * @example
     * // Get one Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends asset_transactionsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Asset_transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findMany()
     * 
     * // Get first 10 Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asset_transactionsWithIdOnly = await prisma.asset_transactions.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends asset_transactionsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Asset_transactions.
     * @param {asset_transactionsCreateArgs} args - Arguments to create a Asset_transactions.
     * @example
     * // Create one Asset_transactions
     * const Asset_transactions = await prisma.asset_transactions.create({
     *   data: {
     *     // ... data to create a Asset_transactions
     *   }
     * })
     * 
    **/
    create<T extends asset_transactionsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsCreateArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Asset_transactions.
     *     @param {asset_transactionsCreateManyArgs} args - Arguments to create many Asset_transactions.
     *     @example
     *     // Create many Asset_transactions
     *     const asset_transactions = await prisma.asset_transactions.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends asset_transactionsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Asset_transactions.
     * @param {asset_transactionsDeleteArgs} args - Arguments to delete one Asset_transactions.
     * @example
     * // Delete one Asset_transactions
     * const Asset_transactions = await prisma.asset_transactions.delete({
     *   where: {
     *     // ... filter to delete one Asset_transactions
     *   }
     * })
     * 
    **/
    delete<T extends asset_transactionsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsDeleteArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Asset_transactions.
     * @param {asset_transactionsUpdateArgs} args - Arguments to update one Asset_transactions.
     * @example
     * // Update one Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends asset_transactionsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsUpdateArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Asset_transactions.
     * @param {asset_transactionsDeleteManyArgs} args - Arguments to filter Asset_transactions to delete.
     * @example
     * // Delete a few Asset_transactions
     * const { count } = await prisma.asset_transactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends asset_transactionsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_transactionsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asset_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends asset_transactionsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asset_transactions.
     * @param {asset_transactionsUpsertArgs} args - Arguments to update or create a Asset_transactions.
     * @example
     * // Update or create a Asset_transactions
     * const asset_transactions = await prisma.asset_transactions.upsert({
     *   create: {
     *     // ... data to create a Asset_transactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset_transactions we want to update
     *   }
     * })
    **/
    upsert<T extends asset_transactionsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, asset_transactionsUpsertArgs<ExtArgs>>
    ): Prisma__asset_transactionsClient<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Asset_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsCountArgs} args - Arguments to filter Asset_transactions to count.
     * @example
     * // Count the number of Asset_transactions
     * const count = await prisma.asset_transactions.count({
     *   where: {
     *     // ... the filter for the Asset_transactions we want to count
     *   }
     * })
    **/
    count<T extends asset_transactionsCountArgs>(
      args?: Subset<T, asset_transactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Asset_transactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asset_transactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Asset_transactionsAggregateArgs>(args: Subset<T, Asset_transactionsAggregateArgs>): Prisma.PrismaPromise<GetAsset_transactionsAggregateType<T>>

    /**
     * Group by Asset_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_transactionsGroupByArgs} args - Group by arguments.
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
      T extends asset_transactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: asset_transactionsGroupByArgs['orderBy'] }
        : { orderBy?: asset_transactionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, asset_transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsset_transactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the asset_transactions model
   */
  readonly fields: asset_transactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for asset_transactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__asset_transactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    asset<T extends assetsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, assetsDefaultArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    previous_holder<T extends asset_transactions$previous_holderArgs<ExtArgs> = {}>(args?: Subset<T, asset_transactions$previous_holderArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    new_holder<T extends asset_transactions$new_holderArgs<ExtArgs> = {}>(args?: Subset<T, asset_transactions$new_holderArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

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
   * Fields of the asset_transactions model
   */ 
  interface asset_transactionsFieldRefs {
    readonly id: FieldRef<"asset_transactions", 'BigInt'>
    readonly asset_id: FieldRef<"asset_transactions", 'BigInt'>
    readonly transaction_type: FieldRef<"asset_transactions", 'String'>
    readonly previous_holder_id: FieldRef<"asset_transactions", 'BigInt'>
    readonly new_holder_id: FieldRef<"asset_transactions", 'BigInt'>
    readonly previous_location: FieldRef<"asset_transactions", 'String'>
    readonly new_location: FieldRef<"asset_transactions", 'String'>
    readonly previous_condition: FieldRef<"asset_transactions", 'String'>
    readonly new_condition: FieldRef<"asset_transactions", 'String'>
    readonly remarks: FieldRef<"asset_transactions", 'String'>
    readonly transaction_date: FieldRef<"asset_transactions", 'DateTime'>
    readonly created_by: FieldRef<"asset_transactions", 'BigInt'>
    readonly creator_name: FieldRef<"asset_transactions", 'String'>
    readonly created_at: FieldRef<"asset_transactions", 'DateTime'>
    readonly updated_at: FieldRef<"asset_transactions", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * asset_transactions findUnique
   */
  export type asset_transactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter, which asset_transactions to fetch.
     */
    where: asset_transactionsWhereUniqueInput
  }


  /**
   * asset_transactions findUniqueOrThrow
   */
  export type asset_transactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter, which asset_transactions to fetch.
     */
    where: asset_transactionsWhereUniqueInput
  }


  /**
   * asset_transactions findFirst
   */
  export type asset_transactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter, which asset_transactions to fetch.
     */
    where?: asset_transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_transactions to fetch.
     */
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_transactions.
     */
    cursor?: asset_transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_transactions.
     */
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * asset_transactions findFirstOrThrow
   */
  export type asset_transactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter, which asset_transactions to fetch.
     */
    where?: asset_transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_transactions to fetch.
     */
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_transactions.
     */
    cursor?: asset_transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_transactions.
     */
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * asset_transactions findMany
   */
  export type asset_transactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter, which asset_transactions to fetch.
     */
    where?: asset_transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_transactions to fetch.
     */
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing asset_transactions.
     */
    cursor?: asset_transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_transactions.
     */
    skip?: number
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * asset_transactions create
   */
  export type asset_transactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a asset_transactions.
     */
    data: XOR<asset_transactionsCreateInput, asset_transactionsUncheckedCreateInput>
  }


  /**
   * asset_transactions createMany
   */
  export type asset_transactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many asset_transactions.
     */
    data: asset_transactionsCreateManyInput | asset_transactionsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * asset_transactions update
   */
  export type asset_transactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a asset_transactions.
     */
    data: XOR<asset_transactionsUpdateInput, asset_transactionsUncheckedUpdateInput>
    /**
     * Choose, which asset_transactions to update.
     */
    where: asset_transactionsWhereUniqueInput
  }


  /**
   * asset_transactions updateMany
   */
  export type asset_transactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update asset_transactions.
     */
    data: XOR<asset_transactionsUpdateManyMutationInput, asset_transactionsUncheckedUpdateManyInput>
    /**
     * Filter which asset_transactions to update
     */
    where?: asset_transactionsWhereInput
  }


  /**
   * asset_transactions upsert
   */
  export type asset_transactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the asset_transactions to update in case it exists.
     */
    where: asset_transactionsWhereUniqueInput
    /**
     * In case the asset_transactions found by the `where` argument doesn't exist, create a new asset_transactions with this data.
     */
    create: XOR<asset_transactionsCreateInput, asset_transactionsUncheckedCreateInput>
    /**
     * In case the asset_transactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<asset_transactionsUpdateInput, asset_transactionsUncheckedUpdateInput>
  }


  /**
   * asset_transactions delete
   */
  export type asset_transactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    /**
     * Filter which asset_transactions to delete.
     */
    where: asset_transactionsWhereUniqueInput
  }


  /**
   * asset_transactions deleteMany
   */
  export type asset_transactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_transactions to delete
     */
    where?: asset_transactionsWhereInput
  }


  /**
   * asset_transactions.previous_holder
   */
  export type asset_transactions$previous_holderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
  }


  /**
   * asset_transactions.new_holder
   */
  export type asset_transactions$new_holderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
  }


  /**
   * asset_transactions without action
   */
  export type asset_transactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
  }



  /**
   * Model assets
   */

  export type AggregateAssets = {
    _count: AssetsCountAggregateOutputType | null
    _avg: AssetsAvgAggregateOutputType | null
    _sum: AssetsSumAggregateOutputType | null
    _min: AssetsMinAggregateOutputType | null
    _max: AssetsMaxAggregateOutputType | null
  }

  export type AssetsAvgAggregateOutputType = {
    id: number | null
    type_id: number | null
    category_id: number | null
    brand_id: number | null
    area_id: number | null
    location_id: number | null
    employee_id: number | null
    supplier_id: number | null
    image_id: number | null
  }

  export type AssetsSumAggregateOutputType = {
    id: bigint | null
    type_id: bigint | null
    category_id: bigint | null
    brand_id: bigint | null
    area_id: bigint | null
    location_id: bigint | null
    employee_id: bigint | null
    supplier_id: bigint | null
    image_id: bigint | null
  }

  export type AssetsMinAggregateOutputType = {
    id: bigint | null
    type_id: bigint | null
    serial_number: string | null
    sap_id: string | null
    purchase_date: Date | null
    created_at: Date | null
    updated_at: Date | null
    category_id: bigint | null
    brand_id: bigint | null
    area_id: bigint | null
    location_id: bigint | null
    employee_id: bigint | null
    supplier_id: bigint | null
    image_id: bigint | null
    condition: $Enums.AssetCondition | null
  }

  export type AssetsMaxAggregateOutputType = {
    id: bigint | null
    type_id: bigint | null
    serial_number: string | null
    sap_id: string | null
    purchase_date: Date | null
    created_at: Date | null
    updated_at: Date | null
    category_id: bigint | null
    brand_id: bigint | null
    area_id: bigint | null
    location_id: bigint | null
    employee_id: bigint | null
    supplier_id: bigint | null
    image_id: bigint | null
    condition: $Enums.AssetCondition | null
  }

  export type AssetsCountAggregateOutputType = {
    id: number
    type_id: number
    serial_number: number
    sap_id: number
    purchase_date: number
    created_at: number
    updated_at: number
    category_id: number
    brand_id: number
    area_id: number
    location_id: number
    employee_id: number
    supplier_id: number
    image_id: number
    condition: number
    _all: number
  }


  export type AssetsAvgAggregateInputType = {
    id?: true
    type_id?: true
    category_id?: true
    brand_id?: true
    area_id?: true
    location_id?: true
    employee_id?: true
    supplier_id?: true
    image_id?: true
  }

  export type AssetsSumAggregateInputType = {
    id?: true
    type_id?: true
    category_id?: true
    brand_id?: true
    area_id?: true
    location_id?: true
    employee_id?: true
    supplier_id?: true
    image_id?: true
  }

  export type AssetsMinAggregateInputType = {
    id?: true
    type_id?: true
    serial_number?: true
    sap_id?: true
    purchase_date?: true
    created_at?: true
    updated_at?: true
    category_id?: true
    brand_id?: true
    area_id?: true
    location_id?: true
    employee_id?: true
    supplier_id?: true
    image_id?: true
    condition?: true
  }

  export type AssetsMaxAggregateInputType = {
    id?: true
    type_id?: true
    serial_number?: true
    sap_id?: true
    purchase_date?: true
    created_at?: true
    updated_at?: true
    category_id?: true
    brand_id?: true
    area_id?: true
    location_id?: true
    employee_id?: true
    supplier_id?: true
    image_id?: true
    condition?: true
  }

  export type AssetsCountAggregateInputType = {
    id?: true
    type_id?: true
    serial_number?: true
    sap_id?: true
    purchase_date?: true
    created_at?: true
    updated_at?: true
    category_id?: true
    brand_id?: true
    area_id?: true
    location_id?: true
    employee_id?: true
    supplier_id?: true
    image_id?: true
    condition?: true
    _all?: true
  }

  export type AssetsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assets to aggregate.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned assets
    **/
    _count?: true | AssetsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetsMaxAggregateInputType
  }

  export type GetAssetsAggregateType<T extends AssetsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssets[P]>
      : GetScalarType<T[P], AggregateAssets[P]>
  }




  export type assetsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithAggregationInput | assetsOrderByWithAggregationInput[]
    by: AssetsScalarFieldEnum[] | AssetsScalarFieldEnum
    having?: assetsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetsCountAggregateInputType | true
    _avg?: AssetsAvgAggregateInputType
    _sum?: AssetsSumAggregateInputType
    _min?: AssetsMinAggregateInputType
    _max?: AssetsMaxAggregateInputType
  }

  export type AssetsGroupByOutputType = {
    id: bigint
    type_id: bigint | null
    serial_number: string
    sap_id: string | null
    purchase_date: Date | null
    created_at: Date | null
    updated_at: Date | null
    category_id: bigint | null
    brand_id: bigint | null
    area_id: bigint | null
    location_id: bigint | null
    employee_id: bigint | null
    supplier_id: bigint | null
    image_id: bigint | null
    condition: $Enums.AssetCondition
    _count: AssetsCountAggregateOutputType | null
    _avg: AssetsAvgAggregateOutputType | null
    _sum: AssetsSumAggregateOutputType | null
    _min: AssetsMinAggregateOutputType | null
    _max: AssetsMaxAggregateOutputType | null
  }

  type GetAssetsGroupByPayload<T extends assetsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetsGroupByOutputType[P]>
            : GetScalarType<T[P], AssetsGroupByOutputType[P]>
        }
      >
    >


  export type assetsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type_id?: boolean
    serial_number?: boolean
    sap_id?: boolean
    purchase_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
    brand_id?: boolean
    area_id?: boolean
    location_id?: boolean
    employee_id?: boolean
    supplier_id?: boolean
    image_id?: boolean
    condition?: boolean
    asset_type?: boolean | assets$asset_typeArgs<ExtArgs>
    category?: boolean | assets$categoryArgs<ExtArgs>
    brand?: boolean | assets$brandArgs<ExtArgs>
    area?: boolean | assets$areaArgs<ExtArgs>
    location?: boolean | assets$locationArgs<ExtArgs>
    employee?: boolean | assets$employeeArgs<ExtArgs>
    supplier_rec?: boolean | assets$supplier_recArgs<ExtArgs>
    main_image?: boolean | assets$main_imageArgs<ExtArgs>
    transactions?: boolean | assets$transactionsArgs<ExtArgs>
    log_cruds?: boolean | assets$log_crudsArgs<ExtArgs>
    asset_images?: boolean | assets$asset_imagesArgs<ExtArgs>
    _count?: boolean | AssetsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assets"]>

  export type assetsSelectScalar = {
    id?: boolean
    type_id?: boolean
    serial_number?: boolean
    sap_id?: boolean
    purchase_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
    brand_id?: boolean
    area_id?: boolean
    location_id?: boolean
    employee_id?: boolean
    supplier_id?: boolean
    image_id?: boolean
    condition?: boolean
  }

  export type assetsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asset_type?: boolean | assets$asset_typeArgs<ExtArgs>
    category?: boolean | assets$categoryArgs<ExtArgs>
    brand?: boolean | assets$brandArgs<ExtArgs>
    area?: boolean | assets$areaArgs<ExtArgs>
    location?: boolean | assets$locationArgs<ExtArgs>
    employee?: boolean | assets$employeeArgs<ExtArgs>
    supplier_rec?: boolean | assets$supplier_recArgs<ExtArgs>
    main_image?: boolean | assets$main_imageArgs<ExtArgs>
    transactions?: boolean | assets$transactionsArgs<ExtArgs>
    log_cruds?: boolean | assets$log_crudsArgs<ExtArgs>
    asset_images?: boolean | assets$asset_imagesArgs<ExtArgs>
    _count?: boolean | AssetsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $assetsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "assets"
    objects: {
      asset_type: Prisma.$asset_typesPayload<ExtArgs> | null
      category: Prisma.$categoriesPayload<ExtArgs> | null
      brand: Prisma.$brandsPayload<ExtArgs> | null
      area: Prisma.$areasPayload<ExtArgs> | null
      location: Prisma.$locationsPayload<ExtArgs> | null
      employee: Prisma.$employeesPayload<ExtArgs> | null
      supplier_rec: Prisma.$suppliersPayload<ExtArgs> | null
      main_image: Prisma.$asset_imagesPayload<ExtArgs> | null
      transactions: Prisma.$asset_transactionsPayload<ExtArgs>[]
      log_cruds: Prisma.$log_crudPayload<ExtArgs>[]
      asset_images: Prisma.$asset_imagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      type_id: bigint | null
      serial_number: string
      sap_id: string | null
      purchase_date: Date | null
      created_at: Date | null
      updated_at: Date | null
      category_id: bigint | null
      brand_id: bigint | null
      area_id: bigint | null
      location_id: bigint | null
      employee_id: bigint | null
      supplier_id: bigint | null
      image_id: bigint | null
      condition: $Enums.AssetCondition
    }, ExtArgs["result"]["assets"]>
    composites: {}
  }


  type assetsGetPayload<S extends boolean | null | undefined | assetsDefaultArgs> = $Result.GetResult<Prisma.$assetsPayload, S>

  type assetsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<assetsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssetsCountAggregateInputType | true
    }

  export interface assetsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['assets'], meta: { name: 'assets' } }
    /**
     * Find zero or one Assets that matches the filter.
     * @param {assetsFindUniqueArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends assetsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, assetsFindUniqueArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Assets that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {assetsFindUniqueOrThrowArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends assetsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindFirstArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends assetsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsFindFirstArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Assets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindFirstOrThrowArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends assetsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.assets.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.assets.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetsWithIdOnly = await prisma.assets.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends assetsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Assets.
     * @param {assetsCreateArgs} args - Arguments to create a Assets.
     * @example
     * // Create one Assets
     * const Assets = await prisma.assets.create({
     *   data: {
     *     // ... data to create a Assets
     *   }
     * })
     * 
    **/
    create<T extends assetsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, assetsCreateArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Assets.
     *     @param {assetsCreateManyArgs} args - Arguments to create many Assets.
     *     @example
     *     // Create many Assets
     *     const assets = await prisma.assets.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends assetsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assets.
     * @param {assetsDeleteArgs} args - Arguments to delete one Assets.
     * @example
     * // Delete one Assets
     * const Assets = await prisma.assets.delete({
     *   where: {
     *     // ... filter to delete one Assets
     *   }
     * })
     * 
    **/
    delete<T extends assetsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, assetsDeleteArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Assets.
     * @param {assetsUpdateArgs} args - Arguments to update one Assets.
     * @example
     * // Update one Assets
     * const assets = await prisma.assets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends assetsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, assetsUpdateArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Assets.
     * @param {assetsDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.assets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends assetsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, assetsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const assets = await prisma.assets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends assetsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, assetsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assets.
     * @param {assetsUpsertArgs} args - Arguments to update or create a Assets.
     * @example
     * // Update or create a Assets
     * const assets = await prisma.assets.upsert({
     *   create: {
     *     // ... data to create a Assets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assets we want to update
     *   }
     * })
    **/
    upsert<T extends assetsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, assetsUpsertArgs<ExtArgs>>
    ): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.assets.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends assetsCountArgs>(
      args?: Subset<T, assetsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetsAggregateArgs>(args: Subset<T, AssetsAggregateArgs>): Prisma.PrismaPromise<GetAssetsAggregateType<T>>

    /**
     * Group by Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsGroupByArgs} args - Group by arguments.
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
      T extends assetsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: assetsGroupByArgs['orderBy'] }
        : { orderBy?: assetsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, assetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the assets model
   */
  readonly fields: assetsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for assets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__assetsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    asset_type<T extends assets$asset_typeArgs<ExtArgs> = {}>(args?: Subset<T, assets$asset_typeArgs<ExtArgs>>): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    category<T extends assets$categoryArgs<ExtArgs> = {}>(args?: Subset<T, assets$categoryArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    brand<T extends assets$brandArgs<ExtArgs> = {}>(args?: Subset<T, assets$brandArgs<ExtArgs>>): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    area<T extends assets$areaArgs<ExtArgs> = {}>(args?: Subset<T, assets$areaArgs<ExtArgs>>): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    location<T extends assets$locationArgs<ExtArgs> = {}>(args?: Subset<T, assets$locationArgs<ExtArgs>>): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    employee<T extends assets$employeeArgs<ExtArgs> = {}>(args?: Subset<T, assets$employeeArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    supplier_rec<T extends assets$supplier_recArgs<ExtArgs> = {}>(args?: Subset<T, assets$supplier_recArgs<ExtArgs>>): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    main_image<T extends assets$main_imageArgs<ExtArgs> = {}>(args?: Subset<T, assets$main_imageArgs<ExtArgs>>): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    transactions<T extends assets$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, assets$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findMany'> | Null>;

    log_cruds<T extends assets$log_crudsArgs<ExtArgs> = {}>(args?: Subset<T, assets$log_crudsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findMany'> | Null>;

    asset_images<T extends assets$asset_imagesArgs<ExtArgs> = {}>(args?: Subset<T, assets$asset_imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the assets model
   */ 
  interface assetsFieldRefs {
    readonly id: FieldRef<"assets", 'BigInt'>
    readonly type_id: FieldRef<"assets", 'BigInt'>
    readonly serial_number: FieldRef<"assets", 'String'>
    readonly sap_id: FieldRef<"assets", 'String'>
    readonly purchase_date: FieldRef<"assets", 'DateTime'>
    readonly created_at: FieldRef<"assets", 'DateTime'>
    readonly updated_at: FieldRef<"assets", 'DateTime'>
    readonly category_id: FieldRef<"assets", 'BigInt'>
    readonly brand_id: FieldRef<"assets", 'BigInt'>
    readonly area_id: FieldRef<"assets", 'BigInt'>
    readonly location_id: FieldRef<"assets", 'BigInt'>
    readonly employee_id: FieldRef<"assets", 'BigInt'>
    readonly supplier_id: FieldRef<"assets", 'BigInt'>
    readonly image_id: FieldRef<"assets", 'BigInt'>
    readonly condition: FieldRef<"assets", 'AssetCondition'>
  }
    

  // Custom InputTypes

  /**
   * assets findUnique
   */
  export type assetsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where: assetsWhereUniqueInput
  }


  /**
   * assets findUniqueOrThrow
   */
  export type assetsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where: assetsWhereUniqueInput
  }


  /**
   * assets findFirst
   */
  export type assetsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assets.
     */
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * assets findFirstOrThrow
   */
  export type assetsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assets.
     */
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * assets findMany
   */
  export type assetsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * assets create
   */
  export type assetsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The data needed to create a assets.
     */
    data: XOR<assetsCreateInput, assetsUncheckedCreateInput>
  }


  /**
   * assets createMany
   */
  export type assetsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many assets.
     */
    data: assetsCreateManyInput | assetsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * assets update
   */
  export type assetsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The data needed to update a assets.
     */
    data: XOR<assetsUpdateInput, assetsUncheckedUpdateInput>
    /**
     * Choose, which assets to update.
     */
    where: assetsWhereUniqueInput
  }


  /**
   * assets updateMany
   */
  export type assetsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update assets.
     */
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyInput>
    /**
     * Filter which assets to update
     */
    where?: assetsWhereInput
  }


  /**
   * assets upsert
   */
  export type assetsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The filter to search for the assets to update in case it exists.
     */
    where: assetsWhereUniqueInput
    /**
     * In case the assets found by the `where` argument doesn't exist, create a new assets with this data.
     */
    create: XOR<assetsCreateInput, assetsUncheckedCreateInput>
    /**
     * In case the assets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<assetsUpdateInput, assetsUncheckedUpdateInput>
  }


  /**
   * assets delete
   */
  export type assetsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter which assets to delete.
     */
    where: assetsWhereUniqueInput
  }


  /**
   * assets deleteMany
   */
  export type assetsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assets to delete
     */
    where?: assetsWhereInput
  }


  /**
   * assets.asset_type
   */
  export type assets$asset_typeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    where?: asset_typesWhereInput
  }


  /**
   * assets.category
   */
  export type assets$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
  }


  /**
   * assets.brand
   */
  export type assets$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    where?: brandsWhereInput
  }


  /**
   * assets.area
   */
  export type assets$areaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the areas
     */
    select?: areasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: areasInclude<ExtArgs> | null
    where?: areasWhereInput
  }


  /**
   * assets.location
   */
  export type assets$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    where?: locationsWhereInput
  }


  /**
   * assets.employee
   */
  export type assets$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
  }


  /**
   * assets.supplier_rec
   */
  export type assets$supplier_recArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    where?: suppliersWhereInput
  }


  /**
   * assets.main_image
   */
  export type assets$main_imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    where?: asset_imagesWhereInput
  }


  /**
   * assets.transactions
   */
  export type assets$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    where?: asset_transactionsWhereInput
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    cursor?: asset_transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * assets.log_cruds
   */
  export type assets$log_crudsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    where?: log_crudWhereInput
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    cursor?: log_crudWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Log_crudScalarFieldEnum | Log_crudScalarFieldEnum[]
  }


  /**
   * assets.asset_images
   */
  export type assets$asset_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    where?: asset_imagesWhereInput
    orderBy?: asset_imagesOrderByWithRelationInput | asset_imagesOrderByWithRelationInput[]
    cursor?: asset_imagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Asset_imagesScalarFieldEnum | Asset_imagesScalarFieldEnum[]
  }


  /**
   * assets without action
   */
  export type assetsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
  }



  /**
   * Model activity_log
   */

  export type AggregateActivity_log = {
    _count: Activity_logCountAggregateOutputType | null
    _avg: Activity_logAvgAggregateOutputType | null
    _sum: Activity_logSumAggregateOutputType | null
    _min: Activity_logMinAggregateOutputType | null
    _max: Activity_logMaxAggregateOutputType | null
  }

  export type Activity_logAvgAggregateOutputType = {
    id: number | null
  }

  export type Activity_logSumAggregateOutputType = {
    id: bigint | null
  }

  export type Activity_logMinAggregateOutputType = {
    id: bigint | null
    action: string | null
    entity_type: string | null
    entity_id: string | null
    details: string | null
    user_id: string | null
    user_name: string | null
    ip_address: string | null
    created_at: Date | null
  }

  export type Activity_logMaxAggregateOutputType = {
    id: bigint | null
    action: string | null
    entity_type: string | null
    entity_id: string | null
    details: string | null
    user_id: string | null
    user_name: string | null
    ip_address: string | null
    created_at: Date | null
  }

  export type Activity_logCountAggregateOutputType = {
    id: number
    action: number
    entity_type: number
    entity_id: number
    details: number
    user_id: number
    user_name: number
    ip_address: number
    created_at: number
    _all: number
  }


  export type Activity_logAvgAggregateInputType = {
    id?: true
  }

  export type Activity_logSumAggregateInputType = {
    id?: true
  }

  export type Activity_logMinAggregateInputType = {
    id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    details?: true
    user_id?: true
    user_name?: true
    ip_address?: true
    created_at?: true
  }

  export type Activity_logMaxAggregateInputType = {
    id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    details?: true
    user_id?: true
    user_name?: true
    ip_address?: true
    created_at?: true
  }

  export type Activity_logCountAggregateInputType = {
    id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    details?: true
    user_id?: true
    user_name?: true
    ip_address?: true
    created_at?: true
    _all?: true
  }

  export type Activity_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activity_log to aggregate.
     */
    where?: activity_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logOrderByWithRelationInput | activity_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: activity_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned activity_logs
    **/
    _count?: true | Activity_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Activity_logAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Activity_logSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Activity_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Activity_logMaxAggregateInputType
  }

  export type GetActivity_logAggregateType<T extends Activity_logAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity_log[P]>
      : GetScalarType<T[P], AggregateActivity_log[P]>
  }




  export type activity_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activity_logWhereInput
    orderBy?: activity_logOrderByWithAggregationInput | activity_logOrderByWithAggregationInput[]
    by: Activity_logScalarFieldEnum[] | Activity_logScalarFieldEnum
    having?: activity_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Activity_logCountAggregateInputType | true
    _avg?: Activity_logAvgAggregateInputType
    _sum?: Activity_logSumAggregateInputType
    _min?: Activity_logMinAggregateInputType
    _max?: Activity_logMaxAggregateInputType
  }

  export type Activity_logGroupByOutputType = {
    id: bigint
    action: string
    entity_type: string
    entity_id: string
    details: string | null
    user_id: string | null
    user_name: string | null
    ip_address: string | null
    created_at: Date
    _count: Activity_logCountAggregateOutputType | null
    _avg: Activity_logAvgAggregateOutputType | null
    _sum: Activity_logSumAggregateOutputType | null
    _min: Activity_logMinAggregateOutputType | null
    _max: Activity_logMaxAggregateOutputType | null
  }

  type GetActivity_logGroupByPayload<T extends activity_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Activity_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Activity_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Activity_logGroupByOutputType[P]>
            : GetScalarType<T[P], Activity_logGroupByOutputType[P]>
        }
      >
    >


  export type activity_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    details?: boolean
    user_id?: boolean
    user_name?: boolean
    ip_address?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["activity_log"]>

  export type activity_logSelectScalar = {
    id?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    details?: boolean
    user_id?: boolean
    user_name?: boolean
    ip_address?: boolean
    created_at?: boolean
  }


  export type $activity_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "activity_log"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      action: string
      entity_type: string
      entity_id: string
      details: string | null
      user_id: string | null
      user_name: string | null
      ip_address: string | null
      created_at: Date
    }, ExtArgs["result"]["activity_log"]>
    composites: {}
  }


  type activity_logGetPayload<S extends boolean | null | undefined | activity_logDefaultArgs> = $Result.GetResult<Prisma.$activity_logPayload, S>

  type activity_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<activity_logFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Activity_logCountAggregateInputType | true
    }

  export interface activity_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['activity_log'], meta: { name: 'activity_log' } }
    /**
     * Find zero or one Activity_log that matches the filter.
     * @param {activity_logFindUniqueArgs} args - Arguments to find a Activity_log
     * @example
     * // Get one Activity_log
     * const activity_log = await prisma.activity_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends activity_logFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logFindUniqueArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Activity_log that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {activity_logFindUniqueOrThrowArgs} args - Arguments to find a Activity_log
     * @example
     * // Get one Activity_log
     * const activity_log = await prisma.activity_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends activity_logFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Activity_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logFindFirstArgs} args - Arguments to find a Activity_log
     * @example
     * // Get one Activity_log
     * const activity_log = await prisma.activity_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends activity_logFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logFindFirstArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Activity_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logFindFirstOrThrowArgs} args - Arguments to find a Activity_log
     * @example
     * // Get one Activity_log
     * const activity_log = await prisma.activity_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends activity_logFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activity_logs
     * const activity_logs = await prisma.activity_log.findMany()
     * 
     * // Get first 10 Activity_logs
     * const activity_logs = await prisma.activity_log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activity_logWithIdOnly = await prisma.activity_log.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends activity_logFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Activity_log.
     * @param {activity_logCreateArgs} args - Arguments to create a Activity_log.
     * @example
     * // Create one Activity_log
     * const Activity_log = await prisma.activity_log.create({
     *   data: {
     *     // ... data to create a Activity_log
     *   }
     * })
     * 
    **/
    create<T extends activity_logCreateArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logCreateArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Activity_logs.
     *     @param {activity_logCreateManyArgs} args - Arguments to create many Activity_logs.
     *     @example
     *     // Create many Activity_logs
     *     const activity_log = await prisma.activity_log.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends activity_logCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Activity_log.
     * @param {activity_logDeleteArgs} args - Arguments to delete one Activity_log.
     * @example
     * // Delete one Activity_log
     * const Activity_log = await prisma.activity_log.delete({
     *   where: {
     *     // ... filter to delete one Activity_log
     *   }
     * })
     * 
    **/
    delete<T extends activity_logDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logDeleteArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Activity_log.
     * @param {activity_logUpdateArgs} args - Arguments to update one Activity_log.
     * @example
     * // Update one Activity_log
     * const activity_log = await prisma.activity_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends activity_logUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logUpdateArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Activity_logs.
     * @param {activity_logDeleteManyArgs} args - Arguments to filter Activity_logs to delete.
     * @example
     * // Delete a few Activity_logs
     * const { count } = await prisma.activity_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends activity_logDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activity_logDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activity_logs
     * const activity_log = await prisma.activity_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends activity_logUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity_log.
     * @param {activity_logUpsertArgs} args - Arguments to update or create a Activity_log.
     * @example
     * // Update or create a Activity_log
     * const activity_log = await prisma.activity_log.upsert({
     *   create: {
     *     // ... data to create a Activity_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity_log we want to update
     *   }
     * })
    **/
    upsert<T extends activity_logUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, activity_logUpsertArgs<ExtArgs>>
    ): Prisma__activity_logClient<$Result.GetResult<Prisma.$activity_logPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logCountArgs} args - Arguments to filter Activity_logs to count.
     * @example
     * // Count the number of Activity_logs
     * const count = await prisma.activity_log.count({
     *   where: {
     *     // ... the filter for the Activity_logs we want to count
     *   }
     * })
    **/
    count<T extends activity_logCountArgs>(
      args?: Subset<T, activity_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Activity_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Activity_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Activity_logAggregateArgs>(args: Subset<T, Activity_logAggregateArgs>): Prisma.PrismaPromise<GetActivity_logAggregateType<T>>

    /**
     * Group by Activity_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logGroupByArgs} args - Group by arguments.
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
      T extends activity_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: activity_logGroupByArgs['orderBy'] }
        : { orderBy?: activity_logGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, activity_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivity_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the activity_log model
   */
  readonly fields: activity_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for activity_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__activity_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the activity_log model
   */ 
  interface activity_logFieldRefs {
    readonly id: FieldRef<"activity_log", 'BigInt'>
    readonly action: FieldRef<"activity_log", 'String'>
    readonly entity_type: FieldRef<"activity_log", 'String'>
    readonly entity_id: FieldRef<"activity_log", 'String'>
    readonly details: FieldRef<"activity_log", 'String'>
    readonly user_id: FieldRef<"activity_log", 'String'>
    readonly user_name: FieldRef<"activity_log", 'String'>
    readonly ip_address: FieldRef<"activity_log", 'String'>
    readonly created_at: FieldRef<"activity_log", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * activity_log findUnique
   */
  export type activity_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter, which activity_log to fetch.
     */
    where: activity_logWhereUniqueInput
  }


  /**
   * activity_log findUniqueOrThrow
   */
  export type activity_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter, which activity_log to fetch.
     */
    where: activity_logWhereUniqueInput
  }


  /**
   * activity_log findFirst
   */
  export type activity_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter, which activity_log to fetch.
     */
    where?: activity_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logOrderByWithRelationInput | activity_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activity_logs.
     */
    cursor?: activity_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activity_logs.
     */
    distinct?: Activity_logScalarFieldEnum | Activity_logScalarFieldEnum[]
  }


  /**
   * activity_log findFirstOrThrow
   */
  export type activity_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter, which activity_log to fetch.
     */
    where?: activity_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logOrderByWithRelationInput | activity_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activity_logs.
     */
    cursor?: activity_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activity_logs.
     */
    distinct?: Activity_logScalarFieldEnum | Activity_logScalarFieldEnum[]
  }


  /**
   * activity_log findMany
   */
  export type activity_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where?: activity_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logOrderByWithRelationInput | activity_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing activity_logs.
     */
    cursor?: activity_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    distinct?: Activity_logScalarFieldEnum | Activity_logScalarFieldEnum[]
  }


  /**
   * activity_log create
   */
  export type activity_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * The data needed to create a activity_log.
     */
    data: XOR<activity_logCreateInput, activity_logUncheckedCreateInput>
  }


  /**
   * activity_log createMany
   */
  export type activity_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many activity_logs.
     */
    data: activity_logCreateManyInput | activity_logCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * activity_log update
   */
  export type activity_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * The data needed to update a activity_log.
     */
    data: XOR<activity_logUpdateInput, activity_logUncheckedUpdateInput>
    /**
     * Choose, which activity_log to update.
     */
    where: activity_logWhereUniqueInput
  }


  /**
   * activity_log updateMany
   */
  export type activity_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update activity_logs.
     */
    data: XOR<activity_logUpdateManyMutationInput, activity_logUncheckedUpdateManyInput>
    /**
     * Filter which activity_logs to update
     */
    where?: activity_logWhereInput
  }


  /**
   * activity_log upsert
   */
  export type activity_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * The filter to search for the activity_log to update in case it exists.
     */
    where: activity_logWhereUniqueInput
    /**
     * In case the activity_log found by the `where` argument doesn't exist, create a new activity_log with this data.
     */
    create: XOR<activity_logCreateInput, activity_logUncheckedCreateInput>
    /**
     * In case the activity_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<activity_logUpdateInput, activity_logUncheckedUpdateInput>
  }


  /**
   * activity_log delete
   */
  export type activity_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
    /**
     * Filter which activity_log to delete.
     */
    where: activity_logWhereUniqueInput
  }


  /**
   * activity_log deleteMany
   */
  export type activity_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activity_logs to delete
     */
    where?: activity_logWhereInput
  }


  /**
   * activity_log without action
   */
  export type activity_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_log
     */
    select?: activity_logSelect<ExtArgs> | null
  }



  /**
   * Model asset_types
   */

  export type AggregateAsset_types = {
    _count: Asset_typesCountAggregateOutputType | null
    _avg: Asset_typesAvgAggregateOutputType | null
    _sum: Asset_typesSumAggregateOutputType | null
    _min: Asset_typesMinAggregateOutputType | null
    _max: Asset_typesMaxAggregateOutputType | null
  }

  export type Asset_typesAvgAggregateOutputType = {
    id: number | null
  }

  export type Asset_typesSumAggregateOutputType = {
    id: bigint | null
  }

  export type Asset_typesMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Asset_typesMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Asset_typesCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Asset_typesAvgAggregateInputType = {
    id?: true
  }

  export type Asset_typesSumAggregateInputType = {
    id?: true
  }

  export type Asset_typesMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type Asset_typesMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type Asset_typesCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Asset_typesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_types to aggregate.
     */
    where?: asset_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_types to fetch.
     */
    orderBy?: asset_typesOrderByWithRelationInput | asset_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: asset_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned asset_types
    **/
    _count?: true | Asset_typesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Asset_typesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Asset_typesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Asset_typesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Asset_typesMaxAggregateInputType
  }

  export type GetAsset_typesAggregateType<T extends Asset_typesAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset_types]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset_types[P]>
      : GetScalarType<T[P], AggregateAsset_types[P]>
  }




  export type asset_typesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_typesWhereInput
    orderBy?: asset_typesOrderByWithAggregationInput | asset_typesOrderByWithAggregationInput[]
    by: Asset_typesScalarFieldEnum[] | Asset_typesScalarFieldEnum
    having?: asset_typesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Asset_typesCountAggregateInputType | true
    _avg?: Asset_typesAvgAggregateInputType
    _sum?: Asset_typesSumAggregateInputType
    _min?: Asset_typesMinAggregateInputType
    _max?: Asset_typesMaxAggregateInputType
  }

  export type Asset_typesGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date | null
    updated_at: Date | null
    _count: Asset_typesCountAggregateOutputType | null
    _avg: Asset_typesAvgAggregateOutputType | null
    _sum: Asset_typesSumAggregateOutputType | null
    _min: Asset_typesMinAggregateOutputType | null
    _max: Asset_typesMaxAggregateOutputType | null
  }

  type GetAsset_typesGroupByPayload<T extends asset_typesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Asset_typesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Asset_typesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Asset_typesGroupByOutputType[P]>
            : GetScalarType<T[P], Asset_typesGroupByOutputType[P]>
        }
      >
    >


  export type asset_typesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    assets?: boolean | asset_types$assetsArgs<ExtArgs>
    _count?: boolean | Asset_typesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asset_types"]>

  export type asset_typesSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type asset_typesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | asset_types$assetsArgs<ExtArgs>
    _count?: boolean | Asset_typesCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $asset_typesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "asset_types"
    objects: {
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["asset_types"]>
    composites: {}
  }


  type asset_typesGetPayload<S extends boolean | null | undefined | asset_typesDefaultArgs> = $Result.GetResult<Prisma.$asset_typesPayload, S>

  type asset_typesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<asset_typesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Asset_typesCountAggregateInputType | true
    }

  export interface asset_typesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['asset_types'], meta: { name: 'asset_types' } }
    /**
     * Find zero or one Asset_types that matches the filter.
     * @param {asset_typesFindUniqueArgs} args - Arguments to find a Asset_types
     * @example
     * // Get one Asset_types
     * const asset_types = await prisma.asset_types.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends asset_typesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesFindUniqueArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Asset_types that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {asset_typesFindUniqueOrThrowArgs} args - Arguments to find a Asset_types
     * @example
     * // Get one Asset_types
     * const asset_types = await prisma.asset_types.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends asset_typesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Asset_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesFindFirstArgs} args - Arguments to find a Asset_types
     * @example
     * // Get one Asset_types
     * const asset_types = await prisma.asset_types.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends asset_typesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesFindFirstArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Asset_types that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesFindFirstOrThrowArgs} args - Arguments to find a Asset_types
     * @example
     * // Get one Asset_types
     * const asset_types = await prisma.asset_types.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends asset_typesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Asset_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asset_types
     * const asset_types = await prisma.asset_types.findMany()
     * 
     * // Get first 10 Asset_types
     * const asset_types = await prisma.asset_types.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asset_typesWithIdOnly = await prisma.asset_types.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends asset_typesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Asset_types.
     * @param {asset_typesCreateArgs} args - Arguments to create a Asset_types.
     * @example
     * // Create one Asset_types
     * const Asset_types = await prisma.asset_types.create({
     *   data: {
     *     // ... data to create a Asset_types
     *   }
     * })
     * 
    **/
    create<T extends asset_typesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesCreateArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Asset_types.
     *     @param {asset_typesCreateManyArgs} args - Arguments to create many Asset_types.
     *     @example
     *     // Create many Asset_types
     *     const asset_types = await prisma.asset_types.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends asset_typesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Asset_types.
     * @param {asset_typesDeleteArgs} args - Arguments to delete one Asset_types.
     * @example
     * // Delete one Asset_types
     * const Asset_types = await prisma.asset_types.delete({
     *   where: {
     *     // ... filter to delete one Asset_types
     *   }
     * })
     * 
    **/
    delete<T extends asset_typesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesDeleteArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Asset_types.
     * @param {asset_typesUpdateArgs} args - Arguments to update one Asset_types.
     * @example
     * // Update one Asset_types
     * const asset_types = await prisma.asset_types.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends asset_typesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesUpdateArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Asset_types.
     * @param {asset_typesDeleteManyArgs} args - Arguments to filter Asset_types to delete.
     * @example
     * // Delete a few Asset_types
     * const { count } = await prisma.asset_types.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends asset_typesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_typesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asset_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asset_types
     * const asset_types = await prisma.asset_types.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends asset_typesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asset_types.
     * @param {asset_typesUpsertArgs} args - Arguments to update or create a Asset_types.
     * @example
     * // Update or create a Asset_types
     * const asset_types = await prisma.asset_types.upsert({
     *   create: {
     *     // ... data to create a Asset_types
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset_types we want to update
     *   }
     * })
    **/
    upsert<T extends asset_typesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, asset_typesUpsertArgs<ExtArgs>>
    ): Prisma__asset_typesClient<$Result.GetResult<Prisma.$asset_typesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Asset_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesCountArgs} args - Arguments to filter Asset_types to count.
     * @example
     * // Count the number of Asset_types
     * const count = await prisma.asset_types.count({
     *   where: {
     *     // ... the filter for the Asset_types we want to count
     *   }
     * })
    **/
    count<T extends asset_typesCountArgs>(
      args?: Subset<T, asset_typesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Asset_typesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asset_typesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Asset_typesAggregateArgs>(args: Subset<T, Asset_typesAggregateArgs>): Prisma.PrismaPromise<GetAsset_typesAggregateType<T>>

    /**
     * Group by Asset_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_typesGroupByArgs} args - Group by arguments.
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
      T extends asset_typesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: asset_typesGroupByArgs['orderBy'] }
        : { orderBy?: asset_typesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, asset_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsset_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the asset_types model
   */
  readonly fields: asset_typesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for asset_types.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__asset_typesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    assets<T extends asset_types$assetsArgs<ExtArgs> = {}>(args?: Subset<T, asset_types$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the asset_types model
   */ 
  interface asset_typesFieldRefs {
    readonly id: FieldRef<"asset_types", 'BigInt'>
    readonly name: FieldRef<"asset_types", 'String'>
    readonly created_at: FieldRef<"asset_types", 'DateTime'>
    readonly updated_at: FieldRef<"asset_types", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * asset_types findUnique
   */
  export type asset_typesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter, which asset_types to fetch.
     */
    where: asset_typesWhereUniqueInput
  }


  /**
   * asset_types findUniqueOrThrow
   */
  export type asset_typesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter, which asset_types to fetch.
     */
    where: asset_typesWhereUniqueInput
  }


  /**
   * asset_types findFirst
   */
  export type asset_typesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter, which asset_types to fetch.
     */
    where?: asset_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_types to fetch.
     */
    orderBy?: asset_typesOrderByWithRelationInput | asset_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_types.
     */
    cursor?: asset_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_types.
     */
    distinct?: Asset_typesScalarFieldEnum | Asset_typesScalarFieldEnum[]
  }


  /**
   * asset_types findFirstOrThrow
   */
  export type asset_typesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter, which asset_types to fetch.
     */
    where?: asset_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_types to fetch.
     */
    orderBy?: asset_typesOrderByWithRelationInput | asset_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_types.
     */
    cursor?: asset_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_types.
     */
    distinct?: Asset_typesScalarFieldEnum | Asset_typesScalarFieldEnum[]
  }


  /**
   * asset_types findMany
   */
  export type asset_typesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter, which asset_types to fetch.
     */
    where?: asset_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_types to fetch.
     */
    orderBy?: asset_typesOrderByWithRelationInput | asset_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing asset_types.
     */
    cursor?: asset_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_types.
     */
    skip?: number
    distinct?: Asset_typesScalarFieldEnum | Asset_typesScalarFieldEnum[]
  }


  /**
   * asset_types create
   */
  export type asset_typesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * The data needed to create a asset_types.
     */
    data: XOR<asset_typesCreateInput, asset_typesUncheckedCreateInput>
  }


  /**
   * asset_types createMany
   */
  export type asset_typesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many asset_types.
     */
    data: asset_typesCreateManyInput | asset_typesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * asset_types update
   */
  export type asset_typesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * The data needed to update a asset_types.
     */
    data: XOR<asset_typesUpdateInput, asset_typesUncheckedUpdateInput>
    /**
     * Choose, which asset_types to update.
     */
    where: asset_typesWhereUniqueInput
  }


  /**
   * asset_types updateMany
   */
  export type asset_typesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update asset_types.
     */
    data: XOR<asset_typesUpdateManyMutationInput, asset_typesUncheckedUpdateManyInput>
    /**
     * Filter which asset_types to update
     */
    where?: asset_typesWhereInput
  }


  /**
   * asset_types upsert
   */
  export type asset_typesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * The filter to search for the asset_types to update in case it exists.
     */
    where: asset_typesWhereUniqueInput
    /**
     * In case the asset_types found by the `where` argument doesn't exist, create a new asset_types with this data.
     */
    create: XOR<asset_typesCreateInput, asset_typesUncheckedCreateInput>
    /**
     * In case the asset_types was found with the provided `where` argument, update it with this data.
     */
    update: XOR<asset_typesUpdateInput, asset_typesUncheckedUpdateInput>
  }


  /**
   * asset_types delete
   */
  export type asset_typesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
    /**
     * Filter which asset_types to delete.
     */
    where: asset_typesWhereUniqueInput
  }


  /**
   * asset_types deleteMany
   */
  export type asset_typesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_types to delete
     */
    where?: asset_typesWhereInput
  }


  /**
   * asset_types.assets
   */
  export type asset_types$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * asset_types without action
   */
  export type asset_typesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_types
     */
    select?: asset_typesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_typesInclude<ExtArgs> | null
  }



  /**
   * Model asset_images
   */

  export type AggregateAsset_images = {
    _count: Asset_imagesCountAggregateOutputType | null
    _avg: Asset_imagesAvgAggregateOutputType | null
    _sum: Asset_imagesSumAggregateOutputType | null
    _min: Asset_imagesMinAggregateOutputType | null
    _max: Asset_imagesMaxAggregateOutputType | null
  }

  export type Asset_imagesAvgAggregateOutputType = {
    id: number | null
    asset_id: number | null
  }

  export type Asset_imagesSumAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
  }

  export type Asset_imagesMinAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
    name: string | null
    url: string | null
    created_at: Date | null
  }

  export type Asset_imagesMaxAggregateOutputType = {
    id: bigint | null
    asset_id: bigint | null
    name: string | null
    url: string | null
    created_at: Date | null
  }

  export type Asset_imagesCountAggregateOutputType = {
    id: number
    asset_id: number
    name: number
    url: number
    created_at: number
    _all: number
  }


  export type Asset_imagesAvgAggregateInputType = {
    id?: true
    asset_id?: true
  }

  export type Asset_imagesSumAggregateInputType = {
    id?: true
    asset_id?: true
  }

  export type Asset_imagesMinAggregateInputType = {
    id?: true
    asset_id?: true
    name?: true
    url?: true
    created_at?: true
  }

  export type Asset_imagesMaxAggregateInputType = {
    id?: true
    asset_id?: true
    name?: true
    url?: true
    created_at?: true
  }

  export type Asset_imagesCountAggregateInputType = {
    id?: true
    asset_id?: true
    name?: true
    url?: true
    created_at?: true
    _all?: true
  }

  export type Asset_imagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_images to aggregate.
     */
    where?: asset_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_images to fetch.
     */
    orderBy?: asset_imagesOrderByWithRelationInput | asset_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: asset_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned asset_images
    **/
    _count?: true | Asset_imagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Asset_imagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Asset_imagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Asset_imagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Asset_imagesMaxAggregateInputType
  }

  export type GetAsset_imagesAggregateType<T extends Asset_imagesAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset_images]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset_images[P]>
      : GetScalarType<T[P], AggregateAsset_images[P]>
  }




  export type asset_imagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: asset_imagesWhereInput
    orderBy?: asset_imagesOrderByWithAggregationInput | asset_imagesOrderByWithAggregationInput[]
    by: Asset_imagesScalarFieldEnum[] | Asset_imagesScalarFieldEnum
    having?: asset_imagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Asset_imagesCountAggregateInputType | true
    _avg?: Asset_imagesAvgAggregateInputType
    _sum?: Asset_imagesSumAggregateInputType
    _min?: Asset_imagesMinAggregateInputType
    _max?: Asset_imagesMaxAggregateInputType
  }

  export type Asset_imagesGroupByOutputType = {
    id: bigint
    asset_id: bigint
    name: string
    url: string | null
    created_at: Date
    _count: Asset_imagesCountAggregateOutputType | null
    _avg: Asset_imagesAvgAggregateOutputType | null
    _sum: Asset_imagesSumAggregateOutputType | null
    _min: Asset_imagesMinAggregateOutputType | null
    _max: Asset_imagesMaxAggregateOutputType | null
  }

  type GetAsset_imagesGroupByPayload<T extends asset_imagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Asset_imagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Asset_imagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Asset_imagesGroupByOutputType[P]>
            : GetScalarType<T[P], Asset_imagesGroupByOutputType[P]>
        }
      >
    >


  export type asset_imagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_id?: boolean
    name?: boolean
    url?: boolean
    created_at?: boolean
    asset?: boolean | assetsDefaultArgs<ExtArgs>
    main_for?: boolean | asset_images$main_forArgs<ExtArgs>
  }, ExtArgs["result"]["asset_images"]>

  export type asset_imagesSelectScalar = {
    id?: boolean
    asset_id?: boolean
    name?: boolean
    url?: boolean
    created_at?: boolean
  }

  export type asset_imagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asset?: boolean | assetsDefaultArgs<ExtArgs>
    main_for?: boolean | asset_images$main_forArgs<ExtArgs>
  }


  export type $asset_imagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "asset_images"
    objects: {
      asset: Prisma.$assetsPayload<ExtArgs>
      main_for: Prisma.$assetsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      asset_id: bigint
      name: string
      url: string | null
      created_at: Date
    }, ExtArgs["result"]["asset_images"]>
    composites: {}
  }


  type asset_imagesGetPayload<S extends boolean | null | undefined | asset_imagesDefaultArgs> = $Result.GetResult<Prisma.$asset_imagesPayload, S>

  type asset_imagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<asset_imagesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Asset_imagesCountAggregateInputType | true
    }

  export interface asset_imagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['asset_images'], meta: { name: 'asset_images' } }
    /**
     * Find zero or one Asset_images that matches the filter.
     * @param {asset_imagesFindUniqueArgs} args - Arguments to find a Asset_images
     * @example
     * // Get one Asset_images
     * const asset_images = await prisma.asset_images.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends asset_imagesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesFindUniqueArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Asset_images that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {asset_imagesFindUniqueOrThrowArgs} args - Arguments to find a Asset_images
     * @example
     * // Get one Asset_images
     * const asset_images = await prisma.asset_images.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends asset_imagesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Asset_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesFindFirstArgs} args - Arguments to find a Asset_images
     * @example
     * // Get one Asset_images
     * const asset_images = await prisma.asset_images.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends asset_imagesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesFindFirstArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Asset_images that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesFindFirstOrThrowArgs} args - Arguments to find a Asset_images
     * @example
     * // Get one Asset_images
     * const asset_images = await prisma.asset_images.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends asset_imagesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Asset_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asset_images
     * const asset_images = await prisma.asset_images.findMany()
     * 
     * // Get first 10 Asset_images
     * const asset_images = await prisma.asset_images.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asset_imagesWithIdOnly = await prisma.asset_images.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends asset_imagesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Asset_images.
     * @param {asset_imagesCreateArgs} args - Arguments to create a Asset_images.
     * @example
     * // Create one Asset_images
     * const Asset_images = await prisma.asset_images.create({
     *   data: {
     *     // ... data to create a Asset_images
     *   }
     * })
     * 
    **/
    create<T extends asset_imagesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesCreateArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Asset_images.
     *     @param {asset_imagesCreateManyArgs} args - Arguments to create many Asset_images.
     *     @example
     *     // Create many Asset_images
     *     const asset_images = await prisma.asset_images.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends asset_imagesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Asset_images.
     * @param {asset_imagesDeleteArgs} args - Arguments to delete one Asset_images.
     * @example
     * // Delete one Asset_images
     * const Asset_images = await prisma.asset_images.delete({
     *   where: {
     *     // ... filter to delete one Asset_images
     *   }
     * })
     * 
    **/
    delete<T extends asset_imagesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesDeleteArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Asset_images.
     * @param {asset_imagesUpdateArgs} args - Arguments to update one Asset_images.
     * @example
     * // Update one Asset_images
     * const asset_images = await prisma.asset_images.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends asset_imagesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesUpdateArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Asset_images.
     * @param {asset_imagesDeleteManyArgs} args - Arguments to filter Asset_images to delete.
     * @example
     * // Delete a few Asset_images
     * const { count } = await prisma.asset_images.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends asset_imagesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, asset_imagesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asset_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asset_images
     * const asset_images = await prisma.asset_images.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends asset_imagesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asset_images.
     * @param {asset_imagesUpsertArgs} args - Arguments to update or create a Asset_images.
     * @example
     * // Update or create a Asset_images
     * const asset_images = await prisma.asset_images.upsert({
     *   create: {
     *     // ... data to create a Asset_images
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset_images we want to update
     *   }
     * })
    **/
    upsert<T extends asset_imagesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, asset_imagesUpsertArgs<ExtArgs>>
    ): Prisma__asset_imagesClient<$Result.GetResult<Prisma.$asset_imagesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Asset_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesCountArgs} args - Arguments to filter Asset_images to count.
     * @example
     * // Count the number of Asset_images
     * const count = await prisma.asset_images.count({
     *   where: {
     *     // ... the filter for the Asset_images we want to count
     *   }
     * })
    **/
    count<T extends asset_imagesCountArgs>(
      args?: Subset<T, asset_imagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Asset_imagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asset_imagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Asset_imagesAggregateArgs>(args: Subset<T, Asset_imagesAggregateArgs>): Prisma.PrismaPromise<GetAsset_imagesAggregateType<T>>

    /**
     * Group by Asset_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {asset_imagesGroupByArgs} args - Group by arguments.
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
      T extends asset_imagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: asset_imagesGroupByArgs['orderBy'] }
        : { orderBy?: asset_imagesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, asset_imagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsset_imagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the asset_images model
   */
  readonly fields: asset_imagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for asset_images.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__asset_imagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    asset<T extends assetsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, assetsDefaultArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    main_for<T extends asset_images$main_forArgs<ExtArgs> = {}>(args?: Subset<T, asset_images$main_forArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

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
   * Fields of the asset_images model
   */ 
  interface asset_imagesFieldRefs {
    readonly id: FieldRef<"asset_images", 'BigInt'>
    readonly asset_id: FieldRef<"asset_images", 'BigInt'>
    readonly name: FieldRef<"asset_images", 'String'>
    readonly url: FieldRef<"asset_images", 'String'>
    readonly created_at: FieldRef<"asset_images", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * asset_images findUnique
   */
  export type asset_imagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter, which asset_images to fetch.
     */
    where: asset_imagesWhereUniqueInput
  }


  /**
   * asset_images findUniqueOrThrow
   */
  export type asset_imagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter, which asset_images to fetch.
     */
    where: asset_imagesWhereUniqueInput
  }


  /**
   * asset_images findFirst
   */
  export type asset_imagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter, which asset_images to fetch.
     */
    where?: asset_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_images to fetch.
     */
    orderBy?: asset_imagesOrderByWithRelationInput | asset_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_images.
     */
    cursor?: asset_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_images.
     */
    distinct?: Asset_imagesScalarFieldEnum | Asset_imagesScalarFieldEnum[]
  }


  /**
   * asset_images findFirstOrThrow
   */
  export type asset_imagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter, which asset_images to fetch.
     */
    where?: asset_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_images to fetch.
     */
    orderBy?: asset_imagesOrderByWithRelationInput | asset_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for asset_images.
     */
    cursor?: asset_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of asset_images.
     */
    distinct?: Asset_imagesScalarFieldEnum | Asset_imagesScalarFieldEnum[]
  }


  /**
   * asset_images findMany
   */
  export type asset_imagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter, which asset_images to fetch.
     */
    where?: asset_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of asset_images to fetch.
     */
    orderBy?: asset_imagesOrderByWithRelationInput | asset_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing asset_images.
     */
    cursor?: asset_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` asset_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` asset_images.
     */
    skip?: number
    distinct?: Asset_imagesScalarFieldEnum | Asset_imagesScalarFieldEnum[]
  }


  /**
   * asset_images create
   */
  export type asset_imagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * The data needed to create a asset_images.
     */
    data: XOR<asset_imagesCreateInput, asset_imagesUncheckedCreateInput>
  }


  /**
   * asset_images createMany
   */
  export type asset_imagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many asset_images.
     */
    data: asset_imagesCreateManyInput | asset_imagesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * asset_images update
   */
  export type asset_imagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * The data needed to update a asset_images.
     */
    data: XOR<asset_imagesUpdateInput, asset_imagesUncheckedUpdateInput>
    /**
     * Choose, which asset_images to update.
     */
    where: asset_imagesWhereUniqueInput
  }


  /**
   * asset_images updateMany
   */
  export type asset_imagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update asset_images.
     */
    data: XOR<asset_imagesUpdateManyMutationInput, asset_imagesUncheckedUpdateManyInput>
    /**
     * Filter which asset_images to update
     */
    where?: asset_imagesWhereInput
  }


  /**
   * asset_images upsert
   */
  export type asset_imagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * The filter to search for the asset_images to update in case it exists.
     */
    where: asset_imagesWhereUniqueInput
    /**
     * In case the asset_images found by the `where` argument doesn't exist, create a new asset_images with this data.
     */
    create: XOR<asset_imagesCreateInput, asset_imagesUncheckedCreateInput>
    /**
     * In case the asset_images was found with the provided `where` argument, update it with this data.
     */
    update: XOR<asset_imagesUpdateInput, asset_imagesUncheckedUpdateInput>
  }


  /**
   * asset_images delete
   */
  export type asset_imagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
    /**
     * Filter which asset_images to delete.
     */
    where: asset_imagesWhereUniqueInput
  }


  /**
   * asset_images deleteMany
   */
  export type asset_imagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which asset_images to delete
     */
    where?: asset_imagesWhereInput
  }


  /**
   * asset_images.main_for
   */
  export type asset_images$main_forArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
  }


  /**
   * asset_images without action
   */
  export type asset_imagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_images
     */
    select?: asset_imagesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_imagesInclude<ExtArgs> | null
  }



  /**
   * Model brands
   */

  export type AggregateBrands = {
    _count: BrandsCountAggregateOutputType | null
    _avg: BrandsAvgAggregateOutputType | null
    _sum: BrandsSumAggregateOutputType | null
    _min: BrandsMinAggregateOutputType | null
    _max: BrandsMaxAggregateOutputType | null
  }

  export type BrandsAvgAggregateOutputType = {
    id: number | null
  }

  export type BrandsSumAggregateOutputType = {
    id: bigint | null
  }

  export type BrandsMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BrandsMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BrandsCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BrandsAvgAggregateInputType = {
    id?: true
  }

  export type BrandsSumAggregateInputType = {
    id?: true
  }

  export type BrandsMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type BrandsMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type BrandsCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BrandsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which brands to aggregate.
     */
    where?: brandsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandsOrderByWithRelationInput | brandsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: brandsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned brands
    **/
    _count?: true | BrandsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandsMaxAggregateInputType
  }

  export type GetBrandsAggregateType<T extends BrandsAggregateArgs> = {
        [P in keyof T & keyof AggregateBrands]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrands[P]>
      : GetScalarType<T[P], AggregateBrands[P]>
  }




  export type brandsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: brandsWhereInput
    orderBy?: brandsOrderByWithAggregationInput | brandsOrderByWithAggregationInput[]
    by: BrandsScalarFieldEnum[] | BrandsScalarFieldEnum
    having?: brandsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandsCountAggregateInputType | true
    _avg?: BrandsAvgAggregateInputType
    _sum?: BrandsSumAggregateInputType
    _min?: BrandsMinAggregateInputType
    _max?: BrandsMaxAggregateInputType
  }

  export type BrandsGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date | null
    updated_at: Date | null
    _count: BrandsCountAggregateOutputType | null
    _avg: BrandsAvgAggregateOutputType | null
    _sum: BrandsSumAggregateOutputType | null
    _min: BrandsMinAggregateOutputType | null
    _max: BrandsMaxAggregateOutputType | null
  }

  type GetBrandsGroupByPayload<T extends brandsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandsGroupByOutputType[P]>
            : GetScalarType<T[P], BrandsGroupByOutputType[P]>
        }
      >
    >


  export type brandsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    assets?: boolean | brands$assetsArgs<ExtArgs>
    _count?: boolean | BrandsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brands"]>

  export type brandsSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type brandsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | brands$assetsArgs<ExtArgs>
    _count?: boolean | BrandsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $brandsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "brands"
    objects: {
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["brands"]>
    composites: {}
  }


  type brandsGetPayload<S extends boolean | null | undefined | brandsDefaultArgs> = $Result.GetResult<Prisma.$brandsPayload, S>

  type brandsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<brandsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BrandsCountAggregateInputType | true
    }

  export interface brandsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['brands'], meta: { name: 'brands' } }
    /**
     * Find zero or one Brands that matches the filter.
     * @param {brandsFindUniqueArgs} args - Arguments to find a Brands
     * @example
     * // Get one Brands
     * const brands = await prisma.brands.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends brandsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, brandsFindUniqueArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Brands that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {brandsFindUniqueOrThrowArgs} args - Arguments to find a Brands
     * @example
     * // Get one Brands
     * const brands = await prisma.brands.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends brandsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsFindFirstArgs} args - Arguments to find a Brands
     * @example
     * // Get one Brands
     * const brands = await prisma.brands.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends brandsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsFindFirstArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Brands that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsFindFirstOrThrowArgs} args - Arguments to find a Brands
     * @example
     * // Get one Brands
     * const brands = await prisma.brands.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends brandsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brands.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brands.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandsWithIdOnly = await prisma.brands.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends brandsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Brands.
     * @param {brandsCreateArgs} args - Arguments to create a Brands.
     * @example
     * // Create one Brands
     * const Brands = await prisma.brands.create({
     *   data: {
     *     // ... data to create a Brands
     *   }
     * })
     * 
    **/
    create<T extends brandsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, brandsCreateArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Brands.
     *     @param {brandsCreateManyArgs} args - Arguments to create many Brands.
     *     @example
     *     // Create many Brands
     *     const brands = await prisma.brands.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends brandsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Brands.
     * @param {brandsDeleteArgs} args - Arguments to delete one Brands.
     * @example
     * // Delete one Brands
     * const Brands = await prisma.brands.delete({
     *   where: {
     *     // ... filter to delete one Brands
     *   }
     * })
     * 
    **/
    delete<T extends brandsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, brandsDeleteArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Brands.
     * @param {brandsUpdateArgs} args - Arguments to update one Brands.
     * @example
     * // Update one Brands
     * const brands = await prisma.brands.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends brandsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, brandsUpdateArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Brands.
     * @param {brandsDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brands.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends brandsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, brandsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brands = await prisma.brands.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends brandsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, brandsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Brands.
     * @param {brandsUpsertArgs} args - Arguments to update or create a Brands.
     * @example
     * // Update or create a Brands
     * const brands = await prisma.brands.upsert({
     *   create: {
     *     // ... data to create a Brands
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brands we want to update
     *   }
     * })
    **/
    upsert<T extends brandsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, brandsUpsertArgs<ExtArgs>>
    ): Prisma__brandsClient<$Result.GetResult<Prisma.$brandsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brands.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends brandsCountArgs>(
      args?: Subset<T, brandsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BrandsAggregateArgs>(args: Subset<T, BrandsAggregateArgs>): Prisma.PrismaPromise<GetBrandsAggregateType<T>>

    /**
     * Group by Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {brandsGroupByArgs} args - Group by arguments.
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
      T extends brandsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: brandsGroupByArgs['orderBy'] }
        : { orderBy?: brandsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, brandsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the brands model
   */
  readonly fields: brandsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for brands.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__brandsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    assets<T extends brands$assetsArgs<ExtArgs> = {}>(args?: Subset<T, brands$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the brands model
   */ 
  interface brandsFieldRefs {
    readonly id: FieldRef<"brands", 'BigInt'>
    readonly name: FieldRef<"brands", 'String'>
    readonly created_at: FieldRef<"brands", 'DateTime'>
    readonly updated_at: FieldRef<"brands", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * brands findUnique
   */
  export type brandsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where: brandsWhereUniqueInput
  }


  /**
   * brands findUniqueOrThrow
   */
  export type brandsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where: brandsWhereUniqueInput
  }


  /**
   * brands findFirst
   */
  export type brandsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where?: brandsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandsOrderByWithRelationInput | brandsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for brands.
     */
    cursor?: brandsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of brands.
     */
    distinct?: BrandsScalarFieldEnum | BrandsScalarFieldEnum[]
  }


  /**
   * brands findFirstOrThrow
   */
  export type brandsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where?: brandsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandsOrderByWithRelationInput | brandsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for brands.
     */
    cursor?: brandsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of brands.
     */
    distinct?: BrandsScalarFieldEnum | BrandsScalarFieldEnum[]
  }


  /**
   * brands findMany
   */
  export type brandsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter, which brands to fetch.
     */
    where?: brandsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of brands to fetch.
     */
    orderBy?: brandsOrderByWithRelationInput | brandsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing brands.
     */
    cursor?: brandsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` brands.
     */
    skip?: number
    distinct?: BrandsScalarFieldEnum | BrandsScalarFieldEnum[]
  }


  /**
   * brands create
   */
  export type brandsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * The data needed to create a brands.
     */
    data: XOR<brandsCreateInput, brandsUncheckedCreateInput>
  }


  /**
   * brands createMany
   */
  export type brandsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many brands.
     */
    data: brandsCreateManyInput | brandsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * brands update
   */
  export type brandsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * The data needed to update a brands.
     */
    data: XOR<brandsUpdateInput, brandsUncheckedUpdateInput>
    /**
     * Choose, which brands to update.
     */
    where: brandsWhereUniqueInput
  }


  /**
   * brands updateMany
   */
  export type brandsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update brands.
     */
    data: XOR<brandsUpdateManyMutationInput, brandsUncheckedUpdateManyInput>
    /**
     * Filter which brands to update
     */
    where?: brandsWhereInput
  }


  /**
   * brands upsert
   */
  export type brandsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * The filter to search for the brands to update in case it exists.
     */
    where: brandsWhereUniqueInput
    /**
     * In case the brands found by the `where` argument doesn't exist, create a new brands with this data.
     */
    create: XOR<brandsCreateInput, brandsUncheckedCreateInput>
    /**
     * In case the brands was found with the provided `where` argument, update it with this data.
     */
    update: XOR<brandsUpdateInput, brandsUncheckedUpdateInput>
  }


  /**
   * brands delete
   */
  export type brandsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
    /**
     * Filter which brands to delete.
     */
    where: brandsWhereUniqueInput
  }


  /**
   * brands deleteMany
   */
  export type brandsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which brands to delete
     */
    where?: brandsWhereInput
  }


  /**
   * brands.assets
   */
  export type brands$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * brands without action
   */
  export type brandsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the brands
     */
    select?: brandsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: brandsInclude<ExtArgs> | null
  }



  /**
   * Model categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriesSumAggregateOutputType = {
    id: bigint | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CategoriesAvgAggregateInputType = {
    id?: true
  }

  export type CategoriesSumAggregateInputType = {
    id?: true
  }

  export type CategoriesMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to aggregate.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithAggregationInput | categoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _avg?: CategoriesAvgAggregateInputType
    _sum?: CategoriesSumAggregateInputType
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date | null
    updated_at: Date | null
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    assets?: boolean | categories$assetsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | categories$assetsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categories"
    objects: {
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }


  type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = $Result.GetResult<Prisma.$categoriesPayload, S>

  type categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categories'], meta: { name: 'categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {categoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends categoriesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Categories that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {categoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends categoriesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends categoriesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Categories.
     * @param {categoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
    **/
    create<T extends categoriesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesCreateArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Categories.
     *     @param {categoriesCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const categories = await prisma.categories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends categoriesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Categories.
     * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
    **/
    delete<T extends categoriesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesDeleteArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Categories.
     * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends categoriesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesUpdateArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends categoriesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends categoriesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Categories.
     * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
    **/
    upsert<T extends categoriesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, categoriesUpsertArgs<ExtArgs>>
    ): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoriesCountArgs>(
      args?: Subset<T, categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesGroupByArgs} args - Group by arguments.
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
      T extends categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriesGroupByArgs['orderBy'] }
        : { orderBy?: categoriesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categories model
   */
  readonly fields: categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    assets<T extends categories$assetsArgs<ExtArgs> = {}>(args?: Subset<T, categories$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the categories model
   */ 
  interface categoriesFieldRefs {
    readonly id: FieldRef<"categories", 'BigInt'>
    readonly name: FieldRef<"categories", 'String'>
    readonly created_at: FieldRef<"categories", 'DateTime'>
    readonly updated_at: FieldRef<"categories", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * categories findUnique
   */
  export type categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }


  /**
   * categories findUniqueOrThrow
   */
  export type categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }


  /**
   * categories findFirst
   */
  export type categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }


  /**
   * categories findFirstOrThrow
   */
  export type categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }


  /**
   * categories findMany
   */
  export type categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }


  /**
   * categories create
   */
  export type categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a categories.
     */
    data: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
  }


  /**
   * categories createMany
   */
  export type categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * categories update
   */
  export type categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a categories.
     */
    data: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
    /**
     * Choose, which categories to update.
     */
    where: categoriesWhereUniqueInput
  }


  /**
   * categories updateMany
   */
  export type categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
  }


  /**
   * categories upsert
   */
  export type categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the categories to update in case it exists.
     */
    where: categoriesWhereUniqueInput
    /**
     * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
     */
    create: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
    /**
     * In case the categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
  }


  /**
   * categories delete
   */
  export type categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter which categories to delete.
     */
    where: categoriesWhereUniqueInput
  }


  /**
   * categories deleteMany
   */
  export type categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoriesWhereInput
  }


  /**
   * categories.assets
   */
  export type categories$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * categories without action
   */
  export type categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: categoriesInclude<ExtArgs> | null
  }



  /**
   * Model departments
   */

  export type AggregateDepartments = {
    _count: DepartmentsCountAggregateOutputType | null
    _avg: DepartmentsAvgAggregateOutputType | null
    _sum: DepartmentsSumAggregateOutputType | null
    _min: DepartmentsMinAggregateOutputType | null
    _max: DepartmentsMaxAggregateOutputType | null
  }

  export type DepartmentsAvgAggregateOutputType = {
    id: number | null
  }

  export type DepartmentsSumAggregateOutputType = {
    id: bigint | null
  }

  export type DepartmentsMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DepartmentsMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DepartmentsCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DepartmentsAvgAggregateInputType = {
    id?: true
  }

  export type DepartmentsSumAggregateInputType = {
    id?: true
  }

  export type DepartmentsMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type DepartmentsMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type DepartmentsCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DepartmentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departments to aggregate.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned departments
    **/
    _count?: true | DepartmentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentsMaxAggregateInputType
  }

  export type GetDepartmentsAggregateType<T extends DepartmentsAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartments[P]>
      : GetScalarType<T[P], AggregateDepartments[P]>
  }




  export type departmentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departmentsWhereInput
    orderBy?: departmentsOrderByWithAggregationInput | departmentsOrderByWithAggregationInput[]
    by: DepartmentsScalarFieldEnum[] | DepartmentsScalarFieldEnum
    having?: departmentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentsCountAggregateInputType | true
    _avg?: DepartmentsAvgAggregateInputType
    _sum?: DepartmentsSumAggregateInputType
    _min?: DepartmentsMinAggregateInputType
    _max?: DepartmentsMaxAggregateInputType
  }

  export type DepartmentsGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date | null
    updated_at: Date | null
    _count: DepartmentsCountAggregateOutputType | null
    _avg: DepartmentsAvgAggregateOutputType | null
    _sum: DepartmentsSumAggregateOutputType | null
    _min: DepartmentsMinAggregateOutputType | null
    _max: DepartmentsMaxAggregateOutputType | null
  }

  type GetDepartmentsGroupByPayload<T extends departmentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentsGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentsGroupByOutputType[P]>
        }
      >
    >


  export type departmentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    employees?: boolean | departments$employeesArgs<ExtArgs>
    _count?: boolean | DepartmentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["departments"]>

  export type departmentsSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type departmentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | departments$employeesArgs<ExtArgs>
    _count?: boolean | DepartmentsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $departmentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "departments"
    objects: {
      employees: Prisma.$employeesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["departments"]>
    composites: {}
  }


  type departmentsGetPayload<S extends boolean | null | undefined | departmentsDefaultArgs> = $Result.GetResult<Prisma.$departmentsPayload, S>

  type departmentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<departmentsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DepartmentsCountAggregateInputType | true
    }

  export interface departmentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['departments'], meta: { name: 'departments' } }
    /**
     * Find zero or one Departments that matches the filter.
     * @param {departmentsFindUniqueArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends departmentsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsFindUniqueArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Departments that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {departmentsFindUniqueOrThrowArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends departmentsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindFirstArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends departmentsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsFindFirstArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Departments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindFirstOrThrowArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends departmentsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.departments.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.departments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentsWithIdOnly = await prisma.departments.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends departmentsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Departments.
     * @param {departmentsCreateArgs} args - Arguments to create a Departments.
     * @example
     * // Create one Departments
     * const Departments = await prisma.departments.create({
     *   data: {
     *     // ... data to create a Departments
     *   }
     * })
     * 
    **/
    create<T extends departmentsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsCreateArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Departments.
     *     @param {departmentsCreateManyArgs} args - Arguments to create many Departments.
     *     @example
     *     // Create many Departments
     *     const departments = await prisma.departments.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends departmentsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Departments.
     * @param {departmentsDeleteArgs} args - Arguments to delete one Departments.
     * @example
     * // Delete one Departments
     * const Departments = await prisma.departments.delete({
     *   where: {
     *     // ... filter to delete one Departments
     *   }
     * })
     * 
    **/
    delete<T extends departmentsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsDeleteArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Departments.
     * @param {departmentsUpdateArgs} args - Arguments to update one Departments.
     * @example
     * // Update one Departments
     * const departments = await prisma.departments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends departmentsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsUpdateArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Departments.
     * @param {departmentsDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.departments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends departmentsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, departmentsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const departments = await prisma.departments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends departmentsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Departments.
     * @param {departmentsUpsertArgs} args - Arguments to update or create a Departments.
     * @example
     * // Update or create a Departments
     * const departments = await prisma.departments.upsert({
     *   create: {
     *     // ... data to create a Departments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Departments we want to update
     *   }
     * })
    **/
    upsert<T extends departmentsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, departmentsUpsertArgs<ExtArgs>>
    ): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.departments.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends departmentsCountArgs>(
      args?: Subset<T, departmentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentsAggregateArgs>(args: Subset<T, DepartmentsAggregateArgs>): Prisma.PrismaPromise<GetDepartmentsAggregateType<T>>

    /**
     * Group by Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsGroupByArgs} args - Group by arguments.
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
      T extends departmentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: departmentsGroupByArgs['orderBy'] }
        : { orderBy?: departmentsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, departmentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the departments model
   */
  readonly fields: departmentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for departments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__departmentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    employees<T extends departments$employeesArgs<ExtArgs> = {}>(args?: Subset<T, departments$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the departments model
   */ 
  interface departmentsFieldRefs {
    readonly id: FieldRef<"departments", 'BigInt'>
    readonly name: FieldRef<"departments", 'String'>
    readonly created_at: FieldRef<"departments", 'DateTime'>
    readonly updated_at: FieldRef<"departments", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * departments findUnique
   */
  export type departmentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where: departmentsWhereUniqueInput
  }


  /**
   * departments findUniqueOrThrow
   */
  export type departmentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where: departmentsWhereUniqueInput
  }


  /**
   * departments findFirst
   */
  export type departmentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }


  /**
   * departments findFirstOrThrow
   */
  export type departmentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }


  /**
   * departments findMany
   */
  export type departmentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }


  /**
   * departments create
   */
  export type departmentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The data needed to create a departments.
     */
    data: XOR<departmentsCreateInput, departmentsUncheckedCreateInput>
  }


  /**
   * departments createMany
   */
  export type departmentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many departments.
     */
    data: departmentsCreateManyInput | departmentsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * departments update
   */
  export type departmentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The data needed to update a departments.
     */
    data: XOR<departmentsUpdateInput, departmentsUncheckedUpdateInput>
    /**
     * Choose, which departments to update.
     */
    where: departmentsWhereUniqueInput
  }


  /**
   * departments updateMany
   */
  export type departmentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update departments.
     */
    data: XOR<departmentsUpdateManyMutationInput, departmentsUncheckedUpdateManyInput>
    /**
     * Filter which departments to update
     */
    where?: departmentsWhereInput
  }


  /**
   * departments upsert
   */
  export type departmentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The filter to search for the departments to update in case it exists.
     */
    where: departmentsWhereUniqueInput
    /**
     * In case the departments found by the `where` argument doesn't exist, create a new departments with this data.
     */
    create: XOR<departmentsCreateInput, departmentsUncheckedCreateInput>
    /**
     * In case the departments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<departmentsUpdateInput, departmentsUncheckedUpdateInput>
  }


  /**
   * departments delete
   */
  export type departmentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter which departments to delete.
     */
    where: departmentsWhereUniqueInput
  }


  /**
   * departments deleteMany
   */
  export type departmentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departments to delete
     */
    where?: departmentsWhereInput
  }


  /**
   * departments.employees
   */
  export type departments$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    cursor?: employeesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }


  /**
   * departments without action
   */
  export type departmentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
  }



  /**
   * Model employees
   */

  export type AggregateEmployees = {
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  export type EmployeesAvgAggregateOutputType = {
    id: number | null
    department_id: number | null
  }

  export type EmployeesSumAggregateOutputType = {
    id: bigint | null
    department_id: bigint | null
  }

  export type EmployeesMinAggregateOutputType = {
    id: bigint | null
    nik: string | null
    nama: string | null
    gender: string | null
    created_at: Date | null
    updated_at: Date | null
    department_id: bigint | null
  }

  export type EmployeesMaxAggregateOutputType = {
    id: bigint | null
    nik: string | null
    nama: string | null
    gender: string | null
    created_at: Date | null
    updated_at: Date | null
    department_id: bigint | null
  }

  export type EmployeesCountAggregateOutputType = {
    id: number
    nik: number
    nama: number
    gender: number
    created_at: number
    updated_at: number
    department_id: number
    _all: number
  }


  export type EmployeesAvgAggregateInputType = {
    id?: true
    department_id?: true
  }

  export type EmployeesSumAggregateInputType = {
    id?: true
    department_id?: true
  }

  export type EmployeesMinAggregateInputType = {
    id?: true
    nik?: true
    nama?: true
    gender?: true
    created_at?: true
    updated_at?: true
    department_id?: true
  }

  export type EmployeesMaxAggregateInputType = {
    id?: true
    nik?: true
    nama?: true
    gender?: true
    created_at?: true
    updated_at?: true
    department_id?: true
  }

  export type EmployeesCountAggregateInputType = {
    id?: true
    nik?: true
    nama?: true
    gender?: true
    created_at?: true
    updated_at?: true
    department_id?: true
    _all?: true
  }

  export type EmployeesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to aggregate.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    _count?: true | EmployeesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeesMaxAggregateInputType
  }

  export type GetEmployeesAggregateType<T extends EmployeesAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployees]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployees[P]>
      : GetScalarType<T[P], AggregateEmployees[P]>
  }




  export type employeesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeesWhereInput
    orderBy?: employeesOrderByWithAggregationInput | employeesOrderByWithAggregationInput[]
    by: EmployeesScalarFieldEnum[] | EmployeesScalarFieldEnum
    having?: employeesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeesCountAggregateInputType | true
    _avg?: EmployeesAvgAggregateInputType
    _sum?: EmployeesSumAggregateInputType
    _min?: EmployeesMinAggregateInputType
    _max?: EmployeesMaxAggregateInputType
  }

  export type EmployeesGroupByOutputType = {
    id: bigint
    nik: string
    nama: string
    gender: string
    created_at: Date | null
    updated_at: Date | null
    department_id: bigint | null
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  type GetEmployeesGroupByPayload<T extends employeesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
        }
      >
    >


  export type employeesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nik?: boolean
    nama?: boolean
    gender?: boolean
    created_at?: boolean
    updated_at?: boolean
    department_id?: boolean
    department?: boolean | employees$departmentArgs<ExtArgs>
    previous_trans?: boolean | employees$previous_transArgs<ExtArgs>
    new_trans?: boolean | employees$new_transArgs<ExtArgs>
    assets?: boolean | employees$assetsArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employees"]>

  export type employeesSelectScalar = {
    id?: boolean
    nik?: boolean
    nama?: boolean
    gender?: boolean
    created_at?: boolean
    updated_at?: boolean
    department_id?: boolean
  }

  export type employeesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | employees$departmentArgs<ExtArgs>
    previous_trans?: boolean | employees$previous_transArgs<ExtArgs>
    new_trans?: boolean | employees$new_transArgs<ExtArgs>
    assets?: boolean | employees$assetsArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $employeesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "employees"
    objects: {
      department: Prisma.$departmentsPayload<ExtArgs> | null
      previous_trans: Prisma.$asset_transactionsPayload<ExtArgs>[]
      new_trans: Prisma.$asset_transactionsPayload<ExtArgs>[]
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      nik: string
      nama: string
      gender: string
      created_at: Date | null
      updated_at: Date | null
      department_id: bigint | null
    }, ExtArgs["result"]["employees"]>
    composites: {}
  }


  type employeesGetPayload<S extends boolean | null | undefined | employeesDefaultArgs> = $Result.GetResult<Prisma.$employeesPayload, S>

  type employeesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<employeesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeesCountAggregateInputType | true
    }

  export interface employeesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employees'], meta: { name: 'employees' } }
    /**
     * Find zero or one Employees that matches the filter.
     * @param {employeesFindUniqueArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends employeesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, employeesFindUniqueArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Employees that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {employeesFindUniqueOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends employeesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends employeesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesFindFirstArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Employees that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends employeesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employees.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employees.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeesWithIdOnly = await prisma.employees.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends employeesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Employees.
     * @param {employeesCreateArgs} args - Arguments to create a Employees.
     * @example
     * // Create one Employees
     * const Employees = await prisma.employees.create({
     *   data: {
     *     // ... data to create a Employees
     *   }
     * })
     * 
    **/
    create<T extends employeesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, employeesCreateArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Employees.
     *     @param {employeesCreateManyArgs} args - Arguments to create many Employees.
     *     @example
     *     // Create many Employees
     *     const employees = await prisma.employees.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends employeesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employees.
     * @param {employeesDeleteArgs} args - Arguments to delete one Employees.
     * @example
     * // Delete one Employees
     * const Employees = await prisma.employees.delete({
     *   where: {
     *     // ... filter to delete one Employees
     *   }
     * })
     * 
    **/
    delete<T extends employeesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, employeesDeleteArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Employees.
     * @param {employeesUpdateArgs} args - Arguments to update one Employees.
     * @example
     * // Update one Employees
     * const employees = await prisma.employees.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends employeesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, employeesUpdateArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Employees.
     * @param {employeesDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employees.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends employeesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, employeesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employees = await prisma.employees.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends employeesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, employeesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employees.
     * @param {employeesUpsertArgs} args - Arguments to update or create a Employees.
     * @example
     * // Update or create a Employees
     * const employees = await prisma.employees.upsert({
     *   create: {
     *     // ... data to create a Employees
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employees we want to update
     *   }
     * })
    **/
    upsert<T extends employeesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, employeesUpsertArgs<ExtArgs>>
    ): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employees.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeesCountArgs>(
      args?: Subset<T, employeesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeesAggregateArgs>(args: Subset<T, EmployeesAggregateArgs>): Prisma.PrismaPromise<GetEmployeesAggregateType<T>>

    /**
     * Group by Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesGroupByArgs} args - Group by arguments.
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
      T extends employeesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeesGroupByArgs['orderBy'] }
        : { orderBy?: employeesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, employeesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employees model
   */
  readonly fields: employeesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employees.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    department<T extends employees$departmentArgs<ExtArgs> = {}>(args?: Subset<T, employees$departmentArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    previous_trans<T extends employees$previous_transArgs<ExtArgs> = {}>(args?: Subset<T, employees$previous_transArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findMany'> | Null>;

    new_trans<T extends employees$new_transArgs<ExtArgs> = {}>(args?: Subset<T, employees$new_transArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$asset_transactionsPayload<ExtArgs>, T, 'findMany'> | Null>;

    assets<T extends employees$assetsArgs<ExtArgs> = {}>(args?: Subset<T, employees$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the employees model
   */ 
  interface employeesFieldRefs {
    readonly id: FieldRef<"employees", 'BigInt'>
    readonly nik: FieldRef<"employees", 'String'>
    readonly nama: FieldRef<"employees", 'String'>
    readonly gender: FieldRef<"employees", 'String'>
    readonly created_at: FieldRef<"employees", 'DateTime'>
    readonly updated_at: FieldRef<"employees", 'DateTime'>
    readonly department_id: FieldRef<"employees", 'BigInt'>
  }
    

  // Custom InputTypes

  /**
   * employees findUnique
   */
  export type employeesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }


  /**
   * employees findUniqueOrThrow
   */
  export type employeesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }


  /**
   * employees findFirst
   */
  export type employeesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }


  /**
   * employees findFirstOrThrow
   */
  export type employeesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }


  /**
   * employees findMany
   */
  export type employeesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }


  /**
   * employees create
   */
  export type employeesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to create a employees.
     */
    data: XOR<employeesCreateInput, employeesUncheckedCreateInput>
  }


  /**
   * employees createMany
   */
  export type employeesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many employees.
     */
    data: employeesCreateManyInput | employeesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * employees update
   */
  export type employeesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to update a employees.
     */
    data: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
    /**
     * Choose, which employees to update.
     */
    where: employeesWhereUniqueInput
  }


  /**
   * employees updateMany
   */
  export type employeesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update employees.
     */
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeesWhereInput
  }


  /**
   * employees upsert
   */
  export type employeesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The filter to search for the employees to update in case it exists.
     */
    where: employeesWhereUniqueInput
    /**
     * In case the employees found by the `where` argument doesn't exist, create a new employees with this data.
     */
    create: XOR<employeesCreateInput, employeesUncheckedCreateInput>
    /**
     * In case the employees was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
  }


  /**
   * employees delete
   */
  export type employeesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter which employees to delete.
     */
    where: employeesWhereUniqueInput
  }


  /**
   * employees deleteMany
   */
  export type employeesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to delete
     */
    where?: employeesWhereInput
  }


  /**
   * employees.department
   */
  export type employees$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: departmentsInclude<ExtArgs> | null
    where?: departmentsWhereInput
  }


  /**
   * employees.previous_trans
   */
  export type employees$previous_transArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    where?: asset_transactionsWhereInput
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    cursor?: asset_transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * employees.new_trans
   */
  export type employees$new_transArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the asset_transactions
     */
    select?: asset_transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: asset_transactionsInclude<ExtArgs> | null
    where?: asset_transactionsWhereInput
    orderBy?: asset_transactionsOrderByWithRelationInput | asset_transactionsOrderByWithRelationInput[]
    cursor?: asset_transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Asset_transactionsScalarFieldEnum | Asset_transactionsScalarFieldEnum[]
  }


  /**
   * employees.assets
   */
  export type employees$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * employees without action
   */
  export type employeesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: employeesInclude<ExtArgs> | null
  }



  /**
   * Model locations
   */

  export type AggregateLocations = {
    _count: LocationsCountAggregateOutputType | null
    _avg: LocationsAvgAggregateOutputType | null
    _sum: LocationsSumAggregateOutputType | null
    _min: LocationsMinAggregateOutputType | null
    _max: LocationsMaxAggregateOutputType | null
  }

  export type LocationsAvgAggregateOutputType = {
    id: number | null
    area_id: number | null
  }

  export type LocationsSumAggregateOutputType = {
    id: bigint | null
    area_id: bigint | null
  }

  export type LocationsMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    area_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LocationsMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    area_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LocationsCountAggregateOutputType = {
    id: number
    name: number
    area_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LocationsAvgAggregateInputType = {
    id?: true
    area_id?: true
  }

  export type LocationsSumAggregateInputType = {
    id?: true
    area_id?: true
  }

  export type LocationsMinAggregateInputType = {
    id?: true
    name?: true
    area_id?: true
    created_at?: true
    updated_at?: true
  }

  export type LocationsMaxAggregateInputType = {
    id?: true
    name?: true
    area_id?: true
    created_at?: true
    updated_at?: true
  }

  export type LocationsCountAggregateInputType = {
    id?: true
    name?: true
    area_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LocationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which locations to aggregate.
     */
    where?: locationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationsOrderByWithRelationInput | locationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: locationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned locations
    **/
    _count?: true | LocationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationsMaxAggregateInputType
  }

  export type GetLocationsAggregateType<T extends LocationsAggregateArgs> = {
        [P in keyof T & keyof AggregateLocations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocations[P]>
      : GetScalarType<T[P], AggregateLocations[P]>
  }




  export type locationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationsWhereInput
    orderBy?: locationsOrderByWithAggregationInput | locationsOrderByWithAggregationInput[]
    by: LocationsScalarFieldEnum[] | LocationsScalarFieldEnum
    having?: locationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationsCountAggregateInputType | true
    _avg?: LocationsAvgAggregateInputType
    _sum?: LocationsSumAggregateInputType
    _min?: LocationsMinAggregateInputType
    _max?: LocationsMaxAggregateInputType
  }

  export type LocationsGroupByOutputType = {
    id: bigint
    name: string
    area_id: bigint
    created_at: Date | null
    updated_at: Date | null
    _count: LocationsCountAggregateOutputType | null
    _avg: LocationsAvgAggregateOutputType | null
    _sum: LocationsSumAggregateOutputType | null
    _min: LocationsMinAggregateOutputType | null
    _max: LocationsMaxAggregateOutputType | null
  }

  type GetLocationsGroupByPayload<T extends locationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationsGroupByOutputType[P]>
            : GetScalarType<T[P], LocationsGroupByOutputType[P]>
        }
      >
    >


  export type locationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    area_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    area?: boolean | areasDefaultArgs<ExtArgs>
    assets?: boolean | locations$assetsArgs<ExtArgs>
    _count?: boolean | LocationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locations"]>

  export type locationsSelectScalar = {
    id?: boolean
    name?: boolean
    area_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type locationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | areasDefaultArgs<ExtArgs>
    assets?: boolean | locations$assetsArgs<ExtArgs>
    _count?: boolean | LocationsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $locationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "locations"
    objects: {
      area: Prisma.$areasPayload<ExtArgs>
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      area_id: bigint
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["locations"]>
    composites: {}
  }


  type locationsGetPayload<S extends boolean | null | undefined | locationsDefaultArgs> = $Result.GetResult<Prisma.$locationsPayload, S>

  type locationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<locationsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LocationsCountAggregateInputType | true
    }

  export interface locationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['locations'], meta: { name: 'locations' } }
    /**
     * Find zero or one Locations that matches the filter.
     * @param {locationsFindUniqueArgs} args - Arguments to find a Locations
     * @example
     * // Get one Locations
     * const locations = await prisma.locations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends locationsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, locationsFindUniqueArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Locations that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {locationsFindUniqueOrThrowArgs} args - Arguments to find a Locations
     * @example
     * // Get one Locations
     * const locations = await prisma.locations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends locationsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsFindFirstArgs} args - Arguments to find a Locations
     * @example
     * // Get one Locations
     * const locations = await prisma.locations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends locationsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsFindFirstArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Locations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsFindFirstOrThrowArgs} args - Arguments to find a Locations
     * @example
     * // Get one Locations
     * const locations = await prisma.locations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends locationsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.locations.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.locations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationsWithIdOnly = await prisma.locations.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends locationsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Locations.
     * @param {locationsCreateArgs} args - Arguments to create a Locations.
     * @example
     * // Create one Locations
     * const Locations = await prisma.locations.create({
     *   data: {
     *     // ... data to create a Locations
     *   }
     * })
     * 
    **/
    create<T extends locationsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, locationsCreateArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Locations.
     *     @param {locationsCreateManyArgs} args - Arguments to create many Locations.
     *     @example
     *     // Create many Locations
     *     const locations = await prisma.locations.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends locationsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Locations.
     * @param {locationsDeleteArgs} args - Arguments to delete one Locations.
     * @example
     * // Delete one Locations
     * const Locations = await prisma.locations.delete({
     *   where: {
     *     // ... filter to delete one Locations
     *   }
     * })
     * 
    **/
    delete<T extends locationsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, locationsDeleteArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Locations.
     * @param {locationsUpdateArgs} args - Arguments to update one Locations.
     * @example
     * // Update one Locations
     * const locations = await prisma.locations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends locationsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, locationsUpdateArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Locations.
     * @param {locationsDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.locations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends locationsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, locationsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const locations = await prisma.locations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends locationsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, locationsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Locations.
     * @param {locationsUpsertArgs} args - Arguments to update or create a Locations.
     * @example
     * // Update or create a Locations
     * const locations = await prisma.locations.upsert({
     *   create: {
     *     // ... data to create a Locations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Locations we want to update
     *   }
     * })
    **/
    upsert<T extends locationsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, locationsUpsertArgs<ExtArgs>>
    ): Prisma__locationsClient<$Result.GetResult<Prisma.$locationsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.locations.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends locationsCountArgs>(
      args?: Subset<T, locationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationsAggregateArgs>(args: Subset<T, LocationsAggregateArgs>): Prisma.PrismaPromise<GetLocationsAggregateType<T>>

    /**
     * Group by Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationsGroupByArgs} args - Group by arguments.
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
      T extends locationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: locationsGroupByArgs['orderBy'] }
        : { orderBy?: locationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, locationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the locations model
   */
  readonly fields: locationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for locations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__locationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    area<T extends areasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, areasDefaultArgs<ExtArgs>>): Prisma__areasClient<$Result.GetResult<Prisma.$areasPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    assets<T extends locations$assetsArgs<ExtArgs> = {}>(args?: Subset<T, locations$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the locations model
   */ 
  interface locationsFieldRefs {
    readonly id: FieldRef<"locations", 'BigInt'>
    readonly name: FieldRef<"locations", 'String'>
    readonly area_id: FieldRef<"locations", 'BigInt'>
    readonly created_at: FieldRef<"locations", 'DateTime'>
    readonly updated_at: FieldRef<"locations", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * locations findUnique
   */
  export type locationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where: locationsWhereUniqueInput
  }


  /**
   * locations findUniqueOrThrow
   */
  export type locationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where: locationsWhereUniqueInput
  }


  /**
   * locations findFirst
   */
  export type locationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where?: locationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationsOrderByWithRelationInput | locationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationsScalarFieldEnum | LocationsScalarFieldEnum[]
  }


  /**
   * locations findFirstOrThrow
   */
  export type locationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where?: locationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationsOrderByWithRelationInput | locationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationsScalarFieldEnum | LocationsScalarFieldEnum[]
  }


  /**
   * locations findMany
   */
  export type locationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where?: locationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationsOrderByWithRelationInput | locationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing locations.
     */
    cursor?: locationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    distinct?: LocationsScalarFieldEnum | LocationsScalarFieldEnum[]
  }


  /**
   * locations create
   */
  export type locationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * The data needed to create a locations.
     */
    data: XOR<locationsCreateInput, locationsUncheckedCreateInput>
  }


  /**
   * locations createMany
   */
  export type locationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many locations.
     */
    data: locationsCreateManyInput | locationsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * locations update
   */
  export type locationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * The data needed to update a locations.
     */
    data: XOR<locationsUpdateInput, locationsUncheckedUpdateInput>
    /**
     * Choose, which locations to update.
     */
    where: locationsWhereUniqueInput
  }


  /**
   * locations updateMany
   */
  export type locationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update locations.
     */
    data: XOR<locationsUpdateManyMutationInput, locationsUncheckedUpdateManyInput>
    /**
     * Filter which locations to update
     */
    where?: locationsWhereInput
  }


  /**
   * locations upsert
   */
  export type locationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * The filter to search for the locations to update in case it exists.
     */
    where: locationsWhereUniqueInput
    /**
     * In case the locations found by the `where` argument doesn't exist, create a new locations with this data.
     */
    create: XOR<locationsCreateInput, locationsUncheckedCreateInput>
    /**
     * In case the locations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<locationsUpdateInput, locationsUncheckedUpdateInput>
  }


  /**
   * locations delete
   */
  export type locationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
    /**
     * Filter which locations to delete.
     */
    where: locationsWhereUniqueInput
  }


  /**
   * locations deleteMany
   */
  export type locationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which locations to delete
     */
    where?: locationsWhereInput
  }


  /**
   * locations.assets
   */
  export type locations$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * locations without action
   */
  export type locationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the locations
     */
    select?: locationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: locationsInclude<ExtArgs> | null
  }



  /**
   * Model log_crud
   */

  export type AggregateLog_crud = {
    _count: Log_crudCountAggregateOutputType | null
    _avg: Log_crudAvgAggregateOutputType | null
    _sum: Log_crudSumAggregateOutputType | null
    _min: Log_crudMinAggregateOutputType | null
    _max: Log_crudMaxAggregateOutputType | null
  }

  export type Log_crudAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type Log_crudSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
  }

  export type Log_crudMinAggregateOutputType = {
    id: bigint | null
    table_name: string | null
    sap_id: string | null
    operation: string | null
    old_data: string | null
    new_data: string | null
    user_id: bigint | null
    created_at: Date | null
  }

  export type Log_crudMaxAggregateOutputType = {
    id: bigint | null
    table_name: string | null
    sap_id: string | null
    operation: string | null
    old_data: string | null
    new_data: string | null
    user_id: bigint | null
    created_at: Date | null
  }

  export type Log_crudCountAggregateOutputType = {
    id: number
    table_name: number
    sap_id: number
    operation: number
    old_data: number
    new_data: number
    user_id: number
    created_at: number
    _all: number
  }


  export type Log_crudAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type Log_crudSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type Log_crudMinAggregateInputType = {
    id?: true
    table_name?: true
    sap_id?: true
    operation?: true
    old_data?: true
    new_data?: true
    user_id?: true
    created_at?: true
  }

  export type Log_crudMaxAggregateInputType = {
    id?: true
    table_name?: true
    sap_id?: true
    operation?: true
    old_data?: true
    new_data?: true
    user_id?: true
    created_at?: true
  }

  export type Log_crudCountAggregateInputType = {
    id?: true
    table_name?: true
    sap_id?: true
    operation?: true
    old_data?: true
    new_data?: true
    user_id?: true
    created_at?: true
    _all?: true
  }

  export type Log_crudAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which log_crud to aggregate.
     */
    where?: log_crudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of log_cruds to fetch.
     */
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: log_crudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` log_cruds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` log_cruds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned log_cruds
    **/
    _count?: true | Log_crudCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Log_crudAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Log_crudSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Log_crudMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Log_crudMaxAggregateInputType
  }

  export type GetLog_crudAggregateType<T extends Log_crudAggregateArgs> = {
        [P in keyof T & keyof AggregateLog_crud]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog_crud[P]>
      : GetScalarType<T[P], AggregateLog_crud[P]>
  }




  export type log_crudGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: log_crudWhereInput
    orderBy?: log_crudOrderByWithAggregationInput | log_crudOrderByWithAggregationInput[]
    by: Log_crudScalarFieldEnum[] | Log_crudScalarFieldEnum
    having?: log_crudScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Log_crudCountAggregateInputType | true
    _avg?: Log_crudAvgAggregateInputType
    _sum?: Log_crudSumAggregateInputType
    _min?: Log_crudMinAggregateInputType
    _max?: Log_crudMaxAggregateInputType
  }

  export type Log_crudGroupByOutputType = {
    id: bigint
    table_name: string
    sap_id: string | null
    operation: string
    old_data: string | null
    new_data: string | null
    user_id: bigint | null
    created_at: Date
    _count: Log_crudCountAggregateOutputType | null
    _avg: Log_crudAvgAggregateOutputType | null
    _sum: Log_crudSumAggregateOutputType | null
    _min: Log_crudMinAggregateOutputType | null
    _max: Log_crudMaxAggregateOutputType | null
  }

  type GetLog_crudGroupByPayload<T extends log_crudGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Log_crudGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Log_crudGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Log_crudGroupByOutputType[P]>
            : GetScalarType<T[P], Log_crudGroupByOutputType[P]>
        }
      >
    >


  export type log_crudSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    table_name?: boolean
    sap_id?: boolean
    operation?: boolean
    old_data?: boolean
    new_data?: boolean
    user_id?: boolean
    created_at?: boolean
    user?: boolean | log_crud$userArgs<ExtArgs>
    assets?: boolean | log_crud$assetsArgs<ExtArgs>
    _count?: boolean | Log_crudCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["log_crud"]>

  export type log_crudSelectScalar = {
    id?: boolean
    table_name?: boolean
    sap_id?: boolean
    operation?: boolean
    old_data?: boolean
    new_data?: boolean
    user_id?: boolean
    created_at?: boolean
  }

  export type log_crudInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | log_crud$userArgs<ExtArgs>
    assets?: boolean | log_crud$assetsArgs<ExtArgs>
    _count?: boolean | Log_crudCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $log_crudPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "log_crud"
    objects: {
      user: Prisma.$usersPayload<ExtArgs> | null
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      table_name: string
      sap_id: string | null
      operation: string
      old_data: string | null
      new_data: string | null
      user_id: bigint | null
      created_at: Date
    }, ExtArgs["result"]["log_crud"]>
    composites: {}
  }


  type log_crudGetPayload<S extends boolean | null | undefined | log_crudDefaultArgs> = $Result.GetResult<Prisma.$log_crudPayload, S>

  type log_crudCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<log_crudFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Log_crudCountAggregateInputType | true
    }

  export interface log_crudDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['log_crud'], meta: { name: 'log_crud' } }
    /**
     * Find zero or one Log_crud that matches the filter.
     * @param {log_crudFindUniqueArgs} args - Arguments to find a Log_crud
     * @example
     * // Get one Log_crud
     * const log_crud = await prisma.log_crud.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends log_crudFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudFindUniqueArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Log_crud that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {log_crudFindUniqueOrThrowArgs} args - Arguments to find a Log_crud
     * @example
     * // Get one Log_crud
     * const log_crud = await prisma.log_crud.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends log_crudFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Log_crud that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudFindFirstArgs} args - Arguments to find a Log_crud
     * @example
     * // Get one Log_crud
     * const log_crud = await prisma.log_crud.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends log_crudFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudFindFirstArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Log_crud that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudFindFirstOrThrowArgs} args - Arguments to find a Log_crud
     * @example
     * // Get one Log_crud
     * const log_crud = await prisma.log_crud.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends log_crudFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Log_cruds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Log_cruds
     * const log_cruds = await prisma.log_crud.findMany()
     * 
     * // Get first 10 Log_cruds
     * const log_cruds = await prisma.log_crud.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const log_crudWithIdOnly = await prisma.log_crud.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends log_crudFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Log_crud.
     * @param {log_crudCreateArgs} args - Arguments to create a Log_crud.
     * @example
     * // Create one Log_crud
     * const Log_crud = await prisma.log_crud.create({
     *   data: {
     *     // ... data to create a Log_crud
     *   }
     * })
     * 
    **/
    create<T extends log_crudCreateArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudCreateArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Log_cruds.
     *     @param {log_crudCreateManyArgs} args - Arguments to create many Log_cruds.
     *     @example
     *     // Create many Log_cruds
     *     const log_crud = await prisma.log_crud.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends log_crudCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Log_crud.
     * @param {log_crudDeleteArgs} args - Arguments to delete one Log_crud.
     * @example
     * // Delete one Log_crud
     * const Log_crud = await prisma.log_crud.delete({
     *   where: {
     *     // ... filter to delete one Log_crud
     *   }
     * })
     * 
    **/
    delete<T extends log_crudDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudDeleteArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Log_crud.
     * @param {log_crudUpdateArgs} args - Arguments to update one Log_crud.
     * @example
     * // Update one Log_crud
     * const log_crud = await prisma.log_crud.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends log_crudUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudUpdateArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Log_cruds.
     * @param {log_crudDeleteManyArgs} args - Arguments to filter Log_cruds to delete.
     * @example
     * // Delete a few Log_cruds
     * const { count } = await prisma.log_crud.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends log_crudDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, log_crudDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Log_cruds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Log_cruds
     * const log_crud = await prisma.log_crud.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends log_crudUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Log_crud.
     * @param {log_crudUpsertArgs} args - Arguments to update or create a Log_crud.
     * @example
     * // Update or create a Log_crud
     * const log_crud = await prisma.log_crud.upsert({
     *   create: {
     *     // ... data to create a Log_crud
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log_crud we want to update
     *   }
     * })
    **/
    upsert<T extends log_crudUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, log_crudUpsertArgs<ExtArgs>>
    ): Prisma__log_crudClient<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Log_cruds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudCountArgs} args - Arguments to filter Log_cruds to count.
     * @example
     * // Count the number of Log_cruds
     * const count = await prisma.log_crud.count({
     *   where: {
     *     // ... the filter for the Log_cruds we want to count
     *   }
     * })
    **/
    count<T extends log_crudCountArgs>(
      args?: Subset<T, log_crudCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Log_crudCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Log_crud.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Log_crudAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Log_crudAggregateArgs>(args: Subset<T, Log_crudAggregateArgs>): Prisma.PrismaPromise<GetLog_crudAggregateType<T>>

    /**
     * Group by Log_crud.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {log_crudGroupByArgs} args - Group by arguments.
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
      T extends log_crudGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: log_crudGroupByArgs['orderBy'] }
        : { orderBy?: log_crudGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, log_crudGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLog_crudGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the log_crud model
   */
  readonly fields: log_crudFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for log_crud.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__log_crudClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends log_crud$userArgs<ExtArgs> = {}>(args?: Subset<T, log_crud$userArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    assets<T extends log_crud$assetsArgs<ExtArgs> = {}>(args?: Subset<T, log_crud$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the log_crud model
   */ 
  interface log_crudFieldRefs {
    readonly id: FieldRef<"log_crud", 'BigInt'>
    readonly table_name: FieldRef<"log_crud", 'String'>
    readonly sap_id: FieldRef<"log_crud", 'String'>
    readonly operation: FieldRef<"log_crud", 'String'>
    readonly old_data: FieldRef<"log_crud", 'String'>
    readonly new_data: FieldRef<"log_crud", 'String'>
    readonly user_id: FieldRef<"log_crud", 'BigInt'>
    readonly created_at: FieldRef<"log_crud", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * log_crud findUnique
   */
  export type log_crudFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter, which log_crud to fetch.
     */
    where: log_crudWhereUniqueInput
  }


  /**
   * log_crud findUniqueOrThrow
   */
  export type log_crudFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter, which log_crud to fetch.
     */
    where: log_crudWhereUniqueInput
  }


  /**
   * log_crud findFirst
   */
  export type log_crudFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter, which log_crud to fetch.
     */
    where?: log_crudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of log_cruds to fetch.
     */
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for log_cruds.
     */
    cursor?: log_crudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` log_cruds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` log_cruds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of log_cruds.
     */
    distinct?: Log_crudScalarFieldEnum | Log_crudScalarFieldEnum[]
  }


  /**
   * log_crud findFirstOrThrow
   */
  export type log_crudFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter, which log_crud to fetch.
     */
    where?: log_crudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of log_cruds to fetch.
     */
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for log_cruds.
     */
    cursor?: log_crudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` log_cruds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` log_cruds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of log_cruds.
     */
    distinct?: Log_crudScalarFieldEnum | Log_crudScalarFieldEnum[]
  }


  /**
   * log_crud findMany
   */
  export type log_crudFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter, which log_cruds to fetch.
     */
    where?: log_crudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of log_cruds to fetch.
     */
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing log_cruds.
     */
    cursor?: log_crudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` log_cruds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` log_cruds.
     */
    skip?: number
    distinct?: Log_crudScalarFieldEnum | Log_crudScalarFieldEnum[]
  }


  /**
   * log_crud create
   */
  export type log_crudCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * The data needed to create a log_crud.
     */
    data: XOR<log_crudCreateInput, log_crudUncheckedCreateInput>
  }


  /**
   * log_crud createMany
   */
  export type log_crudCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many log_cruds.
     */
    data: log_crudCreateManyInput | log_crudCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * log_crud update
   */
  export type log_crudUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * The data needed to update a log_crud.
     */
    data: XOR<log_crudUpdateInput, log_crudUncheckedUpdateInput>
    /**
     * Choose, which log_crud to update.
     */
    where: log_crudWhereUniqueInput
  }


  /**
   * log_crud updateMany
   */
  export type log_crudUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update log_cruds.
     */
    data: XOR<log_crudUpdateManyMutationInput, log_crudUncheckedUpdateManyInput>
    /**
     * Filter which log_cruds to update
     */
    where?: log_crudWhereInput
  }


  /**
   * log_crud upsert
   */
  export type log_crudUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * The filter to search for the log_crud to update in case it exists.
     */
    where: log_crudWhereUniqueInput
    /**
     * In case the log_crud found by the `where` argument doesn't exist, create a new log_crud with this data.
     */
    create: XOR<log_crudCreateInput, log_crudUncheckedCreateInput>
    /**
     * In case the log_crud was found with the provided `where` argument, update it with this data.
     */
    update: XOR<log_crudUpdateInput, log_crudUncheckedUpdateInput>
  }


  /**
   * log_crud delete
   */
  export type log_crudDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    /**
     * Filter which log_crud to delete.
     */
    where: log_crudWhereUniqueInput
  }


  /**
   * log_crud deleteMany
   */
  export type log_crudDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which log_cruds to delete
     */
    where?: log_crudWhereInput
  }


  /**
   * log_crud.user
   */
  export type log_crud$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }


  /**
   * log_crud.assets
   */
  export type log_crud$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * log_crud without action
   */
  export type log_crudDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
  }



  /**
   * Model suppliers
   */

  export type AggregateSuppliers = {
    _count: SuppliersCountAggregateOutputType | null
    _avg: SuppliersAvgAggregateOutputType | null
    _sum: SuppliersSumAggregateOutputType | null
    _min: SuppliersMinAggregateOutputType | null
    _max: SuppliersMaxAggregateOutputType | null
  }

  export type SuppliersAvgAggregateOutputType = {
    id: number | null
  }

  export type SuppliersSumAggregateOutputType = {
    id: bigint | null
  }

  export type SuppliersMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    contact_person: string | null
    phone: string | null
    email: string | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuppliersMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    contact_person: string | null
    phone: string | null
    email: string | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuppliersCountAggregateOutputType = {
    id: number
    name: number
    contact_person: number
    phone: number
    email: number
    address: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SuppliersAvgAggregateInputType = {
    id?: true
  }

  export type SuppliersSumAggregateInputType = {
    id?: true
  }

  export type SuppliersMinAggregateInputType = {
    id?: true
    name?: true
    contact_person?: true
    phone?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type SuppliersMaxAggregateInputType = {
    id?: true
    name?: true
    contact_person?: true
    phone?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type SuppliersCountAggregateInputType = {
    id?: true
    name?: true
    contact_person?: true
    phone?: true
    email?: true
    address?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SuppliersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which suppliers to aggregate.
     */
    where?: suppliersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of suppliers to fetch.
     */
    orderBy?: suppliersOrderByWithRelationInput | suppliersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: suppliersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned suppliers
    **/
    _count?: true | SuppliersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SuppliersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SuppliersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuppliersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuppliersMaxAggregateInputType
  }

  export type GetSuppliersAggregateType<T extends SuppliersAggregateArgs> = {
        [P in keyof T & keyof AggregateSuppliers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuppliers[P]>
      : GetScalarType<T[P], AggregateSuppliers[P]>
  }




  export type suppliersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: suppliersWhereInput
    orderBy?: suppliersOrderByWithAggregationInput | suppliersOrderByWithAggregationInput[]
    by: SuppliersScalarFieldEnum[] | SuppliersScalarFieldEnum
    having?: suppliersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuppliersCountAggregateInputType | true
    _avg?: SuppliersAvgAggregateInputType
    _sum?: SuppliersSumAggregateInputType
    _min?: SuppliersMinAggregateInputType
    _max?: SuppliersMaxAggregateInputType
  }

  export type SuppliersGroupByOutputType = {
    id: bigint
    name: string
    contact_person: string | null
    phone: string | null
    email: string | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: SuppliersCountAggregateOutputType | null
    _avg: SuppliersAvgAggregateOutputType | null
    _sum: SuppliersSumAggregateOutputType | null
    _min: SuppliersMinAggregateOutputType | null
    _max: SuppliersMaxAggregateOutputType | null
  }

  type GetSuppliersGroupByPayload<T extends suppliersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuppliersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuppliersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuppliersGroupByOutputType[P]>
            : GetScalarType<T[P], SuppliersGroupByOutputType[P]>
        }
      >
    >


  export type suppliersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact_person?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
    assets?: boolean | suppliers$assetsArgs<ExtArgs>
    _count?: boolean | SuppliersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suppliers"]>

  export type suppliersSelectScalar = {
    id?: boolean
    name?: boolean
    contact_person?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type suppliersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | suppliers$assetsArgs<ExtArgs>
    _count?: boolean | SuppliersCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $suppliersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "suppliers"
    objects: {
      assets: Prisma.$assetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      contact_person: string | null
      phone: string | null
      email: string | null
      address: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["suppliers"]>
    composites: {}
  }


  type suppliersGetPayload<S extends boolean | null | undefined | suppliersDefaultArgs> = $Result.GetResult<Prisma.$suppliersPayload, S>

  type suppliersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<suppliersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SuppliersCountAggregateInputType | true
    }

  export interface suppliersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['suppliers'], meta: { name: 'suppliers' } }
    /**
     * Find zero or one Suppliers that matches the filter.
     * @param {suppliersFindUniqueArgs} args - Arguments to find a Suppliers
     * @example
     * // Get one Suppliers
     * const suppliers = await prisma.suppliers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends suppliersFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersFindUniqueArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Suppliers that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {suppliersFindUniqueOrThrowArgs} args - Arguments to find a Suppliers
     * @example
     * // Get one Suppliers
     * const suppliers = await prisma.suppliers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends suppliersFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersFindFirstArgs} args - Arguments to find a Suppliers
     * @example
     * // Get one Suppliers
     * const suppliers = await prisma.suppliers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends suppliersFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersFindFirstArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Suppliers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersFindFirstOrThrowArgs} args - Arguments to find a Suppliers
     * @example
     * // Get one Suppliers
     * const suppliers = await prisma.suppliers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends suppliersFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.suppliers.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.suppliers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suppliersWithIdOnly = await prisma.suppliers.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends suppliersFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Suppliers.
     * @param {suppliersCreateArgs} args - Arguments to create a Suppliers.
     * @example
     * // Create one Suppliers
     * const Suppliers = await prisma.suppliers.create({
     *   data: {
     *     // ... data to create a Suppliers
     *   }
     * })
     * 
    **/
    create<T extends suppliersCreateArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersCreateArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Suppliers.
     *     @param {suppliersCreateManyArgs} args - Arguments to create many Suppliers.
     *     @example
     *     // Create many Suppliers
     *     const suppliers = await prisma.suppliers.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends suppliersCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Suppliers.
     * @param {suppliersDeleteArgs} args - Arguments to delete one Suppliers.
     * @example
     * // Delete one Suppliers
     * const Suppliers = await prisma.suppliers.delete({
     *   where: {
     *     // ... filter to delete one Suppliers
     *   }
     * })
     * 
    **/
    delete<T extends suppliersDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersDeleteArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Suppliers.
     * @param {suppliersUpdateArgs} args - Arguments to update one Suppliers.
     * @example
     * // Update one Suppliers
     * const suppliers = await prisma.suppliers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends suppliersUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersUpdateArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Suppliers.
     * @param {suppliersDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.suppliers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends suppliersDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, suppliersDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const suppliers = await prisma.suppliers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends suppliersUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Suppliers.
     * @param {suppliersUpsertArgs} args - Arguments to update or create a Suppliers.
     * @example
     * // Update or create a Suppliers
     * const suppliers = await prisma.suppliers.upsert({
     *   create: {
     *     // ... data to create a Suppliers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suppliers we want to update
     *   }
     * })
    **/
    upsert<T extends suppliersUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, suppliersUpsertArgs<ExtArgs>>
    ): Prisma__suppliersClient<$Result.GetResult<Prisma.$suppliersPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.suppliers.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends suppliersCountArgs>(
      args?: Subset<T, suppliersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuppliersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuppliersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SuppliersAggregateArgs>(args: Subset<T, SuppliersAggregateArgs>): Prisma.PrismaPromise<GetSuppliersAggregateType<T>>

    /**
     * Group by Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {suppliersGroupByArgs} args - Group by arguments.
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
      T extends suppliersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: suppliersGroupByArgs['orderBy'] }
        : { orderBy?: suppliersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, suppliersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuppliersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the suppliers model
   */
  readonly fields: suppliersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for suppliers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__suppliersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    assets<T extends suppliers$assetsArgs<ExtArgs> = {}>(args?: Subset<T, suppliers$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the suppliers model
   */ 
  interface suppliersFieldRefs {
    readonly id: FieldRef<"suppliers", 'BigInt'>
    readonly name: FieldRef<"suppliers", 'String'>
    readonly contact_person: FieldRef<"suppliers", 'String'>
    readonly phone: FieldRef<"suppliers", 'String'>
    readonly email: FieldRef<"suppliers", 'String'>
    readonly address: FieldRef<"suppliers", 'String'>
    readonly created_at: FieldRef<"suppliers", 'DateTime'>
    readonly updated_at: FieldRef<"suppliers", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * suppliers findUnique
   */
  export type suppliersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter, which suppliers to fetch.
     */
    where: suppliersWhereUniqueInput
  }


  /**
   * suppliers findUniqueOrThrow
   */
  export type suppliersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter, which suppliers to fetch.
     */
    where: suppliersWhereUniqueInput
  }


  /**
   * suppliers findFirst
   */
  export type suppliersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter, which suppliers to fetch.
     */
    where?: suppliersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of suppliers to fetch.
     */
    orderBy?: suppliersOrderByWithRelationInput | suppliersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for suppliers.
     */
    cursor?: suppliersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of suppliers.
     */
    distinct?: SuppliersScalarFieldEnum | SuppliersScalarFieldEnum[]
  }


  /**
   * suppliers findFirstOrThrow
   */
  export type suppliersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter, which suppliers to fetch.
     */
    where?: suppliersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of suppliers to fetch.
     */
    orderBy?: suppliersOrderByWithRelationInput | suppliersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for suppliers.
     */
    cursor?: suppliersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of suppliers.
     */
    distinct?: SuppliersScalarFieldEnum | SuppliersScalarFieldEnum[]
  }


  /**
   * suppliers findMany
   */
  export type suppliersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter, which suppliers to fetch.
     */
    where?: suppliersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of suppliers to fetch.
     */
    orderBy?: suppliersOrderByWithRelationInput | suppliersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing suppliers.
     */
    cursor?: suppliersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` suppliers.
     */
    skip?: number
    distinct?: SuppliersScalarFieldEnum | SuppliersScalarFieldEnum[]
  }


  /**
   * suppliers create
   */
  export type suppliersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * The data needed to create a suppliers.
     */
    data: XOR<suppliersCreateInput, suppliersUncheckedCreateInput>
  }


  /**
   * suppliers createMany
   */
  export type suppliersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many suppliers.
     */
    data: suppliersCreateManyInput | suppliersCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * suppliers update
   */
  export type suppliersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * The data needed to update a suppliers.
     */
    data: XOR<suppliersUpdateInput, suppliersUncheckedUpdateInput>
    /**
     * Choose, which suppliers to update.
     */
    where: suppliersWhereUniqueInput
  }


  /**
   * suppliers updateMany
   */
  export type suppliersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update suppliers.
     */
    data: XOR<suppliersUpdateManyMutationInput, suppliersUncheckedUpdateManyInput>
    /**
     * Filter which suppliers to update
     */
    where?: suppliersWhereInput
  }


  /**
   * suppliers upsert
   */
  export type suppliersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * The filter to search for the suppliers to update in case it exists.
     */
    where: suppliersWhereUniqueInput
    /**
     * In case the suppliers found by the `where` argument doesn't exist, create a new suppliers with this data.
     */
    create: XOR<suppliersCreateInput, suppliersUncheckedCreateInput>
    /**
     * In case the suppliers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<suppliersUpdateInput, suppliersUncheckedUpdateInput>
  }


  /**
   * suppliers delete
   */
  export type suppliersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
    /**
     * Filter which suppliers to delete.
     */
    where: suppliersWhereUniqueInput
  }


  /**
   * suppliers deleteMany
   */
  export type suppliersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which suppliers to delete
     */
    where?: suppliersWhereInput
  }


  /**
   * suppliers.assets
   */
  export type suppliers$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }


  /**
   * suppliers without action
   */
  export type suppliersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the suppliers
     */
    select?: suppliersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: suppliersInclude<ExtArgs> | null
  }



  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: bigint | null
  }

  export type UsersMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    email: string | null
    email_verified_at: Date | null
    password: string | null
    remember_token: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    email: string | null
    email_verified_at: Date | null
    password: string | null
    remember_token: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    email_verified_at: number
    password: number
    remember_token: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    email_verified_at?: true
    password?: true
    remember_token?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    email_verified_at?: true
    password?: true
    remember_token?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    email_verified_at?: true
    password?: true
    remember_token?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: bigint
    name: string
    email: string
    email_verified_at: Date | null
    password: string
    remember_token: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    email_verified_at?: boolean
    password?: boolean
    remember_token?: boolean
    created_at?: boolean
    updated_at?: boolean
    log_cruds?: boolean | users$log_crudsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    email_verified_at?: boolean
    password?: boolean
    remember_token?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    log_cruds?: boolean | users$log_crudsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      log_cruds: Prisma.$log_crudPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      email: string
      email_verified_at: Date | null
      password: string
      remember_token: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }


  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends usersFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends usersFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends usersFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
    **/
    create<T extends usersCreateArgs<ExtArgs>>(
      args: SelectSubset<T, usersCreateArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {usersCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const users = await prisma.users.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends usersCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
    **/
    delete<T extends usersDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, usersDeleteArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends usersUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpdateArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends usersDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends usersUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
    **/
    upsert<T extends usersUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpsertArgs<ExtArgs>>
    ): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    log_cruds<T extends users$log_crudsArgs<ExtArgs> = {}>(args?: Subset<T, users$log_crudsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$log_crudPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the users model
   */ 
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'BigInt'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly email_verified_at: FieldRef<"users", 'DateTime'>
    readonly password: FieldRef<"users", 'String'>
    readonly remember_token: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }


  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
  }


  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }


  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
  }


  /**
   * users.log_cruds
   */
  export type users$log_crudsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the log_crud
     */
    select?: log_crudSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: log_crudInclude<ExtArgs> | null
    where?: log_crudWhereInput
    orderBy?: log_crudOrderByWithRelationInput | log_crudOrderByWithRelationInput[]
    cursor?: log_crudWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Log_crudScalarFieldEnum | Log_crudScalarFieldEnum[]
  }


  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
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


  export const AreasScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AreasScalarFieldEnum = (typeof AreasScalarFieldEnum)[keyof typeof AreasScalarFieldEnum]


  export const Asset_transactionsScalarFieldEnum: {
    id: 'id',
    asset_id: 'asset_id',
    transaction_type: 'transaction_type',
    previous_holder_id: 'previous_holder_id',
    new_holder_id: 'new_holder_id',
    previous_location: 'previous_location',
    new_location: 'new_location',
    previous_condition: 'previous_condition',
    new_condition: 'new_condition',
    remarks: 'remarks',
    transaction_date: 'transaction_date',
    created_by: 'created_by',
    creator_name: 'creator_name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Asset_transactionsScalarFieldEnum = (typeof Asset_transactionsScalarFieldEnum)[keyof typeof Asset_transactionsScalarFieldEnum]


  export const AssetsScalarFieldEnum: {
    id: 'id',
    type_id: 'type_id',
    serial_number: 'serial_number',
    sap_id: 'sap_id',
    purchase_date: 'purchase_date',
    created_at: 'created_at',
    updated_at: 'updated_at',
    category_id: 'category_id',
    brand_id: 'brand_id',
    area_id: 'area_id',
    location_id: 'location_id',
    employee_id: 'employee_id',
    supplier_id: 'supplier_id',
    image_id: 'image_id',
    condition: 'condition'
  };

  export type AssetsScalarFieldEnum = (typeof AssetsScalarFieldEnum)[keyof typeof AssetsScalarFieldEnum]


  export const Activity_logScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    details: 'details',
    user_id: 'user_id',
    user_name: 'user_name',
    ip_address: 'ip_address',
    created_at: 'created_at'
  };

  export type Activity_logScalarFieldEnum = (typeof Activity_logScalarFieldEnum)[keyof typeof Activity_logScalarFieldEnum]


  export const Asset_typesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Asset_typesScalarFieldEnum = (typeof Asset_typesScalarFieldEnum)[keyof typeof Asset_typesScalarFieldEnum]


  export const Asset_imagesScalarFieldEnum: {
    id: 'id',
    asset_id: 'asset_id',
    name: 'name',
    url: 'url',
    created_at: 'created_at'
  };

  export type Asset_imagesScalarFieldEnum = (typeof Asset_imagesScalarFieldEnum)[keyof typeof Asset_imagesScalarFieldEnum]


  export const BrandsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BrandsScalarFieldEnum = (typeof BrandsScalarFieldEnum)[keyof typeof BrandsScalarFieldEnum]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const DepartmentsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DepartmentsScalarFieldEnum = (typeof DepartmentsScalarFieldEnum)[keyof typeof DepartmentsScalarFieldEnum]


  export const EmployeesScalarFieldEnum: {
    id: 'id',
    nik: 'nik',
    nama: 'nama',
    gender: 'gender',
    created_at: 'created_at',
    updated_at: 'updated_at',
    department_id: 'department_id'
  };

  export type EmployeesScalarFieldEnum = (typeof EmployeesScalarFieldEnum)[keyof typeof EmployeesScalarFieldEnum]


  export const LocationsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    area_id: 'area_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LocationsScalarFieldEnum = (typeof LocationsScalarFieldEnum)[keyof typeof LocationsScalarFieldEnum]


  export const Log_crudScalarFieldEnum: {
    id: 'id',
    table_name: 'table_name',
    sap_id: 'sap_id',
    operation: 'operation',
    old_data: 'old_data',
    new_data: 'new_data',
    user_id: 'user_id',
    created_at: 'created_at'
  };

  export type Log_crudScalarFieldEnum = (typeof Log_crudScalarFieldEnum)[keyof typeof Log_crudScalarFieldEnum]


  export const SuppliersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contact_person: 'contact_person',
    phone: 'phone',
    email: 'email',
    address: 'address',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SuppliersScalarFieldEnum = (typeof SuppliersScalarFieldEnum)[keyof typeof SuppliersScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    email_verified_at: 'email_verified_at',
    password: 'password',
    remember_token: 'remember_token',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'AssetCondition'
   */
  export type EnumAssetConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetCondition'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type areasWhereInput = {
    AND?: areasWhereInput | areasWhereInput[]
    OR?: areasWhereInput[]
    NOT?: areasWhereInput | areasWhereInput[]
    id?: BigIntFilter<"areas"> | bigint | number
    name?: StringFilter<"areas"> | string
    created_at?: DateTimeNullableFilter<"areas"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"areas"> | Date | string | null
    locations?: LocationsListRelationFilter
    assets?: AssetsListRelationFilter
  }

  export type areasOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    locations?: locationsOrderByRelationAggregateInput
    assets?: assetsOrderByRelationAggregateInput
  }

  export type areasWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: areasWhereInput | areasWhereInput[]
    OR?: areasWhereInput[]
    NOT?: areasWhereInput | areasWhereInput[]
    created_at?: DateTimeNullableFilter<"areas"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"areas"> | Date | string | null
    locations?: LocationsListRelationFilter
    assets?: AssetsListRelationFilter
  }, "id" | "name">

  export type areasOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: areasCountOrderByAggregateInput
    _avg?: areasAvgOrderByAggregateInput
    _max?: areasMaxOrderByAggregateInput
    _min?: areasMinOrderByAggregateInput
    _sum?: areasSumOrderByAggregateInput
  }

  export type areasScalarWhereWithAggregatesInput = {
    AND?: areasScalarWhereWithAggregatesInput | areasScalarWhereWithAggregatesInput[]
    OR?: areasScalarWhereWithAggregatesInput[]
    NOT?: areasScalarWhereWithAggregatesInput | areasScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"areas"> | bigint | number
    name?: StringWithAggregatesFilter<"areas"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"areas"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"areas"> | Date | string | null
  }

  export type asset_transactionsWhereInput = {
    AND?: asset_transactionsWhereInput | asset_transactionsWhereInput[]
    OR?: asset_transactionsWhereInput[]
    NOT?: asset_transactionsWhereInput | asset_transactionsWhereInput[]
    id?: BigIntFilter<"asset_transactions"> | bigint | number
    asset_id?: BigIntFilter<"asset_transactions"> | bigint | number
    transaction_type?: StringFilter<"asset_transactions"> | string
    previous_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    new_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    previous_location?: StringNullableFilter<"asset_transactions"> | string | null
    new_location?: StringNullableFilter<"asset_transactions"> | string | null
    previous_condition?: StringNullableFilter<"asset_transactions"> | string | null
    new_condition?: StringNullableFilter<"asset_transactions"> | string | null
    remarks?: StringNullableFilter<"asset_transactions"> | string | null
    transaction_date?: DateTimeFilter<"asset_transactions"> | Date | string
    created_by?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    creator_name?: StringNullableFilter<"asset_transactions"> | string | null
    created_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
    asset?: XOR<AssetsRelationFilter, assetsWhereInput>
    previous_holder?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
    new_holder?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
  }

  export type asset_transactionsOrderByWithRelationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    transaction_type?: SortOrder
    previous_holder_id?: SortOrderInput | SortOrder
    new_holder_id?: SortOrderInput | SortOrder
    previous_location?: SortOrderInput | SortOrder
    new_location?: SortOrderInput | SortOrder
    previous_condition?: SortOrderInput | SortOrder
    new_condition?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    transaction_date?: SortOrder
    created_by?: SortOrderInput | SortOrder
    creator_name?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    asset?: assetsOrderByWithRelationInput
    previous_holder?: employeesOrderByWithRelationInput
    new_holder?: employeesOrderByWithRelationInput
  }

  export type asset_transactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: asset_transactionsWhereInput | asset_transactionsWhereInput[]
    OR?: asset_transactionsWhereInput[]
    NOT?: asset_transactionsWhereInput | asset_transactionsWhereInput[]
    asset_id?: BigIntFilter<"asset_transactions"> | bigint | number
    transaction_type?: StringFilter<"asset_transactions"> | string
    previous_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    new_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    previous_location?: StringNullableFilter<"asset_transactions"> | string | null
    new_location?: StringNullableFilter<"asset_transactions"> | string | null
    previous_condition?: StringNullableFilter<"asset_transactions"> | string | null
    new_condition?: StringNullableFilter<"asset_transactions"> | string | null
    remarks?: StringNullableFilter<"asset_transactions"> | string | null
    transaction_date?: DateTimeFilter<"asset_transactions"> | Date | string
    created_by?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    creator_name?: StringNullableFilter<"asset_transactions"> | string | null
    created_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
    asset?: XOR<AssetsRelationFilter, assetsWhereInput>
    previous_holder?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
    new_holder?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
  }, "id">

  export type asset_transactionsOrderByWithAggregationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    transaction_type?: SortOrder
    previous_holder_id?: SortOrderInput | SortOrder
    new_holder_id?: SortOrderInput | SortOrder
    previous_location?: SortOrderInput | SortOrder
    new_location?: SortOrderInput | SortOrder
    previous_condition?: SortOrderInput | SortOrder
    new_condition?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    transaction_date?: SortOrder
    created_by?: SortOrderInput | SortOrder
    creator_name?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: asset_transactionsCountOrderByAggregateInput
    _avg?: asset_transactionsAvgOrderByAggregateInput
    _max?: asset_transactionsMaxOrderByAggregateInput
    _min?: asset_transactionsMinOrderByAggregateInput
    _sum?: asset_transactionsSumOrderByAggregateInput
  }

  export type asset_transactionsScalarWhereWithAggregatesInput = {
    AND?: asset_transactionsScalarWhereWithAggregatesInput | asset_transactionsScalarWhereWithAggregatesInput[]
    OR?: asset_transactionsScalarWhereWithAggregatesInput[]
    NOT?: asset_transactionsScalarWhereWithAggregatesInput | asset_transactionsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"asset_transactions"> | bigint | number
    asset_id?: BigIntWithAggregatesFilter<"asset_transactions"> | bigint | number
    transaction_type?: StringWithAggregatesFilter<"asset_transactions"> | string
    previous_holder_id?: BigIntNullableWithAggregatesFilter<"asset_transactions"> | bigint | number | null
    new_holder_id?: BigIntNullableWithAggregatesFilter<"asset_transactions"> | bigint | number | null
    previous_location?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    new_location?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    previous_condition?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    new_condition?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    transaction_date?: DateTimeWithAggregatesFilter<"asset_transactions"> | Date | string
    created_by?: BigIntNullableWithAggregatesFilter<"asset_transactions"> | bigint | number | null
    creator_name?: StringNullableWithAggregatesFilter<"asset_transactions"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"asset_transactions"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"asset_transactions"> | Date | string | null
  }

  export type assetsWhereInput = {
    AND?: assetsWhereInput | assetsWhereInput[]
    OR?: assetsWhereInput[]
    NOT?: assetsWhereInput | assetsWhereInput[]
    id?: BigIntFilter<"assets"> | bigint | number
    type_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    serial_number?: StringFilter<"assets"> | string
    sap_id?: StringNullableFilter<"assets"> | string | null
    purchase_date?: DateTimeNullableFilter<"assets"> | Date | string | null
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    category_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    brand_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    area_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    location_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    employee_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    supplier_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    image_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    condition?: EnumAssetConditionFilter<"assets"> | $Enums.AssetCondition
    asset_type?: XOR<Asset_typesNullableRelationFilter, asset_typesWhereInput> | null
    category?: XOR<CategoriesNullableRelationFilter, categoriesWhereInput> | null
    brand?: XOR<BrandsNullableRelationFilter, brandsWhereInput> | null
    area?: XOR<AreasNullableRelationFilter, areasWhereInput> | null
    location?: XOR<LocationsNullableRelationFilter, locationsWhereInput> | null
    employee?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
    supplier_rec?: XOR<SuppliersNullableRelationFilter, suppliersWhereInput> | null
    main_image?: XOR<Asset_imagesNullableRelationFilter, asset_imagesWhereInput> | null
    transactions?: Asset_transactionsListRelationFilter
    log_cruds?: Log_crudListRelationFilter
    asset_images?: Asset_imagesListRelationFilter
  }

  export type assetsOrderByWithRelationInput = {
    id?: SortOrder
    type_id?: SortOrderInput | SortOrder
    serial_number?: SortOrder
    sap_id?: SortOrderInput | SortOrder
    purchase_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    brand_id?: SortOrderInput | SortOrder
    area_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    employee_id?: SortOrderInput | SortOrder
    supplier_id?: SortOrderInput | SortOrder
    image_id?: SortOrderInput | SortOrder
    condition?: SortOrder
    asset_type?: asset_typesOrderByWithRelationInput
    category?: categoriesOrderByWithRelationInput
    brand?: brandsOrderByWithRelationInput
    area?: areasOrderByWithRelationInput
    location?: locationsOrderByWithRelationInput
    employee?: employeesOrderByWithRelationInput
    supplier_rec?: suppliersOrderByWithRelationInput
    main_image?: asset_imagesOrderByWithRelationInput
    transactions?: asset_transactionsOrderByRelationAggregateInput
    log_cruds?: log_crudOrderByRelationAggregateInput
    asset_images?: asset_imagesOrderByRelationAggregateInput
  }

  export type assetsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    serial_number?: string
    image_id?: bigint | number
    AND?: assetsWhereInput | assetsWhereInput[]
    OR?: assetsWhereInput[]
    NOT?: assetsWhereInput | assetsWhereInput[]
    type_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    sap_id?: StringNullableFilter<"assets"> | string | null
    purchase_date?: DateTimeNullableFilter<"assets"> | Date | string | null
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    category_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    brand_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    area_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    location_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    employee_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    supplier_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    condition?: EnumAssetConditionFilter<"assets"> | $Enums.AssetCondition
    asset_type?: XOR<Asset_typesNullableRelationFilter, asset_typesWhereInput> | null
    category?: XOR<CategoriesNullableRelationFilter, categoriesWhereInput> | null
    brand?: XOR<BrandsNullableRelationFilter, brandsWhereInput> | null
    area?: XOR<AreasNullableRelationFilter, areasWhereInput> | null
    location?: XOR<LocationsNullableRelationFilter, locationsWhereInput> | null
    employee?: XOR<EmployeesNullableRelationFilter, employeesWhereInput> | null
    supplier_rec?: XOR<SuppliersNullableRelationFilter, suppliersWhereInput> | null
    main_image?: XOR<Asset_imagesNullableRelationFilter, asset_imagesWhereInput> | null
    transactions?: Asset_transactionsListRelationFilter
    log_cruds?: Log_crudListRelationFilter
    asset_images?: Asset_imagesListRelationFilter
  }, "id" | "serial_number" | "image_id">

  export type assetsOrderByWithAggregationInput = {
    id?: SortOrder
    type_id?: SortOrderInput | SortOrder
    serial_number?: SortOrder
    sap_id?: SortOrderInput | SortOrder
    purchase_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    brand_id?: SortOrderInput | SortOrder
    area_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    employee_id?: SortOrderInput | SortOrder
    supplier_id?: SortOrderInput | SortOrder
    image_id?: SortOrderInput | SortOrder
    condition?: SortOrder
    _count?: assetsCountOrderByAggregateInput
    _avg?: assetsAvgOrderByAggregateInput
    _max?: assetsMaxOrderByAggregateInput
    _min?: assetsMinOrderByAggregateInput
    _sum?: assetsSumOrderByAggregateInput
  }

  export type assetsScalarWhereWithAggregatesInput = {
    AND?: assetsScalarWhereWithAggregatesInput | assetsScalarWhereWithAggregatesInput[]
    OR?: assetsScalarWhereWithAggregatesInput[]
    NOT?: assetsScalarWhereWithAggregatesInput | assetsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"assets"> | bigint | number
    type_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    serial_number?: StringWithAggregatesFilter<"assets"> | string
    sap_id?: StringNullableWithAggregatesFilter<"assets"> | string | null
    purchase_date?: DateTimeNullableWithAggregatesFilter<"assets"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"assets"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"assets"> | Date | string | null
    category_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    brand_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    area_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    location_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    employee_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    supplier_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    image_id?: BigIntNullableWithAggregatesFilter<"assets"> | bigint | number | null
    condition?: EnumAssetConditionWithAggregatesFilter<"assets"> | $Enums.AssetCondition
  }

  export type activity_logWhereInput = {
    AND?: activity_logWhereInput | activity_logWhereInput[]
    OR?: activity_logWhereInput[]
    NOT?: activity_logWhereInput | activity_logWhereInput[]
    id?: BigIntFilter<"activity_log"> | bigint | number
    action?: StringFilter<"activity_log"> | string
    entity_type?: StringFilter<"activity_log"> | string
    entity_id?: StringFilter<"activity_log"> | string
    details?: StringNullableFilter<"activity_log"> | string | null
    user_id?: StringNullableFilter<"activity_log"> | string | null
    user_name?: StringNullableFilter<"activity_log"> | string | null
    ip_address?: StringNullableFilter<"activity_log"> | string | null
    created_at?: DateTimeFilter<"activity_log"> | Date | string
  }

  export type activity_logOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    user_name?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type activity_logWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: activity_logWhereInput | activity_logWhereInput[]
    OR?: activity_logWhereInput[]
    NOT?: activity_logWhereInput | activity_logWhereInput[]
    action?: StringFilter<"activity_log"> | string
    entity_type?: StringFilter<"activity_log"> | string
    entity_id?: StringFilter<"activity_log"> | string
    details?: StringNullableFilter<"activity_log"> | string | null
    user_id?: StringNullableFilter<"activity_log"> | string | null
    user_name?: StringNullableFilter<"activity_log"> | string | null
    ip_address?: StringNullableFilter<"activity_log"> | string | null
    created_at?: DateTimeFilter<"activity_log"> | Date | string
  }, "id">

  export type activity_logOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    user_name?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: activity_logCountOrderByAggregateInput
    _avg?: activity_logAvgOrderByAggregateInput
    _max?: activity_logMaxOrderByAggregateInput
    _min?: activity_logMinOrderByAggregateInput
    _sum?: activity_logSumOrderByAggregateInput
  }

  export type activity_logScalarWhereWithAggregatesInput = {
    AND?: activity_logScalarWhereWithAggregatesInput | activity_logScalarWhereWithAggregatesInput[]
    OR?: activity_logScalarWhereWithAggregatesInput[]
    NOT?: activity_logScalarWhereWithAggregatesInput | activity_logScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"activity_log"> | bigint | number
    action?: StringWithAggregatesFilter<"activity_log"> | string
    entity_type?: StringWithAggregatesFilter<"activity_log"> | string
    entity_id?: StringWithAggregatesFilter<"activity_log"> | string
    details?: StringNullableWithAggregatesFilter<"activity_log"> | string | null
    user_id?: StringNullableWithAggregatesFilter<"activity_log"> | string | null
    user_name?: StringNullableWithAggregatesFilter<"activity_log"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"activity_log"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"activity_log"> | Date | string
  }

  export type asset_typesWhereInput = {
    AND?: asset_typesWhereInput | asset_typesWhereInput[]
    OR?: asset_typesWhereInput[]
    NOT?: asset_typesWhereInput | asset_typesWhereInput[]
    id?: BigIntFilter<"asset_types"> | bigint | number
    name?: StringFilter<"asset_types"> | string
    created_at?: DateTimeNullableFilter<"asset_types"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"asset_types"> | Date | string | null
    assets?: AssetsListRelationFilter
  }

  export type asset_typesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    assets?: assetsOrderByRelationAggregateInput
  }

  export type asset_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: asset_typesWhereInput | asset_typesWhereInput[]
    OR?: asset_typesWhereInput[]
    NOT?: asset_typesWhereInput | asset_typesWhereInput[]
    created_at?: DateTimeNullableFilter<"asset_types"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"asset_types"> | Date | string | null
    assets?: AssetsListRelationFilter
  }, "id" | "name">

  export type asset_typesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: asset_typesCountOrderByAggregateInput
    _avg?: asset_typesAvgOrderByAggregateInput
    _max?: asset_typesMaxOrderByAggregateInput
    _min?: asset_typesMinOrderByAggregateInput
    _sum?: asset_typesSumOrderByAggregateInput
  }

  export type asset_typesScalarWhereWithAggregatesInput = {
    AND?: asset_typesScalarWhereWithAggregatesInput | asset_typesScalarWhereWithAggregatesInput[]
    OR?: asset_typesScalarWhereWithAggregatesInput[]
    NOT?: asset_typesScalarWhereWithAggregatesInput | asset_typesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"asset_types"> | bigint | number
    name?: StringWithAggregatesFilter<"asset_types"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"asset_types"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"asset_types"> | Date | string | null
  }

  export type asset_imagesWhereInput = {
    AND?: asset_imagesWhereInput | asset_imagesWhereInput[]
    OR?: asset_imagesWhereInput[]
    NOT?: asset_imagesWhereInput | asset_imagesWhereInput[]
    id?: BigIntFilter<"asset_images"> | bigint | number
    asset_id?: BigIntFilter<"asset_images"> | bigint | number
    name?: StringFilter<"asset_images"> | string
    url?: StringNullableFilter<"asset_images"> | string | null
    created_at?: DateTimeFilter<"asset_images"> | Date | string
    asset?: XOR<AssetsRelationFilter, assetsWhereInput>
    main_for?: XOR<AssetsNullableRelationFilter, assetsWhereInput> | null
  }

  export type asset_imagesOrderByWithRelationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    asset?: assetsOrderByWithRelationInput
    main_for?: assetsOrderByWithRelationInput
  }

  export type asset_imagesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: asset_imagesWhereInput | asset_imagesWhereInput[]
    OR?: asset_imagesWhereInput[]
    NOT?: asset_imagesWhereInput | asset_imagesWhereInput[]
    asset_id?: BigIntFilter<"asset_images"> | bigint | number
    name?: StringFilter<"asset_images"> | string
    url?: StringNullableFilter<"asset_images"> | string | null
    created_at?: DateTimeFilter<"asset_images"> | Date | string
    asset?: XOR<AssetsRelationFilter, assetsWhereInput>
    main_for?: XOR<AssetsNullableRelationFilter, assetsWhereInput> | null
  }, "id">

  export type asset_imagesOrderByWithAggregationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: asset_imagesCountOrderByAggregateInput
    _avg?: asset_imagesAvgOrderByAggregateInput
    _max?: asset_imagesMaxOrderByAggregateInput
    _min?: asset_imagesMinOrderByAggregateInput
    _sum?: asset_imagesSumOrderByAggregateInput
  }

  export type asset_imagesScalarWhereWithAggregatesInput = {
    AND?: asset_imagesScalarWhereWithAggregatesInput | asset_imagesScalarWhereWithAggregatesInput[]
    OR?: asset_imagesScalarWhereWithAggregatesInput[]
    NOT?: asset_imagesScalarWhereWithAggregatesInput | asset_imagesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"asset_images"> | bigint | number
    asset_id?: BigIntWithAggregatesFilter<"asset_images"> | bigint | number
    name?: StringWithAggregatesFilter<"asset_images"> | string
    url?: StringNullableWithAggregatesFilter<"asset_images"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"asset_images"> | Date | string
  }

  export type brandsWhereInput = {
    AND?: brandsWhereInput | brandsWhereInput[]
    OR?: brandsWhereInput[]
    NOT?: brandsWhereInput | brandsWhereInput[]
    id?: BigIntFilter<"brands"> | bigint | number
    name?: StringFilter<"brands"> | string
    created_at?: DateTimeNullableFilter<"brands"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"brands"> | Date | string | null
    assets?: AssetsListRelationFilter
  }

  export type brandsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    assets?: assetsOrderByRelationAggregateInput
  }

  export type brandsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: brandsWhereInput | brandsWhereInput[]
    OR?: brandsWhereInput[]
    NOT?: brandsWhereInput | brandsWhereInput[]
    created_at?: DateTimeNullableFilter<"brands"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"brands"> | Date | string | null
    assets?: AssetsListRelationFilter
  }, "id" | "name">

  export type brandsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: brandsCountOrderByAggregateInput
    _avg?: brandsAvgOrderByAggregateInput
    _max?: brandsMaxOrderByAggregateInput
    _min?: brandsMinOrderByAggregateInput
    _sum?: brandsSumOrderByAggregateInput
  }

  export type brandsScalarWhereWithAggregatesInput = {
    AND?: brandsScalarWhereWithAggregatesInput | brandsScalarWhereWithAggregatesInput[]
    OR?: brandsScalarWhereWithAggregatesInput[]
    NOT?: brandsScalarWhereWithAggregatesInput | brandsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"brands"> | bigint | number
    name?: StringWithAggregatesFilter<"brands"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"brands"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"brands"> | Date | string | null
  }

  export type categoriesWhereInput = {
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    id?: BigIntFilter<"categories"> | bigint | number
    name?: StringFilter<"categories"> | string
    created_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    assets?: AssetsListRelationFilter
  }

  export type categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    assets?: assetsOrderByRelationAggregateInput
  }

  export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    created_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    assets?: AssetsListRelationFilter
  }, "id" | "name">

  export type categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: categoriesCountOrderByAggregateInput
    _avg?: categoriesAvgOrderByAggregateInput
    _max?: categoriesMaxOrderByAggregateInput
    _min?: categoriesMinOrderByAggregateInput
    _sum?: categoriesSumOrderByAggregateInput
  }

  export type categoriesScalarWhereWithAggregatesInput = {
    AND?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    OR?: categoriesScalarWhereWithAggregatesInput[]
    NOT?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"categories"> | bigint | number
    name?: StringWithAggregatesFilter<"categories"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
  }

  export type departmentsWhereInput = {
    AND?: departmentsWhereInput | departmentsWhereInput[]
    OR?: departmentsWhereInput[]
    NOT?: departmentsWhereInput | departmentsWhereInput[]
    id?: BigIntFilter<"departments"> | bigint | number
    name?: StringFilter<"departments"> | string
    created_at?: DateTimeNullableFilter<"departments"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"departments"> | Date | string | null
    employees?: EmployeesListRelationFilter
  }

  export type departmentsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    employees?: employeesOrderByRelationAggregateInput
  }

  export type departmentsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: departmentsWhereInput | departmentsWhereInput[]
    OR?: departmentsWhereInput[]
    NOT?: departmentsWhereInput | departmentsWhereInput[]
    name?: StringFilter<"departments"> | string
    created_at?: DateTimeNullableFilter<"departments"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"departments"> | Date | string | null
    employees?: EmployeesListRelationFilter
  }, "id">

  export type departmentsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: departmentsCountOrderByAggregateInput
    _avg?: departmentsAvgOrderByAggregateInput
    _max?: departmentsMaxOrderByAggregateInput
    _min?: departmentsMinOrderByAggregateInput
    _sum?: departmentsSumOrderByAggregateInput
  }

  export type departmentsScalarWhereWithAggregatesInput = {
    AND?: departmentsScalarWhereWithAggregatesInput | departmentsScalarWhereWithAggregatesInput[]
    OR?: departmentsScalarWhereWithAggregatesInput[]
    NOT?: departmentsScalarWhereWithAggregatesInput | departmentsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"departments"> | bigint | number
    name?: StringWithAggregatesFilter<"departments"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"departments"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"departments"> | Date | string | null
  }

  export type employeesWhereInput = {
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    id?: BigIntFilter<"employees"> | bigint | number
    nik?: StringFilter<"employees"> | string
    nama?: StringFilter<"employees"> | string
    gender?: StringFilter<"employees"> | string
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    department_id?: BigIntNullableFilter<"employees"> | bigint | number | null
    department?: XOR<DepartmentsNullableRelationFilter, departmentsWhereInput> | null
    previous_trans?: Asset_transactionsListRelationFilter
    new_trans?: Asset_transactionsListRelationFilter
    assets?: AssetsListRelationFilter
  }

  export type employeesOrderByWithRelationInput = {
    id?: SortOrder
    nik?: SortOrder
    nama?: SortOrder
    gender?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    department_id?: SortOrderInput | SortOrder
    department?: departmentsOrderByWithRelationInput
    previous_trans?: asset_transactionsOrderByRelationAggregateInput
    new_trans?: asset_transactionsOrderByRelationAggregateInput
    assets?: assetsOrderByRelationAggregateInput
  }

  export type employeesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    nik?: string
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    nama?: StringFilter<"employees"> | string
    gender?: StringFilter<"employees"> | string
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    department_id?: BigIntNullableFilter<"employees"> | bigint | number | null
    department?: XOR<DepartmentsNullableRelationFilter, departmentsWhereInput> | null
    previous_trans?: Asset_transactionsListRelationFilter
    new_trans?: Asset_transactionsListRelationFilter
    assets?: AssetsListRelationFilter
  }, "id" | "nik">

  export type employeesOrderByWithAggregationInput = {
    id?: SortOrder
    nik?: SortOrder
    nama?: SortOrder
    gender?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    department_id?: SortOrderInput | SortOrder
    _count?: employeesCountOrderByAggregateInput
    _avg?: employeesAvgOrderByAggregateInput
    _max?: employeesMaxOrderByAggregateInput
    _min?: employeesMinOrderByAggregateInput
    _sum?: employeesSumOrderByAggregateInput
  }

  export type employeesScalarWhereWithAggregatesInput = {
    AND?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    OR?: employeesScalarWhereWithAggregatesInput[]
    NOT?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"employees"> | bigint | number
    nik?: StringWithAggregatesFilter<"employees"> | string
    nama?: StringWithAggregatesFilter<"employees"> | string
    gender?: StringWithAggregatesFilter<"employees"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"employees"> | Date | string | null
    department_id?: BigIntNullableWithAggregatesFilter<"employees"> | bigint | number | null
  }

  export type locationsWhereInput = {
    AND?: locationsWhereInput | locationsWhereInput[]
    OR?: locationsWhereInput[]
    NOT?: locationsWhereInput | locationsWhereInput[]
    id?: BigIntFilter<"locations"> | bigint | number
    name?: StringFilter<"locations"> | string
    area_id?: BigIntFilter<"locations"> | bigint | number
    created_at?: DateTimeNullableFilter<"locations"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"locations"> | Date | string | null
    area?: XOR<AreasRelationFilter, areasWhereInput>
    assets?: AssetsListRelationFilter
  }

  export type locationsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    area_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    area?: areasOrderByWithRelationInput
    assets?: assetsOrderByRelationAggregateInput
  }

  export type locationsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: locationsWhereInput | locationsWhereInput[]
    OR?: locationsWhereInput[]
    NOT?: locationsWhereInput | locationsWhereInput[]
    name?: StringFilter<"locations"> | string
    area_id?: BigIntFilter<"locations"> | bigint | number
    created_at?: DateTimeNullableFilter<"locations"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"locations"> | Date | string | null
    area?: XOR<AreasRelationFilter, areasWhereInput>
    assets?: AssetsListRelationFilter
  }, "id">

  export type locationsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    area_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: locationsCountOrderByAggregateInput
    _avg?: locationsAvgOrderByAggregateInput
    _max?: locationsMaxOrderByAggregateInput
    _min?: locationsMinOrderByAggregateInput
    _sum?: locationsSumOrderByAggregateInput
  }

  export type locationsScalarWhereWithAggregatesInput = {
    AND?: locationsScalarWhereWithAggregatesInput | locationsScalarWhereWithAggregatesInput[]
    OR?: locationsScalarWhereWithAggregatesInput[]
    NOT?: locationsScalarWhereWithAggregatesInput | locationsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"locations"> | bigint | number
    name?: StringWithAggregatesFilter<"locations"> | string
    area_id?: BigIntWithAggregatesFilter<"locations"> | bigint | number
    created_at?: DateTimeNullableWithAggregatesFilter<"locations"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"locations"> | Date | string | null
  }

  export type log_crudWhereInput = {
    AND?: log_crudWhereInput | log_crudWhereInput[]
    OR?: log_crudWhereInput[]
    NOT?: log_crudWhereInput | log_crudWhereInput[]
    id?: BigIntFilter<"log_crud"> | bigint | number
    table_name?: StringFilter<"log_crud"> | string
    sap_id?: StringNullableFilter<"log_crud"> | string | null
    operation?: StringFilter<"log_crud"> | string
    old_data?: StringNullableFilter<"log_crud"> | string | null
    new_data?: StringNullableFilter<"log_crud"> | string | null
    user_id?: BigIntNullableFilter<"log_crud"> | bigint | number | null
    created_at?: DateTimeFilter<"log_crud"> | Date | string
    user?: XOR<UsersNullableRelationFilter, usersWhereInput> | null
    assets?: AssetsListRelationFilter
  }

  export type log_crudOrderByWithRelationInput = {
    id?: SortOrder
    table_name?: SortOrder
    sap_id?: SortOrderInput | SortOrder
    operation?: SortOrder
    old_data?: SortOrderInput | SortOrder
    new_data?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: usersOrderByWithRelationInput
    assets?: assetsOrderByRelationAggregateInput
  }

  export type log_crudWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: log_crudWhereInput | log_crudWhereInput[]
    OR?: log_crudWhereInput[]
    NOT?: log_crudWhereInput | log_crudWhereInput[]
    table_name?: StringFilter<"log_crud"> | string
    sap_id?: StringNullableFilter<"log_crud"> | string | null
    operation?: StringFilter<"log_crud"> | string
    old_data?: StringNullableFilter<"log_crud"> | string | null
    new_data?: StringNullableFilter<"log_crud"> | string | null
    user_id?: BigIntNullableFilter<"log_crud"> | bigint | number | null
    created_at?: DateTimeFilter<"log_crud"> | Date | string
    user?: XOR<UsersNullableRelationFilter, usersWhereInput> | null
    assets?: AssetsListRelationFilter
  }, "id">

  export type log_crudOrderByWithAggregationInput = {
    id?: SortOrder
    table_name?: SortOrder
    sap_id?: SortOrderInput | SortOrder
    operation?: SortOrder
    old_data?: SortOrderInput | SortOrder
    new_data?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: log_crudCountOrderByAggregateInput
    _avg?: log_crudAvgOrderByAggregateInput
    _max?: log_crudMaxOrderByAggregateInput
    _min?: log_crudMinOrderByAggregateInput
    _sum?: log_crudSumOrderByAggregateInput
  }

  export type log_crudScalarWhereWithAggregatesInput = {
    AND?: log_crudScalarWhereWithAggregatesInput | log_crudScalarWhereWithAggregatesInput[]
    OR?: log_crudScalarWhereWithAggregatesInput[]
    NOT?: log_crudScalarWhereWithAggregatesInput | log_crudScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"log_crud"> | bigint | number
    table_name?: StringWithAggregatesFilter<"log_crud"> | string
    sap_id?: StringNullableWithAggregatesFilter<"log_crud"> | string | null
    operation?: StringWithAggregatesFilter<"log_crud"> | string
    old_data?: StringNullableWithAggregatesFilter<"log_crud"> | string | null
    new_data?: StringNullableWithAggregatesFilter<"log_crud"> | string | null
    user_id?: BigIntNullableWithAggregatesFilter<"log_crud"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"log_crud"> | Date | string
  }

  export type suppliersWhereInput = {
    AND?: suppliersWhereInput | suppliersWhereInput[]
    OR?: suppliersWhereInput[]
    NOT?: suppliersWhereInput | suppliersWhereInput[]
    id?: BigIntFilter<"suppliers"> | bigint | number
    name?: StringFilter<"suppliers"> | string
    contact_person?: StringNullableFilter<"suppliers"> | string | null
    phone?: StringNullableFilter<"suppliers"> | string | null
    email?: StringNullableFilter<"suppliers"> | string | null
    address?: StringNullableFilter<"suppliers"> | string | null
    created_at?: DateTimeNullableFilter<"suppliers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"suppliers"> | Date | string | null
    assets?: AssetsListRelationFilter
  }

  export type suppliersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contact_person?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    assets?: assetsOrderByRelationAggregateInput
  }

  export type suppliersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: suppliersWhereInput | suppliersWhereInput[]
    OR?: suppliersWhereInput[]
    NOT?: suppliersWhereInput | suppliersWhereInput[]
    name?: StringFilter<"suppliers"> | string
    contact_person?: StringNullableFilter<"suppliers"> | string | null
    phone?: StringNullableFilter<"suppliers"> | string | null
    email?: StringNullableFilter<"suppliers"> | string | null
    address?: StringNullableFilter<"suppliers"> | string | null
    created_at?: DateTimeNullableFilter<"suppliers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"suppliers"> | Date | string | null
    assets?: AssetsListRelationFilter
  }, "id">

  export type suppliersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contact_person?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: suppliersCountOrderByAggregateInput
    _avg?: suppliersAvgOrderByAggregateInput
    _max?: suppliersMaxOrderByAggregateInput
    _min?: suppliersMinOrderByAggregateInput
    _sum?: suppliersSumOrderByAggregateInput
  }

  export type suppliersScalarWhereWithAggregatesInput = {
    AND?: suppliersScalarWhereWithAggregatesInput | suppliersScalarWhereWithAggregatesInput[]
    OR?: suppliersScalarWhereWithAggregatesInput[]
    NOT?: suppliersScalarWhereWithAggregatesInput | suppliersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"suppliers"> | bigint | number
    name?: StringWithAggregatesFilter<"suppliers"> | string
    contact_person?: StringNullableWithAggregatesFilter<"suppliers"> | string | null
    phone?: StringNullableWithAggregatesFilter<"suppliers"> | string | null
    email?: StringNullableWithAggregatesFilter<"suppliers"> | string | null
    address?: StringNullableWithAggregatesFilter<"suppliers"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"suppliers"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"suppliers"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: BigIntFilter<"users"> | bigint | number
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    email_verified_at?: DateTimeNullableFilter<"users"> | Date | string | null
    password?: StringFilter<"users"> | string
    remember_token?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    log_cruds?: Log_crudListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    password?: SortOrder
    remember_token?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    log_cruds?: log_crudOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    email_verified_at?: DateTimeNullableFilter<"users"> | Date | string | null
    password?: StringFilter<"users"> | string
    remember_token?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    log_cruds?: Log_crudListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    password?: SortOrder
    remember_token?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"users"> | bigint | number
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    email_verified_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    password?: StringWithAggregatesFilter<"users"> | string
    remember_token?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type areasCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    locations?: locationsCreateNestedManyWithoutAreaInput
    assets?: assetsCreateNestedManyWithoutAreaInput
  }

  export type areasUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    locations?: locationsUncheckedCreateNestedManyWithoutAreaInput
    assets?: assetsUncheckedCreateNestedManyWithoutAreaInput
  }

  export type areasUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locations?: locationsUpdateManyWithoutAreaNestedInput
    assets?: assetsUpdateManyWithoutAreaNestedInput
  }

  export type areasUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locations?: locationsUncheckedUpdateManyWithoutAreaNestedInput
    assets?: assetsUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type areasCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type areasUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type areasUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsCreateInput = {
    id?: bigint | number
    transaction_type: string
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    asset: assetsCreateNestedOneWithoutTransactionsInput
    previous_holder?: employeesCreateNestedOneWithoutPrevious_transInput
    new_holder?: employeesCreateNestedOneWithoutNew_transInput
  }

  export type asset_transactionsUncheckedCreateInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    asset?: assetsUpdateOneRequiredWithoutTransactionsNestedInput
    previous_holder?: employeesUpdateOneWithoutPrevious_transNestedInput
    new_holder?: employeesUpdateOneWithoutNew_transNestedInput
  }

  export type asset_transactionsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsCreateManyInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsCreateInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsCreateManyInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type activity_logCreateInput = {
    id?: bigint | number
    action: string
    entity_type: string
    entity_id: string
    details?: string | null
    user_id?: string | null
    user_name?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type activity_logUncheckedCreateInput = {
    id?: bigint | number
    action: string
    entity_type: string
    entity_id: string
    details?: string | null
    user_id?: string | null
    user_name?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type activity_logUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type activity_logUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type activity_logCreateManyInput = {
    id?: bigint | number
    action: string
    entity_type: string
    entity_id: string
    details?: string | null
    user_id?: string | null
    user_name?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type activity_logUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type activity_logUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type asset_typesCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutAsset_typeInput
  }

  export type asset_typesUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutAsset_typeInput
  }

  export type asset_typesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutAsset_typeNestedInput
  }

  export type asset_typesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutAsset_typeNestedInput
  }

  export type asset_typesCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_typesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_typesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_imagesCreateInput = {
    id?: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
    asset: assetsCreateNestedOneWithoutAsset_imagesInput
    main_for?: assetsCreateNestedOneWithoutMain_imageInput
  }

  export type asset_imagesUncheckedCreateInput = {
    id?: bigint | number
    asset_id: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
    main_for?: assetsUncheckedCreateNestedOneWithoutMain_imageInput
  }

  export type asset_imagesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: assetsUpdateOneRequiredWithoutAsset_imagesNestedInput
    main_for?: assetsUpdateOneWithoutMain_imageNestedInput
  }

  export type asset_imagesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    main_for?: assetsUncheckedUpdateOneWithoutMain_imageNestedInput
  }

  export type asset_imagesCreateManyInput = {
    id?: bigint | number
    asset_id: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
  }

  export type asset_imagesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type asset_imagesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type brandsCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBrandInput
  }

  export type brandsUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBrandInput
  }

  export type brandsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBrandNestedInput
  }

  export type brandsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type brandsCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type brandsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type brandsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriesCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type categoriesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type departmentsCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    employees?: employeesCreateNestedManyWithoutDepartmentInput
  }

  export type departmentsUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    employees?: employeesUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type departmentsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateManyWithoutDepartmentNestedInput
  }

  export type departmentsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type departmentsCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type departmentsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type departmentsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesCreateInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department?: departmentsCreateNestedOneWithoutEmployeesInput
    previous_trans?: asset_transactionsCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsCreateNestedManyWithoutNew_holderInput
    assets?: assetsCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUncheckedCreateInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department_id?: bigint | number | null
    previous_trans?: asset_transactionsUncheckedCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsUncheckedCreateNestedManyWithoutNew_holderInput
    assets?: assetsUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: departmentsUpdateOneWithoutEmployeesNestedInput
    previous_trans?: asset_transactionsUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_trans?: asset_transactionsUncheckedUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUncheckedUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesCreateManyInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department_id?: bigint | number | null
  }

  export type employeesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type locationsCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    area: areasCreateNestedOneWithoutLocationsInput
    assets?: assetsCreateNestedManyWithoutLocationInput
  }

  export type locationsUncheckedCreateInput = {
    id?: bigint | number
    name: string
    area_id: bigint | number
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    area?: areasUpdateOneRequiredWithoutLocationsNestedInput
    assets?: assetsUpdateManyWithoutLocationNestedInput
  }

  export type locationsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    area_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationsCreateManyInput = {
    id?: bigint | number
    name: string
    area_id: bigint | number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type locationsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type locationsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    area_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type log_crudCreateInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    created_at?: Date | string
    user?: usersCreateNestedOneWithoutLog_crudsInput
    assets?: assetsCreateNestedManyWithoutLog_crudsInput
  }

  export type log_crudUncheckedCreateInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    user_id?: bigint | number | null
    created_at?: Date | string
    assets?: assetsUncheckedCreateNestedManyWithoutLog_crudsInput
  }

  export type log_crudUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneWithoutLog_crudsNestedInput
    assets?: assetsUpdateManyWithoutLog_crudsNestedInput
  }

  export type log_crudUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: assetsUncheckedUpdateManyWithoutLog_crudsNestedInput
  }

  export type log_crudCreateManyInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    user_id?: bigint | number | null
    created_at?: Date | string
  }

  export type log_crudUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type log_crudUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type suppliersCreateInput = {
    id?: bigint | number
    name: string
    contact_person?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutSupplier_recInput
  }

  export type suppliersUncheckedCreateInput = {
    id?: bigint | number
    name: string
    contact_person?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutSupplier_recInput
  }

  export type suppliersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutSupplier_recNestedInput
  }

  export type suppliersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutSupplier_recNestedInput
  }

  export type suppliersCreateManyInput = {
    id?: bigint | number
    name: string
    contact_person?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type suppliersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type suppliersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    id?: bigint | number
    name: string
    email: string
    email_verified_at?: Date | string | null
    password: string
    remember_token?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    log_cruds?: log_crudCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: bigint | number
    name: string
    email: string
    email_verified_at?: Date | string | null
    password: string
    remember_token?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    log_cruds?: log_crudUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    log_cruds?: log_crudUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: bigint | number
    name: string
    email: string
    email_verified_at?: Date | string | null
    password: string
    remember_token?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type LocationsListRelationFilter = {
    every?: locationsWhereInput
    some?: locationsWhereInput
    none?: locationsWhereInput
  }

  export type AssetsListRelationFilter = {
    every?: assetsWhereInput
    some?: assetsWhereInput
    none?: assetsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type locationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type assetsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type areasCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type areasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type areasMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type areasMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type areasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type AssetsRelationFilter = {
    is?: assetsWhereInput
    isNot?: assetsWhereInput
  }

  export type EmployeesNullableRelationFilter = {
    is?: employeesWhereInput | null
    isNot?: employeesWhereInput | null
  }

  export type asset_transactionsCountOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    transaction_type?: SortOrder
    previous_holder_id?: SortOrder
    new_holder_id?: SortOrder
    previous_location?: SortOrder
    new_location?: SortOrder
    previous_condition?: SortOrder
    new_condition?: SortOrder
    remarks?: SortOrder
    transaction_date?: SortOrder
    created_by?: SortOrder
    creator_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_transactionsAvgOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    previous_holder_id?: SortOrder
    new_holder_id?: SortOrder
    created_by?: SortOrder
  }

  export type asset_transactionsMaxOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    transaction_type?: SortOrder
    previous_holder_id?: SortOrder
    new_holder_id?: SortOrder
    previous_location?: SortOrder
    new_location?: SortOrder
    previous_condition?: SortOrder
    new_condition?: SortOrder
    remarks?: SortOrder
    transaction_date?: SortOrder
    created_by?: SortOrder
    creator_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_transactionsMinOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    transaction_type?: SortOrder
    previous_holder_id?: SortOrder
    new_holder_id?: SortOrder
    previous_location?: SortOrder
    new_location?: SortOrder
    previous_condition?: SortOrder
    new_condition?: SortOrder
    remarks?: SortOrder
    transaction_date?: SortOrder
    created_by?: SortOrder
    creator_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_transactionsSumOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    previous_holder_id?: SortOrder
    new_holder_id?: SortOrder
    created_by?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type EnumAssetConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCondition | EnumAssetConditionFieldRefInput<$PrismaModel>
    in?: $Enums.AssetCondition[]
    notIn?: $Enums.AssetCondition[]
    not?: NestedEnumAssetConditionFilter<$PrismaModel> | $Enums.AssetCondition
  }

  export type Asset_typesNullableRelationFilter = {
    is?: asset_typesWhereInput | null
    isNot?: asset_typesWhereInput | null
  }

  export type CategoriesNullableRelationFilter = {
    is?: categoriesWhereInput | null
    isNot?: categoriesWhereInput | null
  }

  export type BrandsNullableRelationFilter = {
    is?: brandsWhereInput | null
    isNot?: brandsWhereInput | null
  }

  export type AreasNullableRelationFilter = {
    is?: areasWhereInput | null
    isNot?: areasWhereInput | null
  }

  export type LocationsNullableRelationFilter = {
    is?: locationsWhereInput | null
    isNot?: locationsWhereInput | null
  }

  export type SuppliersNullableRelationFilter = {
    is?: suppliersWhereInput | null
    isNot?: suppliersWhereInput | null
  }

  export type Asset_imagesNullableRelationFilter = {
    is?: asset_imagesWhereInput | null
    isNot?: asset_imagesWhereInput | null
  }

  export type Asset_transactionsListRelationFilter = {
    every?: asset_transactionsWhereInput
    some?: asset_transactionsWhereInput
    none?: asset_transactionsWhereInput
  }

  export type Log_crudListRelationFilter = {
    every?: log_crudWhereInput
    some?: log_crudWhereInput
    none?: log_crudWhereInput
  }

  export type Asset_imagesListRelationFilter = {
    every?: asset_imagesWhereInput
    some?: asset_imagesWhereInput
    none?: asset_imagesWhereInput
  }

  export type asset_transactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type log_crudOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type asset_imagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type assetsCountOrderByAggregateInput = {
    id?: SortOrder
    type_id?: SortOrder
    serial_number?: SortOrder
    sap_id?: SortOrder
    purchase_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
    brand_id?: SortOrder
    area_id?: SortOrder
    location_id?: SortOrder
    employee_id?: SortOrder
    supplier_id?: SortOrder
    image_id?: SortOrder
    condition?: SortOrder
  }

  export type assetsAvgOrderByAggregateInput = {
    id?: SortOrder
    type_id?: SortOrder
    category_id?: SortOrder
    brand_id?: SortOrder
    area_id?: SortOrder
    location_id?: SortOrder
    employee_id?: SortOrder
    supplier_id?: SortOrder
    image_id?: SortOrder
  }

  export type assetsMaxOrderByAggregateInput = {
    id?: SortOrder
    type_id?: SortOrder
    serial_number?: SortOrder
    sap_id?: SortOrder
    purchase_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
    brand_id?: SortOrder
    area_id?: SortOrder
    location_id?: SortOrder
    employee_id?: SortOrder
    supplier_id?: SortOrder
    image_id?: SortOrder
    condition?: SortOrder
  }

  export type assetsMinOrderByAggregateInput = {
    id?: SortOrder
    type_id?: SortOrder
    serial_number?: SortOrder
    sap_id?: SortOrder
    purchase_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
    brand_id?: SortOrder
    area_id?: SortOrder
    location_id?: SortOrder
    employee_id?: SortOrder
    supplier_id?: SortOrder
    image_id?: SortOrder
    condition?: SortOrder
  }

  export type assetsSumOrderByAggregateInput = {
    id?: SortOrder
    type_id?: SortOrder
    category_id?: SortOrder
    brand_id?: SortOrder
    area_id?: SortOrder
    location_id?: SortOrder
    employee_id?: SortOrder
    supplier_id?: SortOrder
    image_id?: SortOrder
  }

  export type EnumAssetConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCondition | EnumAssetConditionFieldRefInput<$PrismaModel>
    in?: $Enums.AssetCondition[]
    notIn?: $Enums.AssetCondition[]
    not?: NestedEnumAssetConditionWithAggregatesFilter<$PrismaModel> | $Enums.AssetCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetConditionFilter<$PrismaModel>
    _max?: NestedEnumAssetConditionFilter<$PrismaModel>
  }

  export type activity_logCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    user_id?: SortOrder
    user_name?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type activity_logAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type activity_logMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    user_id?: SortOrder
    user_name?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type activity_logMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    user_id?: SortOrder
    user_name?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type activity_logSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type asset_typesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_typesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type asset_typesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_typesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type asset_typesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AssetsNullableRelationFilter = {
    is?: assetsWhereInput | null
    isNot?: assetsWhereInput | null
  }

  export type asset_imagesCountOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type asset_imagesAvgOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
  }

  export type asset_imagesMaxOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type asset_imagesMinOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type asset_imagesSumOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
  }

  export type brandsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type brandsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type brandsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type brandsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type brandsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoriesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoriesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmployeesListRelationFilter = {
    every?: employeesWhereInput
    some?: employeesWhereInput
    none?: employeesWhereInput
  }

  export type employeesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type departmentsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type departmentsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type departmentsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type departmentsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type departmentsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DepartmentsNullableRelationFilter = {
    is?: departmentsWhereInput | null
    isNot?: departmentsWhereInput | null
  }

  export type employeesCountOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    nama?: SortOrder
    gender?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    department_id?: SortOrder
  }

  export type employeesAvgOrderByAggregateInput = {
    id?: SortOrder
    department_id?: SortOrder
  }

  export type employeesMaxOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    nama?: SortOrder
    gender?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    department_id?: SortOrder
  }

  export type employeesMinOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    nama?: SortOrder
    gender?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    department_id?: SortOrder
  }

  export type employeesSumOrderByAggregateInput = {
    id?: SortOrder
    department_id?: SortOrder
  }

  export type AreasRelationFilter = {
    is?: areasWhereInput
    isNot?: areasWhereInput
  }

  export type locationsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    area_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type locationsAvgOrderByAggregateInput = {
    id?: SortOrder
    area_id?: SortOrder
  }

  export type locationsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    area_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type locationsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    area_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type locationsSumOrderByAggregateInput = {
    id?: SortOrder
    area_id?: SortOrder
  }

  export type UsersNullableRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type log_crudCountOrderByAggregateInput = {
    id?: SortOrder
    table_name?: SortOrder
    sap_id?: SortOrder
    operation?: SortOrder
    old_data?: SortOrder
    new_data?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type log_crudAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type log_crudMaxOrderByAggregateInput = {
    id?: SortOrder
    table_name?: SortOrder
    sap_id?: SortOrder
    operation?: SortOrder
    old_data?: SortOrder
    new_data?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type log_crudMinOrderByAggregateInput = {
    id?: SortOrder
    table_name?: SortOrder
    sap_id?: SortOrder
    operation?: SortOrder
    old_data?: SortOrder
    new_data?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type log_crudSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type suppliersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact_person?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type suppliersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type suppliersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact_person?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type suppliersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact_person?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type suppliersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    email_verified_at?: SortOrder
    password?: SortOrder
    remember_token?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    email_verified_at?: SortOrder
    password?: SortOrder
    remember_token?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    email_verified_at?: SortOrder
    password?: SortOrder
    remember_token?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type locationsCreateNestedManyWithoutAreaInput = {
    create?: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput> | locationsCreateWithoutAreaInput[] | locationsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: locationsCreateOrConnectWithoutAreaInput | locationsCreateOrConnectWithoutAreaInput[]
    createMany?: locationsCreateManyAreaInputEnvelope
    connect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
  }

  export type assetsCreateNestedManyWithoutAreaInput = {
    create?: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput> | assetsCreateWithoutAreaInput[] | assetsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAreaInput | assetsCreateOrConnectWithoutAreaInput[]
    createMany?: assetsCreateManyAreaInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type locationsUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput> | locationsCreateWithoutAreaInput[] | locationsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: locationsCreateOrConnectWithoutAreaInput | locationsCreateOrConnectWithoutAreaInput[]
    createMany?: locationsCreateManyAreaInputEnvelope
    connect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput> | assetsCreateWithoutAreaInput[] | assetsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAreaInput | assetsCreateOrConnectWithoutAreaInput[]
    createMany?: assetsCreateManyAreaInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type locationsUpdateManyWithoutAreaNestedInput = {
    create?: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput> | locationsCreateWithoutAreaInput[] | locationsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: locationsCreateOrConnectWithoutAreaInput | locationsCreateOrConnectWithoutAreaInput[]
    upsert?: locationsUpsertWithWhereUniqueWithoutAreaInput | locationsUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: locationsCreateManyAreaInputEnvelope
    set?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    disconnect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    delete?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    connect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    update?: locationsUpdateWithWhereUniqueWithoutAreaInput | locationsUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: locationsUpdateManyWithWhereWithoutAreaInput | locationsUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: locationsScalarWhereInput | locationsScalarWhereInput[]
  }

  export type assetsUpdateManyWithoutAreaNestedInput = {
    create?: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput> | assetsCreateWithoutAreaInput[] | assetsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAreaInput | assetsCreateOrConnectWithoutAreaInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutAreaInput | assetsUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: assetsCreateManyAreaInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutAreaInput | assetsUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutAreaInput | assetsUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type locationsUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput> | locationsCreateWithoutAreaInput[] | locationsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: locationsCreateOrConnectWithoutAreaInput | locationsCreateOrConnectWithoutAreaInput[]
    upsert?: locationsUpsertWithWhereUniqueWithoutAreaInput | locationsUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: locationsCreateManyAreaInputEnvelope
    set?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    disconnect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    delete?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    connect?: locationsWhereUniqueInput | locationsWhereUniqueInput[]
    update?: locationsUpdateWithWhereUniqueWithoutAreaInput | locationsUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: locationsUpdateManyWithWhereWithoutAreaInput | locationsUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: locationsScalarWhereInput | locationsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput> | assetsCreateWithoutAreaInput[] | assetsUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAreaInput | assetsCreateOrConnectWithoutAreaInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutAreaInput | assetsUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: assetsCreateManyAreaInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutAreaInput | assetsUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutAreaInput | assetsUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<assetsCreateWithoutTransactionsInput, assetsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: assetsCreateOrConnectWithoutTransactionsInput
    connect?: assetsWhereUniqueInput
  }

  export type employeesCreateNestedOneWithoutPrevious_transInput = {
    create?: XOR<employeesCreateWithoutPrevious_transInput, employeesUncheckedCreateWithoutPrevious_transInput>
    connectOrCreate?: employeesCreateOrConnectWithoutPrevious_transInput
    connect?: employeesWhereUniqueInput
  }

  export type employeesCreateNestedOneWithoutNew_transInput = {
    create?: XOR<employeesCreateWithoutNew_transInput, employeesUncheckedCreateWithoutNew_transInput>
    connectOrCreate?: employeesCreateOrConnectWithoutNew_transInput
    connect?: employeesWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type assetsUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<assetsCreateWithoutTransactionsInput, assetsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: assetsCreateOrConnectWithoutTransactionsInput
    upsert?: assetsUpsertWithoutTransactionsInput
    connect?: assetsWhereUniqueInput
    update?: XOR<XOR<assetsUpdateToOneWithWhereWithoutTransactionsInput, assetsUpdateWithoutTransactionsInput>, assetsUncheckedUpdateWithoutTransactionsInput>
  }

  export type employeesUpdateOneWithoutPrevious_transNestedInput = {
    create?: XOR<employeesCreateWithoutPrevious_transInput, employeesUncheckedCreateWithoutPrevious_transInput>
    connectOrCreate?: employeesCreateOrConnectWithoutPrevious_transInput
    upsert?: employeesUpsertWithoutPrevious_transInput
    disconnect?: employeesWhereInput | boolean
    delete?: employeesWhereInput | boolean
    connect?: employeesWhereUniqueInput
    update?: XOR<XOR<employeesUpdateToOneWithWhereWithoutPrevious_transInput, employeesUpdateWithoutPrevious_transInput>, employeesUncheckedUpdateWithoutPrevious_transInput>
  }

  export type employeesUpdateOneWithoutNew_transNestedInput = {
    create?: XOR<employeesCreateWithoutNew_transInput, employeesUncheckedCreateWithoutNew_transInput>
    connectOrCreate?: employeesCreateOrConnectWithoutNew_transInput
    upsert?: employeesUpsertWithoutNew_transInput
    disconnect?: employeesWhereInput | boolean
    delete?: employeesWhereInput | boolean
    connect?: employeesWhereUniqueInput
    update?: XOR<XOR<employeesUpdateToOneWithWhereWithoutNew_transInput, employeesUpdateWithoutNew_transInput>, employeesUncheckedUpdateWithoutNew_transInput>
  }

  export type asset_typesCreateNestedOneWithoutAssetsInput = {
    create?: XOR<asset_typesCreateWithoutAssetsInput, asset_typesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: asset_typesCreateOrConnectWithoutAssetsInput
    connect?: asset_typesWhereUniqueInput
  }

  export type categoriesCreateNestedOneWithoutAssetsInput = {
    create?: XOR<categoriesCreateWithoutAssetsInput, categoriesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutAssetsInput
    connect?: categoriesWhereUniqueInput
  }

  export type brandsCreateNestedOneWithoutAssetsInput = {
    create?: XOR<brandsCreateWithoutAssetsInput, brandsUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: brandsCreateOrConnectWithoutAssetsInput
    connect?: brandsWhereUniqueInput
  }

  export type areasCreateNestedOneWithoutAssetsInput = {
    create?: XOR<areasCreateWithoutAssetsInput, areasUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: areasCreateOrConnectWithoutAssetsInput
    connect?: areasWhereUniqueInput
  }

  export type locationsCreateNestedOneWithoutAssetsInput = {
    create?: XOR<locationsCreateWithoutAssetsInput, locationsUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: locationsCreateOrConnectWithoutAssetsInput
    connect?: locationsWhereUniqueInput
  }

  export type employeesCreateNestedOneWithoutAssetsInput = {
    create?: XOR<employeesCreateWithoutAssetsInput, employeesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: employeesCreateOrConnectWithoutAssetsInput
    connect?: employeesWhereUniqueInput
  }

  export type suppliersCreateNestedOneWithoutAssetsInput = {
    create?: XOR<suppliersCreateWithoutAssetsInput, suppliersUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: suppliersCreateOrConnectWithoutAssetsInput
    connect?: suppliersWhereUniqueInput
  }

  export type asset_imagesCreateNestedOneWithoutMain_forInput = {
    create?: XOR<asset_imagesCreateWithoutMain_forInput, asset_imagesUncheckedCreateWithoutMain_forInput>
    connectOrCreate?: asset_imagesCreateOrConnectWithoutMain_forInput
    connect?: asset_imagesWhereUniqueInput
  }

  export type asset_transactionsCreateNestedManyWithoutAssetInput = {
    create?: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput> | asset_transactionsCreateWithoutAssetInput[] | asset_transactionsUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutAssetInput | asset_transactionsCreateOrConnectWithoutAssetInput[]
    createMany?: asset_transactionsCreateManyAssetInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type log_crudCreateNestedManyWithoutAssetsInput = {
    create?: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput> | log_crudCreateWithoutAssetsInput[] | log_crudUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutAssetsInput | log_crudCreateOrConnectWithoutAssetsInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
  }

  export type asset_imagesCreateNestedManyWithoutAssetInput = {
    create?: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput> | asset_imagesCreateWithoutAssetInput[] | asset_imagesUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_imagesCreateOrConnectWithoutAssetInput | asset_imagesCreateOrConnectWithoutAssetInput[]
    createMany?: asset_imagesCreateManyAssetInputEnvelope
    connect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
  }

  export type asset_transactionsUncheckedCreateNestedManyWithoutAssetInput = {
    create?: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput> | asset_transactionsCreateWithoutAssetInput[] | asset_transactionsUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutAssetInput | asset_transactionsCreateOrConnectWithoutAssetInput[]
    createMany?: asset_transactionsCreateManyAssetInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type log_crudUncheckedCreateNestedManyWithoutAssetsInput = {
    create?: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput> | log_crudCreateWithoutAssetsInput[] | log_crudUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutAssetsInput | log_crudCreateOrConnectWithoutAssetsInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
  }

  export type asset_imagesUncheckedCreateNestedManyWithoutAssetInput = {
    create?: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput> | asset_imagesCreateWithoutAssetInput[] | asset_imagesUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_imagesCreateOrConnectWithoutAssetInput | asset_imagesCreateOrConnectWithoutAssetInput[]
    createMany?: asset_imagesCreateManyAssetInputEnvelope
    connect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
  }

  export type EnumAssetConditionFieldUpdateOperationsInput = {
    set?: $Enums.AssetCondition
  }

  export type asset_typesUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<asset_typesCreateWithoutAssetsInput, asset_typesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: asset_typesCreateOrConnectWithoutAssetsInput
    upsert?: asset_typesUpsertWithoutAssetsInput
    disconnect?: asset_typesWhereInput | boolean
    delete?: asset_typesWhereInput | boolean
    connect?: asset_typesWhereUniqueInput
    update?: XOR<XOR<asset_typesUpdateToOneWithWhereWithoutAssetsInput, asset_typesUpdateWithoutAssetsInput>, asset_typesUncheckedUpdateWithoutAssetsInput>
  }

  export type categoriesUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<categoriesCreateWithoutAssetsInput, categoriesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutAssetsInput
    upsert?: categoriesUpsertWithoutAssetsInput
    disconnect?: categoriesWhereInput | boolean
    delete?: categoriesWhereInput | boolean
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutAssetsInput, categoriesUpdateWithoutAssetsInput>, categoriesUncheckedUpdateWithoutAssetsInput>
  }

  export type brandsUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<brandsCreateWithoutAssetsInput, brandsUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: brandsCreateOrConnectWithoutAssetsInput
    upsert?: brandsUpsertWithoutAssetsInput
    disconnect?: brandsWhereInput | boolean
    delete?: brandsWhereInput | boolean
    connect?: brandsWhereUniqueInput
    update?: XOR<XOR<brandsUpdateToOneWithWhereWithoutAssetsInput, brandsUpdateWithoutAssetsInput>, brandsUncheckedUpdateWithoutAssetsInput>
  }

  export type areasUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<areasCreateWithoutAssetsInput, areasUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: areasCreateOrConnectWithoutAssetsInput
    upsert?: areasUpsertWithoutAssetsInput
    disconnect?: areasWhereInput | boolean
    delete?: areasWhereInput | boolean
    connect?: areasWhereUniqueInput
    update?: XOR<XOR<areasUpdateToOneWithWhereWithoutAssetsInput, areasUpdateWithoutAssetsInput>, areasUncheckedUpdateWithoutAssetsInput>
  }

  export type locationsUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<locationsCreateWithoutAssetsInput, locationsUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: locationsCreateOrConnectWithoutAssetsInput
    upsert?: locationsUpsertWithoutAssetsInput
    disconnect?: locationsWhereInput | boolean
    delete?: locationsWhereInput | boolean
    connect?: locationsWhereUniqueInput
    update?: XOR<XOR<locationsUpdateToOneWithWhereWithoutAssetsInput, locationsUpdateWithoutAssetsInput>, locationsUncheckedUpdateWithoutAssetsInput>
  }

  export type employeesUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<employeesCreateWithoutAssetsInput, employeesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: employeesCreateOrConnectWithoutAssetsInput
    upsert?: employeesUpsertWithoutAssetsInput
    disconnect?: employeesWhereInput | boolean
    delete?: employeesWhereInput | boolean
    connect?: employeesWhereUniqueInput
    update?: XOR<XOR<employeesUpdateToOneWithWhereWithoutAssetsInput, employeesUpdateWithoutAssetsInput>, employeesUncheckedUpdateWithoutAssetsInput>
  }

  export type suppliersUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<suppliersCreateWithoutAssetsInput, suppliersUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: suppliersCreateOrConnectWithoutAssetsInput
    upsert?: suppliersUpsertWithoutAssetsInput
    disconnect?: suppliersWhereInput | boolean
    delete?: suppliersWhereInput | boolean
    connect?: suppliersWhereUniqueInput
    update?: XOR<XOR<suppliersUpdateToOneWithWhereWithoutAssetsInput, suppliersUpdateWithoutAssetsInput>, suppliersUncheckedUpdateWithoutAssetsInput>
  }

  export type asset_imagesUpdateOneWithoutMain_forNestedInput = {
    create?: XOR<asset_imagesCreateWithoutMain_forInput, asset_imagesUncheckedCreateWithoutMain_forInput>
    connectOrCreate?: asset_imagesCreateOrConnectWithoutMain_forInput
    upsert?: asset_imagesUpsertWithoutMain_forInput
    disconnect?: asset_imagesWhereInput | boolean
    delete?: asset_imagesWhereInput | boolean
    connect?: asset_imagesWhereUniqueInput
    update?: XOR<XOR<asset_imagesUpdateToOneWithWhereWithoutMain_forInput, asset_imagesUpdateWithoutMain_forInput>, asset_imagesUncheckedUpdateWithoutMain_forInput>
  }

  export type asset_transactionsUpdateManyWithoutAssetNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput> | asset_transactionsCreateWithoutAssetInput[] | asset_transactionsUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutAssetInput | asset_transactionsCreateOrConnectWithoutAssetInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutAssetInput | asset_transactionsUpsertWithWhereUniqueWithoutAssetInput[]
    createMany?: asset_transactionsCreateManyAssetInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutAssetInput | asset_transactionsUpdateWithWhereUniqueWithoutAssetInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutAssetInput | asset_transactionsUpdateManyWithWhereWithoutAssetInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type log_crudUpdateManyWithoutAssetsNestedInput = {
    create?: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput> | log_crudCreateWithoutAssetsInput[] | log_crudUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutAssetsInput | log_crudCreateOrConnectWithoutAssetsInput[]
    upsert?: log_crudUpsertWithWhereUniqueWithoutAssetsInput | log_crudUpsertWithWhereUniqueWithoutAssetsInput[]
    set?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    disconnect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    delete?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    update?: log_crudUpdateWithWhereUniqueWithoutAssetsInput | log_crudUpdateWithWhereUniqueWithoutAssetsInput[]
    updateMany?: log_crudUpdateManyWithWhereWithoutAssetsInput | log_crudUpdateManyWithWhereWithoutAssetsInput[]
    deleteMany?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
  }

  export type asset_imagesUpdateManyWithoutAssetNestedInput = {
    create?: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput> | asset_imagesCreateWithoutAssetInput[] | asset_imagesUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_imagesCreateOrConnectWithoutAssetInput | asset_imagesCreateOrConnectWithoutAssetInput[]
    upsert?: asset_imagesUpsertWithWhereUniqueWithoutAssetInput | asset_imagesUpsertWithWhereUniqueWithoutAssetInput[]
    createMany?: asset_imagesCreateManyAssetInputEnvelope
    set?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    disconnect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    delete?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    connect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    update?: asset_imagesUpdateWithWhereUniqueWithoutAssetInput | asset_imagesUpdateWithWhereUniqueWithoutAssetInput[]
    updateMany?: asset_imagesUpdateManyWithWhereWithoutAssetInput | asset_imagesUpdateManyWithWhereWithoutAssetInput[]
    deleteMany?: asset_imagesScalarWhereInput | asset_imagesScalarWhereInput[]
  }

  export type asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput> | asset_transactionsCreateWithoutAssetInput[] | asset_transactionsUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutAssetInput | asset_transactionsCreateOrConnectWithoutAssetInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutAssetInput | asset_transactionsUpsertWithWhereUniqueWithoutAssetInput[]
    createMany?: asset_transactionsCreateManyAssetInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutAssetInput | asset_transactionsUpdateWithWhereUniqueWithoutAssetInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutAssetInput | asset_transactionsUpdateManyWithWhereWithoutAssetInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type log_crudUncheckedUpdateManyWithoutAssetsNestedInput = {
    create?: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput> | log_crudCreateWithoutAssetsInput[] | log_crudUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutAssetsInput | log_crudCreateOrConnectWithoutAssetsInput[]
    upsert?: log_crudUpsertWithWhereUniqueWithoutAssetsInput | log_crudUpsertWithWhereUniqueWithoutAssetsInput[]
    set?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    disconnect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    delete?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    update?: log_crudUpdateWithWhereUniqueWithoutAssetsInput | log_crudUpdateWithWhereUniqueWithoutAssetsInput[]
    updateMany?: log_crudUpdateManyWithWhereWithoutAssetsInput | log_crudUpdateManyWithWhereWithoutAssetsInput[]
    deleteMany?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
  }

  export type asset_imagesUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput> | asset_imagesCreateWithoutAssetInput[] | asset_imagesUncheckedCreateWithoutAssetInput[]
    connectOrCreate?: asset_imagesCreateOrConnectWithoutAssetInput | asset_imagesCreateOrConnectWithoutAssetInput[]
    upsert?: asset_imagesUpsertWithWhereUniqueWithoutAssetInput | asset_imagesUpsertWithWhereUniqueWithoutAssetInput[]
    createMany?: asset_imagesCreateManyAssetInputEnvelope
    set?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    disconnect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    delete?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    connect?: asset_imagesWhereUniqueInput | asset_imagesWhereUniqueInput[]
    update?: asset_imagesUpdateWithWhereUniqueWithoutAssetInput | asset_imagesUpdateWithWhereUniqueWithoutAssetInput[]
    updateMany?: asset_imagesUpdateManyWithWhereWithoutAssetInput | asset_imagesUpdateManyWithWhereWithoutAssetInput[]
    deleteMany?: asset_imagesScalarWhereInput | asset_imagesScalarWhereInput[]
  }

  export type assetsCreateNestedManyWithoutAsset_typeInput = {
    create?: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput> | assetsCreateWithoutAsset_typeInput[] | assetsUncheckedCreateWithoutAsset_typeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_typeInput | assetsCreateOrConnectWithoutAsset_typeInput[]
    createMany?: assetsCreateManyAsset_typeInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutAsset_typeInput = {
    create?: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput> | assetsCreateWithoutAsset_typeInput[] | assetsUncheckedCreateWithoutAsset_typeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_typeInput | assetsCreateOrConnectWithoutAsset_typeInput[]
    createMany?: assetsCreateManyAsset_typeInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUpdateManyWithoutAsset_typeNestedInput = {
    create?: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput> | assetsCreateWithoutAsset_typeInput[] | assetsUncheckedCreateWithoutAsset_typeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_typeInput | assetsCreateOrConnectWithoutAsset_typeInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutAsset_typeInput | assetsUpsertWithWhereUniqueWithoutAsset_typeInput[]
    createMany?: assetsCreateManyAsset_typeInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutAsset_typeInput | assetsUpdateWithWhereUniqueWithoutAsset_typeInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutAsset_typeInput | assetsUpdateManyWithWhereWithoutAsset_typeInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutAsset_typeNestedInput = {
    create?: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput> | assetsCreateWithoutAsset_typeInput[] | assetsUncheckedCreateWithoutAsset_typeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_typeInput | assetsCreateOrConnectWithoutAsset_typeInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutAsset_typeInput | assetsUpsertWithWhereUniqueWithoutAsset_typeInput[]
    createMany?: assetsCreateManyAsset_typeInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutAsset_typeInput | assetsUpdateWithWhereUniqueWithoutAsset_typeInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutAsset_typeInput | assetsUpdateManyWithWhereWithoutAsset_typeInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsCreateNestedOneWithoutAsset_imagesInput = {
    create?: XOR<assetsCreateWithoutAsset_imagesInput, assetsUncheckedCreateWithoutAsset_imagesInput>
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_imagesInput
    connect?: assetsWhereUniqueInput
  }

  export type assetsCreateNestedOneWithoutMain_imageInput = {
    create?: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
    connectOrCreate?: assetsCreateOrConnectWithoutMain_imageInput
    connect?: assetsWhereUniqueInput
  }

  export type assetsUncheckedCreateNestedOneWithoutMain_imageInput = {
    create?: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
    connectOrCreate?: assetsCreateOrConnectWithoutMain_imageInput
    connect?: assetsWhereUniqueInput
  }

  export type assetsUpdateOneRequiredWithoutAsset_imagesNestedInput = {
    create?: XOR<assetsCreateWithoutAsset_imagesInput, assetsUncheckedCreateWithoutAsset_imagesInput>
    connectOrCreate?: assetsCreateOrConnectWithoutAsset_imagesInput
    upsert?: assetsUpsertWithoutAsset_imagesInput
    connect?: assetsWhereUniqueInput
    update?: XOR<XOR<assetsUpdateToOneWithWhereWithoutAsset_imagesInput, assetsUpdateWithoutAsset_imagesInput>, assetsUncheckedUpdateWithoutAsset_imagesInput>
  }

  export type assetsUpdateOneWithoutMain_imageNestedInput = {
    create?: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
    connectOrCreate?: assetsCreateOrConnectWithoutMain_imageInput
    upsert?: assetsUpsertWithoutMain_imageInput
    disconnect?: assetsWhereInput | boolean
    delete?: assetsWhereInput | boolean
    connect?: assetsWhereUniqueInput
    update?: XOR<XOR<assetsUpdateToOneWithWhereWithoutMain_imageInput, assetsUpdateWithoutMain_imageInput>, assetsUncheckedUpdateWithoutMain_imageInput>
  }

  export type assetsUncheckedUpdateOneWithoutMain_imageNestedInput = {
    create?: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
    connectOrCreate?: assetsCreateOrConnectWithoutMain_imageInput
    upsert?: assetsUpsertWithoutMain_imageInput
    disconnect?: assetsWhereInput | boolean
    delete?: assetsWhereInput | boolean
    connect?: assetsWhereUniqueInput
    update?: XOR<XOR<assetsUpdateToOneWithWhereWithoutMain_imageInput, assetsUpdateWithoutMain_imageInput>, assetsUncheckedUpdateWithoutMain_imageInput>
  }

  export type assetsCreateNestedManyWithoutBrandInput = {
    create?: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput> | assetsCreateWithoutBrandInput[] | assetsUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBrandInput | assetsCreateOrConnectWithoutBrandInput[]
    createMany?: assetsCreateManyBrandInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput> | assetsCreateWithoutBrandInput[] | assetsUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBrandInput | assetsCreateOrConnectWithoutBrandInput[]
    createMany?: assetsCreateManyBrandInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUpdateManyWithoutBrandNestedInput = {
    create?: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput> | assetsCreateWithoutBrandInput[] | assetsUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBrandInput | assetsCreateOrConnectWithoutBrandInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutBrandInput | assetsUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: assetsCreateManyBrandInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutBrandInput | assetsUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutBrandInput | assetsUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput> | assetsCreateWithoutBrandInput[] | assetsUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBrandInput | assetsCreateOrConnectWithoutBrandInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutBrandInput | assetsUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: assetsCreateManyBrandInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutBrandInput | assetsUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutBrandInput | assetsUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput> | assetsCreateWithoutCategoryInput[] | assetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutCategoryInput | assetsCreateOrConnectWithoutCategoryInput[]
    createMany?: assetsCreateManyCategoryInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput> | assetsCreateWithoutCategoryInput[] | assetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutCategoryInput | assetsCreateOrConnectWithoutCategoryInput[]
    createMany?: assetsCreateManyCategoryInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput> | assetsCreateWithoutCategoryInput[] | assetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutCategoryInput | assetsCreateOrConnectWithoutCategoryInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutCategoryInput | assetsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: assetsCreateManyCategoryInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutCategoryInput | assetsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutCategoryInput | assetsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput> | assetsCreateWithoutCategoryInput[] | assetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutCategoryInput | assetsCreateOrConnectWithoutCategoryInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutCategoryInput | assetsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: assetsCreateManyCategoryInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutCategoryInput | assetsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutCategoryInput | assetsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type employeesCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput> | employeesCreateWithoutDepartmentInput[] | employeesUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutDepartmentInput | employeesCreateOrConnectWithoutDepartmentInput[]
    createMany?: employeesCreateManyDepartmentInputEnvelope
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
  }

  export type employeesUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput> | employeesCreateWithoutDepartmentInput[] | employeesUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutDepartmentInput | employeesCreateOrConnectWithoutDepartmentInput[]
    createMany?: employeesCreateManyDepartmentInputEnvelope
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
  }

  export type employeesUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput> | employeesCreateWithoutDepartmentInput[] | employeesUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutDepartmentInput | employeesCreateOrConnectWithoutDepartmentInput[]
    upsert?: employeesUpsertWithWhereUniqueWithoutDepartmentInput | employeesUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: employeesCreateManyDepartmentInputEnvelope
    set?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    disconnect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    delete?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    update?: employeesUpdateWithWhereUniqueWithoutDepartmentInput | employeesUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: employeesUpdateManyWithWhereWithoutDepartmentInput | employeesUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: employeesScalarWhereInput | employeesScalarWhereInput[]
  }

  export type employeesUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput> | employeesCreateWithoutDepartmentInput[] | employeesUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutDepartmentInput | employeesCreateOrConnectWithoutDepartmentInput[]
    upsert?: employeesUpsertWithWhereUniqueWithoutDepartmentInput | employeesUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: employeesCreateManyDepartmentInputEnvelope
    set?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    disconnect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    delete?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    update?: employeesUpdateWithWhereUniqueWithoutDepartmentInput | employeesUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: employeesUpdateManyWithWhereWithoutDepartmentInput | employeesUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: employeesScalarWhereInput | employeesScalarWhereInput[]
  }

  export type departmentsCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<departmentsCreateWithoutEmployeesInput, departmentsUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutEmployeesInput
    connect?: departmentsWhereUniqueInput
  }

  export type asset_transactionsCreateNestedManyWithoutPrevious_holderInput = {
    create?: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput> | asset_transactionsCreateWithoutPrevious_holderInput[] | asset_transactionsUncheckedCreateWithoutPrevious_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutPrevious_holderInput | asset_transactionsCreateOrConnectWithoutPrevious_holderInput[]
    createMany?: asset_transactionsCreateManyPrevious_holderInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type asset_transactionsCreateNestedManyWithoutNew_holderInput = {
    create?: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput> | asset_transactionsCreateWithoutNew_holderInput[] | asset_transactionsUncheckedCreateWithoutNew_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutNew_holderInput | asset_transactionsCreateOrConnectWithoutNew_holderInput[]
    createMany?: asset_transactionsCreateManyNew_holderInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type assetsCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput> | assetsCreateWithoutEmployeeInput[] | assetsUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutEmployeeInput | assetsCreateOrConnectWithoutEmployeeInput[]
    createMany?: assetsCreateManyEmployeeInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type asset_transactionsUncheckedCreateNestedManyWithoutPrevious_holderInput = {
    create?: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput> | asset_transactionsCreateWithoutPrevious_holderInput[] | asset_transactionsUncheckedCreateWithoutPrevious_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutPrevious_holderInput | asset_transactionsCreateOrConnectWithoutPrevious_holderInput[]
    createMany?: asset_transactionsCreateManyPrevious_holderInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type asset_transactionsUncheckedCreateNestedManyWithoutNew_holderInput = {
    create?: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput> | asset_transactionsCreateWithoutNew_holderInput[] | asset_transactionsUncheckedCreateWithoutNew_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutNew_holderInput | asset_transactionsCreateOrConnectWithoutNew_holderInput[]
    createMany?: asset_transactionsCreateManyNew_holderInputEnvelope
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput> | assetsCreateWithoutEmployeeInput[] | assetsUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutEmployeeInput | assetsCreateOrConnectWithoutEmployeeInput[]
    createMany?: assetsCreateManyEmployeeInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type departmentsUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<departmentsCreateWithoutEmployeesInput, departmentsUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutEmployeesInput
    upsert?: departmentsUpsertWithoutEmployeesInput
    disconnect?: departmentsWhereInput | boolean
    delete?: departmentsWhereInput | boolean
    connect?: departmentsWhereUniqueInput
    update?: XOR<XOR<departmentsUpdateToOneWithWhereWithoutEmployeesInput, departmentsUpdateWithoutEmployeesInput>, departmentsUncheckedUpdateWithoutEmployeesInput>
  }

  export type asset_transactionsUpdateManyWithoutPrevious_holderNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput> | asset_transactionsCreateWithoutPrevious_holderInput[] | asset_transactionsUncheckedCreateWithoutPrevious_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutPrevious_holderInput | asset_transactionsCreateOrConnectWithoutPrevious_holderInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutPrevious_holderInput | asset_transactionsUpsertWithWhereUniqueWithoutPrevious_holderInput[]
    createMany?: asset_transactionsCreateManyPrevious_holderInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutPrevious_holderInput | asset_transactionsUpdateWithWhereUniqueWithoutPrevious_holderInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutPrevious_holderInput | asset_transactionsUpdateManyWithWhereWithoutPrevious_holderInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type asset_transactionsUpdateManyWithoutNew_holderNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput> | asset_transactionsCreateWithoutNew_holderInput[] | asset_transactionsUncheckedCreateWithoutNew_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutNew_holderInput | asset_transactionsCreateOrConnectWithoutNew_holderInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutNew_holderInput | asset_transactionsUpsertWithWhereUniqueWithoutNew_holderInput[]
    createMany?: asset_transactionsCreateManyNew_holderInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutNew_holderInput | asset_transactionsUpdateWithWhereUniqueWithoutNew_holderInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutNew_holderInput | asset_transactionsUpdateManyWithWhereWithoutNew_holderInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type assetsUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput> | assetsCreateWithoutEmployeeInput[] | assetsUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutEmployeeInput | assetsCreateOrConnectWithoutEmployeeInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutEmployeeInput | assetsUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: assetsCreateManyEmployeeInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutEmployeeInput | assetsUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutEmployeeInput | assetsUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type asset_transactionsUncheckedUpdateManyWithoutPrevious_holderNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput> | asset_transactionsCreateWithoutPrevious_holderInput[] | asset_transactionsUncheckedCreateWithoutPrevious_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutPrevious_holderInput | asset_transactionsCreateOrConnectWithoutPrevious_holderInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutPrevious_holderInput | asset_transactionsUpsertWithWhereUniqueWithoutPrevious_holderInput[]
    createMany?: asset_transactionsCreateManyPrevious_holderInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutPrevious_holderInput | asset_transactionsUpdateWithWhereUniqueWithoutPrevious_holderInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutPrevious_holderInput | asset_transactionsUpdateManyWithWhereWithoutPrevious_holderInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type asset_transactionsUncheckedUpdateManyWithoutNew_holderNestedInput = {
    create?: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput> | asset_transactionsCreateWithoutNew_holderInput[] | asset_transactionsUncheckedCreateWithoutNew_holderInput[]
    connectOrCreate?: asset_transactionsCreateOrConnectWithoutNew_holderInput | asset_transactionsCreateOrConnectWithoutNew_holderInput[]
    upsert?: asset_transactionsUpsertWithWhereUniqueWithoutNew_holderInput | asset_transactionsUpsertWithWhereUniqueWithoutNew_holderInput[]
    createMany?: asset_transactionsCreateManyNew_holderInputEnvelope
    set?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    disconnect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    delete?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    connect?: asset_transactionsWhereUniqueInput | asset_transactionsWhereUniqueInput[]
    update?: asset_transactionsUpdateWithWhereUniqueWithoutNew_holderInput | asset_transactionsUpdateWithWhereUniqueWithoutNew_holderInput[]
    updateMany?: asset_transactionsUpdateManyWithWhereWithoutNew_holderInput | asset_transactionsUpdateManyWithWhereWithoutNew_holderInput[]
    deleteMany?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput> | assetsCreateWithoutEmployeeInput[] | assetsUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutEmployeeInput | assetsCreateOrConnectWithoutEmployeeInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutEmployeeInput | assetsUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: assetsCreateManyEmployeeInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutEmployeeInput | assetsUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutEmployeeInput | assetsUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type areasCreateNestedOneWithoutLocationsInput = {
    create?: XOR<areasCreateWithoutLocationsInput, areasUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: areasCreateOrConnectWithoutLocationsInput
    connect?: areasWhereUniqueInput
  }

  export type assetsCreateNestedManyWithoutLocationInput = {
    create?: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput> | assetsCreateWithoutLocationInput[] | assetsUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLocationInput | assetsCreateOrConnectWithoutLocationInput[]
    createMany?: assetsCreateManyLocationInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput> | assetsCreateWithoutLocationInput[] | assetsUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLocationInput | assetsCreateOrConnectWithoutLocationInput[]
    createMany?: assetsCreateManyLocationInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type areasUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<areasCreateWithoutLocationsInput, areasUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: areasCreateOrConnectWithoutLocationsInput
    upsert?: areasUpsertWithoutLocationsInput
    connect?: areasWhereUniqueInput
    update?: XOR<XOR<areasUpdateToOneWithWhereWithoutLocationsInput, areasUpdateWithoutLocationsInput>, areasUncheckedUpdateWithoutLocationsInput>
  }

  export type assetsUpdateManyWithoutLocationNestedInput = {
    create?: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput> | assetsCreateWithoutLocationInput[] | assetsUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLocationInput | assetsCreateOrConnectWithoutLocationInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutLocationInput | assetsUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: assetsCreateManyLocationInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutLocationInput | assetsUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutLocationInput | assetsUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput> | assetsCreateWithoutLocationInput[] | assetsUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLocationInput | assetsCreateOrConnectWithoutLocationInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutLocationInput | assetsUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: assetsCreateManyLocationInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutLocationInput | assetsUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutLocationInput | assetsUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutLog_crudsInput = {
    create?: XOR<usersCreateWithoutLog_crudsInput, usersUncheckedCreateWithoutLog_crudsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLog_crudsInput
    connect?: usersWhereUniqueInput
  }

  export type assetsCreateNestedManyWithoutLog_crudsInput = {
    create?: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput> | assetsCreateWithoutLog_crudsInput[] | assetsUncheckedCreateWithoutLog_crudsInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLog_crudsInput | assetsCreateOrConnectWithoutLog_crudsInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutLog_crudsInput = {
    create?: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput> | assetsCreateWithoutLog_crudsInput[] | assetsUncheckedCreateWithoutLog_crudsInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLog_crudsInput | assetsCreateOrConnectWithoutLog_crudsInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type usersUpdateOneWithoutLog_crudsNestedInput = {
    create?: XOR<usersCreateWithoutLog_crudsInput, usersUncheckedCreateWithoutLog_crudsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLog_crudsInput
    upsert?: usersUpsertWithoutLog_crudsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLog_crudsInput, usersUpdateWithoutLog_crudsInput>, usersUncheckedUpdateWithoutLog_crudsInput>
  }

  export type assetsUpdateManyWithoutLog_crudsNestedInput = {
    create?: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput> | assetsCreateWithoutLog_crudsInput[] | assetsUncheckedCreateWithoutLog_crudsInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLog_crudsInput | assetsCreateOrConnectWithoutLog_crudsInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutLog_crudsInput | assetsUpsertWithWhereUniqueWithoutLog_crudsInput[]
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutLog_crudsInput | assetsUpdateWithWhereUniqueWithoutLog_crudsInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutLog_crudsInput | assetsUpdateManyWithWhereWithoutLog_crudsInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutLog_crudsNestedInput = {
    create?: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput> | assetsCreateWithoutLog_crudsInput[] | assetsUncheckedCreateWithoutLog_crudsInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutLog_crudsInput | assetsCreateOrConnectWithoutLog_crudsInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutLog_crudsInput | assetsUpsertWithWhereUniqueWithoutLog_crudsInput[]
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutLog_crudsInput | assetsUpdateWithWhereUniqueWithoutLog_crudsInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutLog_crudsInput | assetsUpdateManyWithWhereWithoutLog_crudsInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsCreateNestedManyWithoutSupplier_recInput = {
    create?: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput> | assetsCreateWithoutSupplier_recInput[] | assetsUncheckedCreateWithoutSupplier_recInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutSupplier_recInput | assetsCreateOrConnectWithoutSupplier_recInput[]
    createMany?: assetsCreateManySupplier_recInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutSupplier_recInput = {
    create?: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput> | assetsCreateWithoutSupplier_recInput[] | assetsUncheckedCreateWithoutSupplier_recInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutSupplier_recInput | assetsCreateOrConnectWithoutSupplier_recInput[]
    createMany?: assetsCreateManySupplier_recInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assetsUpdateManyWithoutSupplier_recNestedInput = {
    create?: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput> | assetsCreateWithoutSupplier_recInput[] | assetsUncheckedCreateWithoutSupplier_recInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutSupplier_recInput | assetsCreateOrConnectWithoutSupplier_recInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutSupplier_recInput | assetsUpsertWithWhereUniqueWithoutSupplier_recInput[]
    createMany?: assetsCreateManySupplier_recInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutSupplier_recInput | assetsUpdateWithWhereUniqueWithoutSupplier_recInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutSupplier_recInput | assetsUpdateManyWithWhereWithoutSupplier_recInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutSupplier_recNestedInput = {
    create?: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput> | assetsCreateWithoutSupplier_recInput[] | assetsUncheckedCreateWithoutSupplier_recInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutSupplier_recInput | assetsCreateOrConnectWithoutSupplier_recInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutSupplier_recInput | assetsUpsertWithWhereUniqueWithoutSupplier_recInput[]
    createMany?: assetsCreateManySupplier_recInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutSupplier_recInput | assetsUpdateWithWhereUniqueWithoutSupplier_recInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutSupplier_recInput | assetsUpdateManyWithWhereWithoutSupplier_recInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type log_crudCreateNestedManyWithoutUserInput = {
    create?: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput> | log_crudCreateWithoutUserInput[] | log_crudUncheckedCreateWithoutUserInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutUserInput | log_crudCreateOrConnectWithoutUserInput[]
    createMany?: log_crudCreateManyUserInputEnvelope
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
  }

  export type log_crudUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput> | log_crudCreateWithoutUserInput[] | log_crudUncheckedCreateWithoutUserInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutUserInput | log_crudCreateOrConnectWithoutUserInput[]
    createMany?: log_crudCreateManyUserInputEnvelope
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
  }

  export type log_crudUpdateManyWithoutUserNestedInput = {
    create?: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput> | log_crudCreateWithoutUserInput[] | log_crudUncheckedCreateWithoutUserInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutUserInput | log_crudCreateOrConnectWithoutUserInput[]
    upsert?: log_crudUpsertWithWhereUniqueWithoutUserInput | log_crudUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: log_crudCreateManyUserInputEnvelope
    set?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    disconnect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    delete?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    update?: log_crudUpdateWithWhereUniqueWithoutUserInput | log_crudUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: log_crudUpdateManyWithWhereWithoutUserInput | log_crudUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
  }

  export type log_crudUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput> | log_crudCreateWithoutUserInput[] | log_crudUncheckedCreateWithoutUserInput[]
    connectOrCreate?: log_crudCreateOrConnectWithoutUserInput | log_crudCreateOrConnectWithoutUserInput[]
    upsert?: log_crudUpsertWithWhereUniqueWithoutUserInput | log_crudUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: log_crudCreateManyUserInputEnvelope
    set?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    disconnect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    delete?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    connect?: log_crudWhereUniqueInput | log_crudWhereUniqueInput[]
    update?: log_crudUpdateWithWhereUniqueWithoutUserInput | log_crudUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: log_crudUpdateManyWithWhereWithoutUserInput | log_crudUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type NestedEnumAssetConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCondition | EnumAssetConditionFieldRefInput<$PrismaModel>
    in?: $Enums.AssetCondition[]
    notIn?: $Enums.AssetCondition[]
    not?: NestedEnumAssetConditionFilter<$PrismaModel> | $Enums.AssetCondition
  }

  export type NestedEnumAssetConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCondition | EnumAssetConditionFieldRefInput<$PrismaModel>
    in?: $Enums.AssetCondition[]
    notIn?: $Enums.AssetCondition[]
    not?: NestedEnumAssetConditionWithAggregatesFilter<$PrismaModel> | $Enums.AssetCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetConditionFilter<$PrismaModel>
    _max?: NestedEnumAssetConditionFilter<$PrismaModel>
  }

  export type locationsCreateWithoutAreaInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutLocationInput
  }

  export type locationsUncheckedCreateWithoutAreaInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationsCreateOrConnectWithoutAreaInput = {
    where: locationsWhereUniqueInput
    create: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput>
  }

  export type locationsCreateManyAreaInputEnvelope = {
    data: locationsCreateManyAreaInput | locationsCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type assetsCreateWithoutAreaInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutAreaInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutAreaInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput>
  }

  export type assetsCreateManyAreaInputEnvelope = {
    data: assetsCreateManyAreaInput | assetsCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type locationsUpsertWithWhereUniqueWithoutAreaInput = {
    where: locationsWhereUniqueInput
    update: XOR<locationsUpdateWithoutAreaInput, locationsUncheckedUpdateWithoutAreaInput>
    create: XOR<locationsCreateWithoutAreaInput, locationsUncheckedCreateWithoutAreaInput>
  }

  export type locationsUpdateWithWhereUniqueWithoutAreaInput = {
    where: locationsWhereUniqueInput
    data: XOR<locationsUpdateWithoutAreaInput, locationsUncheckedUpdateWithoutAreaInput>
  }

  export type locationsUpdateManyWithWhereWithoutAreaInput = {
    where: locationsScalarWhereInput
    data: XOR<locationsUpdateManyMutationInput, locationsUncheckedUpdateManyWithoutAreaInput>
  }

  export type locationsScalarWhereInput = {
    AND?: locationsScalarWhereInput | locationsScalarWhereInput[]
    OR?: locationsScalarWhereInput[]
    NOT?: locationsScalarWhereInput | locationsScalarWhereInput[]
    id?: BigIntFilter<"locations"> | bigint | number
    name?: StringFilter<"locations"> | string
    area_id?: BigIntFilter<"locations"> | bigint | number
    created_at?: DateTimeNullableFilter<"locations"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"locations"> | Date | string | null
  }

  export type assetsUpsertWithWhereUniqueWithoutAreaInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutAreaInput, assetsUncheckedUpdateWithoutAreaInput>
    create: XOR<assetsCreateWithoutAreaInput, assetsUncheckedCreateWithoutAreaInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutAreaInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutAreaInput, assetsUncheckedUpdateWithoutAreaInput>
  }

  export type assetsUpdateManyWithWhereWithoutAreaInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutAreaInput>
  }

  export type assetsScalarWhereInput = {
    AND?: assetsScalarWhereInput | assetsScalarWhereInput[]
    OR?: assetsScalarWhereInput[]
    NOT?: assetsScalarWhereInput | assetsScalarWhereInput[]
    id?: BigIntFilter<"assets"> | bigint | number
    type_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    serial_number?: StringFilter<"assets"> | string
    sap_id?: StringNullableFilter<"assets"> | string | null
    purchase_date?: DateTimeNullableFilter<"assets"> | Date | string | null
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    category_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    brand_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    area_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    location_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    employee_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    supplier_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    image_id?: BigIntNullableFilter<"assets"> | bigint | number | null
    condition?: EnumAssetConditionFilter<"assets"> | $Enums.AssetCondition
  }

  export type assetsCreateWithoutTransactionsInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutTransactionsInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutTransactionsInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutTransactionsInput, assetsUncheckedCreateWithoutTransactionsInput>
  }

  export type employeesCreateWithoutPrevious_transInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department?: departmentsCreateNestedOneWithoutEmployeesInput
    new_trans?: asset_transactionsCreateNestedManyWithoutNew_holderInput
    assets?: assetsCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUncheckedCreateWithoutPrevious_transInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department_id?: bigint | number | null
    new_trans?: asset_transactionsUncheckedCreateNestedManyWithoutNew_holderInput
    assets?: assetsUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeesCreateOrConnectWithoutPrevious_transInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutPrevious_transInput, employeesUncheckedCreateWithoutPrevious_transInput>
  }

  export type employeesCreateWithoutNew_transInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department?: departmentsCreateNestedOneWithoutEmployeesInput
    previous_trans?: asset_transactionsCreateNestedManyWithoutPrevious_holderInput
    assets?: assetsCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUncheckedCreateWithoutNew_transInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department_id?: bigint | number | null
    previous_trans?: asset_transactionsUncheckedCreateNestedManyWithoutPrevious_holderInput
    assets?: assetsUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeesCreateOrConnectWithoutNew_transInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutNew_transInput, employeesUncheckedCreateWithoutNew_transInput>
  }

  export type assetsUpsertWithoutTransactionsInput = {
    update: XOR<assetsUpdateWithoutTransactionsInput, assetsUncheckedUpdateWithoutTransactionsInput>
    create: XOR<assetsCreateWithoutTransactionsInput, assetsUncheckedCreateWithoutTransactionsInput>
    where?: assetsWhereInput
  }

  export type assetsUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: assetsWhereInput
    data: XOR<assetsUpdateWithoutTransactionsInput, assetsUncheckedUpdateWithoutTransactionsInput>
  }

  export type assetsUpdateWithoutTransactionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutTransactionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type employeesUpsertWithoutPrevious_transInput = {
    update: XOR<employeesUpdateWithoutPrevious_transInput, employeesUncheckedUpdateWithoutPrevious_transInput>
    create: XOR<employeesCreateWithoutPrevious_transInput, employeesUncheckedCreateWithoutPrevious_transInput>
    where?: employeesWhereInput
  }

  export type employeesUpdateToOneWithWhereWithoutPrevious_transInput = {
    where?: employeesWhereInput
    data: XOR<employeesUpdateWithoutPrevious_transInput, employeesUncheckedUpdateWithoutPrevious_transInput>
  }

  export type employeesUpdateWithoutPrevious_transInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: departmentsUpdateOneWithoutEmployeesNestedInput
    new_trans?: asset_transactionsUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateWithoutPrevious_transInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    new_trans?: asset_transactionsUncheckedUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUpsertWithoutNew_transInput = {
    update: XOR<employeesUpdateWithoutNew_transInput, employeesUncheckedUpdateWithoutNew_transInput>
    create: XOR<employeesCreateWithoutNew_transInput, employeesUncheckedCreateWithoutNew_transInput>
    where?: employeesWhereInput
  }

  export type employeesUpdateToOneWithWhereWithoutNew_transInput = {
    where?: employeesWhereInput
    data: XOR<employeesUpdateWithoutNew_transInput, employeesUncheckedUpdateWithoutNew_transInput>
  }

  export type employeesUpdateWithoutNew_transInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: departmentsUpdateOneWithoutEmployeesNestedInput
    previous_trans?: asset_transactionsUpdateManyWithoutPrevious_holderNestedInput
    assets?: assetsUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateWithoutNew_transInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_trans?: asset_transactionsUncheckedUpdateManyWithoutPrevious_holderNestedInput
    assets?: assetsUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type asset_typesCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_typesUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_typesCreateOrConnectWithoutAssetsInput = {
    where: asset_typesWhereUniqueInput
    create: XOR<asset_typesCreateWithoutAssetsInput, asset_typesUncheckedCreateWithoutAssetsInput>
  }

  export type categoriesCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type categoriesUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type categoriesCreateOrConnectWithoutAssetsInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutAssetsInput, categoriesUncheckedCreateWithoutAssetsInput>
  }

  export type brandsCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type brandsUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type brandsCreateOrConnectWithoutAssetsInput = {
    where: brandsWhereUniqueInput
    create: XOR<brandsCreateWithoutAssetsInput, brandsUncheckedCreateWithoutAssetsInput>
  }

  export type areasCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    locations?: locationsCreateNestedManyWithoutAreaInput
  }

  export type areasUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    locations?: locationsUncheckedCreateNestedManyWithoutAreaInput
  }

  export type areasCreateOrConnectWithoutAssetsInput = {
    where: areasWhereUniqueInput
    create: XOR<areasCreateWithoutAssetsInput, areasUncheckedCreateWithoutAssetsInput>
  }

  export type locationsCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    area: areasCreateNestedOneWithoutLocationsInput
  }

  export type locationsUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    area_id: bigint | number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type locationsCreateOrConnectWithoutAssetsInput = {
    where: locationsWhereUniqueInput
    create: XOR<locationsCreateWithoutAssetsInput, locationsUncheckedCreateWithoutAssetsInput>
  }

  export type employeesCreateWithoutAssetsInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department?: departmentsCreateNestedOneWithoutEmployeesInput
    previous_trans?: asset_transactionsCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsCreateNestedManyWithoutNew_holderInput
  }

  export type employeesUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    department_id?: bigint | number | null
    previous_trans?: asset_transactionsUncheckedCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsUncheckedCreateNestedManyWithoutNew_holderInput
  }

  export type employeesCreateOrConnectWithoutAssetsInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutAssetsInput, employeesUncheckedCreateWithoutAssetsInput>
  }

  export type suppliersCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    contact_person?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type suppliersUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    name: string
    contact_person?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type suppliersCreateOrConnectWithoutAssetsInput = {
    where: suppliersWhereUniqueInput
    create: XOR<suppliersCreateWithoutAssetsInput, suppliersUncheckedCreateWithoutAssetsInput>
  }

  export type asset_imagesCreateWithoutMain_forInput = {
    id?: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
    asset: assetsCreateNestedOneWithoutAsset_imagesInput
  }

  export type asset_imagesUncheckedCreateWithoutMain_forInput = {
    id?: bigint | number
    asset_id: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
  }

  export type asset_imagesCreateOrConnectWithoutMain_forInput = {
    where: asset_imagesWhereUniqueInput
    create: XOR<asset_imagesCreateWithoutMain_forInput, asset_imagesUncheckedCreateWithoutMain_forInput>
  }

  export type asset_transactionsCreateWithoutAssetInput = {
    id?: bigint | number
    transaction_type: string
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    previous_holder?: employeesCreateNestedOneWithoutPrevious_transInput
    new_holder?: employeesCreateNestedOneWithoutNew_transInput
  }

  export type asset_transactionsUncheckedCreateWithoutAssetInput = {
    id?: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsCreateOrConnectWithoutAssetInput = {
    where: asset_transactionsWhereUniqueInput
    create: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput>
  }

  export type asset_transactionsCreateManyAssetInputEnvelope = {
    data: asset_transactionsCreateManyAssetInput | asset_transactionsCreateManyAssetInput[]
    skipDuplicates?: boolean
  }

  export type log_crudCreateWithoutAssetsInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    created_at?: Date | string
    user?: usersCreateNestedOneWithoutLog_crudsInput
  }

  export type log_crudUncheckedCreateWithoutAssetsInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    user_id?: bigint | number | null
    created_at?: Date | string
  }

  export type log_crudCreateOrConnectWithoutAssetsInput = {
    where: log_crudWhereUniqueInput
    create: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput>
  }

  export type asset_imagesCreateWithoutAssetInput = {
    id?: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
    main_for?: assetsCreateNestedOneWithoutMain_imageInput
  }

  export type asset_imagesUncheckedCreateWithoutAssetInput = {
    id?: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
    main_for?: assetsUncheckedCreateNestedOneWithoutMain_imageInput
  }

  export type asset_imagesCreateOrConnectWithoutAssetInput = {
    where: asset_imagesWhereUniqueInput
    create: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput>
  }

  export type asset_imagesCreateManyAssetInputEnvelope = {
    data: asset_imagesCreateManyAssetInput | asset_imagesCreateManyAssetInput[]
    skipDuplicates?: boolean
  }

  export type asset_typesUpsertWithoutAssetsInput = {
    update: XOR<asset_typesUpdateWithoutAssetsInput, asset_typesUncheckedUpdateWithoutAssetsInput>
    create: XOR<asset_typesCreateWithoutAssetsInput, asset_typesUncheckedCreateWithoutAssetsInput>
    where?: asset_typesWhereInput
  }

  export type asset_typesUpdateToOneWithWhereWithoutAssetsInput = {
    where?: asset_typesWhereInput
    data: XOR<asset_typesUpdateWithoutAssetsInput, asset_typesUncheckedUpdateWithoutAssetsInput>
  }

  export type asset_typesUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_typesUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriesUpsertWithoutAssetsInput = {
    update: XOR<categoriesUpdateWithoutAssetsInput, categoriesUncheckedUpdateWithoutAssetsInput>
    create: XOR<categoriesCreateWithoutAssetsInput, categoriesUncheckedCreateWithoutAssetsInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutAssetsInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutAssetsInput, categoriesUncheckedUpdateWithoutAssetsInput>
  }

  export type categoriesUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriesUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type brandsUpsertWithoutAssetsInput = {
    update: XOR<brandsUpdateWithoutAssetsInput, brandsUncheckedUpdateWithoutAssetsInput>
    create: XOR<brandsCreateWithoutAssetsInput, brandsUncheckedCreateWithoutAssetsInput>
    where?: brandsWhereInput
  }

  export type brandsUpdateToOneWithWhereWithoutAssetsInput = {
    where?: brandsWhereInput
    data: XOR<brandsUpdateWithoutAssetsInput, brandsUncheckedUpdateWithoutAssetsInput>
  }

  export type brandsUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type brandsUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type areasUpsertWithoutAssetsInput = {
    update: XOR<areasUpdateWithoutAssetsInput, areasUncheckedUpdateWithoutAssetsInput>
    create: XOR<areasCreateWithoutAssetsInput, areasUncheckedCreateWithoutAssetsInput>
    where?: areasWhereInput
  }

  export type areasUpdateToOneWithWhereWithoutAssetsInput = {
    where?: areasWhereInput
    data: XOR<areasUpdateWithoutAssetsInput, areasUncheckedUpdateWithoutAssetsInput>
  }

  export type areasUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locations?: locationsUpdateManyWithoutAreaNestedInput
  }

  export type areasUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locations?: locationsUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type locationsUpsertWithoutAssetsInput = {
    update: XOR<locationsUpdateWithoutAssetsInput, locationsUncheckedUpdateWithoutAssetsInput>
    create: XOR<locationsCreateWithoutAssetsInput, locationsUncheckedCreateWithoutAssetsInput>
    where?: locationsWhereInput
  }

  export type locationsUpdateToOneWithWhereWithoutAssetsInput = {
    where?: locationsWhereInput
    data: XOR<locationsUpdateWithoutAssetsInput, locationsUncheckedUpdateWithoutAssetsInput>
  }

  export type locationsUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    area?: areasUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type locationsUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    area_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesUpsertWithoutAssetsInput = {
    update: XOR<employeesUpdateWithoutAssetsInput, employeesUncheckedUpdateWithoutAssetsInput>
    create: XOR<employeesCreateWithoutAssetsInput, employeesUncheckedCreateWithoutAssetsInput>
    where?: employeesWhereInput
  }

  export type employeesUpdateToOneWithWhereWithoutAssetsInput = {
    where?: employeesWhereInput
    data: XOR<employeesUpdateWithoutAssetsInput, employeesUncheckedUpdateWithoutAssetsInput>
  }

  export type employeesUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: departmentsUpdateOneWithoutEmployeesNestedInput
    previous_trans?: asset_transactionsUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUpdateManyWithoutNew_holderNestedInput
  }

  export type employeesUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_trans?: asset_transactionsUncheckedUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUncheckedUpdateManyWithoutNew_holderNestedInput
  }

  export type suppliersUpsertWithoutAssetsInput = {
    update: XOR<suppliersUpdateWithoutAssetsInput, suppliersUncheckedUpdateWithoutAssetsInput>
    create: XOR<suppliersCreateWithoutAssetsInput, suppliersUncheckedCreateWithoutAssetsInput>
    where?: suppliersWhereInput
  }

  export type suppliersUpdateToOneWithWhereWithoutAssetsInput = {
    where?: suppliersWhereInput
    data: XOR<suppliersUpdateWithoutAssetsInput, suppliersUncheckedUpdateWithoutAssetsInput>
  }

  export type suppliersUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type suppliersUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_imagesUpsertWithoutMain_forInput = {
    update: XOR<asset_imagesUpdateWithoutMain_forInput, asset_imagesUncheckedUpdateWithoutMain_forInput>
    create: XOR<asset_imagesCreateWithoutMain_forInput, asset_imagesUncheckedCreateWithoutMain_forInput>
    where?: asset_imagesWhereInput
  }

  export type asset_imagesUpdateToOneWithWhereWithoutMain_forInput = {
    where?: asset_imagesWhereInput
    data: XOR<asset_imagesUpdateWithoutMain_forInput, asset_imagesUncheckedUpdateWithoutMain_forInput>
  }

  export type asset_imagesUpdateWithoutMain_forInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: assetsUpdateOneRequiredWithoutAsset_imagesNestedInput
  }

  export type asset_imagesUncheckedUpdateWithoutMain_forInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type asset_transactionsUpsertWithWhereUniqueWithoutAssetInput = {
    where: asset_transactionsWhereUniqueInput
    update: XOR<asset_transactionsUpdateWithoutAssetInput, asset_transactionsUncheckedUpdateWithoutAssetInput>
    create: XOR<asset_transactionsCreateWithoutAssetInput, asset_transactionsUncheckedCreateWithoutAssetInput>
  }

  export type asset_transactionsUpdateWithWhereUniqueWithoutAssetInput = {
    where: asset_transactionsWhereUniqueInput
    data: XOR<asset_transactionsUpdateWithoutAssetInput, asset_transactionsUncheckedUpdateWithoutAssetInput>
  }

  export type asset_transactionsUpdateManyWithWhereWithoutAssetInput = {
    where: asset_transactionsScalarWhereInput
    data: XOR<asset_transactionsUpdateManyMutationInput, asset_transactionsUncheckedUpdateManyWithoutAssetInput>
  }

  export type asset_transactionsScalarWhereInput = {
    AND?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
    OR?: asset_transactionsScalarWhereInput[]
    NOT?: asset_transactionsScalarWhereInput | asset_transactionsScalarWhereInput[]
    id?: BigIntFilter<"asset_transactions"> | bigint | number
    asset_id?: BigIntFilter<"asset_transactions"> | bigint | number
    transaction_type?: StringFilter<"asset_transactions"> | string
    previous_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    new_holder_id?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    previous_location?: StringNullableFilter<"asset_transactions"> | string | null
    new_location?: StringNullableFilter<"asset_transactions"> | string | null
    previous_condition?: StringNullableFilter<"asset_transactions"> | string | null
    new_condition?: StringNullableFilter<"asset_transactions"> | string | null
    remarks?: StringNullableFilter<"asset_transactions"> | string | null
    transaction_date?: DateTimeFilter<"asset_transactions"> | Date | string
    created_by?: BigIntNullableFilter<"asset_transactions"> | bigint | number | null
    creator_name?: StringNullableFilter<"asset_transactions"> | string | null
    created_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"asset_transactions"> | Date | string | null
  }

  export type log_crudUpsertWithWhereUniqueWithoutAssetsInput = {
    where: log_crudWhereUniqueInput
    update: XOR<log_crudUpdateWithoutAssetsInput, log_crudUncheckedUpdateWithoutAssetsInput>
    create: XOR<log_crudCreateWithoutAssetsInput, log_crudUncheckedCreateWithoutAssetsInput>
  }

  export type log_crudUpdateWithWhereUniqueWithoutAssetsInput = {
    where: log_crudWhereUniqueInput
    data: XOR<log_crudUpdateWithoutAssetsInput, log_crudUncheckedUpdateWithoutAssetsInput>
  }

  export type log_crudUpdateManyWithWhereWithoutAssetsInput = {
    where: log_crudScalarWhereInput
    data: XOR<log_crudUpdateManyMutationInput, log_crudUncheckedUpdateManyWithoutAssetsInput>
  }

  export type log_crudScalarWhereInput = {
    AND?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
    OR?: log_crudScalarWhereInput[]
    NOT?: log_crudScalarWhereInput | log_crudScalarWhereInput[]
    id?: BigIntFilter<"log_crud"> | bigint | number
    table_name?: StringFilter<"log_crud"> | string
    sap_id?: StringNullableFilter<"log_crud"> | string | null
    operation?: StringFilter<"log_crud"> | string
    old_data?: StringNullableFilter<"log_crud"> | string | null
    new_data?: StringNullableFilter<"log_crud"> | string | null
    user_id?: BigIntNullableFilter<"log_crud"> | bigint | number | null
    created_at?: DateTimeFilter<"log_crud"> | Date | string
  }

  export type asset_imagesUpsertWithWhereUniqueWithoutAssetInput = {
    where: asset_imagesWhereUniqueInput
    update: XOR<asset_imagesUpdateWithoutAssetInput, asset_imagesUncheckedUpdateWithoutAssetInput>
    create: XOR<asset_imagesCreateWithoutAssetInput, asset_imagesUncheckedCreateWithoutAssetInput>
  }

  export type asset_imagesUpdateWithWhereUniqueWithoutAssetInput = {
    where: asset_imagesWhereUniqueInput
    data: XOR<asset_imagesUpdateWithoutAssetInput, asset_imagesUncheckedUpdateWithoutAssetInput>
  }

  export type asset_imagesUpdateManyWithWhereWithoutAssetInput = {
    where: asset_imagesScalarWhereInput
    data: XOR<asset_imagesUpdateManyMutationInput, asset_imagesUncheckedUpdateManyWithoutAssetInput>
  }

  export type asset_imagesScalarWhereInput = {
    AND?: asset_imagesScalarWhereInput | asset_imagesScalarWhereInput[]
    OR?: asset_imagesScalarWhereInput[]
    NOT?: asset_imagesScalarWhereInput | asset_imagesScalarWhereInput[]
    id?: BigIntFilter<"asset_images"> | bigint | number
    asset_id?: BigIntFilter<"asset_images"> | bigint | number
    name?: StringFilter<"asset_images"> | string
    url?: StringNullableFilter<"asset_images"> | string | null
    created_at?: DateTimeFilter<"asset_images"> | Date | string
  }

  export type assetsCreateWithoutAsset_typeInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutAsset_typeInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutAsset_typeInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput>
  }

  export type assetsCreateManyAsset_typeInputEnvelope = {
    data: assetsCreateManyAsset_typeInput | assetsCreateManyAsset_typeInput[]
    skipDuplicates?: boolean
  }

  export type assetsUpsertWithWhereUniqueWithoutAsset_typeInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutAsset_typeInput, assetsUncheckedUpdateWithoutAsset_typeInput>
    create: XOR<assetsCreateWithoutAsset_typeInput, assetsUncheckedCreateWithoutAsset_typeInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutAsset_typeInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutAsset_typeInput, assetsUncheckedUpdateWithoutAsset_typeInput>
  }

  export type assetsUpdateManyWithWhereWithoutAsset_typeInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutAsset_typeInput>
  }

  export type assetsCreateWithoutAsset_imagesInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
  }

  export type assetsUncheckedCreateWithoutAsset_imagesInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
  }

  export type assetsCreateOrConnectWithoutAsset_imagesInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutAsset_imagesInput, assetsUncheckedCreateWithoutAsset_imagesInput>
  }

  export type assetsCreateWithoutMain_imageInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutMain_imageInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutMain_imageInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
  }

  export type assetsUpsertWithoutAsset_imagesInput = {
    update: XOR<assetsUpdateWithoutAsset_imagesInput, assetsUncheckedUpdateWithoutAsset_imagesInput>
    create: XOR<assetsCreateWithoutAsset_imagesInput, assetsUncheckedCreateWithoutAsset_imagesInput>
    where?: assetsWhereInput
  }

  export type assetsUpdateToOneWithWhereWithoutAsset_imagesInput = {
    where?: assetsWhereInput
    data: XOR<assetsUpdateWithoutAsset_imagesInput, assetsUncheckedUpdateWithoutAsset_imagesInput>
  }

  export type assetsUpdateWithoutAsset_imagesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
  }

  export type assetsUncheckedUpdateWithoutAsset_imagesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
  }

  export type assetsUpsertWithoutMain_imageInput = {
    update: XOR<assetsUpdateWithoutMain_imageInput, assetsUncheckedUpdateWithoutMain_imageInput>
    create: XOR<assetsCreateWithoutMain_imageInput, assetsUncheckedCreateWithoutMain_imageInput>
    where?: assetsWhereInput
  }

  export type assetsUpdateToOneWithWhereWithoutMain_imageInput = {
    where?: assetsWhereInput
    data: XOR<assetsUpdateWithoutMain_imageInput, assetsUncheckedUpdateWithoutMain_imageInput>
  }

  export type assetsUpdateWithoutMain_imageInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutMain_imageInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsCreateWithoutBrandInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutBrandInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutBrandInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput>
  }

  export type assetsCreateManyBrandInputEnvelope = {
    data: assetsCreateManyBrandInput | assetsCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type assetsUpsertWithWhereUniqueWithoutBrandInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutBrandInput, assetsUncheckedUpdateWithoutBrandInput>
    create: XOR<assetsCreateWithoutBrandInput, assetsUncheckedCreateWithoutBrandInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutBrandInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutBrandInput, assetsUncheckedUpdateWithoutBrandInput>
  }

  export type assetsUpdateManyWithWhereWithoutBrandInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutBrandInput>
  }

  export type assetsCreateWithoutCategoryInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutCategoryInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutCategoryInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput>
  }

  export type assetsCreateManyCategoryInputEnvelope = {
    data: assetsCreateManyCategoryInput | assetsCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type assetsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutCategoryInput, assetsUncheckedUpdateWithoutCategoryInput>
    create: XOR<assetsCreateWithoutCategoryInput, assetsUncheckedCreateWithoutCategoryInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutCategoryInput, assetsUncheckedUpdateWithoutCategoryInput>
  }

  export type assetsUpdateManyWithWhereWithoutCategoryInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type employeesCreateWithoutDepartmentInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    previous_trans?: asset_transactionsCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsCreateNestedManyWithoutNew_holderInput
    assets?: assetsCreateNestedManyWithoutEmployeeInput
  }

  export type employeesUncheckedCreateWithoutDepartmentInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    previous_trans?: asset_transactionsUncheckedCreateNestedManyWithoutPrevious_holderInput
    new_trans?: asset_transactionsUncheckedCreateNestedManyWithoutNew_holderInput
    assets?: assetsUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeesCreateOrConnectWithoutDepartmentInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput>
  }

  export type employeesCreateManyDepartmentInputEnvelope = {
    data: employeesCreateManyDepartmentInput | employeesCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type employeesUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: employeesWhereUniqueInput
    update: XOR<employeesUpdateWithoutDepartmentInput, employeesUncheckedUpdateWithoutDepartmentInput>
    create: XOR<employeesCreateWithoutDepartmentInput, employeesUncheckedCreateWithoutDepartmentInput>
  }

  export type employeesUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: employeesWhereUniqueInput
    data: XOR<employeesUpdateWithoutDepartmentInput, employeesUncheckedUpdateWithoutDepartmentInput>
  }

  export type employeesUpdateManyWithWhereWithoutDepartmentInput = {
    where: employeesScalarWhereInput
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type employeesScalarWhereInput = {
    AND?: employeesScalarWhereInput | employeesScalarWhereInput[]
    OR?: employeesScalarWhereInput[]
    NOT?: employeesScalarWhereInput | employeesScalarWhereInput[]
    id?: BigIntFilter<"employees"> | bigint | number
    nik?: StringFilter<"employees"> | string
    nama?: StringFilter<"employees"> | string
    gender?: StringFilter<"employees"> | string
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    department_id?: BigIntNullableFilter<"employees"> | bigint | number | null
  }

  export type departmentsCreateWithoutEmployeesInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type departmentsUncheckedCreateWithoutEmployeesInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type departmentsCreateOrConnectWithoutEmployeesInput = {
    where: departmentsWhereUniqueInput
    create: XOR<departmentsCreateWithoutEmployeesInput, departmentsUncheckedCreateWithoutEmployeesInput>
  }

  export type asset_transactionsCreateWithoutPrevious_holderInput = {
    id?: bigint | number
    transaction_type: string
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    asset: assetsCreateNestedOneWithoutTransactionsInput
    new_holder?: employeesCreateNestedOneWithoutNew_transInput
  }

  export type asset_transactionsUncheckedCreateWithoutPrevious_holderInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsCreateOrConnectWithoutPrevious_holderInput = {
    where: asset_transactionsWhereUniqueInput
    create: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput>
  }

  export type asset_transactionsCreateManyPrevious_holderInputEnvelope = {
    data: asset_transactionsCreateManyPrevious_holderInput | asset_transactionsCreateManyPrevious_holderInput[]
    skipDuplicates?: boolean
  }

  export type asset_transactionsCreateWithoutNew_holderInput = {
    id?: bigint | number
    transaction_type: string
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    asset: assetsCreateNestedOneWithoutTransactionsInput
    previous_holder?: employeesCreateNestedOneWithoutPrevious_transInput
  }

  export type asset_transactionsUncheckedCreateWithoutNew_holderInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsCreateOrConnectWithoutNew_holderInput = {
    where: asset_transactionsWhereUniqueInput
    create: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput>
  }

  export type asset_transactionsCreateManyNew_holderInputEnvelope = {
    data: asset_transactionsCreateManyNew_holderInput | asset_transactionsCreateManyNew_holderInput[]
    skipDuplicates?: boolean
  }

  export type assetsCreateWithoutEmployeeInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutEmployeeInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutEmployeeInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput>
  }

  export type assetsCreateManyEmployeeInputEnvelope = {
    data: assetsCreateManyEmployeeInput | assetsCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type departmentsUpsertWithoutEmployeesInput = {
    update: XOR<departmentsUpdateWithoutEmployeesInput, departmentsUncheckedUpdateWithoutEmployeesInput>
    create: XOR<departmentsCreateWithoutEmployeesInput, departmentsUncheckedCreateWithoutEmployeesInput>
    where?: departmentsWhereInput
  }

  export type departmentsUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: departmentsWhereInput
    data: XOR<departmentsUpdateWithoutEmployeesInput, departmentsUncheckedUpdateWithoutEmployeesInput>
  }

  export type departmentsUpdateWithoutEmployeesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type departmentsUncheckedUpdateWithoutEmployeesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUpsertWithWhereUniqueWithoutPrevious_holderInput = {
    where: asset_transactionsWhereUniqueInput
    update: XOR<asset_transactionsUpdateWithoutPrevious_holderInput, asset_transactionsUncheckedUpdateWithoutPrevious_holderInput>
    create: XOR<asset_transactionsCreateWithoutPrevious_holderInput, asset_transactionsUncheckedCreateWithoutPrevious_holderInput>
  }

  export type asset_transactionsUpdateWithWhereUniqueWithoutPrevious_holderInput = {
    where: asset_transactionsWhereUniqueInput
    data: XOR<asset_transactionsUpdateWithoutPrevious_holderInput, asset_transactionsUncheckedUpdateWithoutPrevious_holderInput>
  }

  export type asset_transactionsUpdateManyWithWhereWithoutPrevious_holderInput = {
    where: asset_transactionsScalarWhereInput
    data: XOR<asset_transactionsUpdateManyMutationInput, asset_transactionsUncheckedUpdateManyWithoutPrevious_holderInput>
  }

  export type asset_transactionsUpsertWithWhereUniqueWithoutNew_holderInput = {
    where: asset_transactionsWhereUniqueInput
    update: XOR<asset_transactionsUpdateWithoutNew_holderInput, asset_transactionsUncheckedUpdateWithoutNew_holderInput>
    create: XOR<asset_transactionsCreateWithoutNew_holderInput, asset_transactionsUncheckedCreateWithoutNew_holderInput>
  }

  export type asset_transactionsUpdateWithWhereUniqueWithoutNew_holderInput = {
    where: asset_transactionsWhereUniqueInput
    data: XOR<asset_transactionsUpdateWithoutNew_holderInput, asset_transactionsUncheckedUpdateWithoutNew_holderInput>
  }

  export type asset_transactionsUpdateManyWithWhereWithoutNew_holderInput = {
    where: asset_transactionsScalarWhereInput
    data: XOR<asset_transactionsUpdateManyMutationInput, asset_transactionsUncheckedUpdateManyWithoutNew_holderInput>
  }

  export type assetsUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutEmployeeInput, assetsUncheckedUpdateWithoutEmployeeInput>
    create: XOR<assetsCreateWithoutEmployeeInput, assetsUncheckedCreateWithoutEmployeeInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutEmployeeInput, assetsUncheckedUpdateWithoutEmployeeInput>
  }

  export type assetsUpdateManyWithWhereWithoutEmployeeInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type areasCreateWithoutLocationsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutAreaInput
  }

  export type areasUncheckedCreateWithoutLocationsInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutAreaInput
  }

  export type areasCreateOrConnectWithoutLocationsInput = {
    where: areasWhereUniqueInput
    create: XOR<areasCreateWithoutLocationsInput, areasUncheckedCreateWithoutLocationsInput>
  }

  export type assetsCreateWithoutLocationInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutLocationInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutLocationInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput>
  }

  export type assetsCreateManyLocationInputEnvelope = {
    data: assetsCreateManyLocationInput | assetsCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type areasUpsertWithoutLocationsInput = {
    update: XOR<areasUpdateWithoutLocationsInput, areasUncheckedUpdateWithoutLocationsInput>
    create: XOR<areasCreateWithoutLocationsInput, areasUncheckedCreateWithoutLocationsInput>
    where?: areasWhereInput
  }

  export type areasUpdateToOneWithWhereWithoutLocationsInput = {
    where?: areasWhereInput
    data: XOR<areasUpdateWithoutLocationsInput, areasUncheckedUpdateWithoutLocationsInput>
  }

  export type areasUpdateWithoutLocationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutAreaNestedInput
  }

  export type areasUncheckedUpdateWithoutLocationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type assetsUpsertWithWhereUniqueWithoutLocationInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutLocationInput, assetsUncheckedUpdateWithoutLocationInput>
    create: XOR<assetsCreateWithoutLocationInput, assetsUncheckedCreateWithoutLocationInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutLocationInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutLocationInput, assetsUncheckedUpdateWithoutLocationInput>
  }

  export type assetsUpdateManyWithWhereWithoutLocationInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutLocationInput>
  }

  export type usersCreateWithoutLog_crudsInput = {
    id?: bigint | number
    name: string
    email: string
    email_verified_at?: Date | string | null
    password: string
    remember_token?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUncheckedCreateWithoutLog_crudsInput = {
    id?: bigint | number
    name: string
    email: string
    email_verified_at?: Date | string | null
    password: string
    remember_token?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersCreateOrConnectWithoutLog_crudsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLog_crudsInput, usersUncheckedCreateWithoutLog_crudsInput>
  }

  export type assetsCreateWithoutLog_crudsInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    supplier_rec?: suppliersCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutLog_crudsInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutLog_crudsInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput>
  }

  export type usersUpsertWithoutLog_crudsInput = {
    update: XOR<usersUpdateWithoutLog_crudsInput, usersUncheckedUpdateWithoutLog_crudsInput>
    create: XOR<usersCreateWithoutLog_crudsInput, usersUncheckedCreateWithoutLog_crudsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLog_crudsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLog_crudsInput, usersUncheckedUpdateWithoutLog_crudsInput>
  }

  export type usersUpdateWithoutLog_crudsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateWithoutLog_crudsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    remember_token?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsUpsertWithWhereUniqueWithoutLog_crudsInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutLog_crudsInput, assetsUncheckedUpdateWithoutLog_crudsInput>
    create: XOR<assetsCreateWithoutLog_crudsInput, assetsUncheckedCreateWithoutLog_crudsInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutLog_crudsInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutLog_crudsInput, assetsUncheckedUpdateWithoutLog_crudsInput>
  }

  export type assetsUpdateManyWithWhereWithoutLog_crudsInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutLog_crudsInput>
  }

  export type assetsCreateWithoutSupplier_recInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    condition?: $Enums.AssetCondition
    asset_type?: asset_typesCreateNestedOneWithoutAssetsInput
    category?: categoriesCreateNestedOneWithoutAssetsInput
    brand?: brandsCreateNestedOneWithoutAssetsInput
    area?: areasCreateNestedOneWithoutAssetsInput
    location?: locationsCreateNestedOneWithoutAssetsInput
    employee?: employeesCreateNestedOneWithoutAssetsInput
    main_image?: asset_imagesCreateNestedOneWithoutMain_forInput
    transactions?: asset_transactionsCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesCreateNestedManyWithoutAssetInput
  }

  export type assetsUncheckedCreateWithoutSupplier_recInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedCreateNestedManyWithoutAssetInput
    log_cruds?: log_crudUncheckedCreateNestedManyWithoutAssetsInput
    asset_images?: asset_imagesUncheckedCreateNestedManyWithoutAssetInput
  }

  export type assetsCreateOrConnectWithoutSupplier_recInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput>
  }

  export type assetsCreateManySupplier_recInputEnvelope = {
    data: assetsCreateManySupplier_recInput | assetsCreateManySupplier_recInput[]
    skipDuplicates?: boolean
  }

  export type assetsUpsertWithWhereUniqueWithoutSupplier_recInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutSupplier_recInput, assetsUncheckedUpdateWithoutSupplier_recInput>
    create: XOR<assetsCreateWithoutSupplier_recInput, assetsUncheckedCreateWithoutSupplier_recInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutSupplier_recInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutSupplier_recInput, assetsUncheckedUpdateWithoutSupplier_recInput>
  }

  export type assetsUpdateManyWithWhereWithoutSupplier_recInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutSupplier_recInput>
  }

  export type log_crudCreateWithoutUserInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    created_at?: Date | string
    assets?: assetsCreateNestedManyWithoutLog_crudsInput
  }

  export type log_crudUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    created_at?: Date | string
    assets?: assetsUncheckedCreateNestedManyWithoutLog_crudsInput
  }

  export type log_crudCreateOrConnectWithoutUserInput = {
    where: log_crudWhereUniqueInput
    create: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput>
  }

  export type log_crudCreateManyUserInputEnvelope = {
    data: log_crudCreateManyUserInput | log_crudCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type log_crudUpsertWithWhereUniqueWithoutUserInput = {
    where: log_crudWhereUniqueInput
    update: XOR<log_crudUpdateWithoutUserInput, log_crudUncheckedUpdateWithoutUserInput>
    create: XOR<log_crudCreateWithoutUserInput, log_crudUncheckedCreateWithoutUserInput>
  }

  export type log_crudUpdateWithWhereUniqueWithoutUserInput = {
    where: log_crudWhereUniqueInput
    data: XOR<log_crudUpdateWithoutUserInput, log_crudUncheckedUpdateWithoutUserInput>
  }

  export type log_crudUpdateManyWithWhereWithoutUserInput = {
    where: log_crudScalarWhereInput
    data: XOR<log_crudUpdateManyMutationInput, log_crudUncheckedUpdateManyWithoutUserInput>
  }

  export type locationsCreateManyAreaInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type assetsCreateManyAreaInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type locationsUpdateWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutLocationNestedInput
  }

  export type locationsUncheckedUpdateWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationsUncheckedUpdateManyWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsUpdateWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutAreaInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type asset_transactionsCreateManyAssetInput = {
    id?: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_imagesCreateManyAssetInput = {
    id?: bigint | number
    name: string
    url?: string | null
    created_at?: Date | string
  }

  export type asset_transactionsUpdateWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previous_holder?: employeesUpdateOneWithoutPrevious_transNestedInput
    new_holder?: employeesUpdateOneWithoutNew_transNestedInput
  }

  export type asset_transactionsUncheckedUpdateWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUncheckedUpdateManyWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type log_crudUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneWithoutLog_crudsNestedInput
  }

  export type log_crudUncheckedUpdateWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type log_crudUncheckedUpdateManyWithoutAssetsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type asset_imagesUpdateWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    main_for?: assetsUpdateOneWithoutMain_imageNestedInput
  }

  export type asset_imagesUncheckedUpdateWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    main_for?: assetsUncheckedUpdateOneWithoutMain_imageNestedInput
  }

  export type asset_imagesUncheckedUpdateManyWithoutAssetInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type assetsCreateManyAsset_typeInput = {
    id?: bigint | number
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateWithoutAsset_typeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutAsset_typeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutAsset_typeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsCreateManyBrandInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateWithoutBrandInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutBrandInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutBrandInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsCreateManyCategoryInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateWithoutCategoryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutCategoryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutCategoryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type employeesCreateManyDepartmentInput = {
    id?: bigint | number
    nik: string
    nama: string
    gender: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type employeesUpdateWithoutDepartmentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previous_trans?: asset_transactionsUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateWithoutDepartmentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    previous_trans?: asset_transactionsUncheckedUpdateManyWithoutPrevious_holderNestedInput
    new_trans?: asset_transactionsUncheckedUpdateManyWithoutNew_holderNestedInput
    assets?: assetsUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeesUncheckedUpdateManyWithoutDepartmentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    nik?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsCreateManyPrevious_holderInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    new_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type asset_transactionsCreateManyNew_holderInput = {
    id?: bigint | number
    asset_id: bigint | number
    transaction_type: string
    previous_holder_id?: bigint | number | null
    previous_location?: string | null
    new_location?: string | null
    previous_condition?: string | null
    new_condition?: string | null
    remarks?: string | null
    transaction_date?: Date | string
    created_by?: bigint | number | null
    creator_name?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type assetsCreateManyEmployeeInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type asset_transactionsUpdateWithoutPrevious_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    asset?: assetsUpdateOneRequiredWithoutTransactionsNestedInput
    new_holder?: employeesUpdateOneWithoutNew_transNestedInput
  }

  export type asset_transactionsUncheckedUpdateWithoutPrevious_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUncheckedUpdateManyWithoutPrevious_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    new_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUpdateWithoutNew_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    asset?: assetsUpdateOneRequiredWithoutTransactionsNestedInput
    previous_holder?: employeesUpdateOneWithoutPrevious_transNestedInput
  }

  export type asset_transactionsUncheckedUpdateWithoutNew_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type asset_transactionsUncheckedUpdateManyWithoutNew_holderInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    asset_id?: BigIntFieldUpdateOperationsInput | bigint | number
    transaction_type?: StringFieldUpdateOperationsInput | string
    previous_holder_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    previous_location?: NullableStringFieldUpdateOperationsInput | string | null
    new_location?: NullableStringFieldUpdateOperationsInput | string | null
    previous_condition?: NullableStringFieldUpdateOperationsInput | string | null
    new_condition?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    creator_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsUpdateWithoutEmployeeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutEmployeeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutEmployeeInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsCreateManyLocationInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    employee_id?: bigint | number | null
    supplier_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateWithoutLocationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutLocationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutLocationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsUpdateWithoutLog_crudsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    supplier_rec?: suppliersUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutLog_crudsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutLog_crudsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    supplier_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type assetsCreateManySupplier_recInput = {
    id?: bigint | number
    type_id?: bigint | number | null
    serial_number: string
    sap_id?: string | null
    purchase_date?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: bigint | number | null
    brand_id?: bigint | number | null
    area_id?: bigint | number | null
    location_id?: bigint | number | null
    employee_id?: bigint | number | null
    image_id?: bigint | number | null
    condition?: $Enums.AssetCondition
  }

  export type assetsUpdateWithoutSupplier_recInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    asset_type?: asset_typesUpdateOneWithoutAssetsNestedInput
    category?: categoriesUpdateOneWithoutAssetsNestedInput
    brand?: brandsUpdateOneWithoutAssetsNestedInput
    area?: areasUpdateOneWithoutAssetsNestedInput
    location?: locationsUpdateOneWithoutAssetsNestedInput
    employee?: employeesUpdateOneWithoutAssetsNestedInput
    main_image?: asset_imagesUpdateOneWithoutMain_forNestedInput
    transactions?: asset_transactionsUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateWithoutSupplier_recInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
    transactions?: asset_transactionsUncheckedUpdateManyWithoutAssetNestedInput
    log_cruds?: log_crudUncheckedUpdateManyWithoutAssetsNestedInput
    asset_images?: asset_imagesUncheckedUpdateManyWithoutAssetNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutSupplier_recInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    serial_number?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    brand_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    area_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    location_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    employee_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    image_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    condition?: EnumAssetConditionFieldUpdateOperationsInput | $Enums.AssetCondition
  }

  export type log_crudCreateManyUserInput = {
    id?: bigint | number
    table_name: string
    sap_id?: string | null
    operation: string
    old_data?: string | null
    new_data?: string | null
    created_at?: Date | string
  }

  export type log_crudUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: assetsUpdateManyWithoutLog_crudsNestedInput
  }

  export type log_crudUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: assetsUncheckedUpdateManyWithoutLog_crudsNestedInput
  }

  export type log_crudUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    table_name?: StringFieldUpdateOperationsInput | string
    sap_id?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: StringFieldUpdateOperationsInput | string
    old_data?: NullableStringFieldUpdateOperationsInput | string | null
    new_data?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AreasCountOutputTypeDefaultArgs instead
     */
    export type AreasCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AreasCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AssetsCountOutputTypeDefaultArgs instead
     */
    export type AssetsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssetsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Asset_typesCountOutputTypeDefaultArgs instead
     */
    export type Asset_typesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Asset_typesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BrandsCountOutputTypeDefaultArgs instead
     */
    export type BrandsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BrandsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoriesCountOutputTypeDefaultArgs instead
     */
    export type CategoriesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoriesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentsCountOutputTypeDefaultArgs instead
     */
    export type DepartmentsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeesCountOutputTypeDefaultArgs instead
     */
    export type EmployeesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LocationsCountOutputTypeDefaultArgs instead
     */
    export type LocationsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocationsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Log_crudCountOutputTypeDefaultArgs instead
     */
    export type Log_crudCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Log_crudCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SuppliersCountOutputTypeDefaultArgs instead
     */
    export type SuppliersCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SuppliersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersCountOutputTypeDefaultArgs instead
     */
    export type UsersCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use areasDefaultArgs instead
     */
    export type areasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = areasDefaultArgs<ExtArgs>
    /**
     * @deprecated Use asset_transactionsDefaultArgs instead
     */
    export type asset_transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = asset_transactionsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use assetsDefaultArgs instead
     */
    export type assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = assetsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use activity_logDefaultArgs instead
     */
    export type activity_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = activity_logDefaultArgs<ExtArgs>
    /**
     * @deprecated Use asset_typesDefaultArgs instead
     */
    export type asset_typesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = asset_typesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use asset_imagesDefaultArgs instead
     */
    export type asset_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = asset_imagesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use brandsDefaultArgs instead
     */
    export type brandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = brandsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use categoriesDefaultArgs instead
     */
    export type categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = categoriesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use departmentsDefaultArgs instead
     */
    export type departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = departmentsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use employeesDefaultArgs instead
     */
    export type employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = employeesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use locationsDefaultArgs instead
     */
    export type locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = locationsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use log_crudDefaultArgs instead
     */
    export type log_crudArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = log_crudDefaultArgs<ExtArgs>
    /**
     * @deprecated Use suppliersDefaultArgs instead
     */
    export type suppliersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = suppliersDefaultArgs<ExtArgs>
    /**
     * @deprecated Use usersDefaultArgs instead
     */
    export type usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = usersDefaultArgs<ExtArgs>

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