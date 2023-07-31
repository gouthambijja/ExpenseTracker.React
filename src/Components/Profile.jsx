import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userName, userEmail, profileImg, phoneNumber } = useSelector(
    (store) => store.profile.info
  );
  return (
    <div className="flex w-full justify-center items-center container-height p-4">
      <div
        style={{ maxWidth: "350px" }}
        className=" mx-auto basis-full bg-gray-800 rounded-lg overflow-hidden shadow-md"
      >
        <div className="p-4">
          <div
            style={{ width: "250px", maxWidth: "80vw", aspectRatio: "1/1" }}
            className=" mx-auto rounded-full text-center bg-gray-600 overflow-hidden"
          >
            {profileImg ? (
              <img
                className="object-cover bg-gray-800"
                style={{ objectFit: "cover", aspectRatio: "1/1" }}
                src={`data:image/jpeg;base64,${profileImg}`}
                alt="Profile"
              />
            ) : (
              <div style={{ fontSize: "160px" }} className="user-select-none">
                {userName[0].toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">{userName}</h2>
          <p className="text-gray-300">{userEmail}</p>
        </div>
        <div className="px-4 py-2 bg-gray-700">
          <p className="text-gray-200">Phone Number: {phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
