import { getFormByUrl } from "@/actions/get-form";

import { FormElementInstance } from "@/components/form-elements";
import { FormSubmitComponent } from "@/modules/form/components/ui/form-submit-component";

interface FormSubmitProps {
  params: Promise<{
    formUrl: string;
  }>;
}

const FormSubmitPage = async ({ params }: FormSubmitProps) => {
  const { formUrl } = await params;

  const form = await getFormByUrl(formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent url={formUrl} content={formContent} />;
};

export default FormSubmitPage;
