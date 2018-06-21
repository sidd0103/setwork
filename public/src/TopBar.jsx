import React from "react";
import ReactDOM from "react-dom";

class NavTopBar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <div className={"z-depth-1 slant"}></div>
                <div data-activates={this.props.sideActivates} className={"z-depth-1 material-icons " + this.props.btnClass}>menu</div>
                <img data-to="index.html" className="link logo" src="src/media/logo.png"/>
                <div className="logo-text">SAPHARII</div>
            </div>
        );
    }
    componentDidMount() {
        $('.'+this.props.btnClass).sideNav({
            menuWidth: 250, // Default is 300
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
        });
    }
}

export default NavTopBar;