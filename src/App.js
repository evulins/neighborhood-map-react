import React, { Component } from 'react'
import Map from './components/Map'
import { markerList } from './components/markerList'
import escapeRegExp from 'escape-string-regexp'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from './components/NavBar'

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


  toggleNavBar = () => {
    this.setState({ isNavBarOpen: !this.state.isNavBarOpen})
  }

  classes = () => {
    if (this.state.isNavBarOpen) {
      return 'hamburger open'
    } else {
      return 'hamburger'
    }
  }

  changeClasses = () => {
    if (this.state.isNavBarOpen) {
      return 'App-title open'
    } else {
      return 'App-title'
    }
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
      <div className="app" role="main">
          <header className="App-header">
            <button tabIndex="0" aria-label="menu-button" className={this.classes()} onClick={this.toggleNavBar}>
              <FontAwesomeIcon icon="bars" />
            </button>
            <div className={this.changeClasses()}>
            Discover Cracow
            </div>
          </header>
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