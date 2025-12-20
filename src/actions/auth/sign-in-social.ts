"use server";

import { auth } from "@/config/auth";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorMessage,
  handleAuthApiError,
  hasError,
} from "@/utils/error";
import type { ActionResponse, SocialProvider } from "@/types";

export const signInSocial = async (
  provider: SocialProvider
): Promise<ActionResponse<{ url?: string }>> => {
  try {
    const result = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: "/dashboard",
      },
    });

    if (hasError(result)) {
      return handleAuthApiError<{ url?: string }>(result, "OAUTH_FAILED");
    }

    const url =
      typeof result === "object" && result !== null && "url" in result
        ? (result.url as string | undefined)
        : undefined;

    return createSuccessResponse<{ url?: string }>(undefined, { url });
  } catch (error) {
    console.error("[signInSocial] Error:", error);
    return createErrorResponse<{ url?: string }>(
      getErrorMessage(error),
      "OAUTH_ERROR"
    );
  }
};
