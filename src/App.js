import React, { Component } from 'react'
import Map from './components/Map'
import MyMarker from './components/MyMarker'
import { markerList } from './components/markerList'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars,
  faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
  faBars,
  faFilter
)


class App extends Component {
  state = {
    markers: markerList,
    value: ''
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
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
          <form onSubmit={this.handleSubmit}>
            <label>
              <input 
                className="location-filter"
                type="text"
                placeholder="Interesting location"
                value={this.state.value}
                onChange={this.handleChange} />
              <button className="filter-button" type='submit' value="Submit">
                <FontAwesomeIcon icon="filter" />Filter
              </button>
            </label>
          </form>
          <ul className="location-list">
            {
              this.state.markers.map(
                marker => (
                  <li className="location-name" key={marker.title}>
                    <div>
                      {marker.title}
                    </div>
                  </li>
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
          markers={this.state.markers}
        />
      </div>
    )
  }
}

export default App