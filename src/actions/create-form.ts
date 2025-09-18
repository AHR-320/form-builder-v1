"use server";

import { prisma } from "@/lib/db";
import { createFormSchema, createFormSchemaType } from "@/lib/schemas";
import { GetAuthUser } from "@/actions/get-auth-user";

export async function CreateForm(data: createFormSchemaType) {
  const isValid = createFormSchema.safeParse(data);

  if (!isValid.success) {
    throw new Error("Data not valid");
  }

  const user = await GetAuthUser();

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }

  return form.id;
}
