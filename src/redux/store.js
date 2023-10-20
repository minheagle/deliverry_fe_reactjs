import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga/rootSaga";

import authSlice from "./slice/public/auth.slice";
import transportOrderSlice from "./slice/transport_order/transport.order.slice";
import transportUiSlice from "./slice/UI/transport.ui.slice";

const rootReducer = {
  Auth: authSlice,
  TransportOrder: transportOrderSlice,
  TransportUI: transportUiSlice,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
