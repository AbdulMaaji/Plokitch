/**
 * Plokitch Secret Management System
 * Centralized resolver for environment-isolated secrets.
 */

export function getAdminMasterKey(): string | undefined {
  const env = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV;

  // Layer 1: Environment Isolation
  if (env === "production") {
    return process.env.ADMIN_MASTER_KEY_PROD;
  }

  if (env === "staging") {
    return process.env.ADMIN_MASTER_KEY_STAGING;
  }

  // Default to DEV for local machine/dev branch
  return process.env.ADMIN_MASTER_KEY_DEV || process.env.ADMIN_MASTER_KEY;
}

/**
 * Returns the current version of the master key for rotation tracking.
 */
export function getAdminMasterKeyVersion(): string {
  return process.env.ADMIN_MASTER_KEY_VERSION || "1";
}

/**
 * Validates a provided password against the current environment-specific secret.
 * Supports a rotation grace period by checking against multiple keys if defined.
 */
export function validateAdminPassword(password: string): boolean {
  const primaryKey = getAdminMasterKey();
  
  // Collect all valid keys for rotation support
  const validKeys = [
    primaryKey,
    process.env.ADMIN_MASTER_KEY_V1,
    process.env.ADMIN_MASTER_KEY_V2,
    process.env.ADMIN_MASTER_KEY_OLD,
  ].filter(Boolean);

  if (validKeys.length === 0) {
    console.error("[SECURITY] No Admin Master Keys are configured for the current environment.");
    return false;
  }

  return validKeys.includes(password);
}
