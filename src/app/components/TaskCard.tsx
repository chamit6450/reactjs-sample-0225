'use client';

import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import type { Task } from '../page';
import { useTasks } from '@/lib/TaskContext';
import { useWeb3 } from '@/lib/Web3Context';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const { deleteTask } = useTasks();
  const { isConnected, address } = useWeb3();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-400';
      case 'done':
        return 'bg-green-500/10 text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (task.pubKey !== address) {
      alert('You can only delete your own tasks');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setIsDeleting(true);
    setError(null);
    try {
      await deleteTask(task._id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete task');
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 mb-3 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging ? 'shadow-lg scale-[1.01] ring-2 ring-primary/20' : ''
          }`}
        >
          {error && (
            <div className="absolute top-2 right-2 bg-destructive/10 text-destructive text-xs px-2 py-1 rounded animate-fade-in">
              {error}
            </div>
          )}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-card-foreground pr-8">{task.title}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status.replace('-', ' ')}
              </span>
              {task.pubKey === address && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete task"
                >
                  {isDeleting ? (
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <div className="mt-3 text-xs text-muted-foreground/60 italic">
            Created on {formatDate(task.createdAt)}
          </div>
        </div>
      )}
    </Draggable>
  );
}
