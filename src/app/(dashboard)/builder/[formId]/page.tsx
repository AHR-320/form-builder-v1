import { getFormById } from "@/actions/get-form";
import { FormBuilder } from "@/modules/form-builder/components/views/form-builder";

interface FormBuilderProps {
  params: Promise<{
    formId: string;
  }>;
}

const FormBuilderPage = async ({ params }: FormBuilderProps) => {
  const { formId } = await params;

  const form = await getFormById(Number(formId));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
};

export default FormBuilderPage;
