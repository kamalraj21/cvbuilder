import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem({ id, children, dragHandleClassName = '' }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };
  return (
    <div ref={setNodeRef} style={style} className="relative">
      <button
        type="button"
        {...attributes}
        {...listeners}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing ${dragHandleClassName}`}
        tabIndex={-1}
      >
        <GripVertical size={14} />
      </button>
      {children}
    </div>
  );
}
