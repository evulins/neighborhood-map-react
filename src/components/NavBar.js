import React, { Component } from 'react'
import LocationName from './LocationName'

class NavBar extends Component {

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
          <ul className="location-list">
            {
              this.props.markers.map(
                marker => (
                  <LocationName
                    key={marker.title}
                    onClick={this.props.selectMarker(marker.title)}
                    markerTitle={marker.title}
                    isClicked={marker.title === this.props.selectedMarker}
                    closeNavBar={this.props.closeNavBar}
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