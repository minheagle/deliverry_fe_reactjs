import React from "react";

const ProductItem = ({ data }) => {
  return (
    <div className="w-full bg-red-600 text-white pl-2 py-1 rounded">
      <div className="w-full flex justify-start items-start gap-1">
        <span>Name</span>
        <span>:</span>
        <span>{data?.productName}</span>
      </div>
      <div className="w-full flex justify-start items-start gap-1">
        <span>Price</span>
        <span>:</span>
        <span>{data?.unitPrice?.toLocaleString()} vnđ</span>
      </div>
      <div className="w-full flex justify-start items-start gap-1">
        <span>Quantity</span>
        <span>:</span>
        <span>{data?.quantity}</span>
      </div>
    </div>
  );
};

export default ProductItem;
