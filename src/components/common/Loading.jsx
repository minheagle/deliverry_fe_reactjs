import React from "react";

import loadingGif from "../../assets/images/rotate-pulsating-loading-animation.gif";

const Loading = () => {
  return (
    <div className="w-full h-without-header-6-rem flex justify-center items-center">
      <img src={loadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;
