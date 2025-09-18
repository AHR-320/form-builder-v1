"use server";

import { prisma } from "@/lib/db";
import { GetAuthUser } from "@/actions/get-auth-user";

export async function GetForms() {
  const user = await GetAuthUser();

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return forms;
}
