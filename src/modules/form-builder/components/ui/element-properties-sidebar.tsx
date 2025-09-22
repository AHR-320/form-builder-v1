import { X } from "lucide-react";

import { useDesigner } from "@/modules/form-builder/hooks/use-designer";
import { FormElements } from "@/modules/form-builder/components/form-elements";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ElementPropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-foreground/70 text-sm">Element properties</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X />
        </Button>
      </div>
      <Separator className="mt-2 mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};
