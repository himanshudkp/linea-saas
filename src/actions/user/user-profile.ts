"use server";

import type { Response } from "@/types";
import type { User } from "../../../generated/prisma/client";
import { authenticateUser } from "./authenticate-user";
import { prisma } from "@/config/prisma";
import { ERRORS } from "@/constants";
import { successResponse } from "@/utils";

export const getUserProfile = async (): Promise<Response<User>> => {
  try {
    const { data } = await authenticateUser();

    const user = await prisma.user.findFirst({
      where: { id: data?.userId! },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return ERRORS.USER_NOT_FOUND;

    return successResponse<User>(user);
  } catch (err) {
    console.error("[getUserProfile] Error:", err);
    return ERRORS.SERVER_ERROR;
  }
};
