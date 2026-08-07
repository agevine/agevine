import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if we are trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Look for our auth cookie
    const authCookie = request.cookies.get('agevine_auth');

    // If no auth cookie, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// Configure the paths where this middleware should run
export const config = {
  matcher: ['/dashboard/:path*'],
};
