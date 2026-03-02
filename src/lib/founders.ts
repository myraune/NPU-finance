/**
 * Whitelisted NPFIS founder emails.
 * These accounts get ADMIN role with full access to the admin panel.
 * All other Google sign-ins become MEMBER role with access to the member portal.
 */
export const FOUNDERS: { email: string; name: string }[] = [
  { email: "temirlan@northpark.edu", name: "Temirlan Avtandilov" },
  { email: "shamri@northpark.edu", name: "Mohamed Zarook Mohamed Shamri" },
];

export function isFounder(email: string): boolean {
  return FOUNDERS.some(
    (f) => f.email.toLowerCase() === email.toLowerCase()
  );
}

export function getFounderName(email: string): string {
  return (
    FOUNDERS.find(
      (f) => f.email.toLowerCase() === email.toLowerCase()
    )?.name ?? email
  );
}
