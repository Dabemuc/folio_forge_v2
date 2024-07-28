"use client";

import EditArea from "@/components/ui/EditArea";
import Sidebar from "@/components/ui/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { StateObject } from "@/types";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function EditPage() {
  const refSidebar = useRef<ImperativePanelHandle>(null);
  const sidebarSize = 22;
  const [state, setState] = useState<StateObject[]>([]);
  const [dragOverlay, setDragOverlay] = useState<JSX.Element | null>(null);

  function handleResetPanelSize() {
    refSidebar.current?.resize(sidebarSize);
  }

  function handleDragStart(event: DragStartEvent) {
    setDragOverlay(event.active.data.current?.dragOverlay);
  }

  function handleDragEnd(event: DragEndEvent) {
    setDragOverlay(null);
    
    if (!event.over) {
      return;
    }

    const newState = [...state];
    const remaining = newState.splice(event.over.id as number, newState.length - (event.over.id as number));
    console.log("before", newState, "index", event.over.id, "after", remaining);
    newState.push({
      id: event.active.id as string,
      generator: event.active.data.current?.generator,
      props: event.active.data.current?.props,
    });
    newState.push(...remaining);
    setState(newState);
  }

  return (
    <main className="h-[93vh] w-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100 - sidebarSize}>
            <EditArea state={state} setState={setState} />
          </ResizablePanel>
          <ResizableHandle withHandle onDoubleClick={handleResetPanelSize} />
          <ResizablePanel minSize={18} defaultSize={sidebarSize} ref={refSidebar}>
            <Sidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
        <DragOverlay>{dragOverlay}</DragOverlay>
      </DndContext>
    </main>
  );
}
