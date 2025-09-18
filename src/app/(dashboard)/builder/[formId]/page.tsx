import { GetFormById } from "@/actions/get-form";
import { FormBuilder } from "@/components/form-builder";

interface FormBuilderProps {
  params: Promise<{
    formId: string;
  }>;
}

const FormBuilderPage = async ({ params }: FormBuilderProps) => {
  const { formId } = await params;

  const form = await GetFormById(Number(formId));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
};

export default FormBuilderPage;
