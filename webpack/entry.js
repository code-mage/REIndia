import React, { Component } from 'react';
import {render} from 'react-dom';
import Hello from './components/Hello';
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
      return (
        <Hello />
      )
    }    
  }
}

render(<App />, document.getElementById('root'));


