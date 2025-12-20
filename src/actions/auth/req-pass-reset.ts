"use server";

import { auth } from "@/config/auth";
import { AUTH_ERROR_MESSAGES, BASE_URL } from "@/constants";
import {
  createErrorResponse,
  createSuccessResponse,
  extractAuthError,
  hasError,
} from "@/utils/error";
import type { ActionResponse } from "@/types";

export const requestPasswordReset = async (
  email: string
): Promise<ActionResponse> => {
  try {
    const result = await auth.api.requestPasswordReset({
      body: {
        email: email.toLowerCase().trim(),
        redirectTo: `${BASE_URL}/reset-password`,
      },
    });

    if (hasError(result)) {
      const { message } = extractAuthError(result.error);
      if (message.toLowerCase().includes("oauth")) {
        return createErrorResponse(
          AUTH_ERROR_MESSAGES.OAUTH_INVALID_ACCOUNT,
          "OAUTH_ACCOUNT"
        );
      }
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.PASSWORD_RESET_SENT);
  } catch (error) {
    console.error("[requestPasswordReset] Error:", error);
    return createSuccessResponse(AUTH_ERROR_MESSAGES.PASSWORD_RESET_SENT);
  }
};
