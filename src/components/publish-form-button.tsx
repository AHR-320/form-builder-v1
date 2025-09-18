import { FileUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const PublishFormButton = () => {
  return (
    <Button className="text-accent-foreground dark:text-accent-foreground bg-gradient-to-r from-indigo-300 to-cyan-300 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-cyan-600">
      <FileUpIcon size={16} />
      Publish
    </Button>
  );
};
