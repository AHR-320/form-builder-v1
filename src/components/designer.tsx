"use client";

import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/utils";

import { useDesigner } from "./hooks/use-designer";
import { DesignerSidebar } from "./designer-sidebar";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import { Button } from "./ui/button";

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  console.log(selectedElement);

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="text-foreground ring-accent relative flex h-[120px] flex-col rounded-md ring-1 ring-inset hover:cursor-pointer"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant="outline"
              className="h-full rounded-md rounded-l-none border bg-red-500!"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="bg-primary absolute top-0 h-1 w-full rounded-md rounded-b-none" />
      )}
      <div
        className={cn(
          "bg-accent/40 pointer-events-none flex h-[120px] w-full items-center rounded-md px-4 py-2 opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="bg-primary absolute bottom-0 h-1 w-full rounded-md rounded-t-none" />
      )}
    </div>
  );
};

export const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDroppable: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active.data?.current?.type as ElementsType;

        const newElement = FormElements[type].construct(idGenerator());

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex h-full w-full">
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl",
            droppable.isOver && "ring-primary/20 ring-2",
          )}
        >
          {elements.length > 0 ? (
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          ) : droppable.isOver ? (
            <div className="w-full p-4">
              <div className="bg-primary/20 h-[120px] rounded-md" />
            </div>
          ) : (
            <p className="text-muted-foreground flex flex-grow items-center text-3xl font-bold">
              Drop here
            </p>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};
