import React, { Component } from 'react'
import Map from './components/Map'
import { markerList } from './components/markerList'
import escapeRegExp from 'escape-string-regexp'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from './components/NavBar'
import MapError from './components/MapError'

library.add(
  faBars
)

class App extends Component {
  state = {
    markers: markerList,
    query: '',
    selectedMarker: '',
    isNavBarOpen: true
  }


// Updates the query state
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

// Selects clicked Marker and corresponding location name in NavBar
  selectMarker = locationName => {
    return () =>
      this.setState({ selectedMarker: locationName })
  }

// Deselects clicked Marker and corresponding location name in NavBar
  deselectMarker = () => {
    this.setState({ selectedMarker: ''})
  }

// Hides and opens NaviBar
  toggleNavBar = () => {
    this.setState({ isNavBarOpen: !this.state.isNavBarOpen})
  }

// When the state of NavBar is changing then also changes the classes of hamburger button
  classes = () => {
    if (this.state.isNavBarOpen) {
      return 'hamburger open'
    } else {
      return 'hamburger'
    }
  }

// When the state of NavBar is changing then also changes the classes of App title
  changeClasses = () => {
    if (this.state.isNavBarOpen) {
      return 'App-title open'
    } else {
      return 'App-title'
    }
  }

  render() {
    const isMapLoaded = window.google && window.google.maps
    const { query } = this.state
    let showingLocations
    const markers = this.state.markers

//Shows all locations and markers which has given word
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingLocations = markers.filter((marker) => match.test(marker.title))
    } else {
        showingLocations = markers
      }
    return (
      <div className="app" role="main">
          <header className="App-header">
            <button tabIndex="0" aria-label="menu-button" className={this.classes()} onClick={this.toggleNavBar}>
              <FontAwesomeIcon icon="bars" />
            </button>
            <div className={this.changeClasses()}>
            Discover Cracow
            </div>
          </header>
  {
  /*If everything works fine and google API is loaded then maps appears in app.
   If not error messages will be displayed
  */
  }
          {isMapLoaded && <Map
              loadingElement={<div className="loadingElement" style={{ height: `100%` }} />}
              containerElement={<div className="map" />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={showingLocations}
              selectedMarker={this.state.selectedMarker}
              deselectMarker={this.deselectMarker}
              onMarkerClick={this.selectMarker}
            />
          }
          {!isMapLoaded && <MapError />}
        <NavBar
            markers={showingLocations}
            query={this.state.query}
            updateQuery={this.updateQuery}
            selectedMarker={this.state.selectedMarker}
            selectMarker={this.selectMarker}
            deselectMarker={this.deselectMarker}
            isOpen={this.state.isNavBarOpen}
          />
      </div>
    )
  }
}

export default App