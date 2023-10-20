import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {
  getAllByDistrict,
  confirmShip,
} from "../../redux/slice/transport_order/transport.order.slice";
import transportOrderHelper from "../../utils/handleTransportOrder";
import ROUTES from "../../constants/ROUTES";

import TransportOrderItem from "../../components/delivery/TransportOrderItem";

const OrderByDistrict = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const { districtName } = useParams();
  const { data, loading } = useSelector(
    (state) => state.TransportOrder.get_all_by_district
  );

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    if (userData) {
      dispatch(getAllByDistrict());
    }
  }, []);

  const handleRenderTransportOrderItemList = () => {
    const list = transportOrderHelper.getAllByDistrict(districtName, data);
    return list?.map((item) => {
      return <TransportOrderItem key={item?.id} data={item} />;
    });
  };

  const handleConfirm = () => {
    const list = transportOrderHelper.getAllByDistrict(districtName, data);
    if (userData) {
      dispatch(
        confirmShip({
          shipperId: userData.id,
          deliveryInformationList: list,
          callback: {
            goDelivery: () => navigate(ROUTES.DELIVERY.ROUTE),
            notification: (message) => toast(message),
          },
        })
      );
    }
  };

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="col-span-10 w-full flex flex-col justify-center items-center gap-4 p-4">
        <div className="w-full grid grid-cols-3 gap-4">
          {handleRenderTransportOrderItemList()}
        </div>
        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => handleConfirm()}
            className="px-2 py-1 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="col-span-1"></div>
      <ToastContainer />
    </div>
  );
};

export default OrderByDistrict;
