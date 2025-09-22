"use server";

import { prisma } from "@/lib/db";
import { getAuthUser } from "@/actions/get-auth-user";

export async function updateForm(id: number, content: string) {
  const user = await getAuthUser();

  const form = await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content,
    },
  });

  return form;
}
