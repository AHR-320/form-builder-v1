"use client";

import { toast } from "sonner";
import { FilePlus2Icon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateForm } from "@/actions/create-form";
import { createFormSchema, createFormSchemaType } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const CreateFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<createFormSchemaType>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: createFormSchemaType) => {
    try {
      const formId = await CreateForm(values);
      toast.success("Form created succesfully");
      form.reset();
      setIsOpen(false);
      router.push(`/builder/${formId}`);
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary/20 hover:border-primary hover:text-primary text-muted-foreground flex h-[190px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-xl font-bold hover:cursor-pointer"
        >
          <FilePlus2Icon className="size-8" />
          Create new form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="mt-4 w-full"
          >
            {form.formState.isSubmitting ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
