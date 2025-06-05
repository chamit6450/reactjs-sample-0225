'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWeb3 } from './Web3Context';
import { ITask } from './types';
import type { Task } from '@/app/page';

// Convert MongoDB task to frontend task
const convertTask = (task: ITask): Task => {
  const taskObj = task.toObject ? task.toObject() : task;
  return {
    ...taskObj,
    _id: taskObj._id.toString(),
    title: taskObj.title,
    description: taskObj.description,
    status: taskObj.status,
    createdAt: taskObj.createdAt,
    pubKey: taskObj.pubKey
  };
};

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Pick<ITask, 'title' | 'description' | 'status'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useWeb3();

  const fetchTasks = async () => {
    if (!isConnected || !address) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tasks?pubKey=${address}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data.tasks.map(convertTask));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isConnected, address]);

  const addTask = async (task: Pick<ITask, 'title' | 'description' | 'status'>) => {
    if (!isConnected || !address) throw new Error('Wallet not connected');
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, pubKey: address }),
      });
      
      if (!response.ok) throw new Error('Failed to add task');
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!isConnected || !address) throw new Error('Wallet not connected');
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, pubKey: address }),
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    if (!isConnected || !address) throw new Error('Wallet not connected');
    
    try {
      const response = await fetch(`/api/tasks/${id}?pubKey=${address}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete task');
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        loading, 
        error, 
        addTask, 
        updateTask, 
        deleteTask,
        refreshTasks: fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 