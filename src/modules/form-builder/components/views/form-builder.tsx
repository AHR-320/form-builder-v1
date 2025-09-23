"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Confetti from "react-confetti";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Form } from "@/generated/prisma";

import { PreviewDialogButton } from "@/modules/form-builder/components/ui/preview-dialog-button";
import { SaveFormButton } from "@/modules/form-builder/components/ui/save-form-button";
import { PublishFormButton } from "@/modules/form-builder/components/ui/publish-form-button";
import { DesignerCanvas } from "@/modules/form-builder/components/ui/designer-canvas";
import { DragOverlayWrapper } from "@/modules/form-builder/components/ui/drag-overlay-wrapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="max-w-md">
            <h1 className="text-primary mb-10 border-b pb-2 text-center text-3xl font-bold">
              💥💥 Form Published 💥💥
            </h1>
            <h2 className="text-2xl font-medium">Share this form</h2>
            <h3 className="text-muted-foreground border-b pb-10 text-xl">
              Anyone with this link can view and submit the form
            </h3>
            <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success("Link copied to clipboard");
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href={"/"} className="gap-2">
                  <ArrowLeftIcon />
                  Back to home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="bg-accent relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-[url(/paper-light.svg)] dark:bg-[url(/paper-dark.svg)]">
          <DesignerCanvas content={form.content} />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};
