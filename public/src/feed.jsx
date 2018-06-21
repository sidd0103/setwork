import React from "react";
import Bricks from "bricks.js";
import Header from "./Header.jsx";
import ResponsiveWrapper from "./ResponsiveWrapper.jsx";
import ReactDOM from "react-dom";
import SweetScroll from 'sweet-scroll';
import FeedNav from "./FeedNav.jsx"

class ThumbNail extends React.Component {
    render() {
        var bgImage = this.props.bgImage;
        var style = {
            backgroundImage: "url(" +  bgImage  + ")"
        };
        if (bgImage != null) {
            return (
                <div style={style} className={"thumbNail"}></div>
            )
        }
        return null;

    }
}
class Quality extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.leftDivider == true) {
            this.divider = <div className={"vertDivider"}>|</div>
        }
    }
    render() {
        return (
            <div className={"quality"}>
                {this.divider}
                <i className={"material-icons"}>{this.props.icon}</i>
                <div className={"content"}>{this.props.content}</div>
            </div>
        )
    }
}
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
        if (this.state == null) {
            this.state = {bgImage: null};
        }
    }
    render() {
        return (
            <div className="hoverUp animated fadeIn post">
                <ThumbNail bgImage={this.state.bgImage}/>
                <div className="header">
                    <div className="title">Mowing my Lawn.</div>
                    <div className="fee">$5</div>
                </div>
                <div className={"qualities"}>
                    <Quality icon={"location_on"} content={"5 miles away"}/>
                    <Quality leftDivider={true} icon={"av_timer"} content={"1 hour of your time"}/>
                </div>
                <div className={"description"}>My lawn is really messy, recently a group of squirrels attacked my dog and made a huge mess.  I don't have much time to clean it up.  Get it done fast for extra pay!</div>
                <div className="author">
                    <img className="circle profilePicture" src={"prod/media/user.jpg"}/>
                    <div className="author-text">
                        <div className={"name"}>Sidd Iyer</div>
                        <div className={"connection"}>Neighbor</div>
                    </div>
                </div>
            </div>
        )
    }
}
class Feed extends React.Component {
    render() {
        return (
            <ResponsiveWrapper>
                <Header headerText={"Welcome to your feed."} subText={"We've curated some great jobs for you."}/>
                <div className={"feed-container"}>
                    <FeedNav/>
                    <div className={"feed"}>
                        <Post />
                        <Post data={{bgImage: 'prod/media/lawnmowing.jpg'}}/>
                        <Post data={{bgImage: 'prod/media/work.jpeg'}}/>
                        <Post/>
                        <Post/>
                        <Post data={{bgImage: 'prod/media/work.jpeg'}}/>
                        <Post/>
                        <Post data={{bgImage: 'prod/media/work.jpeg'}}/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
            </ResponsiveWrapper>
        )
    }
    componentDidMount() {
        console.log("mounted!");
        this.bricksInstance = Bricks({
            container: '.feed',
            packed: 'data-packed',
            sizes: [
                    { mq: '500px', columns: 1, gutter: 25 },
                    { mq: '702px', columns: 2, gutter: 25 },
                    { mq: '992px', columns: 2, gutter: 25 },
                    { mq: '1000px', columns: 2, gutter: 25 },
                    { mq: '1250px', columns: 3, gutter: 25 },
                    { mq: '1500px', columns: 3, gutter: 25 }
                ],
            position: true
        });
        this.bricksInstance.resize(true).pack();
    }
}
export default Feed;