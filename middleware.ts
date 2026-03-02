import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { checkRateLimit, getRateLimitTier, getClientIp } from "@/lib/rate-limit";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(req);
    const tier = getRateLimitTier(pathname);
    const result = checkRateLimit(`${ip}:${pathname.split("/").slice(0, 3).join("/")}`, tier);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(result.resetAt),
          },
        }
      );
    }
  }

  // Auth checks for protected routes
  const isLoggedIn = !!req.auth;
  const isAdminRoute = pathname.startsWith("/admin");
  const isPartnerRoute = pathname.startsWith("/partner");
  const isLoginPage = pathname === "/login";

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
  matcher: ["/api/:path*", "/admin/:path*", "/partner/:path*", "/login"],
};
