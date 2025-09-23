"use client";

import { SeparatorHorizontalIcon } from "lucide-react";

import {
  ElementsType,
  FormElement,
} from "@/modules/form-builder/components/form-elements";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  validate: () => true,
  designerButtonElement: {
    icon: SeparatorHorizontalIcon,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

function DesignerComponent() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
}

function PropertiesComponent() {
  return <p>No properties for this element</p>;
}

function FormComponent() {
  return <Separator />;
}
