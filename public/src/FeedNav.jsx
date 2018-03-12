import React from "react";
import SweetScroll from "sweet-scroll";
import {CSSTransitionGroup} from 'react-transition-group';

class CatagoryToggle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.children} onClick={() => this.props.toggleMethod(this.props.children)} className={"waves-effect material-icons catagory-advance"}>
                <div>{this.props.children}</div>
            </div>
        )
    }
}
class FeedCatagory extends React.Component {
    render() {
        return (
            <div className={"z-depth-1 feed-catagory"}>{this.props.children}</div>
        )
    }
}
class FeedCatagories extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            leftToggle: null,
            rightToggle: <CatagoryToggle key={"right"} toggleMethod={this.toggle}>chevron_right</CatagoryToggle>
        };
    }
    render() {
        return (
            <div>
                <CSSTransitionGroup transitionName="btn-anim" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {this.state.leftToggle}
                    {this.state.rightToggle}
                </CSSTransitionGroup>
                <div ref={(slider) => {this.categorySlider = slider}} className={"feed-catagories"}>
                    {this.props.children}
                </div>


            </div>
        )
    }
    componentDidMount() {
        this.scroller = new SweetScroll.create({
            horizontal: true,
            vertical: false,
            duration: 900,
            easing: 'easeOutQuint',
            after: (offset) => {
                if (offset.left > 10) {
                    this.state.leftToggle = <CatagoryToggle key={"left"} toggleMethod={this.toggle}>chevron_left</CatagoryToggle>;
                    this.setState(this.state);
                }
                else if (offset.left < 10) {
                    this.state.leftToggle = null;
                    this.setState(this.state);
                }
                if (this.categorySlider.offsetWidth + this.categorySlider.scrollLeft === this.categorySlider.scrollWidth) {
                    this.state.rightToggle = null;
                    this.setState(this.state);
                }
                else {
                    this.state.rightToggle = <CatagoryToggle key={"right"} toggleMethod={this.toggle}>chevron_right</CatagoryToggle>;
                    this.setState(this.state);
                }
            },
        }, this.categorySlider);
    }
    toggle(type) {
        console.log("toggle!")
        if (type === 'chevron_right') {
            this.scroller.to('+=300');
        }
        if (type === 'chevron_left') {
            this.scroller.to('-=300');
        }
    }

}
class FeedSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value : ''};
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div className={"search-field input-field"}>
                <i className={"material-icons"}>search</i>
                <input type={"text"} placeholder="Search for jobs, internships, or employers." onChange={this.handleChange} value={this.state.value}/>
            </div>
        )
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

}
class FeedNav extends React.Component {
    render() {
        return (
            <div className={"FeedNav"}>
                <FeedSearch/>
                <FeedCatagories>
                    <FeedCatagory>Yard-Work</FeedCatagory>
                    <FeedCatagory>Tutoring</FeedCatagory>
                    <FeedCatagory>Internships</FeedCatagory>
                    <FeedCatagory>Babysitting</FeedCatagory>
                    <FeedCatagory>Car Washing</FeedCatagory>
                    <FeedCatagory>Dog Walking</FeedCatagory>
                    <FeedCatagory>House Cleaning</FeedCatagory>
                    <FeedCatagory>Website Building</FeedCatagory>
                    <FeedCatagory>Movers</FeedCatagory>
                    <FeedCatagory>Construction</FeedCatagory>
                    <FeedCatagory>Graphics Design</FeedCatagory>
                    <FeedCatagory>Life Guard</FeedCatagory>
                </FeedCatagories>
            </div>
        )
    }

}
export default FeedNav;