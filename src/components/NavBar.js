import React, { Component } from 'react'
import LocationName from './LocationName'
import PropTypes from 'prop-types'

class NavBar extends Component {

  static propTypes = {
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired,
    selectMarker: PropTypes.func.isRequired,
    markers: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    selectedMarker: PropTypes.string.isRequired
  }

  classes = () => {
    if (this.props.isOpen) {
      return 'location-menu open'
    } else {
      return 'location-menu'
    }
  }

  render() {

    return (

     <nav className={this.classes()} role="search">
          <div className="menu-title" tabIndex="0">
            Ewu Location
          </div>
          <input 
            aria-label="Input filter location"
            className="location-filter"
            type="search"
            placeholder="Interesting location"
            value={this.props.query}
            onChange={(event) => this.props.updateQuery(event.target.value)}
          />
          <ul className="location-list" aria-label="list of locations" tabIndex="1">
            {
              this.props.markers.map(
                (marker, index) => (
                  <LocationName
                    key={marker.title}
                    onClick={this.props.selectMarker(marker.title)}
                    markerTitle={marker.title}
                    isClicked={marker.title === this.props.selectedMarker}
                    tabIndex={index}
                  />
                )
              )
            }
          </ul>
        </nav>
    )
  }
}
export default NavBar