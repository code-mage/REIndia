import React from "react";
import India from "@svg-maps/India";
import { RadioSVGMap } from "react-svg-map";
const stateValues = require( './../../../value.json');
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import StateCallout from './StateCallout';

class Map extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
			pointedState: null,
			focusedState: null,
			selectedState: null
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
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

	handleOnChange(selectedNode) {
		this.setState(prevState => {
      return {
        pointedState: prevState.pointedState,
        focusedState: prevState.focusedState,
				selectedState: selectedNode.id
			};
		});
	}


  

  render() {
    return  (<div>    
      {this.state.selectedState && <StateCallout stateId={this.state.selectedState}/>}
      <RadioSVGMap 
          map={India}
          onLocationMouseOver={this.handleLocationMouseOver}
          onLocationMouseOut={this.handleLocationMouseOut}
          onLocationFocus={this.handleLocationFocus}
          onLocationBlur={this.handleLocationBlur}
          onChange={this.handleOnChange}
          onLocationMouseMove={this.handleLocationMouseMove}/>
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

function getColor(val) {
  var r, g, b = 0;

  if (val == 0){
    return "#a6a6a6"
  }

  g = 230;
  r = Math.round(190 - 18 * val);

  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

export function getLocationId(event) {
	return event.target.id;
}

export function getLocationSelected(event) {
	return event.target.attributes['aria-checked'].value === 'true';
}

export default Map;