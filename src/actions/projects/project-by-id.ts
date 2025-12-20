"use server";

import type { Projects } from "../../../generated/prisma/client";
import { prisma } from "@/config/prisma";
import { ERRORS } from "@/constants";
import { successResponse } from "@/utils";
import type { Response } from "@/types";
import { authenticateUser } from "../user/authenticate-user";

export const getProjectById = async (
  projectId: string
): Promise<Response<Projects>> => {
  try {
    if (!projectId) return ERRORS.PROJECT_ID_NOT_FOUND;

    const { data: { userId } = {} } = await authenticateUser();

    const project = await prisma.projects.findFirst({
      where: { id: projectId },
    });

    if (!project) return ERRORS.PROJECT_NOT_FOUND;

    const { userId: ownerId, isPublic } = project as Projects;

    if (ownerId !== userId || !isPublic) ERRORS.ACCESS_DENIED;

    return successResponse(project);
  } catch (error) {
    console.error("[getProjectById] Error fetching project:", error);
    return ERRORS.SERVER_ERROR;
  }
};
