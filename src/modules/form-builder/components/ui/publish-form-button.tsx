import { FileUpIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { publishForm } from "@/actions/publish-form";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const PublishFormButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const handlePublishForm = async () => {
    try {
      await publishForm(id);
      toast.success("Your form is now available to the public.");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-accent-foreground dark:text-accent-foreground bg-gradient-to-r from-indigo-300 to-cyan-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-cyan-600">
          <FileUpIcon size={16} />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are yoy sure to publish this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              {" "}
              By publishing this form you will make it available to the public
              and you will ble able to collect submissions
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(handlePublishForm);
              router.refresh();
            }}
          >
            Proceed
            {loading && <Loader2Icon className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
