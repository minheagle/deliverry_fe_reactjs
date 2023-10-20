import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  getUser,
  getUserSuccess,
  getUserFailure,
  log_out,
  logoutSuccess,
  logoutFailure,
} from "../../slice/public/auth.slice";
import authApi from "../../api/public/auth.api";
import roleHelper from "../../../utils/handleRole";

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const response = yield call(authApi.register, data);
    console.log(response);
    yield put(registerSuccess(response));
    yield callback.goToLogin();
  } catch (error) {
    if (
      error.message &&
      error.message !== "Request failed with status code 401"
    ) {
      yield put(registerFailure(error.message));
    } else {
      yield put(registerFailure("Register Fail !"));
    }
  }
}

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const response = yield call(authApi.login, data);
    yield localStorage.setItem(
      "accessToken",
      JSON.stringify(response.accessToken)
    );
    yield localStorage.setItem("userData", JSON.stringify(response.data));
    // yield Cookies.set("refreshToken", response.refreshToken);
    yield put(loginSuccess(response.data));
    const newRoles = roleHelper.convertRole(response.data.roles);
    if (roleHelper.checkRole("ROLE_ADMIN", newRoles)) {
      yield callback.goToAdmin();
    } else {
      yield callback.goToHome();
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* getUserInfoSaga(action) {
  try {
    const response = yield call(authApi.getUserInfo, action.payload);
    yield localStorage.setItem("userData", JSON.stringify(response.data));
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* logoutSaga(action) {
  try {
    const { callback } = action.payload;
    yield call(authApi.logout);
    yield localStorage.clear();
    yield put(logoutSuccess());
    yield callback.goToLogin();
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(register, registerSaga);
  yield takeLatest(login, loginSaga);
  yield takeLatest(log_out, logoutSaga);
  yield takeEvery(getUser, getUserInfoSaga);
}

export default authSaga;
