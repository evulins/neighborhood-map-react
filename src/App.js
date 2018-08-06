import React, { Component } from 'react'
import Map from './components/Map'
import { markerList } from './components/markerList'
import escapeRegExp from 'escape-string-regexp'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LocationName from './components/LocationName'

library.add(
  faBars
)


class App extends Component {
  state = {
    markers: markerList,
    query: '',
    selectedMarker: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  selectMarker = locationName => {
    return () =>
      this.setState({ selectedMarker: locationName })
  }

  deselectMarker = () => {
    this.setState({ selectedMarker: ''})
  }

  render() {

    const { query } = this.state
    let showingLocations
    const markers = this.state.markers
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingLocations = markers.filter((marker) => match.test(marker.title))
    } else {
        showingLocations = markers
      }

    return (
      <div className="app">
        <header className="App-header">
          <div className="hamburger">
          <FontAwesomeIcon icon="bars" />
          </div>
          <div className="App-title">
          Moja mapa
          </div>
        </header>
        <div className="location-menu">
          <div className="menu-title">
            Ewu Location
          </div>
          <input 
            className="location-filter"
            type="text"
            placeholder="Interesting location"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <ul className="location-list">
            {
              showingLocations.map(
                marker => (
                  <LocationName
                    key={marker.title}
                    onClick={this.selectMarker(marker.title)}
                    markerTitle={marker.title}
                    isClicked={marker.title === this.state.selectedMarker} 
                  />
                )
              )
            }
          </ul>
        </div>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcUxfP4uH5KBQC_to7jn1pHm2dT_Y1gQU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="map" />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={showingLocations}
          selectedMarker={this.state.selectedMarker}
          deselectMarker={this.deselectMarker}
          onMarkerClick={this.selectMarker}
        />
      </div>
    )
  }
}

export default App