import React, { Component } from 'react';
import Map from './Map'
import "./Map.css";

class MapContainer extends Component {
  render() {
    return (
      <div className = "map-container">
      <div className="re-policy-map">
        <Map/>
      </div>
      </div>
    )
  }
}
export default MapContainer;
