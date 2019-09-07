import React, { Component } from 'react';
import NavBar from "./components/NavBar/NavBar";
import SigninPage from "./components/SigninPage/SigninPage"
import RegisPage from "./components/RegisPage/RegisPage"
import Homepage from "./components/Homepage/Homepage"
import ProfileModal from "./components/Homepage/ProfileModal"

import 'bootstrap/dist/css/bootstrap.css';
import 'tachyons';
import './index.css';

const LOCALHOST_URL = "http://localhost:3000";
// const HEROKU_URL = "https://face-recognition-2019.herokuapp.com";
export const URL = LOCALHOST_URL;

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: "signinPage",
      isSignedin: false,
      userInfo: {},
      isProfileModalShown: false
    }
  }

  componentWillMount() {
    const idToken = window.localStorage.getItem("idToken")
    if(idToken){
      this.onchangeRoute('homepage')
      fetch(URL+"/signin",{
          method : "get",
          headers: {
            "Content-type": "application/json",
            "Authorization": window.localStorage.getItem("idToken")
          }
      })
        .then(res => {
          if  (res.status === 200) {
            res.json()
              .then(userInfo => this.onchangeRoute('homepage', userInfo));
          }
          else {
            this.onchangeRoute('signinPage')
          }
        })
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
    console.log(this.state.userInfo)
    fetch(URL+"/image",{
      method : "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": window.localStorage.getItem("idToken")
      },
      body : JSON.stringify({userInfo:this.state.userInfo , addedEnties : addMore})
    })
      .then(res => res.json())
      .then(newInfo => this.setState({userInfo: newInfo}));    
  }

  updateUserInfo = (updatedField) =>{
    fetch(URL + `/profile/${this.state.userInfo.iduser}`,{
      method : "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": window.localStorage.getItem("idToken")
      },
      body : JSON.stringify(updatedField),
    })
      .then(res => res.json())
      .then(newInfo => this.setState({userInfo: newInfo}));    
  }

  toggleProfileModal = () => {
    this.setState((prevState) => ({
      ...prevState,
       isProfileModalShown: !prevState.isProfileModalShown
    }))
  }
  
  render() {
    var {route, isSignedin, userInfo, isProfileModalShown} = this.state;
    console.log(userInfo);
    return (
      <div>
        
        <NavBar isSignedin={isSignedin} onchangeRoute={this.onchangeRoute} toggleProfileModal={this.toggleProfileModal} />
        {isSignedin? 
          <Homepage userInfo = {userInfo} updateUserRank= {this.updateUserRank}/> :
          (route==="signinPage")? <SigninPage onchangeRoute={this.onchangeRoute} />: <RegisPage onchangeRoute={this.onchangeRoute}/>} 
        <ProfileModal toggleHandler={this.toggleProfileModal} isShown={isProfileModalShown} userInfo={userInfo} onSubmitUpdate={this.updateUserInfo} />
      </div>
    );
  }
}

export default App;
