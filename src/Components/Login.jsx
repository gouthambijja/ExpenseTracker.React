import React, { useEffect, useState } from "react";
import {
  googleLoginThunk,
  loginThunk,
} from "../Features/ReducerSlices/authSlice";
import { getUserByIdThunk } from "../Features/ReducerSlices/ProfileSlice";
import { GoogleLogin } from "@react-oauth/google";
import store from "../App/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
const Login = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        loginThunk({ userEmail: email, password: password })
      ).unwrap();
      await dispatch(getUserByIdThunk(store.getState().auth.id)).unwrap();
      navigate("/");
    } catch {
      toast.error("Login failed");
    }
  };

  const handleGoogleLogin = async (userDetails) => {
    const user = {
      userName: userDetails.name,
      userEmail: userDetails.email,
      googleId: userDetails.sub,
    };
    try {
      await dispatch(googleLoginThunk(user)).unwrap();
      await dispatch(getUserByIdThunk(store.getState().auth.id)).unwrap();
      navigate("/");
    } catch {
      toast.error("Login failed");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{ minHeight: "calc( 100vh - 64px )" }}
      className="flex items-center justify-center  bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your email address"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white flex justify-between"
            >
              <span>Password</span>
              <span className="text-blue-500">Forget Password?</span>
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your password"
            />
          </div>

          <div>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="group relative  w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
            <div>
              <div className="flex items-center justify-center my-4">
                <hr className="w-1/4 border-gray-300" />
                <div className="mx-4 text-gray-500">or</div>
                <hr className="w-1/4 border-gray-300" />
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLogin(jwtDecode(credentialResponse.credential));
                }}
                onError={() => {
                  toast.error("Login failed");
                }}
              />
            </div>
          </div>

          <div className="text-center text-sm text-white mt-4">
            <span>Don't have an account?</span>
            <button
              type="button"
              onClick={handleRegister}
              className="ml-2 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
            >
              Register now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
