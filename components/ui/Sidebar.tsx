"use client";

import { EditPortfolioComponent, EditState } from "@/types";
import ComponentsWidget from "./ComponentsWidget";
import ManageWidget from "./ManageWidget";

export default function Sidebar({ editState }: { editState: EditState }) {
  return (
    <aside className="sticky flex flex-col items-center h-full w-full bg-secondary">
      <ComponentsWidget />
      <ManageWidget editState={editState} />
    </aside>
  );
}
