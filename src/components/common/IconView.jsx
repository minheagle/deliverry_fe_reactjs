import React from "react";

import iconMakerDefault from "../../assets/icon-maker-default-2.jpg";

const IconView = () => {
  return (
    <div className="w-8 h-8 border border-red-600">
      <img src={iconMakerDefault} alt="" className="w-full object-cover" />
    </div>
  );
};

export default IconView;
