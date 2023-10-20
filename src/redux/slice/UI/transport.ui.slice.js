import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal_for_transport_detail: {
    isOpen: false,
    data: null,
  },
};

const transportUISlice = createSlice({
  name: "Transport_UI",
  initialState: initialState,
  reducers: {
    toggleModalTransportDetail: (state, action) => {
      state.modal_for_transport_detail.isOpen = action.payload.isOpen;
      state.modal_for_transport_detail.data = action.payload.data;
    },
  },
});

export const { toggleModalTransportDetail } = transportUISlice.actions;

export default transportUISlice.reducer;
