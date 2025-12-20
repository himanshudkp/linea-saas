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

export const signIn = async (
  email: string,
  password: string
): Promise<ActionResponse> => {
  try {
    const result = await auth.api.signInEmail({
      body: { email: email.toLowerCase().trim(), password },
    });

    if (hasError(result)) {
      return handleAuthApiError(result, "SIGNIN_FAILED");
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.SIGNIN_SUCCESS);
  } catch (error) {
    console.error("[signIn] Error:", error);
    return createErrorResponse(getErrorMessage(error), "SERVER_ERROR");
  }
};
