import { Separator } from "@/components/ui/separator";

import { FormElements } from "@/modules/form-builder/components/form-elements";
import { SidebarButtonElement } from "@/modules/form-builder/components/ui/sidebar-button-element";

export const FormElementsSidebar = () => {
  return (
    <div>
      <p className="text-foreground text-sm">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">
        <p className="text-muted-foreground col-span-1 mt-2 place-self-start text-sm md:col-span-2">
          Layout elements
        </p>
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubTitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeparatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />
        <p className="text-muted-foreground col-span-1 mt-2 place-self-start text-sm md:col-span-2">
          Form elements
        </p>
        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
        <SidebarButtonElement formElement={FormElements.SelectField} />
        <SidebarButtonElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};
