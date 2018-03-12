import React from "react";

class LoginBox extends React.Component {
    render() {
        this.count = 0;
        if (this.props.userData.userStats.messages != null) {
            this.count = this.props.userData.userStats.messages.length;
        }
        console.log(this.props.userData);
        return (
            <div className={"loginBox"}>
                <div className={"name"}>{this.props.userData.userStats.name}</div>
                <div className={"email"}>{this.props.userData.userStats.email}</div>
                <div className={"notificationCount"}><i className={"material-icons"}>notifications</i><div className={"count"}>{this.count}</div></div>
            </div>
        )
    }
}
class LoginBoxContainer extends React.Component {
    render() {
        return(
            <div className="login-box-container"><LoginBox userData={this.props.userData}/></div>
        )
    }
}
class Nav extends React.Component {
    render() {
        return (
            <ul id={this.props.activationId} className="sideNav side-nav fixed">
                <li><LoginBoxContainer userData={this.props.userData}/></li>
                <li><a href="#!"><i className="material-icons">person</i>My Profile</a></li>
                <li><a href="#!"><i className="material-icons">settings</i>Settings</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Navigation</a></li>
                <li><a className="waves-effect" href="index.html">Home</a></li>
            </ul>
        );
    }
}
export default Nav;