import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import Public from "./layouts/Public";
import Home from "./pages/public/home/Home";
import Login from "./pages/public/auth/Login";
import Register from "./pages/public/auth/Register";

import Delivery from "./layouts/Delivery";
import OrderByDistrict from "./pages/delivery/OrderByDistrict";
import Shipping from "./pages/delivery/Shipping";

import ROUTES from "./constants/ROUTES";
import { getUser } from "./redux/slice/public/auth.slice";
import "./fontawesome.js";

const App = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const decodeJWT = jwtDecode(accessToken);
      dispatch(getUser(decodeJWT.sub));
    }
  }, [accessToken]);

  return (
    <Routes>
      <Route element={<Public />}>
        <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
        <Route path={ROUTES.PUBLIC.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES.PUBLIC.AUTH.REGISTER} element={<Register />} />
      </Route>
      <Route element={<Delivery />}>
        <Route path={ROUTES.DELIVERY.DISTRICT} element={<OrderByDistrict />} />
        <Route path={ROUTES.DELIVERY.ROUTE} element={<Shipping />} />
      </Route>
    </Routes>
  );
};

export default App;
