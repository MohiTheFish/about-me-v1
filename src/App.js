import React, { Component } from 'react';
import Accomplishments from './Accomplishments';
import MainPage from './MainPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  
import './App.css';

class MyNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //removed color = "light" from Navbar so that I can choose color
  render() {
    return (
      <Router>
      <div className = "nav-bar">
        <Navbar className = "nav-style" light expand="md"> 
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/resume">Resume</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/MohiTheFish" target="_blank">MyGitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
          <Route exact path="/" component = {MainPage}/>
          <Route path="/resume" component = {Accomplishments}/>
      </Router>
    );
  }
}

class App extends Component {
  
  render() {
    return (
        <div className = "wrapper"> 
          <MyNav/>
        <footer>Muhammed Imran 2019</footer>
        </div>
    );
  };
}

export default App;
