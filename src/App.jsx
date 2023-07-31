import React, { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./Components/Layout";
import Error from "./Components/Error";
import PersistLogin from "./Components/PersistLogin";
import Login from "./Components/Login";
import RequireAuth from "./Components/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./Components/Transactions";
import Categories from "./Components/Categories";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import AddTransactionForm from "./Components/AddTransactionForm";
import "./App.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route element={<PersistLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="categories" element={<Categories />} />
              <Route path="profile" element={<Profile />} />
              <Route path="AddTransaction" element={<AddTransactionForm />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
