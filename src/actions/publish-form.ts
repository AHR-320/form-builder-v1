"use server";

import { prisma } from "@/lib/db";
import { getAuthUser } from "@/actions/get-auth-user";

export async function publishForm(id: number) {
  const user = await getAuthUser();

  const form = await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      published: true,
    },
  });

  return form;
}
