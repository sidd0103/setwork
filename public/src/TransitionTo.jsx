import React from "react";

class TransitionTo extends React.Component {
    render() {
        var style = {
            background: "linear-gradient(transparent, "+this.props.color+")"
         };
        return (
            <div style={style} className={"transitionTo"}></div>
        )
    }
}
export default TransitionTo;