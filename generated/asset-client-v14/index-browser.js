
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.0
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.0",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
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
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AreasScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Asset_transactionsScalarFieldEnum = {
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
  attachment_url: 'attachment_url',
  transaction_date: 'transaction_date',
  created_by: 'created_by',
  creator_name: 'creator_name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AssetsScalarFieldEnum = {
  id: 'id',
  serial_number: 'serial_number',
  sap_id: 'sap_id',
  model: 'model',
  price: 'price',
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

exports.Prisma.Asset_imagesScalarFieldEnum = {
  id: 'id',
  asset_id: 'asset_id',
  name: 'name',
  url: 'url',
  created_at: 'created_at'
};

exports.Prisma.BrandsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CategoriesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DepartmentsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.EmployeesScalarFieldEnum = {
  id: 'id',
  nik: 'nik',
  nama: 'nama',
  gender: 'gender',
  created_at: 'created_at',
  updated_at: 'updated_at',
  department_id: 'department_id'
};

exports.Prisma.LocationsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  area_id: 'area_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SuppliersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contact_person: 'contact_person',
  phone: 'phone',
  email: 'email',
  address: 'address',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  email_verified_at: 'email_verified_at',
  password: 'password',
  remember_token: 'remember_token',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ConsumablesScalarFieldEnum = {
  id: 'id',
  request_date: 'request_date',
  settlement_date: 'settlement_date',
  item_name: 'item_name',
  brand_type: 'brand_type',
  qty_estimated: 'qty_estimated',
  price_estimated: 'price_estimated',
  qty_actual: 'qty_actual',
  unit_price_real: 'unit_price_real',
  subtotal_item: 'subtotal_item',
  shipping_fee: 'shipping_fee',
  grand_total: 'grand_total',
  receipt_image: 'receipt_image',
  item_image: 'item_image',
  purchase_link: 'purchase_link',
  document_number: 'document_number',
  remarks: 'remarks',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AssetCondition = exports.$Enums.AssetCondition = {
  GOOD: 'GOOD',
  SLIGHTLY_DAMAGED: 'SLIGHTLY_DAMAGED',
  DAMAGED: 'DAMAGED',
  BROKEN: 'BROKEN',
  DISPOSED: 'DISPOSED',
  MAINTENANCE: 'MAINTENANCE',
  LOST: 'LOST'
};

exports.ConsumableStatus = exports.$Enums.ConsumableStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED'
};

exports.Prisma.ModelName = {
  areas: 'areas',
  asset_transactions: 'asset_transactions',
  assets: 'assets',
  asset_images: 'asset_images',
  brands: 'brands',
  categories: 'categories',
  departments: 'departments',
  employees: 'employees',
  locations: 'locations',
  suppliers: 'suppliers',
  users: 'users',
  consumables: 'consumables'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
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
