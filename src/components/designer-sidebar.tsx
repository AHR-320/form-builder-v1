"use client";

import { useDesigner } from "./hooks/use-designer";
import { FormElementsSidebar } from "./form-elements-sidebar";
import { ElementPropertiesSidebar } from "./element-properties-sidebar";

export const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();

  return (
    <aside className="border-muted bg-background flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 p-4">
      {selectedElement ? <ElementPropertiesSidebar /> : <FormElementsSidebar />}
    </aside>
  );
};
