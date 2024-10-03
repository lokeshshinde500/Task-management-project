import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
