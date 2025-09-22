"use server";

import { prisma } from "@/lib/db";
import { getAuthUser } from "@/actions/get-auth-user";

export async function getFormById(id: number) {
  const user = await getAuthUser();

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  return form;
}

export async function getFormByUrl(url: string) {
  const user = await getAuthUser();

  const form = await prisma.form.update({
    where: {
      shareURL: url,
      userId: user.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return form;
}
export async function getFormWithSubmissions(id: number) {
  const user = await getAuthUser();

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      FormSubmission: true,
    },
  });

  return form;
}
