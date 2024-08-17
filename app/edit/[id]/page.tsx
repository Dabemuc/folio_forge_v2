"use client";

import EditArea from "@/components/ui/EditArea";
import Sidebar from "@/components/ui/Sidebar";
import { getGenerator } from "@/components/ui/draggables/generators";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ApiResponse, EditPortfolioComponent, EditState } from "@/types";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useEffect, useId, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function EditPage({ params }: { params: { id: number } }) {
  const refSidebar = useRef<ImperativePanelHandle>(null);
  const sidebarSize = 22;
  const [editState, setEditState] = useState<EditState>({
    portfolioId: params.id,
    description: "",
    editComponents: [],
  });
  const [dragOverlay, setDragOverlay] = useState<JSX.Element | null>(null);

  useEffect(() => {
    fetch(`/api/portfolio/get?portfolioId=${params.id}&userId=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.result === "success" && data.content && !Array.isArray(data.content)) {
          setEditState({
            ...editState,
            description: data.content.description,
            editComponents: data.content.content.map((block) => ({
              id: block.id,
              generator: getGenerator(block.id),
              props: block.props,
            })),
          });
          console.log("fetched portfolio", data.content);
        } else {
          // window.location.replace("/404");
        }
      });
  }, [params.id]);

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

    const newEditComponents = [...editState.editComponents];
    const remaining = newEditComponents.splice(
      event.over.id as number,
      newEditComponents.length - (event.over.id as number)
    );
    console.log("before", newEditComponents, "index", event.over.id, "after", remaining);
    newEditComponents.push({
      id: event.active.id as string,
      generator: event.active.data.current?.generator,
      props: event.active.data.current?.props,
    });
    newEditComponents.push(...remaining);
    setEditComponents(newEditComponents);
  }

  function setEditComponents(components: EditPortfolioComponent[]) {
    setEditState({
      ...editState,
      editComponents: components,
    });
  }

  return (
    <main className="h-[93vh] w-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} id={useId()}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100 - sidebarSize}>
            <EditArea editComponents={editState.editComponents} setEditComponents={setEditComponents} />
          </ResizablePanel>
          <ResizableHandle withHandle onDoubleClick={handleResetPanelSize} />
          <ResizablePanel minSize={18} defaultSize={sidebarSize} ref={refSidebar}>
            <Sidebar editState={editState} />
          </ResizablePanel>
        </ResizablePanelGroup>
        <DragOverlay>{dragOverlay}</DragOverlay>
      </DndContext>
    </main>
  );
}
