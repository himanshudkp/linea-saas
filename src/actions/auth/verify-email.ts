"use server";

import { auth } from "@/config/auth";
import { AUTH_ERROR_MESSAGES } from "@/constants";
import {
  createErrorResponse,
  createSuccessResponse,
  extractAuthError,
  getErrorMessage,
  hasError,
} from "@/utils/error";
import type { ActionResponse } from "@/types";

export const verifyEmail = async (token: string): Promise<ActionResponse> => {
  try {
    if (!token || token.trim().length === 0) {
      return createErrorResponse(
        AUTH_ERROR_MESSAGES.INVALID_VERIFICATION_TOKEN,
        "INVALID_TOKEN"
      );
    }

    const result = await auth.api.verifyEmail({
      query: { token: token.trim() },
    });

    if (hasError(result)) {
      const { message } = extractAuthError(result.error);
      const lowerMessage = message.toLowerCase();

      if (
        lowerMessage.includes("expired") ||
        lowerMessage.includes("invalid")
      ) {
        return createErrorResponse(
          AUTH_ERROR_MESSAGES.VERIFICATION_EXPIRED,
          "TOKEN_EXPIRED"
        );
      }

      return createSuccessResponse(AUTH_ERROR_MESSAGES.EMAIL_VERIFIED_SUCCESS);
    }

    return createSuccessResponse("Email verified successfully!");
  } catch (error) {
    console.error("[verifyEmail] Error:", error);
    return createErrorResponse(
      getErrorMessage(error) || AUTH_ERROR_MESSAGES.SERVER_ERROR,
      "SERVER_ERROR"
    );
  }
};
