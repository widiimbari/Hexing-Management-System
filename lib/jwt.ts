/**
 * Centralized JWT configuration and utilities
 * Ensures JWT_SECRET is properly configured
 */

/**
 * Get and validate JWT_SECRET
 * Throws error if not properly configured
 */
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "CRITICAL: JWT_SECRET environment variable is not defined. " +
      "Please set JWT_SECRET in your .env file with a strong random string."
    );
  }

  if (secret.length < 32) {
    throw new Error(
      "CRITICAL: JWT_SECRET must be at least 32 characters long for security. " +
      "Current length: " + secret.length
    );
  }

  return secret;
}

// Export JWT_SECRET with lazy validation
export const JWT_SECRET = getJWTSecret();
export const JWT_KEY = new TextEncoder().encode(JWT_SECRET);

// JWT configuration constants
export const JWT_EXPIRY = "24h"; // Token expiry time
export const JWT_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
export const JWT_ALGORITHM = "HS256"; // HMAC SHA-256

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  sub: string; // User ID
  username: string;
  role: string;
  name: string;
  image_url?: string | null;
}
