import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"


class MyMarker extends Component {
  state = {
    isOpen: false
  }

  handelMarkerClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const isOpen = this.state.isOpen;
    return (
      <Marker
        position={this.props.marker.location}
        onClick={this.handelMarkerClick}
      > 
        {isOpen ? (
              <InfoWindow>
                <div>{this.props.marker.title}</div>
              </InfoWindow>
        ) : null
        }
      </Marker>
    )
  }
}

export default MyMarker