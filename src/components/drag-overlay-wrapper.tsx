import { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

import { useDesigner } from "./hooks/use-designer";
import { ElementsType, FormElements } from "./form-elements";
import { SidebarButtonElementDragOverlay } from "./sidebar-button-element";

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag element</div>;

  const isSidebarButtonElement =
    draggedItem.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;

    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId as string;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="bg-accent flex h-[120px] w-full cursor-grab items-center rounded-md px-4 py-2 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};
