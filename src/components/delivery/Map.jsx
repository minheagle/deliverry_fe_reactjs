import { useState } from "react";
import { MFMap, MFDirectionsRenderer } from "react-map4d-map";

import iconMarker from "../../assets/images/icon-maker-default.png";

import MarkerCustom from "./MarkerCustom";

const Map = ({ waypointMarkerOptions = [] }) => {
  const [post, setPost] = useState({
    lng: 108.21828,
    lat: 16.07445,
  });

  const routes = localStorage.getItem("routes")
    ? JSON.parse(localStorage.getItem("routes"))
    : null;

  const handleRenderMarker = () => {
    return waypointMarkerOptions?.map((item, index) => {
      return <MarkerCustom key={index} data={item} />;
    });
  };

  const options = {
    originMarkerOptions: {
      position: {
        lng: 108.21828,
        lat: 16.07445,
      },
      title: "92 Quang Trung",
      // icon: null,
      // iconView: `<img src=${iconMarker} style="width:27px;height:43px;">`,
    },
    destinationMarkerOptions: {
      position: {
        lng: 108.21828,
        lat: 16.07445,
      },
      title: "92 Quang Trung",
      // iconView: `<img src=${iconMarker} style="width:27px;height:43px;">`,
      userInteractionEnabled: false,
    },
    activeOutlineWidth: 2,
    inactiveOutlineWidth: 2,
    inactiveOutlineColor: "#FF00FF",
  };

  return (
    <div className="w-full h-without-header-6-rem">
      <MFMap
        options={{
          center: post,
          zoom: 15,
        }}
        version={"2.4"}
        accessKey={"3f88d9d7e515a6249a9c43ad04cd5c10"}
      >
        {handleRenderMarker()}
        <MFDirectionsRenderer
          routes={routes}
          originMarkerOptions={options.originMarkerOptions}
          destinationMarkerOptions={options.destinationMarkerOptions}
          activeOutlineWidth={options.activeOutlineWidth}
          inactiveOutlineWidth={options.inactiveOutlineWidth}
          inactiveOutlineColor={options.inactiveOutlineColor}
        />
      </MFMap>
    </div>
  );
};

export default Map;
