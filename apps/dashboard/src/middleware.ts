import { auth } from "@/lib/auth";

export default auth((req) => {
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/admin/dashboard");
  const isLoggedIn = !!req.auth;

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
