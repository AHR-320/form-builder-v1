import { FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const PreviewDialogButton = () => {
  return (
    <Button variant="outline">
      <FileTextIcon size={16} />
      Preview
    </Button>
  );
};
