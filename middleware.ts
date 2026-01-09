import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWT_KEY } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  console.log(`[Middleware] Path: ${pathname}, Token exists: ${!!token}`);

  // Define protected routes (add more as needed)
  const protectedRoutes = [
    "/dashboard",
    "/inventory/dashboard",
    "/inventory/products",
    "/inventory/warehouse",
    "/inventory/pl-master",
    "/inventory/pl-slave",
    "/assets",
    "/asset-management",
    "/warehouse",
    "/admin/users",
    "/system-logs",
  ];

  // Define public routes
  const publicRoutes = ["/login", "/api/auth/login", "/api/auth/logout"];

  // Check if accessing a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing root "/", check if logged in
  if (pathname === "/") {
    if (token) {
      try {
        await jwtVerify(token, JWT_KEY);
        console.log("[Middleware] Valid token at root, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        console.log("[Middleware] Invalid token at root, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
        console.log("[Middleware] No token at root, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If accessing login page while logged in
  if (pathname === "/login" && token) {
      try {
        await jwtVerify(token, JWT_KEY);
        console.log("[Middleware] Valid token at login page, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        console.log("[Middleware] Invalid token at login page, allowing stay");
        // Token invalid, let them stay on login
      }
  }

  // If accessing protected route and not logged in
  if (isProtectedRoute && !token) {
    console.log(`[Middleware] Unauthorized access to ${pathname}, redirecting to login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // Verify token for protected routes
  if (isProtectedRoute && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_KEY);
      
      // Role-Based Access Control
      if (pathname.startsWith("/admin/users") && payload.role !== "super_admin") {
          console.log(`[Middleware] Role restriction for ${pathname}, redirecting to dashboard`);
          return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.log(`[Middleware] Token verification failed for ${pathname}, redirecting to login`);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (except auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - svg files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\.svg).*)",
  ],
};
