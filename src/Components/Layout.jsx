import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="container-height">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          closeButton={true}
        />
        <Outlet />
      </div>
      {/* <footer style={footerStyle}>
        <Container maxWidth="md">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} BookMyEvent. All rights reserved.
          </Typography>
        </Container>
      </footer> */}
    </div>
  );
};
