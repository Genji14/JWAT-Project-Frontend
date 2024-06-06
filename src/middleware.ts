import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/enums'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')
    const role = request.cookies.get("role")?.value as unknown as UserRole;

    if (!accessToken && !request.nextUrl.pathname.startsWith('/sign-in')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (accessToken) {
        if (role === UserRole.ADMIN && !request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        if (role !== UserRole.ADMIN && request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/((?!_next).*)'],
}
