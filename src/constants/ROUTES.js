const ROUTES = {
  PUBLIC: {
    HOME: "/",
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
    },
  },
  USER: {
    ACCOUNT: {
      PROFILE: "/user/account",
    },
  },
  DELIVERY: {
    DISTRICT: "/delivery/districts/:districtName",
    ROUTE: "/delivery/route",
  },
  ADMIN: {
    DASHBOARD: {
      PAGE: "/admin/dashboard",
    },
  },
};

export default ROUTES;
