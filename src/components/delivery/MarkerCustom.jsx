import { useState } from "react";
import { MFMarker } from "react-map4d-map";

import iconMarker from "../../assets/icon-maker-default.png";

const MarkerCustom = ({ data }) => {
  const [title, setTitle] = useState("");

  const handleOnClick = () => {
    if (title) {
      setTitle("");
    } else {
      setTitle(data?.title);
    }
  };

  return (
    <MFMarker
      position={data?.position}
      title={title}
      iconView={`<img src=${iconMarker} style="width:27px;height:43px;">`}
      onClick={() => handleOnClick()}
    />
  );
};

export default MarkerCustom;
