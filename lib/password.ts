/**
 * Password hashing utilities using bcryptjs
 * Replaces insecure MD5 hashing
 */

import bcrypt from "bcryptjs";

// Salt rounds for bcrypt (10 is recommended balance between security and performance)
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password using bcryptjs
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a plain text password against a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    // If comparison fails (e.g., invalid hash format), return false
    return false;
  }
}

/**
 * Check if a password hash is using the old MD5 format
 * MD5 hashes are 32 characters hex string
 * bcrypt hashes start with $2a$ or $2b$ and are ~60 characters
 * @param hash - Password hash to check
 * @returns True if hash is MD5 format
 */
export function isMD5Hash(hash: string): boolean {
  return /^[a-f0-9]{32}$/i.test(hash);
}

/**
 * Legacy MD5 password verification (for migration purposes)
 * Only use this during transition period from MD5 to bcrypt
 * @param password - Plain text password
 * @param md5Hash - MD5 hashed password
 * @returns True if password matches MD5 hash
 */
export function verifyMD5Password(password: string, md5Hash: string): boolean {
  const crypto = require("crypto");
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  return hashedPassword === md5Hash;
}
