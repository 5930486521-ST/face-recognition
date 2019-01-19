import React , {Component}from "react";


class RegisPage extends Component{

  getRegisInfo = ()  =>{
    var name = document.getElementById("Regis-name").value;
    var email = document.getElementById("Regis-email-address").value;
    var pass = document.getElementById("Regis-password").value;
    var repass = document.getElementById("Regis-repassword").value;
    return {name,email,pass,repass};
  }
  
  regisPressHandler = () =>{
    var info = this.getRegisInfo();
    if (info.pass === info.repass){
      fetch('http://localhost:3000/regis', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
      })
        .then(res => res.json())
        .then(user => {
          this.props.userChange(user);
          this.props.onchangeRoute("homepage");
        })
    }else alert("pass is inconsistency")
  }

  render(){
    return (    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80">
      <div className="measure">

        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>

          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              name="name"
              id="Regis-name"
            />
          </div>

          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="Regis-email-address"
            />
          </div>

          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="Regis-password"
            />
          </div>

          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="Regis-repassword"
            />
          </div>

        </fieldset>

        <div className="">
          <input
            onClick={() => {this.regisPressHandler();
            }}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Confirm"
          />
        </div>
        
      </div>
    </main>
  </article>);
}
}

export default RegisPage;