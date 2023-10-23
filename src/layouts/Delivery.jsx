import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import ROUTES from "../constants/ROUTES";

import Header from "../components/common/Header";

const Delivery = () => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  if (!userData) {
    return <Navigate to={ROUTES.PUBLIC.AUTH.LOGIN} />;
  }

  return (
    <div className="relative w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default Delivery;
