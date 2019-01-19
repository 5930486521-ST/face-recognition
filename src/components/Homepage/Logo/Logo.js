import Tilt from 'react-tilt'
import React from "react";
import "./Logo.css";
import brain from "./brain.png"

const Logo = () =>
    <div className='ma4 mt0 mb0'>
        <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3 center"> <img style={{paddingTop: '5px'}} alt='logo' src={brain}/></div>
        </Tilt>
    </div>;

export default Logo;
