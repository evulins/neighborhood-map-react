import React, { Component } from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import MyMarker from './MyMarker'

class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 50.0506762, lng: 19.9474994 }}
      >
        {
          this.props.markers.map(
            marker => (
              <MyMarker
                key={marker.title}
                marker={marker}
                isClicked={marker.title === this.props.selectedMarker}
                onMarkerClick={this.props.onMarkerClick(marker.title)}
                deselectMarker={this.props.deselectMarker}
              />
            )
          )
        }

      </GoogleMap>
    );
  }
}
 
export default withScriptjs(withGoogleMap(Map))