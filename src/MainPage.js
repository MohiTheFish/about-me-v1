import React from 'react';
import foellinger from './images/foellinger.jpg'
import './App.css';

// class MyNav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//   render() {
//     return (
//       <Router>
//       <div className = "nav-bar">
//         <Navbar color="light" light expand="md">
//           <NavbarBrand href="/">Home</NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink href="/resume">Resume</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="https://github.com/reactstrap/reactstrap">MyGitHub</NavLink>
//               </NavItem>
//               <UncontrolledDropdown nav inNavbar>
//                 <DropdownToggle nav caret>
//                   Options
//                 </DropdownToggle>
//                 <DropdownMenu right>
//                   <DropdownItem>
//                     Option 1
//                   </DropdownItem>
//                   <DropdownItem>
//                     Option 2
//                   </DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>
//                     Reset
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//             </Nav>
//           </Collapse>
//         </Navbar>

//           {/* <Route exact path="/" component = {MainPage}/> */}
//           <Route path="/resume" component = {Accomplishments}/>
//       </div>
//       </Router>
//     );
//   }
// }

class TitleName extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "tiles name-tile">
      <p>Hello.<br/>I'm Muhammed Imran</p>
      </div>
    )
  }

}

class SchoolTile extends React.Component {
  constructor(props){
    super(props);

    console.log("schoolTileprops:" + props.scrolly);
  }
  render() {
    return (
      <div className = "tiles schoolTile">
        <p className = {this.props.schoolAnimClass}>I'm studying at the University of Illinois at Urbana-Champaign</p>
        <img src={foellinger} height="600px" align="right" alt="Foellinger Auditorium."></img>
      </div>
    );
  };
}

class MainPage extends React.Component{ //Bundle all of these components to make routing easier
  constructor(props){
    super(props);
    
    this.state = {
      scrolly: 0,
      pageHeight: window.outerHeight,
      shouldAnimateStudyTile: false,
      schoolTileAnimateClass: "",
    };

    this.updateHeight = this.updateHeight.bind(this);
    window.onscroll = this.updateHeight;
  }

  constants = {
    studyTileThreshold: 200,
  };

  updateHeight(){
    var scrollY = window.scrollY;
    console.log(scrollY);

    var newState = {
      scrolly: window.scrollY,
    };

    if(!this.state.shouldAnimateStudyTile && scrollY >= this.constants.studyTileThreshold){
      newState.shouldAnimateStudyTile = true; //new state is a dictionary with key value pairs
      newState.schoolTileAnimateClass = "schoolTileAnimate"; //just try to access them and assign them as needed
    }

    this.setState(newState);
  }
  render() {
    return (
      <div className = "mainPageWrapper">
        <TitleName scrolly = {this.state.scrolly}/>
        <SchoolTile scrolly = {this.state.scrolly} schoolAnimClass = {this.state.schoolTileAnimateClass}/>
      </div>
    );
  };
}

export default MainPage;