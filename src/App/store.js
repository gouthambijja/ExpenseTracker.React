import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/ReducerSlices/authSlice";
import profileReducer from "../Features/ReducerSlices/ProfileSlice";
import { setAccessToken } from "../Hooks/AxiosPrivate";
import { apiSlice } from "../Features/Api/apiSlice";
let store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
});
store.subscribe(() => {
  const { accessToken } = store.getState().auth;
  setAccessToken(accessToken);
});
export default store;
