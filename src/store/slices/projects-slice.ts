import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProjectSummary {
  id: string;
  name: string;
  projectNumber: number;
  thumbnail?: string;
  lastModified: number;
  createdAt: number;
  isPublic?: boolean;
}

interface ProjectsState {
  projects: ProjectSummary[];
  total: number;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  isCreating: boolean;
  createError: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  total: 0,
  isLoading: false,
  error: null,
  lastFetched: null,
  isCreating: false,
  createError: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProjectSuccess: (
      state,
      action: PayloadAction<{ projects: ProjectSummary[]; total: number }>
    ) => {
      state.isLoading = false;
      state.projects = action.payload.projects;
      state.total = action.payload.total;
      state.error = null;
      state.lastFetched = Date.now();
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createProjectsStart: (state) => {
      state.isCreating = true;
      state.createError = null;
    },
    createProjectsSuccess: (state) => {
      state.isCreating = false;
      state.createError = null;
    },
    createProjectsFailure: (state, action: PayloadAction<string>) => {
      state.isCreating = false;
      state.createError = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectSummary>) => {
      state.projects.unshift(action.payload);
      state.total = +1;
    },
    updateProject: (state, action: PayloadAction<ProjectSummary>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
    clearProjects: (state) => {
      state.projects = [];
      state.createError = null;
      state.error = null;
      state.lastFetched = null;
      state.total = 0;
    },
    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
    },
  },
});

export const {
  addProject,
  clearErrors,
  clearProjects,
  createProjectsFailure,
  createProjectsStart,
  createProjectsSuccess,
  fetchProjectSuccess,
  fetchProjectsFailure,
  fetchProjectsStart,
  removeProject,
  updateProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
