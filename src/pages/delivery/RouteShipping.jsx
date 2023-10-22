import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  getAllByDistrict,
  getRoute,
  checkUnFinishShipping,
} from "../../redux/slice/transport_order/transport.order.slice";
import transportOrderHelper from "../../utils/handleTransportOrder";
import ROUTES from "../../constants/ROUTES";

import Map from "../../components/delivery/Map";
import Loading from "../../components/common/Loading";
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

  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : null;

  useEffect(() => {
    if (userData) {
      dispatch(getAllByDistrict());
      dispatch(
        checkUnFinishShipping({
          shipperId: userData.id,
        })
      );
      dispatch(
        getRoute({
          deliveryAddressList: transportOrderHelper.convertShipAddress(
            get_all_by_district?.data,
            userData.id
          ),
        })
      );
    }
  }, []);

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

  if (!userData) {
    return <Navigate to={ROUTES.PUBLIC.AUTH.LOGIN} />;
  }

  if (!shipping) {
    return <Navigate to={ROUTES.PUBLIC.HOME} />;
  }

  return get_route?.loading ? (
    <Loading />
  ) : (
    <div className="w-full h-without-header-6-rem grid grid-cols-4">
      <div className="col-span-1 h-without-header-6-rem">
        <ListOrder />
      </div>
      <div className="col-span-3 w-full h-max">
        <Map
          loading={get_route.loading}
          data={get_route?.data}
          options={options}
          waypointMarkerOptions={waypoint_marker?.data}
        />
      </div>
      <ModalDetailTransport />
    </div>
  );
};

export default RouteShipping;
