"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Form } from "@/generated/prisma";

import { PreviewDialogButton } from "@/components/preview-dialog-button";
import { SaveFormButton } from "@/components/save-form-button";
import { PublishFormButton } from "@/components/publish-form-button";
import { Designer } from "@/components/designer";
import { DragOverlayWrapper } from "@/components/drag-overlay-wrapper";

export const FormBuilder = ({ form }: { form: Form }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-4 border border-b-2 px-8 py-4">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2"> Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="bg-accent relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-[url(/paper-light.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};
