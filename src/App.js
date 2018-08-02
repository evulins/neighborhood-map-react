import React, { Component } from 'react'
import GoogleApiWrapper from './components/Container'
import { markerList } from './components/markerList'
import './App.css'

class App extends Component {


  state = {
    markers: markerList
  }
  


  render() {
    return (
      <div className="App">

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
        <div className="map">
          <GoogleApiWrapper />
        </div>
      </div>
    )
  }
}

export default App