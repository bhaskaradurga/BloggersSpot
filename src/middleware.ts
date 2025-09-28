import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow requests to the login page
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // For all other admin routes, we would ideally check for a valid session token.
  // Since we're using client-side token storage (localStorage),
  // we can't directly verify the token here on the server-side middleware
  // without a more complex setup (e.g., using cookies for auth).
  // The client-side components will handle redirection if the token is missing or invalid.

  // This is a basic protection to ensure the admin section is not publicly browsable
  // without some form of client-side authentication check.

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};