import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const SaveFormButton = () => {
  return (
    <Button variant="outline">
      <SaveIcon size={16} />
      Save
    </Button>
  );
};
