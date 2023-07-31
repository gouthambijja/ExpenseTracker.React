import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logout from "../Hooks/Logout";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const auth = useSelector((store) => store.auth);
  const profile = useSelector((store) => store.profile.info);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logout = Logout();
    const response = await logout();
    if (response) {
      toast.success("Logout success");
      navigate("/login");
      toggleUserMenu();
    } else {
      toast.error("Logout failed, please try again!");
    }
  };
  const activeItem =
    "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium";
  const InActiveItem =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  const location = useLocation();
  return (
    <div style={{ position: "sticky", top: "0px", zIndex: "100" }}>
      <nav className="bg-gray-800">
        <div className="mx-auto px-6 sm:px-6 lg:px-5">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {auth.accessToken ? (
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                >
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>{" "}
                </button>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <div
                  style={{
                    fontVariant: "small-caps",
                    color: "White",
                    fontSize: "1.4rem",
                  }}
                >
                  ExpenseTracker
                </div>
              </div>
              {auth?.accessToken ? (
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <span
                      onClick={() => navigate("/")}
                      className={
                        location.pathname == "/" ? activeItem : InActiveItem
                      }
                      aria-current="page"
                    >
                      Dashboard
                    </span>

                    <span
                      onClick={() => {
                        navigate("/transactions");
                      }}
                      className={
                        location.pathname.includes("transactions")
                          ? activeItem
                          : InActiveItem
                      }
                    >
                      Transactions
                    </span>
                    <span
                      onClick={() => navigate("/categories")}
                      className={
                        location.pathname.includes("categories")
                          ? activeItem
                          : InActiveItem
                      }
                    >
                      Categories
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={toggleUserMenu}
                aria-expanded={isUserMenuOpen}
              ></button>
              {auth?.accessToken ? (
                <div className="relative ml-3" style={{ zIndex: "10" }}>
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={isUserMenuOpen}
                      onClick={toggleUserMenu}
                    >
                      <span className="sr-only">Open user menu</span>
                      {profile?.profileImg ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          style={{ objectFit: "cover" }}
                          src={`data:image/jpeg;base64,${profile?.profileImg}`}
                          alt=""
                        />
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full  flex justify-center items-center"
                          style={{ fontSize: "25px" }}
                        >
                          <span className="user-select-none">
                            {profile?.userName
                              ? profile.userName[0].toUpperCase()
                              : ""}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div
                    className={`${
                      isUserMenuOpen ? "block" : "hidden"
                    } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <span
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      style={{ cursor: "pointer" }}
                      id="user-menu-item-0"
                      onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </span>

                    <span
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:hidden" id="mobile-menu`}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <div
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
              className={location.pathname == "/" ? activeItem : InActiveItem}
              aria-current="page"
            >
              Dashboard
            </div>

            <div
              onClick={() => {
                navigate("/transactions");
                setIsMobileMenuOpen(false);
              }}
              className={
                location.pathname.includes("transactions")
                  ? activeItem
                  : InActiveItem
              }
            >
              Transactions
            </div>
            <div
              onClick={() => {
                navigate("/categories");
                setIsMobileMenuOpen(false);
              }}
              className={
                location.pathname.includes("categories")
                  ? activeItem
                  : InActiveItem
              }
            >
              Categories
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
