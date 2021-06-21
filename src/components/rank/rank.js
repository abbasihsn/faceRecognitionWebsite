import React from 'react'



const Rank = ({score, name})=>{
    
    return (
        <div>
            <div className='white f3'>
                {name + ' your current score is ...'}
            </div>
            <div className='white f1'>
                {score}
            </div>
        </div>
    );
}

export default Rank;