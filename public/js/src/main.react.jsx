import React from "react";
import ReactDOM from "react-dom";
//components
import Nav from './SideBar.jsx';
import NavBar from './TopBar.jsx';
import Feed from './feed.jsx';

class Page extends React.Component {
    constructor() {
        super();
        this.state = {userData:{'user':'',userStats:{'name':'','email':'','messages':[]}}};
    }
    render() {
        return(
            <div>
                <NavBar btnClass="navBarBtn" sideActivates={"slide-out"}/>
                <Nav userData={this.state.userData} activationId={"slide-out"}/>
                <Feed/>
            </div>
        )
    }
    componentWillMount() {
        let that = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                Materialize.toast("You are logged in!",1000);
                var userRef = firebase.database().ref('users/'+user.uid);
                userRef.on('value',function(snapshot){
                    that.state.userData.user = user;
                    that.state.userData.userStats = snapshot.val();
                    that.setState(that.state);
                })
            } else {
                document.location.href = "index.html";
            }
        });
    }
}


ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);