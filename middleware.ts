import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isPartnerRoute = req.nextUrl.pathname.startsWith("/partner");
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Redirect to login if accessing protected routes without auth
  if (!isLoggedIn && (isAdminRoute || isPartnerRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to appropriate dashboard if logged in and on login page
  if (isLoggedIn && isLoginPage) {
    const role = req.auth?.user?.role;
    if (role === "ADMIN" || role === "EDITOR") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "PARTNER") {
      return NextResponse.redirect(new URL("/partner", req.url));
    }
  }

  // Role-based access control
  if (isLoggedIn) {
    const role = req.auth?.user?.role;

    // Partners can't access admin routes
    if (isAdminRoute && role === "PARTNER") {
      return NextResponse.redirect(new URL("/partner", req.url));
    }

    // Non-partners can't access partner routes
    if (isPartnerRoute && role !== "PARTNER") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/partner/:path*", "/login"],
};
