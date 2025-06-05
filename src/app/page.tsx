'use client';

import { useState } from 'react';
import TaskBoard from './components/TaskBoard';
import CreateTaskModal from './components/CreateTaskModal';
import { useTasks } from '@/lib/TaskContext';
import { ITask } from '@/lib/types';

const convertTask = (task: ITask) => {
  const taskObj = task.toObject ? task.toObject() : task;
  return {
    ...taskObj,
    _id: taskObj._id.toString(),
    title: taskObj.title,
    description: taskObj.description,
    status: taskObj.status,
    createdAt: taskObj.createdAt,
    pubKey: taskObj.pubKey,
  };
};

export type Task = ReturnType<typeof convertTask>;

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { tasks, loading, error, addTask, refreshTasks } = useTasks();

  const handleCreateTask = async (newTask: Pick<ITask, 'title' | 'description' | 'status'>) => {
    try {
      await addTask(newTask);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  const convertedTasks = tasks.map(convertTask);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Task Board</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your tasks efficiently with wallet-based login. Powered by web3.</p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm rounded-md transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
          >
            ➕ Create Task
          </button>
        </div>

        {/* Task Board */}
        <TaskBoard tasks={convertedTasks} setTasks={refreshTasks} />
      </div>

      {/* Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
}
