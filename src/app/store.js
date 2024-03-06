import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authenticationSlice";
import { authenticationApiSlice } from "./api/authenticationApiSlice";
import { courseApiSlic } from "./api/courseApiSlice";
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    [authenticationApiSlice.reducerPath]: authenticationApiSlice.reducer,
    [courseApiSlic.reducerPath]: courseApiSlic.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApiSlice.middleware)
      .concat(courseApiSlic.middleware),
});
