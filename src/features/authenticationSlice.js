import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userId: null,
  userName: null,
};

export const authenticationSlice = createSlice({
  name: "authenticationReducer",
  initialState,
  reducers: {
    setAuthenticationStatus: (state, action) => {
      const { isAuthenticated, userId, userName } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.userId = userId;
      state.userName = userName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticationStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;
