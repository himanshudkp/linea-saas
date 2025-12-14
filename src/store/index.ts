"use client";

import {
  combineReducers,
  configureStore,
  type Reducer,
  type Middleware,
  type ReducersMapObject,
} from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { ProjectAPI } from "./api/project-api";
import profile from "./slices/profile-slice";
import project from "./slices/projects-slice";

const apis = [ProjectAPI];

const slices: Record<string, Reducer> = { profile, project };

const rootReducer = combineReducers({
  ...slices,
  ...apis.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer;
    return acc;
  }, {} as ReducersMapObject),
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        ...apis.map((api) => api.middleware as Middleware)
      ),
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
