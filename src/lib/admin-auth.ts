import { auth } from "@/lib/auth";

/**
 * Require an authenticated admin session.
 * Returns the session if the user is an admin, or null otherwise.
 * Use in admin API routes to reduce repetitive auth checks.
 */
export async function requireAdmin() {
  const session = await auth();
  if (
    !session?.user ||
    (session.user as { role?: string }).role !== "ADMIN"
  ) {
    return null;
  }
  return session;
}
