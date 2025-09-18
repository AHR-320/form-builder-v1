import { FormElements } from "./form-elements";
import { SidebarButtonElement } from "./sidebar-button-element";

export const FormElementsSidebar = () => {
  return (
    <div>
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};
