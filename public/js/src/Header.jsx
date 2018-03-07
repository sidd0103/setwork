import React from "react";
import TransitionTo from "./TransitionTo.jsx";

class Header extends React.Component {
    render() {
        var subTitle = () => {
            if (this.props.subText != null) {
                return <div className={"sub"}>{this.props.subText}</div>;
            }
            else {
                return null;
            }
        };
        return (
            <div className={"pageHeader"}>
                <div>
                    <div>{this.props.headerText}</div>
                    {subTitle()}
                </div>


            </div>
        )
    }
}

export default Header;

