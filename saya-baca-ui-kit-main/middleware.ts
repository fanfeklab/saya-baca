import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Basic stub for Role-Based Access Control logic
  const token = request.cookies.get('auth-token')?.value;
  const role = request.cookies.get('user-role')?.value; // 'child', 'parent', 'admin'

  // TODO: implement actual verification logic in Phase 5
  if (pathname.startsWith('/admin') && role !== 'admin') {
    // return NextResponse.redirect(new URL('/app', request.url));
  }

  if (pathname.startsWith('/app') && !token) {
    // return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/app/:path*'],
};
