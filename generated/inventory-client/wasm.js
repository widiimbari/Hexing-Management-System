
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

exports.Prisma.Area_listScalarFieldEnum = {
  id: 'id',
  value: 'value'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  nomor: 'nomor',
  timestamp: 'timestamp',
  type: 'type',
  no_do: 'no_do',
  no_order: 'no_order',
  tgl_order: 'tgl_order',
  area: 'area',
  status: 'status',
  active: 'active'
};

exports.Prisma.Attachment2ScalarFieldEnum = {
  id: 'id',
  nomor: 'nomor',
  timestamp: 'timestamp',
  type: 'type',
  no_do: 'no_do',
  no_order: 'no_order',
  tgl_order: 'tgl_order',
  area: 'area',
  status: 'status',
  active: 'active'
};

exports.Prisma.BoxScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  pallete_id: 'pallete_id',
  attachment_id: 'attachment_id',
  attachment2_id: 'attachment2_id',
  remain: 'remain'
};

exports.Prisma.ConfigScalarFieldEnum = {
  root: 'root',
  branch: 'branch',
  value: 'value',
  tanggal: 'tanggal'
};

exports.Prisma.Defect_listScalarFieldEnum = {
  id: 'id',
  defect_name: 'defect_name'
};

exports.Prisma.Fct_notpassScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  type: 'type',
  line: 'line',
  timestamp: 'timestamp'
};

exports.Prisma.Fct_passScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  type: 'type',
  line: 'line',
  timestamp: 'timestamp'
};

exports.Prisma.Fct_tempScalarFieldEnum = {
  id: 'id',
  type: 'type',
  line: 'line',
  timestamp: 'timestamp',
  total_output: 'total_output',
  total_defect: 'total_defect',
  target: 'target'
};

exports.Prisma.Filestore_fileScalarFieldEnum = {
  id: 'id',
  filestore_type_id: 'filestore_type_id',
  filestore_volume_id: 'filestore_volume_id',
  filename: 'filename',
  original_filename: 'original_filename',
  filesize: 'filesize',
  filenum: 'filenum',
  deleted: 'deleted'
};

exports.Prisma.Filestore_typeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  mime_type: 'mime_type',
  extension: 'extension'
};

exports.Prisma.Filestore_volumeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  dirname: 'dirname',
  total_space: 'total_space',
  used_space: 'used_space',
  stored_files_cnt: 'stored_files_cnt',
  enabled: 'enabled',
  last_filenum: 'last_filenum'
};

exports.Prisma.LogsScalarFieldEnum = {
  id: 'id',
  timestamp: 'timestamp',
  desc: 'desc',
  line: 'line',
  code: 'code'
};

exports.Prisma.Logs_editScalarFieldEnum = {
  id: 'id',
  timestamp: 'timestamp',
  desc: 'desc',
  code: 'code',
  line: 'line',
  user: 'user'
};

exports.Prisma.Meter_typeScalarFieldEnum = {
  id: 'id',
  value: 'value',
  phase: 'phase',
  validation: 'validation',
  validation_length: 'validation_length',
  length: 'length',
  pln_code: 'pln_code',
  card_validation: 'card_validation',
  validation_type: 'validation_type',
  daily_reset: 'daily_reset',
  numeric_only: 'numeric_only',
  surpass_target: 'surpass_target',
  run_by_sequence: 'run_by_sequence',
  start_reset: 'start_reset',
  end_reset: 'end_reset'
};

exports.Prisma.Module_listScalarFieldEnum = {
  module_id: 'module_id',
  module_serial: 'module_serial'
};

exports.Prisma.Order_numScalarFieldEnum = {
  id: 'id',
  value: 'value',
  counter: 'counter'
};

exports.Prisma.Out_110ScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  qr_serial: 'qr_serial',
  timestamp: 'timestamp',
  receive_id: 'receive_id'
};

exports.Prisma.Output_targetScalarFieldEnum = {
  id: 'id',
  output: 'output',
  type: 'type',
  waktu: 'waktu',
  line: 'line',
  timestamp: 'timestamp'
};

exports.Prisma.Output_tempScalarFieldEnum = {
  id: 'id',
  type: 'type',
  total_output: 'total_output',
  line: 'line',
  tahun: 'tahun',
  timestamp: 'timestamp',
  total_bigbox: 'total_bigbox',
  total_pallet: 'total_pallet',
  target: 'target',
  target_hour: 'target_hour',
  hour1: 'hour1',
  hour2: 'hour2',
  hour3: 'hour3',
  hour4: 'hour4',
  hour5: 'hour5',
  hour6: 'hour6',
  hour7: 'hour7',
  hour8: 'hour8',
  hour9: 'hour9',
  hour10: 'hour10',
  hour11: 'hour11',
  hour12: 'hour12'
};

exports.Prisma.PalleteScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  location: 'location'
};

exports.Prisma.Pln_codeScalarFieldEnum = {
  id: 'id',
  value: 'value'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  module_serial: 'module_serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  orderno: 'orderno',
  area: 'area',
  jenis: 'jenis',
  box_id: 'box_id',
  attachment_id: 'attachment_id',
  attachment2_id: 'attachment2_id',
  remain: 'remain',
  garansi: 'garansi'
};

