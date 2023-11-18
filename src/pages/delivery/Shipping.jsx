import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { checkUnFinishShipping } from "../../redux/slice/transport_order/transport.order.slice";

import ListOrder from "./ListOrder";
import MapShipping from "../../components/delivery/MapShipping";
import ModalDetailTransport from "../../components/delivery/ModalDetailTransport";
import ROUTES from "../../constants/ROUTES";

const Shipping = () => {
  const dispatch = useDispatch();
  const { check_un_finish_shipping } = useSelector(
    (state) => state.TransportOrder
  );

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const listShipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : [];

  useEffect(() => {
    if (listShipping?.length !== 0) {
      dispatch(checkUnFinishShipping({ shipperId: userData.id }));
    }
  }, []);

  if (check_un_finish_shipping?.data?.length === 0) {
    return <Navigate to={ROUTES.PUBLIC.HOME} />;
  }
  return (
    <div className="w-full h-without-header-6-rem grid grid-cols-4">
      <div className="col-span-1 h-without-header-6-rem">
        <ListOrder />
      </div>
      <div className="col-span-3 w-full h-max">
        <MapShipping />
      </div>
      <ModalDetailTransport />
    </div>
  );
};

export default Shipping;
