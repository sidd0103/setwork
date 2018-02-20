//react components
class Page extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        user : props.userData
      }
    }
    render() {
        return (
          <div>
            <SideNav user={this.state.user}/>
            <OverHeadBar/>
            <div className="main">
              <div className="page-container">
                <HeaderPage user={this.state.user}/>
                <StatsPage/>
                <InfoPage/>
              </div>
            </div>
          </div>
        )
    }
}
var name = "Trevor Lambert";

class SideNav extends React.Component {
    componentDidMount() {
      //initialize the Materialize SideNav
      $('.nav-open').sideNav({
          menuWidth: 250, // Default is 300
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
          draggable: true, // Choose whether you can drag to open on touch screens,
          onOpen: function (el) {}, // A function to be called when sideNav is opened
          onClose: function (el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
      });
    }
    goToProfile () {
      window.location.href = 'profile.html#me';
    }
    render() {
        return (
          <div>
              <a data-activates="slide-out" className="waves-effect waves-light z-depth-3 nav-open"><i className="material-icons">menu</i></a>
              <ul id="slide-out" className="side-nav fixed">
                <div className="login-section">
                    <div className="login-content">
                        <div className="pic-area">
                            <div onClick={this.goToProfile} className="waves-effect z-depth-1 profile">
                                <div className="info">
                                    <div className="z-depth-1 prof-pic"></div>
                                    <div className="stats">
                                        <div className="rating">{this.props.user.rating || 4.0}/5</div>
                                        <div className="wallet">${this.props.user.balance || 0}</div>
                                    </div>
                                </div>
                                <div className="name">{this.props.user.name || 'Anonymous'}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <li><a href="pinboard.html"><i className="material-icons">home</i>PINBOARD</a></li>
                <li><a href="#!"><i className="material-icons">explore</i>EXPLORE</a></li>
                <li><a href="#!"><i className="material-icons">group</i>FOLLOWING</a></li>
              </ul>
            </div>
        );
    }
}
class OverHeadBar extends React.Component {
  goHome() {
    window.location.href = 'index.html';
  }
  render() {
      return (
          <div>
            <div className="z-depth-1 overhead-bar"></div>
            <img onClick={this.goHome} data-to="index.html" className="link logo" src="media/logo.png"/>
            <div onClick={this.goHome} data-to="index.html" className="link logo-text">SAPHARII</div>
          </div>
      );
  }
}
class HeaderPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      usernameVal: this.props.user.uid || '',
      nameVal : this.props.user.name,
      isDisabled : true,
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    //figure out if you are viewing your own profile
    if (this.props.user.uidFirebase = user.uid) {
      this.state.actnHTML = (
        <div className="z-depth-1 actn-btn">
          <div onClick={this.editProfile} className="waves-effect editOrSaveProfileText">Edit Profile</div>
        </div>
      )
    }
    else {
      this.state.actnHTML = (
        <div className="z-depth-1 actn-btn">
          <div className="waves-effect friend-request material-icons">person_add</div><div className="waves-effect msg material-icons">chat_bubble</div>
        </div>
      )
    }
  }
  editProfile() {
    this.setState({
      isDisabled : false,
      actnHTML : (
        <div className="z-depth-1 actn-btn">
          <div onClick={this.saveProfile} className="waves-effect editOrSaveProfileText">Save Changes</div>
        </div>
      )
    });
  }
  saveProfile() {
    this.setState({
      isDisabled : true,
      actnHTML : (
        <div className="z-depth-1 actn-btn">
          <div onClick={this.editProfile} className="waves-effect editOrSaveProfileText">Edit Profile</div>
        </div>
      )
    });
  }
  handleUsernameInput(event) {
    this.setState({usernameVal: event.target.value});
  }
  handleNameInput(event) {
    this.setState({nameVal: event.target.value});
  }
  render() {
    return (
      <div className="z-depth-1 header-page">
        <div className="z-depth-1 profile-pic">
            <div className="waves-effect waves-light switch-icon material-icons">sdfsdf</div>
        </div>
        <div className="name-info">
            <input placeholder="Set a username!" value={this.state.usernameVal}  disabled={this.state.isDisabled} onChange={this.handleUsernameInput} className="uid"/>
            <input placeholder="Set a Name!" value={this.state.nameVal} disabled={this.state.isDisabled} onChange={this.handleNameInput} className="name"/>
            {this.state.actnHTML}
        </div>
      </div>
    )
  }
}
class StatsPage extends React.Component {
  render() {
    return (
      <div className="z-depth-2 stats-page">
          <div data-tooltip="Friends" className="waves-effect tooltipped z-depth-2 stat"><i className="material-icons">people</i><span className="stat-val">320</span></div>
          <div data-tooltip="Connections" className="waves-effect tooltipped z-depth-2  stat"><i className="material-icons">settings_input_antenna</i><span className="stat-val">36</span></div>
          <div data-tooltip="Rating" className="waves-effect tooltipped z-depth-2  stat"><i className="material-icons">star</i> <span className="stat-val">4.8/5</span></div>
      </div>
    )
  }
}
class InfoPage extends React.Component {
  componentDidMount() {
    //initialize the Materialize Tabs and Collapsible
    $('ul.tabs').tabs();
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div className="z-depth-1 info-page">
        <ul className="tabs-fixed-width tabs">
        <li className="tab col s3"><a href="#activity">activity</a></li>
        <li className="tab col s3"><a href="#resume">resume</a></li>
        <li className="tab col s3"><a href="#testimonials">testimonials</a></li>
        </ul>
        <Activity/>
        <Resume/>
        <Testimonials/>
      </div>
    )
  }
}
class Activity extends React.Component {
  render() {
    return (
      <div id="activity" className="info-slide">
          <div className="quick-stats">
            <InfoStat label="Expirience" content="0 hours worked"/>
            <InfoStat label="Favorite Job" content="Gardening"/>
            <InfoStat last={true} label="Works around" content="Las Vegas, Nevada"/>
          </div>
          <div className="divider"></div>
          <div className="activity-area">
            <ActivityStat type="employed" uid="bill.wurtz" date="August 28th, 2017"/>
            <ActivityStat type="workedfor" uid="bill.wurtz" date="August 26th, 2017"/>
            <ActivityStat last={true} type="employed" uid="bill.wurtz" date="August 24th, 2017"/>
          </div>
      </div>
    )
  }
}
class InfoStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : this.props.content,
      label: this.props.label,
      addon: ''
    }
    if (this.props.last == true) {
      this.state.addon = 'last ';
    }
  }
  render () {
    return (
      <div className={this.state.addon + "info-stat"}>
          <label>{this.state.label}</label>
          <div>{this.state.content}</div>
      </div>
    )
  }
}
class ActivityStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date : this.props.date,
      uid: this.props.uid,
      addon : ''
    }
    if (this.props.type == 'employed') {
      this.state.content = <label>Employed <User uid={this.state.uid}/></label>
    }
    else if (this.props.type == 'workedfor') {
      this.state.content = <label>Worked for <User uid={this.state.uid}/></label>
    }
    if (this.props.last == true) {
      this.state.addon = 'last ';
    }
  }
  render () {
    return (
      <div className={this.state.addon + "activity-stat"}>
          <label>{this.state.content}</label>
          <div>{this.state.date}</div>
      </div>
    )
  }
}
class User extends React.Component {
  render () {
    return (
      <span className="p-link">{this.props.uid}</span>
    )
  }
}
class Resume extends React.Component {
  render () {
    return (
      <div id="resume" className="info-slide">
          <TitleSection name="steve randall" location="73 West Portola" phone="1-650-691-3909" email="sidbiyer@gmai.com"/>
          <GoalSection content="Hi there my name is Steve Randall, and I hope to be a doctor when I grow up.  I am currently a Junior at LAHS and am passionate about medicine."/>
          <SkillsSection skills={["Lawn Mowing","Programming"]}/>
          <WorkSection/>
          <EduSection/>
          <AdditionalSection/>
      </div>
    )
  }
}
class TitleSection extends React.Component {
  render () {
    return(
      <div className="info-section title">
          <div className="name">{this.props.name.toUpperCase()}</div>
          <div className="contact-info">
              <div className="contact-point"><i className="material-icons">location_on</i>{this.props.location}</div>
              <div className="contact-point"><i className="material-icons">phone_iphone</i>{this.props.phone}</div>
              <div className="contact-point"><i className="material-icons">email</i>{this.props.email}</div>
          </div>
      </div>
    )
  }
}
class GoalSection extends React.Component {
  render () {
    return (
      <div className="goal info-section">
          <label>GOAL/SUMMARY</label>
          <div className="summary">{this.props.content}</div>
      </div>
    )
  }
}
class SkillsSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return(
      <div className="info-section">
          <label>SKILLS</label>
          <div className="skills-container">{this.props.skills.map(skill => <div key={skill} className="skill">{skill}</div>)}
          </div>
      </div>
    )
  }
}
class WorkSection extends React.Component {
  render () {
    return (
      <div className="info-section">
          <label>WORK HISTORY/INTERNSHIPS</label>
          <ul className="work-collapsible collapsible" data-collapsible="accordion">
              <Job name="Trade Desk Internship" jobName="The Trade Desk" jobLocation="Santa Barbara, California" jobDateRange="Summer 2017 - Today" jobSummary="I was a software developer for the company and was in charge of the front end development of their platform."/>
              <Job name="Trade Desk Internship" jobName="The Trade Desk" jobLocation="Santa Barbara, California" jobDateRange="Summer 2017 - Today" jobSummary="I was a software developer for the company and was in charge of the front end development of their platform."/>
          </ul>
      </div>
    )
  }
}
class Job extends React.Component {
  render () {
    return (
      <li>
          <div className="collapsible-header"><div className="folder-icon material-icons">folder</div><div>{this.props.name}</div></div>
          <div className="collapsible-body">
              <div className="z-depth-1 info-point"><i className="material-icons">business</i><div className="data">{this.props.jobName}</div></div>
              <div className="z-depth-1 info-point"><i className="material-icons">location_on</i><div className="data">{this.props.jobLocation}</div></div>
              <div className="z-depth-1 info-point"><i className="material-icons">date_range</i><div className="data">{this.props.jobDateRange}</div></div>
              <div className="z-depth-1 job-summary">{this.props.jobSummary}</div>
          </div>
      </li>
    )
  }
}
class EduSection extends React.Component {
  render () {
    return (
      <div className="info-section">
          <label>EDUCATION</label>
          <ul className="education-collapsible collapsible" data-collapsible="accordion">
            <School/>
            <School/>
            <School/>
          </ul>
      </div>
    )
  }
}
class School extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name : "Los Altos High",
      degree : false,
      major : false,
      date : [2016,2019],
      activities : ['NHS Club Member','FBLA Club Member','SOL Club President','Varsity Track and Field'],
      awards : ['4.6 GPA','NHS Member','CSF Member','NMSQT Qualifyer']
    }
  }
  render () {
    return (
      <li>
          <div className="collapsible-header"><div className="folder-icon material-icons">folder</div><div>{this.state.name}</div></div>
          <div className="collapsible-body">
              <div className="z-depth-1 info-point"><i className="material-icons">description</i><div className="data">No Degree</div></div>
              <div className="z-depth-1 info-point"><i className="material-icons">search</i><div className="data">No Major Declared</div></div>
              <div className="z-depth-1 info-point"><i className="material-icons">date_range</i><div className="data">2016 - 2019</div></div>
              <div className="activities">
                  <label>Activities</label>
                  {this.state.activities.map(activity => <div key={activity} className="activity"><span className="point">■</span>{activity}</div>)}
              </div>
              <div className="awards">
                  <label>Awards/Distinctions</label>
                  {this.state.awards.map(award => <div key={award} className="activity"><span className="point">■</span>{award}</div>)}
              </div>
          </div>
      </li>
    )
  }
}
class AdditionalSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      content : "I like to ride my bike in the Hills next to me.",
    }
  }
  render () {
    return (
      <div className="info-section">
          <label>ADDITIONAL HOBBIES</label>
          <div className="content">{this.state.content}</div>
      </div>
    )
  }
}
class Testimonials extends React.Component {
  render () {
    return (
      <div id="testimonials" className="info-slide">
          <Testimonial/>
          <Testimonial/>
      </div>
    )
  }
}
class Testimonial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "The Best Lawn Mower Ive seen in my Life!",
      author : "sidd.iyer",
      rating : 4.5,
      review: "I would have never thought my lawn could have been lawned in a more perfect way.   You know, youd think a highschool student could do a better job than my gardners, but I guess not! Definitely gonna hire this young chap again!"
    }
  }
  render () {
    return (
      <div className="review">
          <div className="title">
              <div className="content">
                  <div className="txt">{this.state.title}</div>
                  <div className="author">by <User uid={this.state.author}/></div>
              </div>
              <div className=" rating">{this.state.rating}/5</div>
          </div>
          <div className="review-text">{this.state.review}</div>
      </div>
    )
  }
}
function renderPage() {
  firebase.database().ref('/users/' + user.uid + '/userStats').once('value').then(function(snapshot) {
    var data = snapshot.val()
    ReactDOM.render(<Page userData={data}/>,document.getElementById("root"));
  });
}
