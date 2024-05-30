import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')
    const shouldRedirectToSignIn =
        !accessToken && !request.nextUrl.pathname.startsWith('/sign-in')
    const shouldRedirectToHome =
        accessToken && request.nextUrl.pathname.startsWith('/sign-in')

    if (shouldRedirectToSignIn) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (shouldRedirectToHome) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/((?!_next).*)'],
}
