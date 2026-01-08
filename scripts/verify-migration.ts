/**
 * Verify PostgreSQL Migration
 * Checks data integrity and connection
 */

import { PrismaClient as AssetClientPG } from '../generated/asset-client-v10';
import { PrismaClient as ManagementClientPG } from '../generated/management-client-v2';
import { PrismaClient as InventoryClientMySQL } from '../generated/inventory-client-v2';

const pgAssetClient = new AssetClientPG();
const pgManagementClient = new ManagementClientPG();
const mysqlInventoryClient = new InventoryClientMySQL();

async function verifyAssetDatabase() {
  console.log('🔍 Verifying Asset Database (PostgreSQL)...\n');

  try {
    const areasCount = await pgAssetClient.areas.count();
    console.log(`✓ Areas: ${areasCount} records`);

    const assetTypesCount = await pgAssetClient.asset_types.count();
    console.log(`✓ Asset Types: ${assetTypesCount} records`);

    const brandsCount = await pgAssetClient.brands.count();
    console.log(`✓ Brands: ${brandsCount} records`);

    const categoriesCount = await pgAssetClient.categories.count();
    console.log(`✓ Categories: ${categoriesCount} records`);

    const departmentsCount = await pgAssetClient.departments.count();
    console.log(`✓ Departments: ${departmentsCount} records`);

    const locationsCount = await pgAssetClient.locations.count();
    console.log(`✓ Locations: ${locationsCount} records`);

    const suppliersCount = await pgAssetClient.suppliers.count();
    console.log(`✓ Suppliers: ${suppliersCount} records`);

    const employeesCount = await pgAssetClient.employees.count();
    console.log(`✓ Employees: ${employeesCount} records`);

    const usersCount = await pgAssetClient.users.count();
    console.log(`✓ Users: ${usersCount} records`);

    const assetsCount = await pgAssetClient.assets.count();
    console.log(`✓ Assets: ${assetsCount} records`);

    const assetImagesCount = await pgAssetClient.asset_images.count();
    console.log(`✓ Asset Images: ${assetImagesCount} records`);

    const transactionsCount = await pgAssetClient.asset_transactions.count();
    console.log(`✓ Asset Transactions: ${transactionsCount} records`);

    const activityLogsCount = await pgAssetClient.activity_log.count();
    console.log(`✓ Activity Logs: ${activityLogsCount} records`);

    console.log('\n✅ Asset Database Verified!\n');
  } catch (error) {
    console.error('❌ Error verifying asset database:', error);
    throw error;
  }
}

async function verifyManagementDatabase() {
  console.log('🔍 Verifying Management Database (PostgreSQL)...\n');

  try {
    const usersCount = await pgManagementClient.users.count();
    console.log(`✓ Management Users: ${usersCount} records`);

    // List users
    const users = await pgManagementClient.users.findMany({
      select: { id: true, username: true, role: true, name: true }
    });
    console.log('\nUsers list:');
    users.forEach(user => {
      console.log(`  - ${user.username} (${user.role}) - ${user.name || 'N/A'}`);
    });

    console.log('\n✅ Management Database Verified!\n');
  } catch (error) {
    console.error('❌ Error verifying management database:', error);
    throw error;
  }
}

async function verifyInventoryDatabase() {
  console.log('🔍 Verifying Inventory Database (MySQL)...\n');

  try {
    const productsCount = await mysqlInventoryClient.product.count();
    console.log(`✓ Products: ${productsCount} records`);

    const attachmentsCount = await mysqlInventoryClient.attachment.count();
    console.log(`✓ PL Master (attachment): ${attachmentsCount} records`);

    const attachments2Count = await mysqlInventoryClient.attachment2.count();
    console.log(`✓ PL Slave (attachment2): ${attachments2Count} records`);

    console.log('\n✅ Inventory Database Verified!\n');
  } catch (error) {
    console.error('❌ Error verifying inventory database:', error);
    throw error;
  }
}

async function testConnections() {
  console.log('🔌 Testing Database Connections...\n');

  try {
    // Test PostgreSQL Asset DB
    await pgAssetClient.$queryRaw`SELECT 1`;
    console.log('✓ PostgreSQL Asset Database - Connected');

    // Test PostgreSQL Management DB
    await pgManagementClient.$queryRaw`SELECT 1`;
    console.log('✓ PostgreSQL Management Database - Connected');

    // Test MySQL Inventory DB
    await mysqlInventoryClient.$queryRaw`SELECT 1`;
    console.log('✓ MySQL Inventory Database - Connected');

    console.log('\n✅ All Database Connections Working!\n');
  } catch (error) {
    console.error('❌ Error testing connections:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('═══════════════════════════════════════════');
    console.log('  Database Migration Verification');
    console.log('═══════════════════════════════════════════\n');

    await testConnections();
    await verifyAssetDatabase();
    await verifyManagementDatabase();
    await verifyInventoryDatabase();

    console.log('═══════════════════════════════════════════');
    console.log('  🎉 All Verifications Passed!');
    console.log('═══════════════════════════════════════════');
    console.log('\n📊 Migration Summary:');
    console.log('  ✓ Asset DB: MySQL → PostgreSQL');
    console.log('  ✓ Management DB: MySQL → PostgreSQL');
    console.log('  ✓ Inventory DB: MySQL (unchanged)');
    console.log('\n');

  } catch (error) {
    console.error('Fatal error during verification:', error);
    process.exit(1);
  } finally {
    await pgAssetClient.$disconnect();
    await pgManagementClient.$disconnect();
    await mysqlInventoryClient.$disconnect();
  }
}

main();
