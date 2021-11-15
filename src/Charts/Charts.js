import React from 'react';
import BarChart from './BarChart/BarChart';
import HeatMap from './Heatmap/Heatmap';
// import Map from './Heatmap/Map';
// import HexMap from './Heatmap/ClusterMap/ClusterMap';


const charts = ()=> {
    return (
        <div className='columns'>
            <BarChart />
            <HeatMap />
            {/* <Map /> */}
            {/* < HexMap /> */}
        </div>

    )
}

export default charts


// Municipality and Districts ----> Top 5 --- Table
// Weekday Hour -----> Peak Hours
// Heatmaps -----> Monthly heatmap
// API Requests