'use client';

import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import { useTasks } from '@/lib/TaskContext';
import type { Task } from '../page';

interface TaskBoardProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  
}

export default function TaskBoard({ tasks, setTasks }: TaskBoardProps) {
  const { updateTask } = useTasks();

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId as keyof typeof columns];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setTasks((prev) => {
        const others = prev.filter((task) => task.status !== source.droppableId);
        return [...others, ...copiedItems];
      });
    } else {
      const sourceCol = columns[source.droppableId as keyof typeof columns];
      const destCol = columns[destination.droppableId as keyof typeof columns];
      const sourceItems = [...sourceCol];
      const destItems = [...destCol];
      const [removed] = sourceItems.splice(source.index, 1);
      const updatedTask = { ...removed, status: destination.droppableId as Task['status'] };
      destItems.splice(destination.index, 0, updatedTask);

      setTasks((prev) => {
        const others = prev.filter(
          (task) =>
            task.status !== source.droppableId && task.status !== destination.droppableId
        );
        return [...others, ...sourceItems, ...destItems];
      });

      try {
        await updateTask(removed._id, { status: destination.droppableId });
      } catch (err) {
        console.error('Failed to update task status:', err);
        setTasks((prev) => {
          const others = prev.filter(
            (task) =>
              task.status !== source.droppableId && task.status !== destination.droppableId
          );
          return [...others, ...sourceCol, ...destCol];
        });
      }
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl  text-muted-foreground ">Organize and prioritize your tasks with drag-and-drop ease.</h1>
          {/* <p className="text-muted-foreground mt-1">Organize and prioritize your tasks with drag-and-drop ease.</p> */}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="📝 To Do"
            tasks={columns.todo}
            status="todo"
            color="border-yellow-500/20 bg-yellow-500/5"
          />
          <TaskColumn
            title="🚧 In Progress"
            tasks={columns['in-progress']}
            status="in-progress"
            color="border-blue-500/20 bg-blue-500/5"
          />
          <TaskColumn
            title="✅ Done"
            tasks={columns.done}
            status="done"
            color="border-green-500/20 bg-green-500/5"
          />
        </div>
      </DragDropContext>
    </div>
  );
}
