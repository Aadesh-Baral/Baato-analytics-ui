import React, { useEffect, useState } from 'react';
import Bar from './Bar/Bar'
// import {CanvasJSChart}  from '../../canvasjs.react'

const BarChart = () => {
    const[districts, setDistricts] = useState('');
    useEffect(
        ()=> {
            const url = "https://api-staging.baato.io/api/v1/admin/analytics/district?userId=11&limit=5";
            const fetchData = async () => {
                try {
                    const response = await fetch(url, {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcm9neWFrb2lyYWxhK3Rlc3RAZ21haWwuY29tIiwic2NvcGVzIjoiUk9MRV9BRE1JTiIsImlhdCI6MTYzNjg3NzAyNCwiZXhwIjoxNjM2ODk1MDI0fQ.jZ3Z0a45D8WPnxbHxwprksR2M_GI-ko3-G8hETRdbAI'}});
                    const json = await response.json();
                    // console.log(json['data']['content']);
                    setDistricts(json['data']['content'])
                    } catch (error) {
                    console.log("error", error);
                    }
            };
            fetchData();
        },[]
    )
    return (
        <div className='column left'>
            <div>
                <div>Top 5 Districts</div>
                {Object.keys(districts).map((keyName, i) => (
                    < Bar 
                        key={i} 
                        district={districts[keyName]['district']} 
                        requestCount={districts[keyName]['requestCount'] } 
                    />
            ))}
            </div>
            <div>
                <div>Top 5 Municipalities</div>
                {Object.keys(districts).map((keyName, i) => (
                    < Bar 
                        key={i} 
                        district={districts[keyName]['district']} 
                        requestCount={districts[keyName]['requestCount'] } 
                    />
                ))}
            </div>
        </div>
    )
}

export default BarChart