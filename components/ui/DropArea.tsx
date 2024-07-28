import { useDroppable } from "@dnd-kit/core";

export default function DropArea({ id, bigger }: { id: string; bigger?: boolean }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={
        (bigger ? "h-40 mb-40" : "h-4") + " w-full bg-background rounded" + (isOver ? " border-2 border-primary" : "")
      }
      ref={setNodeRef}
    />
  );
}
