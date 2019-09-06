import React from "react";
import ProfileIcon from "../Homepage/ProfileIcon"

const NavBar = ({isSignedin, onchangeRoute, toggleProfileModal}) =>{
    const signedinComp = <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <ProfileIcon onchangeRoute={onchangeRoute} toggleProfileModal={toggleProfileModal} />
            </div>;
    const signedoutComp = <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onchangeRoute("signinPage")}>sign in</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onchangeRoute("registerPage")}>register</p>
            </div>;

    return (<nav>
            {isSignedin? signedinComp : signedoutComp}
        </nav>
    );
}

export default NavBar;