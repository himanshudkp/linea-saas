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

export const signUp = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<ActionResponse> => {
  try {
    const name = `${firstname.trim()} ${lastname.trim()}`;

    const result = await auth.api.signUpEmail({
      body: { email: email.toLowerCase().trim(), password, name },
    });

    if (hasError(result)) {
      return handleAuthApiError(result, "SIGNUP_FAILED");
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.SIGNUP_SUCCESS);
  } catch (error) {
    console.error("[signUp] Error:", error);
    return createErrorResponse(getErrorMessage(error), "SERVER_ERROR");
  }
};
