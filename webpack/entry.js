import React, { Component } from 'react';
import {render} from 'react-dom';
import MapContainer from './components/Map/MapContainer';
import * as data from './../value.json';

class App extends Component {
  render() {
    if (document.getElementById('root').classList.contains('map')){
      return (
        <MapContainer />
      )
    }
    else{
      return null;
    }    
  }
}

render(<App />, document.getElementById('root'));


