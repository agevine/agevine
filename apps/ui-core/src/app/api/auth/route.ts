import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD is not set in .env.local");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (password === adminPassword) {
      // Create a response that redirects or returns success
      const response = NextResponse.json({ success: true });
      
      // Set the auth cookie
      response.cookies.set({
        name: 'agevine_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
