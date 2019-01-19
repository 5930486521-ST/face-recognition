import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange,onConfirmClick}) =>
    <div className='center tc mt0'>
        <p className = "f4 mt0">This is magic brain will detect faces in your picture. Let's try it!</p>
        <div  className = "center">
            <div className='form center2 pa4 br3 shadow-5 '>
                <input id="urllink" className='f4 pa2 w-70 ' type='tex' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'onClick={onConfirmClick}>Detect</button>
            </div>
      </div>
    </div>;

export default ImageLinkForm;
