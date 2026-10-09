import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Environment variables (or default credentials for testing)
    const validUsername = process.env.DISPATCHER_USERNAME || 'admin';
    const validPassword = process.env.DISPATCHER_PASSWORD || 'wastesync2026';

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server authentication error' },
      { status: 500 }
    );
  }
}