import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  information: {
    data: null,
    loading: false,
    error: "",
  },
  login: {
    loading: false,
    error: "",
  },
  register: {
    loading: false,
    error: "",
  },
  logout: {
    loading: false,
    error: "",
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    getUser: (state) => {
      state.information.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.information.loading = false;
      state.information.data = action.payload;
    },
    getUserFailure: (state, action) => {
      state.information.loading = false;
      state.information.error = action.payload;
    },
    register: (state) => {
      state.register.loading = true;
      state.register.error = "";
    },
    registerSuccess: (state) => {
      state.register.loading = false;
      state.register.error = "";
    },
    registerFailure: (state, action) => {
      state.register.loading = false;
      state.register.error = action.payload;
    },
    login: (state) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.information.data = action.payload;
      state.information.error = "";
      state.login.error = "";
    },
    loginFailure: (state, action) => {
      state.login.loading = false;
      state.login.error = "Login Fail !";
    },
    log_out: (state) => {
      state.logout.loading = true;
    },
    logoutSuccess: (state) => {
      state.logout.loading = false;
      state.information.data = null;
    },
    logoutFailure: (state, action) => {
      state.logout.loading = false;
      state.logout.error = action.payload;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailure,
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  log_out,
  logoutSuccess,
  logoutFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
