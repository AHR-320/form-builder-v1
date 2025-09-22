import { Loader2Icon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import { updateForm } from "@/actions/update-form";

import { useDesigner } from "@/modules/form-builder/hooks/use-designer";

import { Button } from "@/components/ui/button";

export const SaveFormButton = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();

  const handleSaveForm = async () => {
    try {
      const formContent = JSON.stringify(elements);
      await updateForm(id, formContent);
      toast.success("Your form has been saved");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      variant="outline"
      disabled={loading}
      onClick={() => startTransition(handleSaveForm)}
    >
      <SaveIcon size={16} />
      Save
      {loading && <Loader2Icon className="animate-spin" />}
    </Button>
  );
};
