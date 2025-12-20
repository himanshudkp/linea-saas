"use server";

import { auth } from "@/config/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async (): Promise<void> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("[signOut] Error:", error);
  }

  redirect("/sign-in");
};
