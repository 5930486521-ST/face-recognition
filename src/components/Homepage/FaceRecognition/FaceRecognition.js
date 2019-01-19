import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({usedUrl, box}) =>{
    return(
    <div className='center3 ma'>
        <div className='absolute mt2'>
            <img id="inputimage" alt="" src={usedUrl} width='500px' heigh='auto'></img>
            {box.map( (face,idx)=>
                <div className='bounding-box' key={idx} style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}}></div>
            )}
        </div>)
    </div>);
}
export default FaceRecognition;