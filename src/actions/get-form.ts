"use server";

import { prisma } from "@/lib/db";
import { GetAuthUser } from "@/actions/get-auth-user";

export async function GetFormById(id: number) {
  const user = await GetAuthUser();

  const forms = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  return forms;
}
