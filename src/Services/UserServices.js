import { toast } from "react-toastify";
import Axios from "../Api/Axios";
import AxiosPrivate from "../Hooks/AxiosPrivate";

const UserServices = () => {
  const axiosPrivate = AxiosPrivate();
  const loginUser = async (formData) => {
    try {
      const response = await Axios.post("User/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch {
      toast.error("login failed Please try again :(");
    }
  };
  const googleLoginUser = async (formData) => {
    try {
      const response = await Axios.post("User/googlesignin", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch {
      toast.error("login failed Please try again :(");
    }
  };
  const getUserById = async (id) => {
    const response = await axiosPrivate.get(`User/GetUserById/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  };
  const IsEmailExists = async (email) => {
    const response = await axiosPrivate.get(
      `User/IsUserExists?email=${email}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  };
  const registerUser = async (formData) => {
    try {
      const response = await Axios.post("User/Register", formData, {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      });
      return true;
    } catch {
      toast.error("Registration Failed!");
      return false;
    }
  };
  return {
    googleLoginUser,
    loginUser,
    getUserById,
    registerUser,
    IsEmailExists,
  };
};
export default UserServices;
