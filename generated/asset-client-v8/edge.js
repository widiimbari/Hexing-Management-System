
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
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/edge.js')


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

exports.Prisma.Activity_logScalarFieldEnum = {
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

exports.Prisma.Asset_typesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
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

exports.Prisma.Log_crudScalarFieldEnum = {
  id: 'id',
  table_name: 'table_name',
  sap_id: 'sap_id',
  operation: 'operation',
  old_data: 'old_data',
  new_data: 'new_data',
  user_id: 'user_id',
  created_at: 'created_at'
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
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

exports.Prisma.ModelName = {
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
      "value": "C:\\Users\\hexing-9\\Documents\\HMS\\generated\\asset-client-v8",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.10.0",
  "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "ASSET_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/asset-client-v8\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"ASSET_DATABASE_URL\")\n}\n\nmodel areas {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @unique @db.VarChar(255)\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  locations  locations[]\n  assets     assets[]\n}\n\nmodel asset_transactions {\n  id                 BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  asset_id           BigInt    @db.UnsignedBigInt\n  transaction_type   String    @db.VarChar(50) // PURCHASE, CONDITION_CHANGE, RELOCATION, ASSIGNMENT\n  previous_holder_id BigInt?   @db.UnsignedBigInt\n  new_holder_id      BigInt?   @db.UnsignedBigInt\n  previous_location  String?   @db.VarChar(255)\n  new_location       String?   @db.VarChar(255)\n  previous_condition String?   @db.VarChar(50)\n  new_condition      String?   @db.VarChar(50)\n  remarks            String?   @db.Text\n  attachment_url     String?   @db.VarChar(255)\n  transaction_date   DateTime  @default(now()) @db.Timestamp(0)\n  created_by         BigInt?   @db.UnsignedBigInt\n  creator_name       String?   @db.VarChar(255)\n  created_at         DateTime? @db.Timestamp(0)\n  updated_at         DateTime? @db.Timestamp(0)\n  \n  asset              assets    @relation(fields: [asset_id], references: [id], onDelete: Cascade, onUpdate: Restrict, map: \"asset_transactions_asset_id_foreign\")\n  // creator            users?    @relation(\"TransactionCreator\", fields: [created_by], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"asset_transactions_created_by_foreign\")\n  previous_holder    employees? @relation(\"TransactionPreviousHolder\", fields: [previous_holder_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"asset_transactions_previous_holder_id_foreign\")\n  new_holder         employees? @relation(\"TransactionNewHolder\", fields: [new_holder_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"asset_transactions_new_holder_id_foreign\")\n\n  @@index([asset_id], map: \"asset_transactions_asset_id_foreign\")\n  @@index([created_by], map: \"asset_transactions_created_by_foreign\")\n  @@index([previous_holder_id], map: \"asset_transactions_previous_holder_id_foreign\")\n  @@index([new_holder_id], map: \"asset_transactions_new_holder_id_foreign\")\n}\n\nmodel assets {\n  id             BigInt   @id @default(autoincrement()) @db.UnsignedBigInt\n  type_id        BigInt?  @db.UnsignedBigInt\n  serial_number  String   @unique @db.VarChar(255)\n  sap_id         String?  @db.VarChar(255)\n  purchase_date  DateTime? @db.Date\n  created_at     DateTime? @db.Timestamp(0)\n  updated_at     DateTime? @db.Timestamp(0)\n  category_id    BigInt?  @db.UnsignedBigInt\n  brand_id       BigInt?  @db.UnsignedBigInt\n  area_id        BigInt?  @db.UnsignedBigInt\n  location_id    BigInt?  @db.UnsignedBigInt\n  employee_id    BigInt?  @db.UnsignedBigInt\n  supplier_id    BigInt?  @db.UnsignedBigInt\n  image_id       BigInt?  @unique @db.UnsignedBigInt\n  \n  asset_type     asset_types? @relation(fields: [type_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_type_id_foreign\")\n  category       categories? @relation(fields: [category_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_category_id_foreign\")\n  brand          brands?     @relation(fields: [brand_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_brand_id_foreign\")\n  area           areas?      @relation(fields: [area_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_area_id_foreign\")\n  location       locations?  @relation(fields: [location_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_location_id_foreign\")\n  employee       employees?  @relation(\"AssetEmployee\", fields: [employee_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_employee_id_foreign\")\n  supplier_rec   suppliers?  @relation(\"AssetSupplier\", fields: [supplier_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_supplier_id_foreign\")\n  main_image     asset_images? @relation(\"AssetMainImage\", fields: [image_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"assets_image_id_foreign\")\n  condition      AssetCondition @default(GOOD)\n  transactions   asset_transactions[]\n  log_cruds      log_crud[]\n  asset_images   asset_images[] @relation(\"AssetImages\")\n\n  @@index([type_id], map: \"assets_type_id_foreign\")\n  @@index([category_id], map: \"assets_category_id_foreign\")\n  @@index([brand_id], map: \"assets_brand_id_foreign\")\n  @@index([area_id], map: \"assets_area_id_foreign\")\n  @@index([location_id], map: \"assets_location_id_foreign\")\n  @@index([employee_id], map: \"assets_employee_id_foreign\")\n  @@index([supplier_id], map: \"assets_supplier_id_foreign\")\n  @@index([image_id], map: \"assets_image_id_foreign\")\n}\n\nenum AssetCondition {\n  GOOD\n  SLIGHTLY_DAMAGED\n  DAMAGED\n  BROKEN\n  DISPOSED\n  MAINTENANCE\n  LOST\n}\n\nmodel activity_log {\n  id          BigInt   @id @default(autoincrement()) @db.UnsignedBigInt\n  action      String   @db.VarChar(50) // CREATE, UPDATE, DELETE, IMPORT, EXPORT\n  entity_type String   @db.VarChar(50) // Asset, Category, etc.\n  entity_id   String   @db.VarChar(255) // ID of the entity\n  details     String?  @db.Text // Description or JSON of changes\n  user_id     String?  @db.VarChar(255) // User who performed the action\n  user_name   String?  @db.VarChar(255)\n  ip_address  String?  @db.VarChar(45)\n  created_at  DateTime @default(now()) @db.Timestamp(0)\n\n  @@index([entity_type, entity_id])\n  @@index([user_id])\n}\n\nmodel asset_types {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @unique @db.VarChar(255)\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  assets     assets[]\n}\n\nmodel asset_images {\n  id         BigInt   @id @default(autoincrement()) @db.UnsignedBigInt\n  asset_id   BigInt   @db.UnsignedBigInt\n  name       String   @db.VarChar(255)\n  url        String?  @db.VarChar(255)\n  created_at DateTime @default(now()) @db.Timestamp(0)\n  \n  asset      assets   @relation(\"AssetImages\", fields: [asset_id], references: [id], onDelete: Cascade, onUpdate: Restrict, map: \"asset_images_asset_id_foreign\")\n  main_for   assets?  @relation(\"AssetMainImage\")\n\n  @@index([asset_id], map: \"asset_images_asset_id_foreign\")\n}\n\nmodel brands {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @unique @db.VarChar(255)\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  assets     assets[]\n}\n\nmodel categories {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @unique @db.VarChar(255)\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  assets     assets[]\n}\n\nmodel departments {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @db.VarChar(255)\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  employees  employees[]\n}\n\nmodel employees {\n  id            BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  nik           String    @unique @db.VarChar(255)\n  nama          String    @db.VarChar(255)\n  gender        String    @db.VarChar(1) // 'L' or 'P'\n  created_at    DateTime? @db.Timestamp(0)\n  updated_at    DateTime? @db.Timestamp(0)\n  department_id BigInt?   @db.UnsignedBigInt\n  \n  department    departments?  @relation(fields: [department_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"employees_department_id_foreign\")\n  \n  previous_trans asset_transactions[] @relation(\"TransactionPreviousHolder\")\n  new_trans      asset_transactions[] @relation(\"TransactionNewHolder\")\n  assets         assets[]             @relation(\"AssetEmployee\")\n  \n  @@index([department_id], map: \"employees_department_id_foreign\")\n}\n\nmodel locations {\n  id         BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name       String    @db.VarChar(255)\n  area_id    BigInt    @db.UnsignedBigInt\n  created_at DateTime? @db.Timestamp(0)\n  updated_at DateTime? @db.Timestamp(0)\n  \n  area       areas   @relation(fields: [area_id], references: [id], onDelete: Cascade, onUpdate: Restrict, map: \"locations_area_id_foreign\")\n  assets     assets[]\n\n  @@index([area_id], map: \"locations_area_id_foreign\")\n}\n\nmodel log_crud {\n  id         BigInt   @id @default(autoincrement()) @db.UnsignedBigInt\n  table_name String   @db.VarChar(255)\n  sap_id     String?  @db.VarChar(255)\n  operation  String   @db.VarChar(10) // 'create', 'update', 'delete'\n  old_data   String?  @db.LongText\n  new_data   String?  @db.LongText\n  user_id    BigInt?  @db.UnsignedBigInt\n  created_at DateTime @default(now()) @db.Timestamp(0)\n  \n  user       users?   @relation(fields: [user_id], references: [id], onDelete: SetNull, onUpdate: Restrict, map: \"log_crud_user_id_foreign\")\n  assets     assets[]\n\n  @@index([user_id], map: \"log_crud_user_id_foreign\")\n}\n\nmodel suppliers {\n  id             BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name           String    @db.VarChar(255)\n  contact_person String?   @db.VarChar(255)\n  phone          String?   @db.VarChar(255)\n  email          String?   @db.VarChar(255)\n  address        String?   @db.Text\n  created_at     DateTime? @db.Timestamp(0)\n  updated_at     DateTime? @db.Timestamp(0)\n  \n  assets         assets[]  @relation(\"AssetSupplier\")\n}\n\nmodel users {\n  id                BigInt    @id @default(autoincrement()) @db.UnsignedBigInt\n  name              String    @db.VarChar(255)\n  email             String    @unique @db.VarChar(255)\n  email_verified_at DateTime? @db.Timestamp(0)\n  password          String    @db.VarChar(255)\n  remember_token    String?   @db.VarChar(100)\n  created_at        DateTime? @db.Timestamp(0)\n  updated_at        DateTime? @db.Timestamp(0)\n  \n  // transactions      asset_transactions[] @relation(\"TransactionCreator\")\n  log_cruds         log_crud[]\n}\n",
  "inlineSchemaHash": "531c619d7a44b5194125a1c92d8720b9b17c80cd70a061f361f94b121d3c9f7f",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"areas\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"locations\",\"relationName\":\"areasTolocations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"areasToassets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"asset_transactions\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transaction_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previous_holder_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_holder_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previous_location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previous_condition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_condition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"remarks\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attachment_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transaction_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"asset_transactionsToassets\",\"relationFromFields\":[\"asset_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previous_holder\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employees\",\"relationName\":\"TransactionPreviousHolder\",\"relationFromFields\":[\"previous_holder_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_holder\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employees\",\"relationName\":\"TransactionNewHolder\",\"relationFromFields\":[\"new_holder_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"assets\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"serial_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purchase_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brand_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"area_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_type\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_types\",\"relationName\":\"asset_typesToassets\",\"relationFromFields\":[\"type_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"categories\",\"relationName\":\"assetsTocategories\",\"relationFromFields\":[\"category_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brand\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"brands\",\"relationName\":\"assetsTobrands\",\"relationFromFields\":[\"brand_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"area\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"areas\",\"relationName\":\"areasToassets\",\"relationFromFields\":[\"area_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"locations\",\"relationName\":\"assetsTolocations\",\"relationFromFields\":[\"location_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employees\",\"relationName\":\"AssetEmployee\",\"relationFromFields\":[\"employee_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supplier_rec\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"suppliers\",\"relationName\":\"AssetSupplier\",\"relationFromFields\":[\"supplier_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"main_image\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_images\",\"relationName\":\"AssetMainImage\",\"relationFromFields\":[\"image_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"condition\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AssetCondition\",\"default\":\"GOOD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_transactions\",\"relationName\":\"asset_transactionsToassets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"log_cruds\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"log_crud\",\"relationName\":\"assetsTolog_crud\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_images\",\"relationName\":\"AssetImages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"activity_log\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"asset_types\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"asset_typesToassets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"asset_images\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"AssetImages\",\"relationFromFields\":[\"asset_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"main_for\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"AssetMainImage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"brands\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"assetsTobrands\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"categories\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"assetsTocategories\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"departments\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"employees\",\"relationName\":\"departmentsToemployees\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"employees\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nik\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nama\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"departments\",\"relationName\":\"departmentsToemployees\",\"relationFromFields\":[\"department_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"previous_trans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_transactions\",\"relationName\":\"TransactionPreviousHolder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_trans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"asset_transactions\",\"relationName\":\"TransactionNewHolder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"AssetEmployee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"locations\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"area_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"area\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"areas\",\"relationName\":\"areasTolocations\",\"relationFromFields\":[\"area_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"assetsTolocations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"log_crud\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"table_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sap_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"old_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"users\",\"relationName\":\"log_crudTousers\",\"relationFromFields\":[\"user_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"assetsTolog_crud\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"suppliers\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contact_person\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"assets\",\"relationName\":\"AssetSupplier\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"users\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email_verified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"remember_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"log_cruds\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"log_crud\",\"relationName\":\"log_crudTousers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"AssetCondition\":{\"values\":[{\"name\":\"GOOD\",\"dbName\":null},{\"name\":\"SLIGHTLY_DAMAGED\",\"dbName\":null},{\"name\":\"DAMAGED\",\"dbName\":null},{\"name\":\"BROKEN\",\"dbName\":null},{\"name\":\"DISPOSED\",\"dbName\":null},{\"name\":\"MAINTENANCE\",\"dbName\":null},{\"name\":\"LOST\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    ASSET_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['ASSET_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.ASSET_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

