import { useState, useEffect } from "react";
import { MFMap, MFMarker, MFDirectionsRenderer } from "react-map4d-map";

import iconMarker from "../../assets/icon-maker-default.png";

import MarkerCustom from "./MarkerCustom";

const Map = ({ loading, data, options, waypointMarkerOptions = [] }) => {
  const [post, setPost] = useState({
    lng: 108.21828,
    lat: 16.07445,
  });

  const handleRenderMarker = () => {
    return waypointMarkerOptions.map((item, index) => {
      return <MarkerCustom key={index} data={item} />;
    });
  };

  return (
    <>
      <div className="w-full h-without-header-6-rem">
        {loading ? (
          ""
        ) : (
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
              routes={data}
              originMarkerOptions={options.originMarkerOptions}
              destinationMarkerOptions={options.destinationMarkerOptions}
              activeOutlineWidth={options.activeOutlineWidth}
              inactiveOutlineWidth={options.inactiveOutlineWidth}
              inactiveOutlineColor={options.inactiveOutlineColor}
            />
          </MFMap>
        )}
      </div>
    </>
  );
};

export default Map;
