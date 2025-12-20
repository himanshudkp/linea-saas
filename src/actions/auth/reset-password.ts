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

export const resetPassword = async (
  newPassword: string,
  token: string
): Promise<ActionResponse> => {
  try {
    if (!token || token.trim().length === 0) {
      return createErrorResponse(
        AUTH_ERROR_MESSAGES.INVALID_RESET_TOKEN,
        "INVALID_TOKEN"
      );
    }

    const result = await auth.api.resetPassword({
      body: {
        newPassword,
        token: token.trim(),
      },
    });

    if (hasError(result)) {
      return handleAuthApiError(result, "RESET_FAILED");
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.PASSWORD_RESET_SUCCESS);
  } catch (error) {
    console.error("[resetPassword] Error:", error);
    return createErrorResponse(getErrorMessage(error), "SERVER_ERROR");
  }
};
