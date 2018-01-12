import React from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
  export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}

      defaultCenter={ {
        lat: props.coordinates.lat,
        lng: props.coordinates.lon} }
    >
      <Marker
        position={ {
          lat: props.coordinates.lat,
          lng: props.coordinates.lon} }
      />
    </GoogleMap>
  ));