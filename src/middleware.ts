import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    const { pathname } = request.nextUrl;
    const isSignInPage = pathname.startsWith('/sign-in');


    if (accessToken && !isSignInPage) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (accessToken && isSignInPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/((?!_next).*)'],
}
