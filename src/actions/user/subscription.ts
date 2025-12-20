"use server";

import type { Entitlement, Response } from "@/types";
import { authenticateUser } from "./authenticate-user";
import { prisma } from "@/config/prisma";
import { ERRORS } from "@/constants";
import {
  combinedSlug,
  extractNameFromEmail,
  isSubscriptionActive,
  successResponse,
} from "@/utils";

export const getSubscriptionEntitlement = async (): Promise<
  Response<Entitlement>
> => {
  try {
    const { data } = await authenticateUser();

    const [user, subscription] = await Promise.all([
      prisma.user.findFirst({
        where: { id: data?.userId },
        select: { id: true, name: true, email: true },
      }),
      prisma.subscription.findFirst({
        where: { userId: data?.userId },
        select: { status: true, currentPeriodEnd: true },
      }),
    ]);

    if (!user) {
      return ERRORS.USER_NOT_FOUND;
    }

    const profileName =
      combinedSlug(user.name) || extractNameFromEmail(user.email);
    const entitlement = isSubscriptionActive(
      subscription?.status,
      subscription?.currentPeriodEnd
    );

    return successResponse<Entitlement>({ entitlement, profileName });
  } catch (error) {
    console.error(
      "[getSubscriptionEntitlement] Error fetching subscription entitlement:",
      error
    );
    return ERRORS.SERVER_ERROR;
  }
};
