import React from 'react';

import foellinger from './images/foellinger.jpg'
import zelda from './images/zelda25.jpg'
import mohidab from './images/mohidab.jpg'
import family from './images/family.jpg'
import alaska from './images/wide-alaska.jpg'
import museum from './images/museum.jpg'
import ferris from './images/ferris.jpg'


import './MainPage.css';

class TitleName extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "tiles name-tile">
        <p className = "titleText">Hello.<br/>I'm Muhammed Imran</p>
        <div style = {{display: (this.props.screenWidth <= 490 ? "none" : "none")}}> <br/>  <br/></div>
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
        <div id="foellinger-img-wrapper"><img id = "foellinger-img" align="right" src={foellinger} alt="Foellinger Auditorium."/></div>
        <p className = {this.props.schoolAnimClass}>I'm studying Computer Science at the University of Illinois at Urbana-Champaign</p>
        <div className = "clear-float"/>
      </div>
    );
  };
}


class HobbiesTile extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "tiles hobbies-tile">
        <div className = "carousel-message">
          <p>Since coming here in the fall of 2018, I've done some cool stuff like:</p>
        </div>
        <MyCarousel/>
        <div className = "carousel-message">
          <p>And I'm always looking for more to do :)</p>
        </div>
      </div>
    )
  }
}


class MyCarousel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      justLoaded: true,
      currentSlide: 0,
      numImages: 4,
    }
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }
  myImages = [
    mohidab, family, alaska, ferris
  ];

  myCaptions = [

  ];
  nextSlide() {
    console.log("next called");

    var newState = {
      justLoaded: false, 
      leftPressed: false
    };
    var slide = this.state.currentSlide + 1;
    if(slide === this.state.numImages){
      newState.currentSlide = 0;
    }
    else{
      newState.currentSlide = slide;
    }
    this.setState(newState);
  }

  prevSlide() {
    console.log("prev called");

    var newState = {
      justLoaded: false,
      leftPressed: true
    };
    var slide = this.state.currentSlide - 1;
    if(slide < 0){
      newState.currentSlide = this.state.numImages - 1;
    }
    
    else{
      newState.currentSlide = slide;
    }
    this.setState(newState);
  }

  pickClass(index) {
    var relativeSlide = index-this.state.currentSlide;
    if(relativeSlide === 0){
      if(this.state.leftPressed){
        return "active-left";
      }
      else{
        return "active-right";
      }
    }

    switch(index) {
      case 0: {
        if(this.state.leftPressed){
          if(relativeSlide === -1){
            return "standby-left";
          }
          else if(relativeSlide === (1-this.state.numImages)){
            return "inactive-left";
          }
          else{
            return "hidden";
          }
        }
        else{
          if(relativeSlide === -1){
            return "inactive-right";
          }
          else if(relativeSlide === (1-this.state.numImages)){
            return "standby-right";
          }
          else {
            return "hidden";
          }
        }
      }
      case (this.state.numImages-1): {
        if(this.state.leftPressed){
          if(relativeSlide === (this.state.numImages-1)){
            return "standby-left";
          }
          else if(relativeSlide === 1){
            return "inactive-left";
          }
          else {
            return "hidden";
          }
        }
        else{
          if(relativeSlide === (this.state.numImages-1)){
            return "inactive-right";
          }
          else if(relativeSlide === 1){
            return "standby-right";
          }
          else {
            return "hidden";
          }
        }
      }
      default: {
        if(this.state.leftPressed){
          if(relativeSlide === -1){
            return "standby-left";
          }
          else if(relativeSlide === 1){
            return "inactive-left";
          }
          else {
            return "hidden";
          }
        }
        else{
          if(relativeSlide === -1){
            return "inactive-right";
          }
          else if(relativeSlide === 1){
            return "standby-right";
          }
          else {
            return "hidden";
          }
        }
      }
    }
  }

  startingCarousel() {
    return (
      this.myImages.map((value,index) => (
        <img 
        key = {index}
        src = {value}
        className = {
          (index === 0) ? "start active-left" :
          (index === 1) ? "start inactive-left" : 
          (index === (this.state.numImages-1) ) ? "standby-left" : "hidden"
        }/>
      ))  
    )
  }

  twoImageCase() {
    return (
      this.myImages.map((value, index) => (
        <img
        key = {index} 
        src = {value} 
        className = { 
          ((index === this.state.currentSlide) ? 
          (this.state.leftPressed ? "active-left": "active-right") : 
          (this.state.leftPressed ? "inactive-left" : "inactive-right"))}/>
      ))
    )
  }

  generalCase() {
    console.log("here");
    return (
      this.myImages.map((value, index) => (
        <img 
        key = {index} 
        src = {value} 
        className = {this.pickClass(index)}/>
      ))
    )
  }
  
  render() {
    return (
      // style = {{backgroundImage: `url(${this.myImages[this.state.currentSlide]})`}} 
        <div onContextMenu = {(event) => {event.preventDefault()}}  className = "carousel-wrapper" id="hobbies-carousel">
          <div className = "arrow-wrapper"  id="left-arrow-wrapper" onClick = {this.prevSlide}><i className="material-icons-round arrow-link" id="left-arrow">arrow_back</i></div>
          <div className = "arrow-wrapper"  id="right-arrow-wrapper" onClick = {this.nextSlide}><i className="material-icons-round arrow-link" id="right-arrow">arrow_forward</i></div>
          <div className = "clear-float"/>
          {
            (this.state.justLoaded) ? this.startingCarousel() :   
            (this.state.numImages === 2) ? this.twoImageCase() :
            this.generalCase()
          }
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
    window.removeEventListener('resize', this.updateWidth);
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
    console.log(scrollY);

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