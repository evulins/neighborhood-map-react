import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MyMarker from './MyMarker'
import PropTypes from 'prop-types'

class Map2 extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    deselectMarker: PropTypes.func.isRequired,
    selectedMarker: PropTypes.string.isRequired
  }

  componentDidMount() {
      // Connect the initMap() function within this class to the global window context,
      // so Google Maps can invoke it
      window.initMap = this.initMap;
      // Asynchronously load the Google Maps script, passing in the callback reference
      loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDcUxfP4uH5KBQC_to7jn1pHm2dT_Y1gQU&callback=initMap')
  }
  
  

  initMap = () => {
    const map = new window.google.maps.Map(ReactDOM.findDOMNode(this.refs.map),
      {
        center: {lat: 50.0506762, lng: 19.9474994},
        zoom: 14 
      })
  }


  render() {

    return (

        <div className="map" ref="map" style={{height: '100%', width: '100%'}}>
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
        </div>

    )
  }
}

const loadJS = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default Map2