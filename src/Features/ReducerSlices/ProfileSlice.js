import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserServices from "../../Services/UserServices";
export const getUserByIdThunk = createAsyncThunk(
  "User/setUserProfile",
  async (id) => {
    const profile = await UserServices().getUserById(id);
    return profile;
  }
);

const ProfileInitialState = {
  info: {},
};
const profileSlice = createSlice({
  name: "profile",
  initialState: ProfileInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserByIdThunk.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});
const { actions, reducer } = profileSlice;
export const getProfileUserId = (state) => state.profile.info.administratorId;
export default reducer;
