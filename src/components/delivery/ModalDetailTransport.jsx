import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleModalTransportDetail } from "../../redux/slice/UI/transport.ui.slice";
import transportOrderHelper from "../../utils/handleTransportOrder";

const ModalDetailTransport = () => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(
    (state) => state.TransportUI.modal_for_transport_detail
  );

  const [openListProduct, setOpenListProduct] = useState(false);

  console.log(data);

  const handleCloseModal = () => {
    dispatch(
      toggleModalTransportDetail({
        isOpen: false,
        data: null,
      })
    );
  };

  const handleToggleOpenListProduct = () => {
    setOpenListProduct(!openListProduct);
  };

  const handleRenderProductList = (data = []) => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          className="col-span-1 w-full flex flex-col justify-start items-center border-2 border-red-600 p-2 rounded"
        >
          <div className="w-full flex justify-start items-center gap-2">
            <span className="font-medium">Product Name : </span>
            <span className="line-clamp-1">{item?.productName}</span>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <span className="font-medium">Price : </span>
            <span className="text-red-600">
              {item?.unitPrice?.toLocaleString()} vnđ
            </span>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <span className="font-medium">Quantity : </span>
            <span className="">{item?.quantity}</span>
          </div>
        </div>
      );
    });
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-40">
      <div className="relative w-1/2 max-h-[400px] bg-white rounded-lg overflow-auto touch-auto">
        <div className="sticky top-0 right-0 w-full flex justify-end items-center">
          <button onClick={() => handleCloseModal()} className="w-8 h-8">
            <FontAwesomeIcon
              icon="fas fa-eye-slash"
              className="text-red-600 z-50"
            />
          </button>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
          <div className="shrink-0 w-full flex flex-col justify-start items-center gap-4">
            <div className="w-full">
              <span className="font-medium">Recipient Name : </span>
              <span>{data?.recipientName}</span>
            </div>
            <div className="w-full">
              <span className="font-medium">Phone Number : </span>
              <span>{data?.phoneNumber}</span>
            </div>
            <div className="w-full">
              <span className="font-medium">Address : </span>
              <span>{data?.deliveryAddress}</span>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col justify-start items-start">
            <button
              onClick={() => handleToggleOpenListProduct()}
              className="shrink-0 w-full"
            >
              <div className="w-full flex justify-between items-center gap-4">
                <span className="font-medium">Products :</span>
                {openListProduct ? (
                  <FontAwesomeIcon icon="fas fa-angle-up" />
                ) : (
                  <FontAwesomeIcon icon="fas fa-angle-down" />
                )}
              </div>
            </button>
            {openListProduct ? (
              <div className="w-full grid grid-cols-2 gap-4 p-4">
                {handleRenderProductList(data?.itemTransportList)}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="shrink-0 w-full">
            <span className="font-medium">Money : </span>
            <span className="text-red-600">
              {data?.paymentSt
                ? "0 vnđ"
                : transportOrderHelper
                    .handleGetTotalPriceProducts(data?.itemTransportList)
                    ?.toLocaleString() + " vnđ"}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalDetailTransport;
