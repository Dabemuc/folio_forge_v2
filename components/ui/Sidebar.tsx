"use client";

import ComponentsWidget from "./ComponentsWidget";
import ManageWidget from "./ManageWidget";

export default function Sidebar() {
  return (
    <aside className="sticky flex flex-col items-center h-full w-full bg-secondary">
      <ComponentsWidget />
      <ManageWidget />
    </aside>
  );
}
