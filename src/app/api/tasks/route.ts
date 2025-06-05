import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Task } from '@/lib/db';

// GET /api/tasks?pubKey=<address>
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const pubKey = request.nextUrl.searchParams.get('pubKey');
    if (!pubKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }

    const tasks = await Task.find({ pubKey }).sort({ createdAt: -1 });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, status, pubKey } = body;

    if (!title || !pubKey) {
      return NextResponse.json(
        { error: 'Title and public key are required' },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      pubKey,
      createdAt: new Date()
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
} 