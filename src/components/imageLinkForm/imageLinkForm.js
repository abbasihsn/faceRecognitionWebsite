import React from 'react';
import './imageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return (
        <div>
            <p className='3 f4 white'>
                please paste your image link here
            </p>
            <div className="w-75 center pa4 br3 shadow-5 form ">
                <input className ="f4 pa2 w-70" type="text" onChange={onInputChange}/>
                <button className="w-25 grow f4 ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}


export default ImageLinkForm;
