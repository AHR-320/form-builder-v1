import { useDraggable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

import { FormElement } from "./form-elements";
import { Button } from "./ui/button";

export const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "hover:text-primary flex size-28 cursor-grab flex-col gap-2",
        draggable.isDragging && "ring-primary text-primary ring-2",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="size-8" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant="outline"
      className="hover:text-primary flex size-28 cursor-grab flex-col gap-2"
    >
      <Icon className="size-8" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
