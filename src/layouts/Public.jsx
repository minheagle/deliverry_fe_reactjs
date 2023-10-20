import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";

const Public = () => {
  return (
    <div className="relative w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default Public;
