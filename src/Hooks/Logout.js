import store from "../App/store";
import { axiosPrivate } from "../Api/Axios";
import { clearAuth } from "../Features/ReducerSlices/authSlice";
import { googleLogout } from "@react-oauth/google";

const Logout = () => {
  const _Logout = async () => {
    const logout = await axiosPrivate.post("/auth/logout");
    googleLogout();
    if (logout.data) {
      store.dispatch(clearAuth());
      return true;
    } else return false;
  };
  return _Logout;
};

export default Logout;
