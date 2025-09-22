import { FormElements } from "@/modules/form-builder/components/form-elements";
import { SidebarButtonElement } from "@/modules/form-builder/components/ui/sidebar-button-element";

export const FormElementsSidebar = () => {
  return (
    <div>
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};
