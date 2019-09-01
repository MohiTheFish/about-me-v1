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
  }

  render() {
    return (
      <div className = "tiles hobbies-tile">
        <div id = "hobbies-message-left" className = "carousel-message">
          <p>Some things I enjoy doing include: </p>
        </div>
        {/* <div className="carousel-wrapper">
          <table style = {{background: `url(${this.myImages[this.state.currentSlide]})`}}>
            <tr>
              <td className = "arrow-wrapper" id="left-arrow-wrapper" onClick = {this.prevSlide}><i className="material-icons-round arrow-link">arrow_back</i></td>
              <td id="middle-cell"><div style = {{height: "600px"}}/></td>
              <td className = "arrow-wrapper" id="right-arrow-wrapper" onClick = {this.nextSlide}><i className="material-icons-round arrow-link">arrow_forward</i></td>
            </tr>
          </table>
        </div> */}
        <MyCarousel/>
        <div id = "hobbies-message-right" className = "carousel-message">
          <p>nonsenseOSIFJSIJE FKSFLKSJKFUJSNFLKAEFKJAKENFLKAJENFAN ;EFKNAJEFBAHEFKAJBHEFLHEFAJHUEFLAJUHKE,NFLKAEFJAHKEGAFEKUAWEFJKAEFBJKEYFG</p>
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
      numImages: 2,
    }
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }
  myImages = [
    zelda, league
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

  render() {
    return (
      // style = {{backgroundImage: `url(${this.myImages[this.state.currentSlide]})`}}
      <div  className = "carousel-wrapper" id="hobbies-carousel">
          <div className = "arrow-wrapper"  id="left-arrow-wrapper" onClick = {this.prevSlide}><i className="material-icons-round arrow-link" id="left-arrow">arrow_back</i></div>
          <div className = "arrow-wrapper"  id="right-arrow-wrapper" onClick = {this.nextSlide}><i className="material-icons-round arrow-link" id="right-arrow">arrow_forward</i></div>
          <div className = "clear-float"/>
          {
            (this.state.justLoaded) ?
            this.myImages.map((value,index) => (
              <img
              key = {index}
              src = {value}
              style = {{display: (index === 0) ? "inline" : "none"}}/>
            ))  : 
            (
            this.myImages.map((value, index) => (
              <img 
              key = {index} 
              src = {value} 
              className = {
                (this.state.justLoaded) ? "" : 
                ((index === this.state.currentSlide) ? 
                (this.state.leftPressed ? "active-left": "active-right") : 
                (this.state.leftPressed ? "inactive-left" : "inactive-right"))}/>
            ))
            )
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