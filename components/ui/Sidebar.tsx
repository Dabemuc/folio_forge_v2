"use client";

import { StateObject } from "@/types";
import ComponentsWidget from "./ComponentsWidget";
import ManageWidget from "./ManageWidget";

export default function Sidebar({ state }: { state: StateObject[] }) {
  return (
    <aside className="sticky flex flex-col items-center h-full w-full bg-secondary">
      <ComponentsWidget />
      <ManageWidget state={state} />
    </aside>
  );
}
