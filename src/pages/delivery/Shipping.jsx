import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { checkUnFinishShipping } from "../../redux/slice/transport_order/transport.order.slice";

import ListOrder from "./ListOrder";
import MapShipping from "../../components/delivery/MapShipping";
import ModalDetailTransport from "../../components/delivery/ModalDetailTransport";

const Shipping = () => {
  const dispatch = useDispatch();

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
