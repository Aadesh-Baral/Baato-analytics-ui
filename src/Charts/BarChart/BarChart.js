import React, { useEffect, useState } from 'react';
// import {authHeader} from '../../API/API';
import Bar from './Bar/Bar';
import { analyticsDistrict } from '../../API/API';
// import {CanvasJSChart}  from '../../canvasjs.react'

const municipalityDummyData = {
    0:{'municipality':'Kathmandu Metropolitan City','requestCount': 128},
    1:{'municipality':'Lalitpur Metropolitan City','requestCount': 59},
    2:{'municipality':'Tokha Municipality','requestCount': 75},
    3:{'municipality':'Budhanilkantha Municipality','requestCount': 33},
    4:{'municipality':'Nagarjun Municipality','requestCount': 9}
}


const BarChart = () => {
    const[districts, setDistricts] = useState('');
    useEffect(
         ()=> {
            const fetchData = async () => {
                    const newDistricts = await analyticsDistrict();
                    setDistricts(newDistricts)
            };
            fetchData();
        },[]
    )
    return (
        <div className='column left'>
            <div>
                <div>(1) Top 5 Districts</div>
                {Object.keys(districts).map((keyName, i) => (
                    < Bar 
                        key={i} 
                        name={districts[keyName]['district']} 
                        requestCount={districts[keyName]['requestCount'] } 
                    />
            ))}
            </div>
            <div>
                <div>(2) Top 5 Municipalities</div>
                {Object.keys(municipalityDummyData).map((keyName, i) => (
                    < Bar 
                        key={i} 
                        name={municipalityDummyData[keyName]['municipality']} 
                        requestCount={municipalityDummyData[keyName]['requestCount'] }
                    />
                ))}
            </div>
        </div>
    )
}

export default BarChart