import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkUnFinishShipping } from "../../redux/slice/transport_order/transport.order.slice";

import TransportItem from "../../components/delivery/TransportItem";

const ListOrder = () => {
  const dispatch = useDispatch();

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const { check_un_finish_shipping, change_status_shipping } = useSelector(
    (state) => state.TransportOrder
  );

  useEffect(() => {
    dispatch(checkUnFinishShipping({ shipperId: userData.id }));
  }, []);

  const handleListTransportShipping = () => {
    return check_un_finish_shipping?.data?.map((item, index) => {
      return <TransportItem key={item?.id} data={item} />;
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 p-4 overflow-auto touch-auto">
      {handleListTransportShipping()}
    </div>
  );
};

export default ListOrder;
