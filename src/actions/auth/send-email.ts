"use server";

import { auth } from "@/config/auth";
import { AUTH_ERROR_MESSAGES } from "@/constants";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorMessage,
  handleAuthApiError,
  hasError,
} from "@/utils/error";
import type { ActionResponse } from "@/types";

export const sendVerificationEmail = async (
  email: string
): Promise<ActionResponse> => {
  try {
    const result = await auth.api.sendVerificationEmail({
      body: {
        email: email.toLowerCase().trim(),
        callbackURL: "/dashboard",
      },
    });

    if (hasError(result)) {
      return handleAuthApiError(result, "VERIFICATION_FAILED");
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.VERIFICATION_EMAIL_SENT);
  } catch (error) {
    console.error("[sendVerificationEmail] Error:", error);
    return createErrorResponse(getErrorMessage(error), "SERVER_ERROR");
  }
};
