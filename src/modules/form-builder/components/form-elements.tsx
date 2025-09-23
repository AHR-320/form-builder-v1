import { TitleFieldFormElement } from "@/modules/form-builder/fields/title-field";
import { SubTitleFieldFormElement } from "@/modules/form-builder/fields/sub-title-field";
import { ParagraphFieldFormElement } from "@/modules/form-builder/fields/paragraph-field";
import { SeparatorFieldFormElement } from "@/modules/form-builder/fields/separator-field";
import { SpacerFieldFormElement } from "@/modules/form-builder/fields/spacer-field";
import { TextFieldFormElement } from "@/modules/form-builder/fields/text-field";
import { NumberFieldFormElement } from "@/modules/form-builder/fields/number-field";
import { TextAreaFieldFormElement } from "@/modules/form-builder/fields/text-area-field";
import { DateFieldFormElement } from "@/modules/form-builder/fields/date-field";
import { SelectFieldFormElement } from "@/modules/form-builder/fields/select-field";
import { CheckboxFieldFormElement } from "@/modules/form-builder/fields/checkbox-field";

export type ElementsType =
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>;
};

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    defaultValue?: string;
    isInvalid?: boolean;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
