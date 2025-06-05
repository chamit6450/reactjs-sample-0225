import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Task } from '@/lib/db';

// PATCH /api/tasks/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = context.params.id;
    const updates = await request.json();
    const { pubKey } = updates;

    // Verify task ownership
    const task = await Task.findOne({ _id: id, pubKey });
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = context.params.id;
    const pubKey = request.nextUrl.searchParams.get('pubKey');

    if (!pubKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }

    // Verify task ownership
    const task = await Task.findOne({ _id: id, pubKey });
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      );
    }

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 