import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { fetchRecommendedLocations } from '../forsquareAPI'


class MyMarker extends Component {
  state = {
    isOpen: false,
    recommendations: []
  }

  handelMarkerClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  componentDidUpdate() {
    const { isOpen, recommendations } = this.state
    if (isOpen && recommendations.length === 0) {
      const markerLocation = this.props.marker.location
      fetchRecommendedLocations(
        markerLocation.lat,
        markerLocation.lng,
        (recommendations) => this.setState({ recommendations })
      )
    }
  }

  render() {
    const { isOpen, recommendations } = this.state
    const marker = this.props.marker
    return (
      <Marker
        position={marker.location}
        onClick={this.handelMarkerClick}
      > 
        {isOpen && recommendations.length > 0 ? (
              <InfoWindow>
                <div>
                  <p>{marker.title}</p>
                  <ul>
                    {
                      recommendations.filter(
                        location => {
                          return location.venue.name !== marker.title
                        }
                      ).map(
                        location => (
                          <li>{location.venue.name}</li>
                        )
                      )
                    }
                  </ul>

                </div>
              </InfoWindow>
        ) : null
        }
      </Marker>
    )
  }
}

export default MyMarker