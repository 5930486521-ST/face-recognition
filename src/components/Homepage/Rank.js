import React from "react";

const Rank = ({userInfo}) =>
    <div className='ma4 mt0 mb3 center'>
        <p className='white f2 mt3 center'>{userInfo.name}, your current rank is...</p>
        <p className='white f1 mb2 mt0 center'>#{userInfo.entries}</p>
    </div>;

export default Rank;