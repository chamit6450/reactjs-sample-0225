import { NextResponse } from 'next/server';
import { User } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { pubKey } = await request.json();

    if (!pubKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await User.findOne({ pubKey });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({ pubKey });
    }

    return NextResponse.json({ 
      success: true, 
      user: { pubKey: user.pubKey } 
    });
  } catch (error) {
    console.error('Error in wallet auth:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 