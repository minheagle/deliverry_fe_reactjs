import { all } from "redux-saga/effects";

import authSaga from "./public/auth.saga";
import transportOrderSaga from "./transport_order/transport.order.saga";

function* rootSaga() {
  yield all([authSaga(), transportOrderSaga()]);
}

export default rootSaga;
