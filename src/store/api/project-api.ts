import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AutoSaveProjectResponse {
  success: boolean;
  message: string;
  eventId: string;
}

interface AutoSaveProjectRequest {
  projectId: string;
  userId: string;
  shapesData: {
    shapes: Record<string, unknown>;
    tools: string;
    selected: Record<string, unknown>;
    frameCounter: number;
  };
  viewportData: {
    scale: number;
    transition: { x: number; y: number };
  };
}

export const ProjectAPI = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/project" }),
  tagTypes: ["project"],
  endpoints: (builder) => ({
    autoSaveProject: builder.mutation<
      AutoSaveProjectResponse,
      AutoSaveProjectRequest
    >({ query: (data) => ({ url: "", method: "PATCH", body: data }) }),
  }),
});
