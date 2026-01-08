/**
 * Test script to debug add type issue
 */

import { PrismaClient as AssetClient } from '../generated/asset-client-v10';

const dbAsset = new AssetClient();

async function testAddType() {
  try {
    console.log('🧪 Testing add type to PostgreSQL...\n');

    // Test connection
    await dbAsset.$queryRaw`SELECT 1`;
    console.log('✓ PostgreSQL connection OK\n');

    // Try to create a type
    const newType = await dbAsset.asset_types.create({
      data: {
        name: 'Test Type ' + Date.now(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('✓ Type created successfully:');
    console.log('  ID:', newType.id.toString());
    console.log('  Name:', newType.name);
    console.log('  Created:', newType.created_at);

    // Fetch all types
    const allTypes = await dbAsset.asset_types.findMany();
    console.log(`\n✓ Total types in database: ${allTypes.length}`);

    // Cleanup
    await dbAsset.asset_types.delete({
      where: { id: newType.id }
    });
    console.log('\n✓ Test type deleted (cleanup)\n');

    console.log('✅ All tests passed!\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await dbAsset.$disconnect();
  }
}

testAddType();
