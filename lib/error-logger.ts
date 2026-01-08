/**
 * Error logging utility
 * Provides structured error logging with context
 */

export interface ErrorContext {
  userId?: string;
  username?: string;
  endpoint?: string;
  method?: string;
  ipAddress?: string;
  userAgent?: string;
  requestBody?: any;
  additionalInfo?: Record<string, any>;
}

export interface ErrorLog {
  timestamp: string;
  error: {
    message: string;
    stack?: string;
    name?: string;
  };
  context?: ErrorContext;
  severity: "low" | "medium" | "high" | "critical";
}

/**
 * Log an error with context information
 * @param error - The error object or message
 * @param context - Additional context about the error
 * @param severity - Error severity level
 */
export function logError(
  error: Error | string,
  context?: ErrorContext,
  severity: "low" | "medium" | "high" | "critical" = "medium"
): void {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    error:
      typeof error === "string"
        ? { message: error }
        : {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
    context,
    severity,
  };

  // Log to console with formatting
  const severityEmoji = {
    low: "ℹ️",
    medium: "⚠️",
    high: "🔴",
    critical: "🚨",
  };

  console.error(
    `\n${severityEmoji[severity]} [${severity.toUpperCase()}] Error at ${errorLog.timestamp}`
  );
  console.error("Message:", errorLog.error.message);

  if (context?.endpoint) {
    console.error(`Endpoint: ${context.method} ${context.endpoint}`);
  }

  if (context?.userId) {
    console.error(`User: ${context.username} (ID: ${context.userId})`);
  }

  if (context?.ipAddress) {
    console.error(`IP: ${context.ipAddress}`);
  }

  if (errorLog.error.stack) {
    console.error("Stack trace:", errorLog.error.stack);
  }

  if (context?.additionalInfo) {
    console.error("Additional info:", JSON.stringify(context.additionalInfo, null, 2));
  }

  console.error("---\n");

  // In production, you could send this to:
  // - External logging service (Sentry, LogRocket, DataDog, etc.)
  // - Database table for error tracking
  // - File system for persistent logs
  // - Monitoring/alerting system

  // Example for future implementation:
  // if (process.env.NODE_ENV === 'production') {
  //   await sendToExternalLogger(errorLog);
  //   if (severity === 'critical') {
  //     await sendAlert(errorLog);
  //   }
  // }
}

/**
 * Extract error context from Next.js request
 * @param req - Next.js Request object
 * @param user - Current user (if authenticated)
 * @returns Error context object
 */
export function getErrorContext(
  req: Request,
  user?: { id: string; username: string }
): ErrorContext {
  const url = new URL(req.url);

  return {
    userId: user?.id,
    username: user?.username,
    endpoint: url.pathname,
    method: req.method,
    userAgent: req.headers.get("user-agent") || undefined,
    // Note: Getting real IP in Next.js can be tricky with proxies
    ipAddress: req.headers.get("x-forwarded-for") ||
               req.headers.get("x-real-ip") ||
               "unknown",
  };
}

/**
 * Create a standardized API error response
 * @param message - Error message to send to client
 * @param statusCode - HTTP status code
 * @returns Object with message and status
 */
export function createErrorResponse(message: string, statusCode: number = 500) {
  return {
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Safe error message for client
 * Prevents leaking sensitive information in production
 * @param error - Error object
 * @param isDevelopment - Whether in development mode
 * @returns Safe error message
 */
export function getSafeErrorMessage(error: unknown, isDevelopment: boolean = false): string {
  if (isDevelopment && error instanceof Error) {
    return error.message;
  }

  // In production, return generic messages based on error type
  if (error instanceof Error) {
    // Database errors
    if (error.message.includes("Prisma") || error.message.includes("database")) {
      return "Database operation failed";
    }

    // Validation errors
    if (error.message.includes("validation") || error.message.includes("invalid")) {
      return "Validation error";
    }
  }

  return "Internal server error";
}
