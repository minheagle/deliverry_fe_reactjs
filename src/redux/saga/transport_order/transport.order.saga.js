import { put, call, takeLatest } from "redux-saga/effects";
import {
  getAllByDistrict,
  getAllByDistrictSuccess,
  getAllByDistrictFailure,
  confirmShip,
  confirmShipSuccess,
  confirmShipFailure,
  getRoute,
  getRouteSuccess,
  getRouteFailure,
  checkUnFinishShipping,
  checkUnFinishShippingSuccess,
  checkUnFinishShippingFailure,
  changeStatusShipping,
  changeStatusShippingSuccess,
  changeStatusShippingFailure,
} from "../../slice/transport_order/transport.order.slice";
import transportOrderApi from "../../api/transport_order/transport.order.api";

function* getAllByDistrictSaga() {
  try {
    const response = yield call(transportOrderApi.getAllByDistrict);
    yield put(getAllByDistrictSuccess(response.results.data));
  } catch (error) {
    yield put(getAllByDistrictFailure(error.message));
  }
}

function* confirmShipSaga(action) {
  try {
    const { shipperId, deliveryInformationList, callback } = action.payload;
    const response = yield call(
      transportOrderApi.confirmShip,
      shipperId,
      deliveryInformationList
    );
    yield put(confirmShipSuccess(response.results.data));
    yield callback.notification("Confirm Ship Success");
    yield callback.goDelivery();
  } catch (error) {
    yield put(confirmShipFailure(error.message));
  }
}

function* getRouteSaga(action) {
  try {
    const { deliveryAddressList } = action.payload;
    const response = yield call(
      transportOrderApi.getRoute,
      deliveryAddressList
    );

    yield put(
      getRouteSuccess({
        routes: JSON.parse(response.results.data),
        waypointMarker: response.results.data2,
      })
    );

    yield localStorage.setItem("routes", JSON.stringify(response.results.data));
    yield localStorage.setItem(
      "waypointMarker",
      JSON.stringify(response.results.data2)
    );
  } catch (error) {
    yield put(getRouteFailure(error.message));
  }
}

function* checkUnFinishShippingSaga(action) {
  try {
    const { shipperId } = action.payload;
    const response = yield call(
      transportOrderApi.checkUnFinishShipping,
      shipperId
    );
    yield put(checkUnFinishShippingSuccess(response.results.data));
    yield localStorage.setItem(
      "shipping",
      JSON.stringify(response.results.data)
    );
  } catch (error) {
    yield put(checkUnFinishShippingFailure(error.message));
  }
}

function* changeStatusShippingSaga(action) {
  try {
    const { dInforId, changeStatusRequest, callback } = action.payload;
    const response = yield call(
      transportOrderApi.changeStatusShipping,
      dInforId,
      changeStatusRequest
    );
    yield put(changeStatusShippingSuccess(response));
    yield callback.reload();
  } catch (error) {
    yield put(changeStatusShippingFailure(error.message));
  }
}

function* transportOrderSaga() {
  yield takeLatest(getAllByDistrict, getAllByDistrictSaga);
  yield takeLatest(confirmShip, confirmShipSaga);
  yield takeLatest(getRoute, getRouteSaga);
  yield takeLatest(checkUnFinishShipping, checkUnFinishShippingSaga);
  yield takeLatest(changeStatusShipping, changeStatusShippingSaga);
}

export default transportOrderSaga;
