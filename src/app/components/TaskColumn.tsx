'use client';

import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import type { Task } from './TaskBoard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
}

export default function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] rounded-md p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 