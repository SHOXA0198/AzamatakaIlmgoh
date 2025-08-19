
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) {
    const adminCookie = request.cookies.get('admin_code')?.value
    if (adminCookie !== 'AZAMATALI') {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/admin-code'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
