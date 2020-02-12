import React from "react";
const stateValues = require('./../../../value.json');
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Link } from 'office-ui-fabric-react/lib/Link';

class StateCallout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var stateId = this.props.stateId;

        if (stateId && stateValues.states[stateId]) {
            return (<Callout
            className="state-callout"
                role="alertdialog"
                gapSpace={0}
                onDismiss={this.props.onDismiss}
                target={"#" + stateId}
                setInitialFocus={true}
            >
                <div className={"header"}>
                    <p className={"header-title"} >
                        {stateValues.states[stateId].name}
                    </p>
                </div>
                <div className={"body"}>
                    <p className={"body-text"} >
                        {stateValues.states[stateId].description}
                    </p>
                    <div className={"footer"}>
                        <Link className={"footer-link"} href={stateId} target="_blank">
                            Read in Detail
                    </Link>
                    </div>
                </div>
            </Callout>);
        }

        return null;


    }
}

export default StateCallout;