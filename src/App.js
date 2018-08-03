import React, { Component } from 'react'
import Map from './components/Map'
import { markerList } from './components/markerList'
import './App.css'

class App extends Component {
  state = {
    markers: markerList
  }
  
  render() {
    return (
      <div className="app">

        <header className="App-header">
          <div className="App-title">
          Moja mapa
          </div>
        </header>
        <div className="location-menu">
          <ol className="location-list">
            {
              this.state.markers.map(
                marker => marker.title
              )
            }
          </ol>
        </div>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcUxfP4uH5KBQC_to7jn1pHm2dT_Y1gQU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="map" />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={this.state.markers}
        />
      </div>
    )
  }
}

export default App