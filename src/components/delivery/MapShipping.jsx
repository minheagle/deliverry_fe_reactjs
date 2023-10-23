import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRoute } from "../../redux/slice/transport_order/transport.order.slice";
import transportOrderHelper from "../../utils/handleTransportOrder";

import Map from "./Map";
import Loading from "../common/Loading";

const MapShipping = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.TransportOrder.get_route);
  const waypointMarker = localStorage.getItem("waypointMarker")
    ? JSON.parse(localStorage.getItem("waypointMarker"))
    : [];

  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : [];

  useEffect(() => {
    dispatch(
      getRoute({
        deliveryAddressList: transportOrderHelper.getAllAddress(shipping),
      })
    );
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Map waypointMarkerOptions={waypointMarker} />
    </div>
  );
};

export default MapShipping;
