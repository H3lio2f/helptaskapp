import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const { token } = req.cookies;
    const { origin } = req.nextUrl;
    
    if (!token) {
        return NextResponse.rewrite(`${origin}/auth/login`);
    }
    return NextResponse.next()
}