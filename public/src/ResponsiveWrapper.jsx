import React from "react";

class ResponsiveWrapper extends React.Component {
    render() {
        return(
            <div className={"nav-responsive-container"}>{this.props.children}</div>
        )
    }
}
export default ResponsiveWrapper;
