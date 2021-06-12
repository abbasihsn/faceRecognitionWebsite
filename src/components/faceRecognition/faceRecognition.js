import React from 'react';
import './faceRecognition.css';

const FaceRecognitionResult = ({box, imageUrl})=>{
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' alt = "result" src={imageUrl} width='500px' height='auto'/>
                <div 
                    className='bounding-box' 
                    style={{
                        top: box.topRow, bottom: box.bottomRow,
                        left: box.leftCol, right: box.rightCol}}>

                </div>
            </div>
        </div>
    );
}

export default FaceRecognitionResult;