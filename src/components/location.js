import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Location extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    const location = this.props.location

    return (
      <li>
        <div className="location">
          <div className="location-title">{location.title}</div>
          <div className="location-adress">{location.adress}</div>
        </div>
      </li>
    )
  }
}

export default Location