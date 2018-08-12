import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { fetchRecommendedLocations } from '../forsquareAPI'
import PropTypes from 'prop-types'

class MyMarker extends Component {

  static propTypes = {
    isClicked: PropTypes.bool.isRequired,
    marker: PropTypes.object.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    deselectMarker: PropTypes.func.isRequired
  }

  state = {
    recommendations: [],
    error: false,
    loading: false
  }

/* This function will be run when the marker is clicked and it doesn't have any recommendations yet.
 * When it happens we run FourSquare API search for nearby recommended places.
 * After we get a response we update recommendations list in the components state.
 * If API fetch fails, user-friendly message would be displayed.
*/
  componentDidUpdate() {
    const { recommendations } = this.state
    if (this.props.isClicked && recommendations.length === 0 && this.state.loading === false) {
      const markerLocation = this.props.marker.location
      fetchRecommendedLocations(
        markerLocation.lat,
        markerLocation.lng,
        recommendations => this.setState({ recommendations: recommendations, loading: false }),
        () => this.setState({ error: true })
      )
      this.setState({ loading: true })
    }
  }

  render() {
    const { recommendations } = this.state
    const { isClicked, onMarkerClick, deselectMarker } = this.props
    const marker = this.props.marker
    return (
      <Marker
        position={marker.location}
        onClick={onMarkerClick}
        animation={isClicked && window.google.maps.Animation.BOUNCE}
      > 
        {isClicked && <InfoWindow onCloseClick={deselectMarker}>
                <div>
                  <p className='marker-title'><a target='_blank' rel='noreferrer noopener' href={marker.website}>{marker.title}</a></p>
                  <p>{marker.address}</p>
                  <p className='recommendations-title'>Recommended loctions nearby :</p>
                  {
                    recommendations.length > 0 ? (
                      <div>
                        <ul className='recommendations-list' aria-label="list of recommended locations">
                          {
                            recommendations.filter(
                              location => {
                                return location.venue.name !== marker.title
                              }
                            ).map(
                              (location, index) => (
                                <li tabIndex={index} key={location.venue.id}>{location.venue.name}</li>
                              )
                            )
                          }
                        </ul>
                        <p className='info'>Recommended loctions are taken from FourSquare</p>
                      </div>
                    ) : null
                  }

                  {
                    this.state.error ? (
                      <p className='recommendations-error'>Sorry, we couldnt't fetch recommendations this time. Please, try again later.</p>
                    ) : null
                  }
                </div>
              </InfoWindow>
        }
      </Marker>
    )
  }
}

export default MyMarker