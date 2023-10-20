import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import transportOrderHelper from "../../utils/handleTransportOrder";

import ProductItem from "./ProductItem";

const TransportOrderItem = ({ data }) => {
  const [openProducts, setOpenProducts] = useState(false);

  const handleRenderProductList = (data = []) => {
    return data.map((item) => {
      return <ProductItem key={item?.id} data={item} />;
    });
  };

  return (
    <div className="col-span-1 w-full flex flex-col justify-start items-center border border-red-600 rounded-lg p-4">
      <div className="flex-1 w-full flex flex-col justify-start items-center gap-2">
        <div className="shrink-0 w-full flex flex-col justify-start items-center gap-2">
          <div className="w-full flex justify-start items-center gap-1">
            <span className="shrink-0 font-medium">Recipient Name</span>
            <span className="shrink-0 font-medium">:</span>
            <span className="flex-1">{data?.recipientName}</span>
          </div>
          <div className="w-full flex justify-start items-center gap-1">
            <span className="shrink-0 font-medium">Phone Number</span>
            <span className="shrink-0 font-medium">:</span>
            <span className="flex-1">{data?.phoneNumber}</span>
          </div>
          <div className="w-full flex justify-start items-start gap-1">
            <span className="shrink-0 font-medium">Delivery Address</span>
            <span className="shrink-0 font-medium">:</span>
            <span className="flex-1">{data?.deliveryAddress}</span>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-start items-center gap-2">
          <div className="shrink-0 w-full flex justify-between items-center">
            <span className="font-medium">Products</span>
            {openProducts ? (
              <button onClick={() => setOpenProducts(false)}>
                <FontAwesomeIcon icon="fas fa-arrow-up" />
              </button>
            ) : (
              <button onClick={() => setOpenProducts(true)}>
                <FontAwesomeIcon icon="fas fa-arrow-down" />
              </button>
            )}
          </div>
          <div className="flex-1 w-full flex flex-col justify-start items-center gap-2">
            {openProducts
              ? handleRenderProductList(data?.itemTransportList)
              : ""}
          </div>
        </div>
        <div className="shrink-0 w-full flex justify-start items-center gap-1">
          <span className="font-medium">Take money</span>
          <span className="font-medium">:</span>
          <span className="text-red-600">
            {data?.paymentSt ? (
              "0 vnđ"
            ) : (
              <span>
                {transportOrderHelper
                  .handleGetTotalPriceProducts(data?.itemTransportList)
                  ?.toLocaleString()}{" "}
                vnđ
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransportOrderItem;
