import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/enums'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken && !request.nextUrl.pathname.startsWith('/sign-in')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (accessToken && request.nextUrl.pathname.startsWith('/sign-in')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/((?!_next).*)'],
}
