import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const url = request.nextUrl

    if (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up')) {
        if(token) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            return NextResponse.next()
        }
    } else {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
 }
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/sign-in','/sign-up', '/', '/dashboard/:path*', '/verify/:path*']
// }
export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}