import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  const { pathname } = request.nextUrl;
  
  // Define route types
  const isAuthPage = pathname.startsWith('/auth');
  const isAdminPage = pathname.startsWith('/admin');
  const isPublicPage = pathname === '/' || pathname.startsWith('/public');
  
  // Allow public pages and API routes
  if (isPublicPage || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  
  // Check localStorage token for client-side routing
  const response = NextResponse.next();
  
  // If user is on auth page and has token, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  // If user is trying to access admin pages without token, redirect to login
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Add token to response headers for client-side access
  if (token) {
    response.headers.set('x-auth-token', token);
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
