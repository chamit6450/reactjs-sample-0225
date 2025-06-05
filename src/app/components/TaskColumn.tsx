'use client';

import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import type { Task } from '../page';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
  color?: string;
}

export default function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">{title}</h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] rounded-md p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-accent/20' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 