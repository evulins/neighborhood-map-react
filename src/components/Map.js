import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

export class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.0536381, lng: 19.9601958 }}
      >
        <Marker position={{ lat: 50.0536381, lng: 19.9601958 }} />
      </GoogleMap>
    );
  }
}
 
export default withScriptjs(withGoogleMap(Map))