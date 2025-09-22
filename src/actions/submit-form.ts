"use server";

import { prisma } from "@/lib/db";

export async function submitForm(url: string, content: string) {
  const form = await prisma.form.update({
    where: {
      shareURL: url,
      published: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmission: {
        create: {
          content,
        },
      },
    },
  });

  return form;
}
