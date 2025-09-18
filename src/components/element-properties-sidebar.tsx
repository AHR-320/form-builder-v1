import { useDesigner } from "./hooks/use-designer";
import { FormElements } from "./form-elements";

export const ElementPropertiesSidebar = () => {
  const { selectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].formComponent;

  return <PropertiesForm />;
};
