"use server";

import { prisma } from "@/lib/db";
import { getAuthUser } from "@/actions/get-auth-user";

export async function getForms() {
  const user = await getAuthUser();

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
