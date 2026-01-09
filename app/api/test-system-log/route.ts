import { NextResponse } from "next/server";
import { dbManagement } from "@/lib/db";

// Simple test endpoint to debug system logging
export async function GET() {
  try {
    console.log("[Test API] Starting test...");

    // Test 1: Check if dbManagement is defined
    console.log("[Test API] dbManagement defined:", !!dbManagement);

    // Test 2: Check if system_logs exists
    console.log("[Test API] system_logs model exists:", !!dbManagement.system_logs);

    // Test 3: Try to count existing logs
    const count = await dbManagement.system_logs.count();
    console.log("[Test API] Current log count:", count);

    // Test 4: Try to create a log entry
    const log = await dbManagement.system_logs.create({
      data: {
        module: 'SYSTEM',
        action: 'CREATE',
        entity_type: 'Settings',
        entity_id: 'test-' + Date.now(),
        description: 'Test log from API route',
        user_name: 'System Test'
      }
    });

    console.log("[Test API] Log created successfully, ID:", log.id.toString());

    // Test 5: Verify count increased
    const newCount = await dbManagement.system_logs.count();
    console.log("[Test API] New log count:", newCount);

    return NextResponse.json({
      success: true,
      message: "All tests passed!",
      logId: log.id.toString(),
      previousCount: count,
      newCount: newCount
    });
  } catch (error: any) {
    console.error("[Test API] Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
