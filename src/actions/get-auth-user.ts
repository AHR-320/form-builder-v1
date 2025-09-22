"use server";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export async function getAuthUser() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}
