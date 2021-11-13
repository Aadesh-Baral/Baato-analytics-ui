import React from 'react';
import Bar from './Bar/Bar'
// import {CanvasJSChart}  from '../../canvasjs.react'

const barChart = () => {
    return (
        <div className='column left'>
            <div>
                <div>Top 5 Districts</div>
                <Bar />
                <Bar />
                <Bar />
                <Bar />
                <Bar />
            </div>
            <div>
                <div>Top 5 Municipalities</div>
                <Bar />
                <Bar />
                <Bar />
                <Bar />
                <Bar />
            </div>
        </div>
    )
}

export default barChart