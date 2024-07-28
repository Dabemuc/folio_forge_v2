"use client";

import EditArea from "@/components/ui/EditArea";
import Sidebar from "@/components/ui/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function EditPage() {
  const refSidebar = useRef<ImperativePanelHandle>(null);
  const sidebarSize = 20;

  function resetPanelSize() {
    refSidebar.current?.resize(sidebarSize);
  }

  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={100 - sidebarSize}>
          <EditArea />
        </ResizablePanel>
        <ResizableHandle withHandle onDoubleClick={resetPanelSize} />
        <ResizablePanel defaultSize={sidebarSize} ref={refSidebar}>
          <Sidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
