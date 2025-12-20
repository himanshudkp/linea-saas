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
import { headers } from "next/headers";

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  revokeOtherSessions: boolean = true
): Promise<ActionResponse> => {
  try {
    const result = await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions,
      },
      headers: await headers(),
    });

    if (hasError(result)) {
      return handleAuthApiError(result, "CHANGE_FAILED");
    }

    return createSuccessResponse(AUTH_ERROR_MESSAGES.PASSWORD_CHANGED_SUCCESS);
  } catch (error) {
    console.error("[changePassword] Error:", error);
    return createErrorResponse(getErrorMessage(error), "SERVER_ERROR");
  }
};
