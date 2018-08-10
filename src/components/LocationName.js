import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationName extends Component {

  static propTypes = {
    isClicked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    markerTitle: PropTypes.string.isRequired
  }


  classes = () => {
    if (this.props.isClicked) {
      return 'location-name active'
    } else {
      return 'location-name'
    }
  }

  
  render() {
    
    return (
      <li className={this.classes()} onClick={this.props.onClick}>
        <div>
          {this.props.markerTitle}
        </div>
      </li>
    )
  }
}

export default LocationName