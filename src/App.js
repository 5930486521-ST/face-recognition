import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Particles from 'react-particles-js';
import SigninPage from "./components/SigninPage/SigninPage"
import RegisPage from "./components/RegisPage/RegisPage"
import Homepage from "./components/Homepage/Homepage"

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: "signinPage",
      isSignedin: false,
      userInfo: {}
    }
  }

  onchangeRoute = (stage) =>{
    if (stage === "homepage"){
      this.setState({route: stage ,isSignedin: true});
    } else {
      this.setState({route: stage ,isSignedin: false});
    }
  }

  userChange = (newUser) =>{
    this.setState({userInfo : newUser});
  }

  updateUserRank = (addMore) =>{
    fetch("http://localhost:3000/image",{
      method : "put",
      headers: {"Content-type": "application/json"},
      body : JSON.stringify({userInfo:this.state.userInfo , addedEnties : addMore})
    })
      .then(res => res.json())
      .then(newInfo => this.setState({userInfo: newInfo}));    
  }
  
  render() {
    var {route, isSignedin,userInfo} = this.state;
    console.log(userInfo);
    return (
      <div>
        <Particles className='particles' params={particlesOptions}/>
        <NavBar isSignedin={isSignedin} onchangeRoute={this.onchangeRoute} />
        {isSignedin? 
          <Homepage userInfo = {userInfo} updateUserRank= {this.updateUserRank}/> :
          (route==="signinPage")? <SigninPage userChange={this.userChange} onchangeRoute={this.onchangeRoute} />: <RegisPage userChange={this.userChange} onchangeRoute={this.onchangeRoute}/>} 
   
      </div>
    );
  }
}

export default App;
