import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationName extends Component {

  static propTypes = {
    isClicked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    markerTitle: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired
  }

// When the marker is clicked then the classes of location from list is changed.
  classes = () => {
    if (this.props.isClicked) {
      return 'location-name active'
    } else {
      return 'location-name'
    }
  }

  render() {
    
    return (
      <li tabIndex={this.props.tabIndex} role='button' className={this.classes()} onClick={this.props.onClick}>
        <div>
          {this.props.markerTitle}
        </div>
      </li>
    )
  }
}

export default LocationName