import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../generated/prisma/client";

type ProfileState = {
  user: User | null;
};

const initialState: ProfileState = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearProfile(state) {
      state.user = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
