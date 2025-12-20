"use server";

import { auth } from "@/config/auth";
import { ERRORS } from "@/constants";
import type { Response } from "@/types";
import { successResponse } from "@/utils";
import { headers } from "next/headers";

export const authenticateUser = async (): Promise<
  Response<{ userId: string }>
> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId || !session) {
      return ERRORS.NOT_AUTHENTICATED;
    }

    return successResponse<{ userId: string }>({ userId });
  } catch (error) {
    console.error("[authenticateUser] Authentication error:", error);
    return ERRORS.SERVER_ERROR;
  }
};
