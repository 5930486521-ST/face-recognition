import React from "react";
import {URL} from "../../App";

const getSigninInfo = ()  =>{
  const email = document.getElementById("sign-email-address").value;
  const pass = document.getElementById("sign-password").value;
  return {email,pass};
}

const signInPressHandler = (onchangeRoute) =>{
  const info = getSigninInfo();
  const {email,pass} = info;
  if (email.includes("@") && email.includes(".") ){
    if (pass.length >= 8 ){
      fetch(URL+"/signin",{
        method : "post",
        headers: {"Content-type": "application/json"},
        body :  JSON.stringify(info)
      })
    .then(res => {
      if  (res.status === 200) {
        res.json()
          .then(userInfo =>onchangeRoute('homepage',userInfo));
      }else if (res.status === 401) alert("wrong credential");
      else alert(res.statusText);
    })
    .then(console.log)
    }else alert("Your password should longer than 8 char");
  }else alert("wrong email");
  
}

const SigninPage = ({onchangeRoute}) =>{
    return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="sign-email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="sign-password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => signInPressHandler(onchangeRoute)}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onchangeRoute("register") } className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>);
}

export default SigninPage;