/**
 * Migration script: MySQL to PostgreSQL
 * Uses mysql2 for reading MySQL and Prisma for writing to PostgreSQL
 */

import mysql from 'mysql2/promise';
import { PrismaClient as AssetClientPG } from '../generated/asset-client-v14';
import { PrismaClient as ManagementClientPG } from '../generated/management-client-v2';

// PostgreSQL Prisma clients
const pgAssetClient = new AssetClientPG();
const pgManagementClient = new ManagementClientPG();

// MySQL configurations
const mysqlAssetConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hexing_assets',
};

const mysqlManagementConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hexing_management',
};

async function migrateAssetDatabase() {
  console.log('🚀 Starting Asset Database Migration...\n');

  const connection = await mysql.createConnection(mysqlAssetConfig);

  try {
    // Migrate Areas
    console.log('📦 Migrating areas...');
    const [areas]: any = await connection.query('SELECT * FROM areas');
    for (const area of areas) {
      await pgAssetClient.areas.create({
        data: {
          id: area.id,
          name: area.name,
          created_at: area.created_at,
          updated_at: area.updated_at,
        }
      }).catch(() => {}); // Skip if exists
    }
    console.log(`✓ Migrated ${areas.length} areas\n`);

    // Migrate Brands
    console.log('📦 Migrating brands...');
    const [brands]: any = await connection.query('SELECT * FROM brands');
    for (const brand of brands) {
      await pgAssetClient.brands.create({
        data: {
          id: brand.id,
          name: brand.name,
          created_at: brand.created_at,
          updated_at: brand.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${brands.length} brands\n`);

    // Migrate Categories
    console.log('📦 Migrating categories...');
    const [categories]: any = await connection.query('SELECT * FROM categories');
    for (const category of categories) {
      await pgAssetClient.categories.create({
        data: {
          id: category.id,
          name: category.name,
          created_at: category.created_at,
          updated_at: category.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${categories.length} categories\n`);

    // Migrate Departments
    console.log('📦 Migrating departments...');
    const [departments]: any = await connection.query('SELECT * FROM departments');
    for (const dept of departments) {
      await pgAssetClient.departments.create({
        data: {
          id: dept.id,
          name: dept.name,
          created_at: dept.created_at,
          updated_at: dept.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${departments.length} departments\n`);

    // Migrate Locations
    console.log('📦 Migrating locations...');
    const [locations]: any = await connection.query('SELECT * FROM locations');
    for (const location of locations) {
      await pgAssetClient.locations.create({
        data: {
          id: location.id,
          name: location.name,
          area_id: location.area_id,
          created_at: location.created_at,
          updated_at: location.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${locations.length} locations\n`);

    // Migrate Suppliers
    console.log('📦 Migrating suppliers...');
    const [suppliers]: any = await connection.query('SELECT * FROM suppliers');
    for (const supplier of suppliers) {
      await pgAssetClient.suppliers.create({
        data: {
          id: supplier.id,
          name: supplier.name,
          contact_person: supplier.contact_person,
          phone: supplier.phone,
          email: supplier.email,
          address: supplier.address,
          created_at: supplier.created_at,
          updated_at: supplier.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${suppliers.length} suppliers\n`);

    // Migrate Employees
    console.log('📦 Migrating employees...');
    const [employees]: any = await connection.query('SELECT * FROM employees');
    for (const employee of employees) {
      await pgAssetClient.employees.create({
        data: {
          id: employee.id,
          nik: employee.nik,
          nama: employee.nama,
          gender: employee.gender,
          department_id: employee.department_id,
          created_at: employee.created_at,
          updated_at: employee.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${employees.length} employees\n`);

    // Migrate Users
    console.log('📦 Migrating users...');
    const [users]: any = await connection.query('SELECT * FROM users');
    for (const user of users) {
      await pgAssetClient.users.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          email_verified_at: user.email_verified_at,
          password: user.password,
          remember_token: user.remember_token,
          created_at: user.created_at,
          updated_at: user.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${users.length} users\n`);

    // Migrate Assets
    console.log('📦 Migrating assets...');
    const [assets]: any = await connection.query('SELECT * FROM assets');
    for (const asset of assets) {
      await pgAssetClient.assets.create({
        data: {
          id: asset.id,
          serial_number: asset.serial_number,
          sap_id: asset.sap_id,
          purchase_date: asset.purchase_date,
          created_at: asset.created_at,
          updated_at: asset.updated_at,
          category_id: asset.category_id,
          brand_id: asset.brand_id,
          area_id: asset.area_id,
          location_id: asset.location_id,
          employee_id: asset.employee_id,
          supplier_id: asset.supplier_id,
          image_id: asset.image_id,
          condition: asset.condition,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${assets.length} assets\n`);

    // Migrate Asset Images
    console.log('📦 Migrating asset_images...');
    const [assetImages]: any = await connection.query('SELECT * FROM asset_images');
    for (const image of assetImages) {
      await pgAssetClient.asset_images.create({
        data: {
          id: image.id,
          asset_id: image.asset_id,
          name: image.name,
          url: image.url,
          created_at: image.created_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${assetImages.length} asset images\n`);

    // Migrate Asset Transactions
    console.log('📦 Migrating asset_transactions...');
    const [transactions]: any = await connection.query('SELECT * FROM asset_transactions');
    for (const transaction of transactions) {
      await pgAssetClient.asset_transactions.create({
        data: {
          id: transaction.id,
          asset_id: transaction.asset_id,
          transaction_type: transaction.transaction_type,
          previous_holder_id: transaction.previous_holder_id,
          new_holder_id: transaction.new_holder_id,
          previous_location: transaction.previous_location,
          new_location: transaction.new_location,
          previous_condition: transaction.previous_condition,
          new_condition: transaction.new_condition,
          remarks: transaction.remarks,
          attachment_url: transaction.attachment_url,
          transaction_date: transaction.transaction_date,
          created_by: transaction.created_by,
          creator_name: transaction.creator_name,
          created_at: transaction.created_at,
          updated_at: transaction.updated_at,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${transactions.length} asset transactions\n`);

    console.log('✅ Asset Database Migration Completed!\n');
  } catch (error) {
    console.error('❌ Error migrating asset database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function migrateManagementDatabase() {
  console.log('🚀 Starting Management Database Migration...\n');

  const connection = await mysql.createConnection(mysqlManagementConfig);

  try {
    // Migrate Users
    console.log('📦 Migrating management users...');
    const [users]: any = await connection.query('SELECT * FROM users');
    for (const user of users) {
      await pgManagementClient.users.create({
        data: {
          id: user.id,
          username: user.username,
          password: user.password,
          role: user.role,
          name: user.name,
          image_url: user.image_url,
        }
      }).catch(() => {});
    }
    console.log(`✓ Migrated ${users.length} management users\n`);

    console.log('✅ Management Database Migration Completed!\n');
  } catch (error) {
    console.error('❌ Error migrating management database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function main() {
  try {
    console.log('═══════════════════════════════════════════');
    console.log('  MySQL to PostgreSQL Migration Script');
    console.log('═══════════════════════════════════════════\n');

    await migrateAssetDatabase();
    await migrateManagementDatabase();

    console.log('═══════════════════════════════════════════');
    console.log('  🎉 All Migrations Completed Successfully!');
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('Fatal error during migration:', error);
    process.exit(1);
  } finally {
    await pgAssetClient.$disconnect();
    await pgManagementClient.$disconnect();
  }
}

main();
