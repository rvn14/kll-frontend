import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    // Let specific auth route handlers in Next.js handle these (to set/delete cookies)
    const nextAuthPaths = ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/logout'];
    if (nextAuthPaths.includes(request.nextUrl.pathname)) {
       return NextResponse.next();
    }
    
    // Proxy other requests to the backend
    const token = request.cookies.get('access_token')?.value;
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    
    // Create the target URL by appending the path and query string to the backend URL
    const targetUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, backendUrl);
    
    const requestHeaders = new Headers(request.headers);
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
    
    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: '/api/v1/:path*',
};
