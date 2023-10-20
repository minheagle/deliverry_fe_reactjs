import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  get_all_by_district: {
    data: [],
    loading: false,
    error: "",
  },
  confirm_ship: {
    data: [],
    loading: false,
    error: "",
  },
  get_route: {
    data: "",
    loading: false,
    error: "",
  },
  waypoint_marker: {
    data: [],
    loading: false,
    error: "",
  },
  check_un_finish_shipping: {
    data: [],
    loading: false,
    error: "",
  },
  change_status_shipping: {
    data: null,
    loading: false,
    error: "",
  },
};

const transportOrderSlice = createSlice({
  name: "Transport_Order",
  initialState: initialState,
  reducers: {
    getAllByDistrict: (state) => {
      state.get_all_by_district.loading = true;
    },
    getAllByDistrictSuccess: (state, action) => {
      state.get_all_by_district.loading = false;
      state.get_all_by_district.error = "";
      state.get_all_by_district.data = action.payload;
    },
    getAllByDistrictFailure: (state, action) => {
      state.get_all_by_district.loading = false;
      state.get_all_by_district.data = [];
      state.get_all_by_district.error = action.payload;
    },
    confirmShip: (state) => {
      state.confirm_ship.loading = true;
    },
    confirmShipSuccess: (state, action) => {
      state.confirm_ship.loading = false;
      state.confirm_ship.error = "";
      state.confirm_ship.data = action.payload;
    },
    confirmShipFailure: (state, action) => {
      state.confirm_ship.loading = false;
      state.confirm_ship.data = null;
      state.confirm_ship.error = action.payload;
    },
    getRoute: (state) => {
      state.get_route.loading = true;
    },
    getRouteSuccess: (state, action) => {
      state.get_route.loading = false;
      state.waypoint_marker.loading = false;
      state.get_route.error = "";
      state.waypoint_marker.error = "";
      state.get_route.data = action.payload.routes;
      state.waypoint_marker.data = action.payload.waypointMarker;
    },
    getRouteFailure: (state, action) => {
      state.get_route.loading = false;
      state.waypoint_marker.loading = false;
      state.get_route.data = null;
      state.waypoint_marker.data = [];
      state.get_route.error = action.payload;
      state.waypoint_marker.error = "";
    },
    checkUnFinishShipping: (state) => {
      state.check_un_finish_shipping.loading = true;
    },
    checkUnFinishShippingSuccess: (state, action) => {
      state.check_un_finish_shipping.loading = false;
      state.check_un_finish_shipping.error = "";
      state.check_un_finish_shipping.data = action.payload;
    },
    checkUnFinishShippingFailure: (state, action) => {
      state.check_un_finish_shipping.loading = false;
      state.check_un_finish_shipping.data = null;
      state.check_un_finish_shipping.error = action.payload;
    },
    changeStatusShipping: (state) => {
      state.change_status_shipping.loading = true;
    },
    changeStatusShippingSuccess: (state, action) => {
      state.change_status_shipping.loading = false;
      state.change_status_shipping.error = "";
      state.change_status_shipping.data = action.payload;
    },
    changeStatusShippingFailure: (state, action) => {
      state.change_status_shipping.loading = false;
      state.change_status_shipping.data = null;
      state.change_status_shipping.error = action.payload;
    },
  },
});

export const {
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
} = transportOrderSlice.actions;

export default transportOrderSlice.reducer;
