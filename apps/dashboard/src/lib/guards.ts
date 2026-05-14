import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

/**
 * Ensures the user is authenticated and has an ADMIN role.
 * To be used in Server Components.
 */
export async function protectAdminRoute() {
  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    redirect("/admin");
  }

  // Final Goal: NextAuth Session → API Role Resolver → Authorized Dashboard Access
  const role = await api.auth.resolveRole(session.user.id, session.user.email);

  if (role !== 'ADMIN') {
    redirect("/admin");
  }

  return session;
}

/**
 * Checks if the user is an admin without redirecting.
 */
export async function isAdmin() {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) return false;
  
  const role = await api.auth.resolveRole(session.user.id, session.user.email);
  return role === 'ADMIN';
}
