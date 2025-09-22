import { FileTextIcon } from "lucide-react";

import { useDesigner } from "@/modules/form-builder/hooks/use-designer";
import { FormElements } from "@/modules/form-builder/components/form-elements";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PreviewDialogButton = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileTextIcon size={16} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen flex-grow flex-col gap-0 p-0 sm:max-w-full">
        <div className="border-b px-4 py-2">
          <DialogHeader>
            <DialogTitle>Form preview</DialogTitle>
            <DialogDescription>
              This is how your form will look like to your users.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="bg-accent flex flex-grow flex-col items-center justify-center overflow-y-auto bg-[url(/paper-light.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="bg-background flex h-full w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded-2xl p-8">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
