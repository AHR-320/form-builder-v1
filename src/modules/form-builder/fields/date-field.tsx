"use client";

import { z } from "zod";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { useDesigner } from "@/modules/form-builder/hooks/use-designer";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "@/modules/form-builder/components/form-elements";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
  required: false,
};

const propertiesFormSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean(),
});

type propertiesFormSchemaType = z.infer<typeof propertiesFormSchema>;

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate: (
    formElement: FormElementInstance,
    currentValue: string,
  ): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
  designerButtonElement: {
    icon: Calendar1Icon,
    label: "Date Field",
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
  const { label, helperText, required } = element.extraAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <Calendar1Icon />
        <span>Pick a date</span>
      </Button>
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesFormSchema),
    mode: "onBlur",
    defaultValues: {
      label,
      helperText,
      required,
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </FormControl>
              <FormDescription className="text-xs">
                The label of the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </FormControl>
              <FormDescription className="text-xs">
                The helper text of the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-1">
                <FormLabel>Required</FormLabel>
                <FormDescription className="text-xs">
                  Required option of the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
  submitValue,
  defaultValue,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  defaultValue?: string;
  isInvalid?: boolean;
}) {
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : undefined,
  );
  const [error, setError] = useState(false);

  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500",
            )}
          >
            <Calendar1Icon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);

              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormElement.validate(element, value);

              setError(!valid);

              submitValue(element.id, value);
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-sm",
            error && "text-red-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
