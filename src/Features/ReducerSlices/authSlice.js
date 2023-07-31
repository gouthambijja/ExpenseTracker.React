import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import UserServices from "../../Services/UserServices";

const authInitialState = {
  accessToken: "",
  id: "",
};
export const loginThunk = createAsyncThunk(
  "auth/loginAction",
  async (formData) => {
    return await UserServices().loginUser(formData);
  }
);
export const googleLoginThunk = createAsyncThunk(
  "auth/googleloginAction",
  async (formData) => {
    return await UserServices().googleLoginUser(formData);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAuth(state, action) {
      state.accessToken = action.payload;
      const authInfo = jwtDecode(action.payload);
      state.id = authInfo?.nameid;
    },
    clearAuth(state, action) {
      state.accessToken = "";
      state.id = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        const authInfo = jwtDecode(action.payload);
        state.id = authInfo?.nameid;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        const authInfo = jwtDecode(action.payload);
        state.accessToken = action.payload;
        state.id = authInfo?.nameid;
      });
  },
});
const { actions, reducer } = authSlice;
const { clearAuth, setAuth } = actions;
export { clearAuth, setAuth };
export default reducer;