exports.Prisma.Production_ngScalarFieldEnum = {
  id: 'id',
  meter_type: 'meter_type',
  serial: 'serial',
  tanggal: 'tanggal',
  station: 'station',
  line: 'line',
  defect: 'defect',
  category: 'category',
  department: 'department',
  action: 'action',
  keterangan: 'keterangan',
  update_date: 'update_date',
  user: 'user'
};

exports.Prisma.ProductionorderScalarFieldEnum = {
  id: 'id',
  timestamp: 'timestamp',
  ponum: 'ponum',
  area: 'area',
  provinsi: 'provinsi',
  count_qty: 'count_qty',
  qty: 'qty',
  status: 'status',
  keterangan: 'keterangan'
};

exports.Prisma.Receive_110ScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  qr_serial: 'qr_serial',
  timestamp: 'timestamp',
  result: 'result'
};

exports.Prisma.Rework_amrScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  qr_serial: 'qr_serial',
  timestamp: 'timestamp'
};

exports.Prisma.Rework_boxScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  pallete_id: 'pallete_id',
  attachment_id: 'attachment_id',
  attachment2_id: 'attachment2_id'
};

exports.Prisma.Rework_hxe110ScalarFieldEnum = {
  id: 'id',
  meter_type: 'meter_type',
  meter_serial: 'meter_serial',
  tanggal: 'tanggal',
  modem: 'modem',
  baterai: 'baterai',
  defect: 'defect'
};

exports.Prisma.Rework_palleteScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  location: 'location'
};

exports.Prisma.Serial_checkScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  timestamp: 'timestamp',
  line: 'line',
  type: 'type',
  orderno: 'orderno',
  area: 'area',
  jenis: 'jenis',
  box_id: 'box_id',
  attachment_id: 'attachment_id',
  attachment2_id: 'attachment2_id',
  remain: 'remain',
  garansi: 'garansi'
};

exports.Prisma.Tahun_garansiScalarFieldEnum = {
  id_garansi: 'id_garansi',
  value: 'value'
};

exports.Prisma.Temp_indicatorScalarFieldEnum = {
  id: 'id',
  total: 'total',
  total_ng: 'total_ng',
  total_ok: 'total_ok',
  timestamp: 'timestamp',
  status: 'status'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.filestore_file_deleted = exports.$Enums.filestore_file_deleted = {
  Y: 'Y',
  N: 'N'
};

exports.filestore_volume_enabled = exports.$Enums.filestore_volume_enabled = {
  Y: 'Y',
  N: 'N'
};

exports.logs_code = exports.$Enums.logs_code = {
  OK: 'OK',
  NG: 'NG',
  DUP: 'DUP',
  NM: 'NM',
  PRNT: 'PRNT',
  ERR: 'ERR'
};

exports.meter_type_card_validation = exports.$Enums.meter_type_card_validation = {
  Yes: 'Yes',
  No: 'No'
};

exports.meter_type_validation_type = exports.$Enums.meter_type_validation_type = {
  Barcode: 'Barcode',
  QR: 'QR'
};

exports.meter_type_daily_reset = exports.$Enums.meter_type_daily_reset = {
  Yes: 'Yes',
  No: 'No'
};

exports.meter_type_numeric_only = exports.$Enums.meter_type_numeric_only = {
  Yes: 'Yes',
  No: 'No'
};

exports.meter_type_surpass_target = exports.$Enums.meter_type_surpass_target = {
  Yes: 'Yes',
  No: 'No'
};

exports.meter_type_run_by_sequence = exports.$Enums.meter_type_run_by_sequence = {
  Yes: 'Yes',
  No: 'No'
};

exports.receive_110_result = exports.$Enums.receive_110_result = {
  OK: 'OK',
  NG: 'NG'
};

exports.temp_indicator_status = exports.$Enums.temp_indicator_status = {
  IN: 'IN',
  OUT: 'OUT'
};

exports.Prisma.ModelName = {
  area_list: 'area_list',
  attachment: 'attachment',
  attachment2: 'attachment2',
  box: 'box',
  config: 'config',
  defect_list: 'defect_list',
  fct_notpass: 'fct_notpass',
  fct_pass: 'fct_pass',
  fct_temp: 'fct_temp',
  filestore_file: 'filestore_file',
  filestore_type: 'filestore_type',
  filestore_volume: 'filestore_volume',
  logs: 'logs',
  logs_edit: 'logs_edit',
  meter_type: 'meter_type',
  module_list: 'module_list',
  order_num: 'order_num',
  out_110: 'out_110',
  output_target: 'output_target',
  output_temp: 'output_temp',
  pallete: 'pallete',
  pln_code: 'pln_code',
  product: 'product',
  production_ng: 'production_ng',
  productionorder: 'productionorder',
  receive_110: 'receive_110',
  rework_amr: 'rework_amr',
  rework_box: 'rework_box',
  rework_hxe110: 'rework_hxe110',
  rework_pallete: 'rework_pallete',
  serial_check: 'serial_check',
  tahun_garansi: 'tahun_garansi',
  temp_indicator: 'temp_indicator'
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
