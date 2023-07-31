import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserServices from "../Services/UserServices";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const _isEmailExists = await UserServices().IsEmailExists(email);
    if (password != confirmPassword) {
      setPasswordError("Password's Didn't Match");
      return;
    } else if (_isEmailExists) {
      toast.error("Email Already Exists!");
      return;
    }
    const _formData = new FormData();
    _formData.append("Name", username);
    _formData.append("Email", email);
    _formData.append("PhoneNumber", phoneNumber);
    _formData.append("ProfileImage", profileImage);
    _formData.append("SecurityQuestion", securityQuestion);
    _formData.append("SecurityAnswer", securityAnswer);
    _formData.append("Password", password);

    const data = await UserServices().registerUser(_formData);
    if (data) {
      navigate("/login");
    }
  };

  return (
    <div
      style={{ minHeight: "calc( 100vh - 64px )" }}
      className="flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your username"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
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
              htmlFor="phone-number"
              className="block text-sm font-medium text-white"
            >
              Phone Number
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your phone number"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="profile-image"
              className="block text-sm font-medium text-white"
            >
              Profile Image
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="profile-image"
              name="profile-image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="security-question"
              className="block text-sm font-medium text-white"
            >
              Security Question
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="security-question"
              name="security-question"
              type="text"
              autoComplete="off"
              required
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your security question"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="security-answer"
              className="block text-sm font-medium text-white"
            >
              Security Answer
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="security-answer"
              name="security-answer"
              type="text"
              autoComplete="off"
              required
              value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer(e.target.value);
              }}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your security answer"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => {
                setPasswordError("");
                setPassword(e.target.value);
              }}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Your password"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setPasswordError("");
                setConfirmPassword(e.target.value);
              }}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="group relative  w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
