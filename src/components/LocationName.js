import React, { Component } from 'react'




class LocationName extends Component {
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