'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ITask } from '@/lib/types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Pick<ITask, 'title' | 'description' | 'status'>) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ITask['status']>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('todo');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">📝 Create a New Task</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-card-foreground mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-card-foreground mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-card-foreground mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ITask['status'])}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors shadow-sm"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
