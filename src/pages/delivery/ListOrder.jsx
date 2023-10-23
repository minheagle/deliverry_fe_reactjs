import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  checkUnFinishShipping,
  changeListShipping,
} from "../../redux/slice/transport_order/transport.order.slice";

import TransportItem from "../../components/delivery/TransportItem";

const ListOrder = () => {
  const dispatch = useDispatch();

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const shippingList = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : [];

  const waypointOrder = localStorage.getItem("waypointOrder")
    ? JSON.parse(localStorage.getItem("waypointOrder"))
    : [];

  const { listShipping } = useSelector((state) => state.TransportOrder);

  useEffect(() => {
    // dispatch(checkUnFinishShipping({ shipperId: userData.id }));
    dispatch(changeListShipping(shippingList));
  }, []);

  const handleListTransportShipping = () => {
    const newList = waypointOrder?.map((item) => {
      return listShipping?.data?.[item];
    });

    return newList?.map((item, index) => {
      return (
        <div key={index}>
          <TransportItem data={item} order={index} />;
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 p-4 overflow-auto touch-auto">
      {handleListTransportShipping()}
    </div>
  );
};

export default ListOrder;
