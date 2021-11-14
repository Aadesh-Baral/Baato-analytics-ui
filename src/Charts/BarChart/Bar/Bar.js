import React from "react";


const bar = (props) => {
    return (
        <div className='Bar'>
            <span className='Name'>{props.district}</span>
            <span className='Count'>{props.requestCount}</span>
        </div>
    )
}

export default bar;