/**
 * Fix PostgreSQL sequences after migration from MySQL
 * This resets all auto-increment sequences to start from max(id) + 1
 */

import { PrismaClient as AssetClient } from '../generated/asset-client-v14';
import { PrismaClient as ManagementClient } from '../generated/management-client-v2';

const dbAsset = new AssetClient();
const dbManagement = new ManagementClient();

async function fixAssetSequences() {
  console.log('🔧 Fixing Asset Database Sequences...\n');

  const tables = [
    'areas',
    'asset_types',
    'asset_transactions',
    'assets',
    'activity_log',
    'asset_images',
    'brands',
    'categories',
    'departments',
    'employees',
    'locations',
    'suppliers',
    'users',
  ];

  for (const table of tables) {
    try {
      // Get max ID
      const result: any = await dbAsset.$queryRawUnsafe(
        `SELECT COALESCE(MAX(id), 0) as max_id FROM ${table}`
      );
      const maxId = result[0]?.max_id;
      const maxIdNum = maxId ? Number(maxId) : 0;

      if (maxIdNum > 0) {
        // Reset sequence to max_id + 1
        await dbAsset.$queryRawUnsafe(
          `SELECT setval(pg_get_serial_sequence('${table}', 'id'), ${maxIdNum}, true)`
        );
        console.log(`✓ ${table}: sequence set to ${maxIdNum + 1}`);
      } else {
        console.log(`○ ${table}: empty table, skipping`);
      }
    } catch (error: any) {
      console.log(`○ ${table}: ${error.message}`);
    }
  }

  console.log('\n✅ Asset sequences fixed!\n');
}

async function fixManagementSequences() {
  console.log('🔧 Fixing Management Database Sequences...\n');

  const tables = ['users'];

  for (const table of tables) {
    try {
      const result: any = await dbManagement.$queryRawUnsafe(
        `SELECT COALESCE(MAX(id), 0) as max_id FROM ${table}`
      );
      const maxId = result[0]?.max_id;
      const maxIdNum = maxId ? Number(maxId) : 0;

      if (maxIdNum > 0) {
        await dbManagement.$queryRawUnsafe(
          `SELECT setval(pg_get_serial_sequence('${table}', 'id'), ${maxIdNum}, true)`
        );
        console.log(`✓ ${table}: sequence set to ${maxIdNum + 1}`);
      } else {
        console.log(`○ ${table}: empty table, skipping`);
      }
    } catch (error: any) {
      console.log(`○ ${table}: ${error.message}`);
    }
  }

  console.log('\n✅ Management sequences fixed!\n');
}

async function main() {
  try {
    console.log('═══════════════════════════════════════════');
    console.log('  PostgreSQL Sequence Fix Script');
    console.log('═══════════════════════════════════════════\n');

    await fixAssetSequences();
    await fixManagementSequences();

    console.log('═══════════════════════════════════════════');
    console.log('  🎉 All Sequences Fixed!');
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await dbAsset.$disconnect();
    await dbManagement.$disconnect();
  }
}

main();
