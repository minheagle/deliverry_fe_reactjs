import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  getAllByDistrict,
  getRoute,
} from "../../redux/slice/transport_order/transport.order.slice";
import transportOrderHelper from "../../utils/handleTransportOrder";
import ROUTES from "../../constants/ROUTES";

import Map from "../../components/delivery/Map";
import ListOrder from "./ListOrder";
import ModalDetailTransport from "../../components/delivery/ModalDetailTransport";

const RouteShipping = () => {
  const dispatch = useDispatch();

  const {
    get_route,
    waypoint_marker,
    get_all_by_district,
    check_un_finish_shipping,
  } = useSelector((state) => state.TransportOrder);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    if (userData) {
      dispatch(getAllByDistrict());
    }
  }, [get_all_by_district?.data]);

  useEffect(() => {
    dispatch(
      getRoute({
        deliveryAddressList: transportOrderHelper.convertShipAddress(
          get_all_by_district?.data,
          userData.id
        ),
      })
    );
  }, [get_all_by_district?.data]);

  const options = {
    routes: JSON.stringify(get_route?.data),
    originMarkerOptions: {
      position: {
        lng: 108.21828,
        lat: 16.07445,
      },
      title: "Start",
    },
    destinationMarkerOptions: {
      position: {
        lng: 108.21828,
        lat: 16.07445,
      },
      title: "End",
      userInteractionEnabled: false,
    },
    activeOutlineWidth: 2,
    inactiveOutlineWidth: 2,
    inactiveOutlineColor: "#FF00FF",
  };

  return check_un_finish_shipping.data.length === 0 ? (
    <Navigate to={ROUTES.PUBLIC.HOME} />
  ) : (
    <div className="w-full h-without-header-6-rem grid grid-cols-4">
      <div className="col-span-1 h-without-header-6-rem">
        <ListOrder />
      </div>
      <div className="col-span-3 w-full h-max">
        {get_route.loading ? (
          <div>Loading</div>
        ) : (
          <Map
            loading={get_route.loading}
            data={get_route?.data}
            options={options}
            waypointMarkerOptions={waypoint_marker?.data}
          />
        )}
      </div>
      <ModalDetailTransport />
    </div>
  );
};

export default RouteShipping;
