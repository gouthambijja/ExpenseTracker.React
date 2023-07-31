import { getUserByIdThunk } from "../Features/ReducerSlices/ProfileSlice";
import { setAuth } from "../Features/ReducerSlices/authSlice";
import store from "../App/store";
import jwtDecode from "jwt-decode";
import axios from "../Api/Axios";

const RefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get(
      "/auth/getNewAccessTokenUsingRefreshToken",
      {
        withCredentials: true,
      }
    );
    store.dispatch(setAuth(response?.data));
    const auth = jwtDecode(response?.data);
    await store.dispatch(getUserByIdThunk(auth.nameid)).unwrap();
    return response.data;
  };
  return refresh;
};

export default RefreshToken;
