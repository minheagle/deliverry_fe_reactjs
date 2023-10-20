import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { log_out } from "../../redux/slice/public/auth.slice";

import ROUTES from "../../constants/ROUTES";
import ROLES from "../../constants/ROLES";
import roleHelper from "../../utils/handleRole";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null;

  const handleLogout = () => {
    dispatch(
      log_out({
        callback: {
          goToLogin: () => navigate(ROUTES.PUBLIC.AUTH.LOGIN),
        },
      })
    );
  };

  return (
    <div className="sticky top-0 left-0 right-0 w-full grid grid-cols-12 bg-red-600 z-50">
      <div className="col-span-1"></div>
      <div className="col-span-10 w-full h-24 flex flex-col justify-start items-center p-4">
        <div className="w-full flex justify-between items-center">
          <div></div>
          <div className="cursor-pointer group relative">
            <div className="flex justify-center items-center gap-2">
              <FontAwesomeIcon
                icon="fas fa-user"
                className="text-xl text-white"
              />
              <FontAwesomeIcon
                icon="fas fa-arrow-down"
                className="text-white"
              />
            </div>
            <div className="absolute hidden top-4 right-0 group-hover:block p-4">
              {userData ? (
                roleHelper.checkRole(ROLES.ADMIN, userData.roles) ? (
                  <div className="flex flex-col justify-start items-center gap-2 bg-white px-4 py-2 rounded">
                    <Link
                      to={ROUTES.ADMIN.DASHBOARD.PAGE}
                      className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => handleLogout()}
                      className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-start items-center gap-2 bg-white px-4 py-2 rounded">
                    <Link
                      to={ROUTES.USER.ACCOUNT.PROFILE}
                      className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                    >
                      Information
                    </Link>
                    <button
                      onClick={() => handleLogout()}
                      className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                    >
                      Logout
                    </button>
                  </div>
                )
              ) : (
                <div className="flex flex-col justify-start items-center gap-2 bg-white px-4 py-2 rounded">
                  <Link
                    to={ROUTES.PUBLIC.AUTH.LOGIN}
                    className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to={ROUTES.PUBLIC.AUTH.REGISTER}
                    className="w-full flex justify-start items-center px-2 py-1 hover:bg-red-600 hover:text-white hover:rounded"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <Link to={ROUTES.PUBLIC.HOME}>
            <div className="flex justify-center items-center gap-4">
              <FontAwesomeIcon
                icon="fas fa-shipping-fast"
                className="text-3xl text-white"
              />
              <span className="text-2xl text-white">Super Ship</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Header;
