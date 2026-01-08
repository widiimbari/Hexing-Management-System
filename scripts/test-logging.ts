/**
 * Test activity logging functionality
 */

import { PrismaClient as AssetClient } from '../generated/asset-client-v10';
import { PrismaClient as ManagementClient } from '../generated/management-client-v2';

const dbAsset = new AssetClient();
const dbManagement = new ManagementClient();

async function testLogging() {
  try {
    console.log('🧪 Testing Activity Logging...\n');

    // Test 1: Check if activity_log table exists and is accessible
    console.log('Test 1: Check activity_log table...');
    const logCount = await dbAsset.activity_log.count();
    console.log(`✓ activity_log table exists with ${logCount} records\n`);

    // Test 2: Create a test log entry
    console.log('Test 2: Create test log entry...');
    const testLog = await dbAsset.activity_log.create({
      data: {
        action: 'CREATE',
        entity_type: 'Test Entity',
        entity_id: '999',
        details: 'Test log entry for verification',
        user_id: '1',
        user_name: 'Test User',
        created_at: new Date(),
      }
    });
    console.log(`✓ Test log created with ID: ${testLog.id}\n`);

    // Test 3: Fetch recent logs
    console.log('Test 3: Fetch recent activity logs...');
    const recentLogs = await dbAsset.activity_log.findMany({
      take: 10,
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`\n📋 Recent Activity Logs (${recentLogs.length} entries):`);
    console.log('─'.repeat(80));
    recentLogs.forEach((log: any) => {
      console.log(`[${log.created_at?.toISOString().split('T')[0]}] ${log.action} - ${log.entity_type}`)
      console.log(`   Entity ID: ${log.entity_id}, User: ${log.user_name || 'System'}`);
      console.log(`   Details: ${log.details}`);
      console.log('─'.repeat(80));
    });

    // Test 4: Clean up test entry
    console.log('\nTest 4: Clean up test entry...');
    await dbAsset.activity_log.delete({
      where: { id: testLog.id }
    });
    console.log('✓ Test log deleted\n');

    console.log('✅ All logging tests passed!\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await dbAsset.$disconnect();
    await dbManagement.$disconnect();
  }
}

testLogging();
