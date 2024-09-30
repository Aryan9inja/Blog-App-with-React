import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import loadingSlice from "./LoadingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
  },
});

export default store;
