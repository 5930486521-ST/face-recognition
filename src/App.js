import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import SigninPage from "./components/SigninPage/SigninPage"
import RegisPage from "./components/RegisPage/RegisPage"
import Homepage from "./components/Homepage/Homepage"

const LOCALHOST_URL = "http://localhost:3000";
// const HEROKU_URL = "https://face-recognition-2019.herokuapp.com";
export const URL = LOCALHOST_URL;

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: "signinPage",
      isSignedin: false,
      userInfo: {}
    }
  }

  onchangeRoute = (stage, newUser = {}) =>{
    if (stage === "homepage"){
      this.setState({route: stage ,isSignedin: true , userInfo:newUser});
    } else {
      this.setState({route: stage ,isSignedin: false, userInfo:newUser });
    }
  }

  // userChange = () =>{
  //   this.setState({userInfo : newUser});
  // }

  updateUserRank = (addMore) =>{
    fetch(URL+"/image",{
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
        
        <NavBar isSignedin={isSignedin} onchangeRoute={this.onchangeRoute} />
        {isSignedin? 
          <Homepage userInfo = {userInfo} updateUserRank= {this.updateUserRank}/> :
          (route==="signinPage")? <SigninPage onchangeRoute={this.onchangeRoute} />: <RegisPage onchangeRoute={this.onchangeRoute}/>} 
   
      </div>
    );
  }
}

export default App;
