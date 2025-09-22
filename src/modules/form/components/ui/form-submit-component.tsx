"use client";

import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useCallback, useRef, useState, useTransition } from "react";

import { submitForm } from "@/actions/submit-form";

import {
  FormElementInstance,
  FormElements,
} from "@/modules/form-builder/components/form-elements";

import { Button } from "@/components/ui/button";

interface FormSubmitComponentProps {
  url: string;
  content: FormElementInstance[];
}

export const FormSubmitComponent = ({
  url,
  content,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content) {
      const value = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, value);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const handleSubmit = async () => {
    formErrors.current = {};

    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast.error("Please check for errors");
      return;
    }

    try {
      const content = JSON.stringify(formValues.current);
      await submitForm(url, content);
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div
          key={renderKey}
          className="bg-background flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border p-8 text-center shadow-xl shadow-blue-700"
        >
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div
        key={renderKey}
        className="bg-background flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border p-8 shadow-xl shadow-blue-700"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              defaultValue={formValues.current[element.id]}
              isInvalid={formErrors.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => startTransition(handleSubmit)}
          disabled={pending}
        >
          {pending ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};
