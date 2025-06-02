'use client';

import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
};

interface TaskBoardProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export default function TaskBoard({ tasks, setTasks }: TaskBoardProps) {
  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns[source.droppableId as keyof typeof columns];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      setTasks((prevTasks) => {
        const otherTasks = prevTasks.filter(
          (task) => task.status !== source.droppableId
        );
        return [...otherTasks, ...copiedItems];
      });
    } else {
      // Moving between columns
      const sourceColumn = columns[source.droppableId as keyof typeof columns];
      const destColumn = columns[destination.droppableId as keyof typeof columns];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, {
        ...removed,
        status: destination.droppableId as Task['status'],
      });

      setTasks((prevTasks) => {
        const otherTasks = prevTasks.filter(
          (task) =>
            task.status !== source.droppableId &&
            task.status !== destination.droppableId
        );
        return [...otherTasks, ...sourceItems, ...destItems];
      });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={columns.todo}
            status="todo"
          />
          <TaskColumn
            title="In Progress"
            tasks={columns['in-progress']}
            status="in-progress"
          />
          <TaskColumn
            title="Done"
            tasks={columns.done}
            status="done"
          />
        </div>
      </DragDropContext>
    </div>
  );
} 