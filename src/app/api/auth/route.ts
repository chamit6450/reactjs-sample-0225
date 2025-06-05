import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { User } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json();

    if (!message || !signature) {
      return NextResponse.json(
        { error: 'Message and signature are required' },
        { status: 400 }
      );
    }

    // Recover the public key (Ethereum address)
    const pubKey = ethers.verifyMessage(message, signature);

    // Check if user already exists
    let user = await User.findOne({ pubKey });

    if (!user) {
      // Create a new user with the recovered pubKey
      user = await User.create({ pubKey });
    }

    return NextResponse.json({ success: true, pubKey });
  } catch (error) {
    console.error("Wallet login error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
