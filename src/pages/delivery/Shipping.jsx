import React from "react";

import ListOrder from "./ListOrder";
import MapShipping from "../../components/delivery/MapShipping";
import ModalDetailTransport from "../../components/delivery/ModalDetailTransport";

const Shipping = () => {
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
