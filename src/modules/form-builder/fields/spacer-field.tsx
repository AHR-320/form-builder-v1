"use client";

import { z } from "zod";
import { CgSpaceBetweenV } from "react-icons/cg";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useDesigner } from "@/modules/form-builder/hooks/use-designer";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/modules/form-builder/components/form-elements";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20,
};

const propertiesFormSchema = z.object({
  height: z.number().min(5).max(200),
});

type propertiesFormSchemaType = z.infer<typeof propertiesFormSchema>;

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate: () => true,
  designerButtonElement: {
    icon: CgSpaceBetweenV,
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <CgSpaceBetweenV size={32} />
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesFormSchema),
    mode: "onBlur",
    defaultValues: {
      height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height: {form.watch("height")}px</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return <div style={{ height: height, width: "100%" }} />;
}
