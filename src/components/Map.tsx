import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";
import CustomLoader from "./CustomLoader";
import { mapPropsType } from "src/types/types";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const getGeocode = async (position: any) => {
  const geoCoder = new window.google.maps.Geocoder();
  const loc = position;
  const response = await geoCoder.geocode({ location: loc });
  console.log("Marker is long lat is:", loc);
  console.log("E is: ", position);
  console.log("Response is: ", response?.results);
  return response?.results[0]?.formatted_address;
};

const center = {
  lat: 9.082,
  lng: 8.6753,
};

const Map = ({
  newCenter,
  zoom,
  children,
  reference,
  circles = [],
  showMarker = true,
}: mapPropsType) => {
  const map = useRef();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const onLoad = useCallback((mapObj: any) => {
    const bounds = new window.google.maps.LatLngBounds(newCenter);
    mapObj.fitBounds(bounds);

    map.current = mapObj;
    if (reference) reference.current = mapObj;
  }, []);

  if (!isLoaded) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomLoader />
      </div>
    );
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={newCenter}
        zoom={zoom}
        onLoad={onLoad}
      >
        {showMarker && <Marker position={newCenter} />}
        {circles.map((eachCircle, i) => {
          return (
            <Circle
              center={eachCircle.location}
              radius={eachCircle.radius}
              key={i}
            />
          );
        })}
        {children}
      </GoogleMap>
    </>
  );
};

export default React.memo(Map);
