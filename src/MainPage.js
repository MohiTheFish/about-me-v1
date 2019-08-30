import React from 'react';

import foellinger from './images/foellinger.jpg'
import league from './images/leagueimg.jpg'
import zelda from './images/zelda25.jpg'

import './MainPage.css';

class TitleName extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "tiles name-tile">
        <p className="titleText">Hello.<br/>I'm Muhammed Imran</p>
        <div style = {{display: (this.props.screenWidth <= 490 ? "block" : "none")}}> <br/> <br/></div>
        <p className="subText">But some people call me MohiTheFish.</p>
      </div>
    )
  }

}

class SchoolTile extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className = "tiles school-tile">
        <img align="right" src={foellinger} alt="Foellinger Auditorium."></img>
        <p className = {this.props.schoolAnimClass}>I'm currently studying at the University of Illinois at Urbana-Champaign</p>
        <div className = "clear-float"/>
      </div>
    );
  };
}


class HobbiesTile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentSlide: 0,
      numImages: 2,
    }
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  myImages = [
    zelda, league
  ];
  nextSlide() {
    console.log("next called");
    var slide = this.state.currentSlide + 1;
    if(slide === this.state.numImages){
      this.setState({
        currentSlide: 0,
      })
    }
    else{
      this.setState({
        currentSlide: slide,
      })
    }
  }

  prevSlide() {
    console.log("prev called");
    var slide = this.state.currentSlide - 1;
    if(slide < 0){
      this.setState({
        currentSlide: this.state.numImages - 1,
      })
    }
    else{
      this.setState({
        currentSlide: slide,
      })
    }
  }

  render() {
    return (
      <div className = "tiles hobbies-tile">
        <div id = "hobbies-message-left">
        </div>
        <div className = "carousel-wrapper" id="hobbies-carousel">
          <img className="carousel-image" src = {this.myImages[this.state.currentSlide]}/>
          <div className = "arrow-wrapper"  id="right-arrow-wrapper" onClick = {this.nextSlide}>
            <i className="material-icons-round arrow-link">arrow_forward</i>
          </div>
          <div className = "arrow-wrapper"  id="left-arrow-wrapper" onClick = {this.prevSlide}>
            <i className="material-icons-round arrow-link">arrow_back</i>
          </div>
          <div className = "clear-float"/>
        </div>
        <div id = "hobbies-message-right">
          <p>nonsenseOSIFJSIJEFKSFLKSJKFUJSNFLKAEFKJAKENFLKAJENFAN;EFKNAJEFBAHEFKAJBHEFLHEFAJHUEFLAJUHKE,NFLKAEFJAHKEGAFEKUAWEFJKAEFBJKEYFG</p>
        </div>
      </div>
    )
  }
}


class MainPage extends React.Component{ //Bundle all of these components to make routing easier
  constructor(props){
    super(props);
    this.state = {
      scrolly: 0,
      pageWidth: window.innerWidth,
      pageHeight: window.outerHeight,
      shouldAnimateStudyTile: false,
      shouldAnimateHobbiesTile: false,
      schoolTileAnimateClass: "",
      hobbiesTileAnimateClass: "",
    };

    this.updateHeight = this.updateHeight.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    window.onscroll = this.updateHeight;
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWidth)
  }

  constants = {
    studyTileThreshold: 140,
    hobbiesTileThreshold: 300,
  };

  updateWidth(){
    this.setState({pageWidth: window.innerWidth})
  }

  updateHeight(){
    var scrollY = window.scrollY;

    var newState = {
      scrolly: window.scrollY,
    };

    if(!this.state.shouldAnimateStudyTile && scrollY >= this.constants.studyTileThreshold){
      newState.shouldAnimateStudyTile = true; //new state is a dictionary with key value pairs
      newState.schoolTileAnimateClass = "schoolTileAnimate"; //just try to access them and assign them as needed
    }

    if(!this.state.shouldAnimateHobbiesTile && scrollY >= this.constants.hobbiesTileThreshold){
      newState.shouldAnimateHobbiesTile = true;
      newState.hobbiesTileAnimateClass = "hobbiesTileAnimate";
    }

    // console.log(scrollY);

    this.setState(newState);
  }
  render() {
    return (
      <div className = "mainPage-Wrapper">
        <TitleName scrolly = {this.state.scrolly}   screenWidth = {this.state.pageWidth}/>
        <SchoolTile scrolly = {this.state.scrolly} schoolAnimClass = {this.state.schoolTileAnimateClass}/>
        <HobbiesTile scrolly = {this.state.scrolly} hobbiesAnimClass = {this.state.hobbiesTileAnimateClass}/>
      </div>
    );
  };
}

export default MainPage;