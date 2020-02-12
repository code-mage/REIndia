import React from "react";
import India from "@svg-maps/India";
import { RadioSVGMap } from "react-svg-map";
const stateValues = require( './../../../value.json');
import StateCallout from './StateCallout';
import MapDescription from './MapDescription';

class Map extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
			pointedState: null,
			focusedState: null,
      selectedState: null,
      show: false
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
	}


	handleLocationMouseMove(event) {
		//do nothing right now
  }
  
  handleLocationMouseOver(event) {
		const pointedState = getLocationId(event);
		this.setState({ pointedState: pointedState });
	}

	handleLocationMouseOut() {
		this.setState({ pointedState: null });
	}

	handleLocationFocus(event) {
		const focusedState = getLocationId(event);
		this.setState({ focusedState: focusedState });
	}

	handleLocationBlur() {
		this.setState({ focusedState: null });
  }
  
  handleDismiss(){
    this.setState({ show: false });
  }

	handleOnChange(selectedNode) {
		this.setState(prevState => {
      return {
        pointedState: prevState.pointedState,
        focusedState: prevState.focusedState,
        selectedState: selectedNode.id,
        show: true
			};
		});
	}


  

  render() {
    return  (<div>    
      {this.state.selectedState && this.state.show && <StateCallout stateId={this.state.selectedState} onDismiss={this.handleDismiss}/>}
      <div className="map-columns">
        <div className="map">
          <RadioSVGMap 
              map={India}
              onLocationMouseOver={this.handleLocationMouseOver}
              onLocationMouseOut={this.handleLocationMouseOut}
              onLocationFocus={this.handleLocationFocus}
              onLocationBlur={this.handleLocationBlur}
              onChange={this.handleOnChange}
              onLocationMouseMove={this.handleLocationMouseMove}/>
        </div>
        {<MapDescription stateId={this.state.selectedState} onDismiss={this.handleDismiss}/>}
      </div>
    </div>);
    

    //! Could do this but you can't hover on tooltip
    // var tooltipContent = "";
    // if (this.state.selectedState){
    //   tooltipContent = stateValues.states[this.state.selectedState].name;
    // }
    // return  (
    // <TooltipHost content={tooltipContent} calloutProps={calloutProps}>
    // <SVGMap 
    //     map={India} 
    //     onLocationMouseOver={this.handleLocationMouseOver}
    //     onLocationMouseOut={this.handleLocationMouseOut}
    //     onLocationMouseMove={this.handleLocationMouseMove}/>;
    // </TooltipHost>)
  }



  componentDidMount() {
    //! Could do this with the js and css, but it takes a lot of work. Might revisit
    //     // let root = document.documentElement;
    //     // root.style.setProperty('--coloran', "#ff0000");

    // :root {
    //   --coloran: #00ff00;
    // }
    // .svg-map__location#an{
    //   fill: var(--coloran);
    // }

    for (var state in stateValues.states){
      var color = getColor(stateValues.states[state].value);
      document.querySelectorAll(".svg-map__location#" + state)[0].style.fill = color
    }

  }

  
}

// function getColor(val) {
//   var r, g, b = 0;

//   if (val == 0){
//     return "#a6a6a6"
//   }

//   g = 220;
//   r = Math.round(190 - 18 * val);

//   var h = r * 0x10000 + g * 0x100 + b * 0x1;
//   return '#' + ('000000' + h.toString(16)).slice(-6);
// }

function getColor(val) {
  var r, g, b = 0;

  if (val == 0){
    return "#a6a6a6"
  }

  g = 255
  r = Math.round(282 - 27.2*val);   //lowest vlaue is 1
  b = Math.round(282 - 27.2*val);   //lowest vlaue is 1

  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

function getLocationId(event) {
	return event.target.id;
}

function getLocationSelected(event) {
	return event.target.attributes['aria-checked'].value === 'true';
}

export default Map;