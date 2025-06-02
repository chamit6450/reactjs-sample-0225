'use client';

import { Draggable } from 'react-beautiful-dnd';
import type { Task } from './TaskBoard';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-lg shadow-sm mb-3 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
        >
          <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </Draggable>
  );
} 