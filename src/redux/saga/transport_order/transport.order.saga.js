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
  changeListShipping,
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
    const listTitle = deliveryAddressList?.map((item) => {
      const address = item?.split(",")[0];
      return address;
    });
    const response = yield call(
      transportOrderApi.getRoute,
      deliveryAddressList
    );

    const waypointMarker =
      response?.result?.routes[0]?.snappedWaypoints?.filter(
        (item) => item.lat !== 16.07445 && item.lng !== 108.21828
      );

    const waypointOrder = response?.result?.waypointOrder;

    const newList = waypointMarker.map((item, index) => {
      const title = listTitle[waypointOrder[index]];
      return {
        position: item,
        title,
      };
    });

    yield put(
      getRouteSuccess({
        routes: response,
      })
    );

    yield localStorage.setItem("routes", JSON.stringify(response));
    yield localStorage.setItem("waypointMarker", JSON.stringify(newList));
    yield localStorage.setItem("waypointOrder", JSON.stringify(waypointOrder));
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
  const { dInforId, changeStatusRequest, callback } = action.payload;
  try {
    // const response = yield call(
    //   transportOrderApi.changeStatusShipping,
    //   dInforId,
    //   changeStatusRequest
    // );
    const listShipping = localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : [];
    if (changeStatusRequest?.currentStatus) {
      let find = listShipping?.find((item) => item.id === dInforId);
      find = { ...find, status: "DELIVERED_SUCCESSFULLY" };
      const newList = listShipping?.filter((item) => item.id !== dInforId);
      yield put(changeListShipping([...newList, find]));
      yield localStorage.setItem(
        "shipping",
        JSON.stringify([...newList, find])
      );
    } else {
      let find = listShipping?.find((item) => item.id === dInforId);
      find = { ...find, status: "DELIVERY_FAILED" };
      const newList = listShipping?.filter((item) => item.id !== dInforId);
      yield put(changeListShipping([...newList, find]));
      yield localStorage.setItem(
        "shipping",
        JSON.stringify([...newList, find])
      );
    }
    yield put(changeStatusShippingSuccess(response));
  } catch (error) {
    yield put(changeStatusShippingFailure(error.message));
  } finally {
    yield callback.success();
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
