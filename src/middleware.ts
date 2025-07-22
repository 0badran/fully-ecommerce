import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

const protectedRoute = ["/account", "/checkout"];
const publicRoute = ["/signin", "signup", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const user = await stackServerApp.getUser();
  if (!user && protectedRoute.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (user && publicRoute.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/account", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
