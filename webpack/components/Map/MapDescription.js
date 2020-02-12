import React from "react";
const stateValues = require('./../../../value.json');
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Link } from 'office-ui-fabric-react/lib/Link';

class MapDescription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var stateId = this.props.stateId;

        


        if (stateId && stateValues.states[stateId]) {

            var elem = [];

            for (var param of stateValues.params){
                elem.push(
                    <div>
                        <h4 className="label">{stateValues.values[param].name}</h4>
                        <div className="circle">{stateValues.states[stateId][param]}</div>
                    </div>
                )
            }

            return (<div className="map-description">
                <div className={"header"}>
                    <p className={"header-title"} >
                        {stateValues.states[stateId].name}
                    </p>
                </div>
                <div className={"body"}>
                    {elem}
                </div>
            </div>);
        }

        return <div className="map-description empty"></div>;


    }
}

export default MapDescription;