import React, {useEffect, useRef} from "react";
// import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import heatmap_data from "./Map";
import AreaChart from "../AreaChart/AreaChart";

// const heatmap_data = heatmap_data;
const HeatMap = (props)=> {
    // const layer2 = L.tileLayer(
    //   'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    // { opacity: 1 });
    // const mapRef = React.useRef(null);
    // useEffect( ()=> {
    //     mapRef.current =L.map('map', {
    //         center: [27.700769, 85.300140],
    //         zoom: 13,
    //         layers:[layer2]
    //     });
    // }, [layer2]);

    const mapRef = useRef(null)
    useEffect(
        () => {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWFkZXNoLWJhcmFsIiwiYSI6ImNrcWozN3d1eDBibnkydXBkdmJtY21qM3AifQ.7Si23kBM7Fjb7tdSenXD0w';
            mapRef.current =  new mapboxgl.Map({
                container: 'map', // container id
                // style: 'https://api.baato.io/api/v1/styles/breeze?key=bpk.MLkcow8vhdKGJkMivqaw1OiCMAKspIfgbyW-C8-AsLbB',
               style: 'mapbox://styles/mapbox/dark-v10',
                center: [85.3375, 27.7009],
                zoom: 11,
                attributionControl: false
            });
        },[]
    );
    useEffect(
        () => {
            mapRef.current.on('load', () => {
                // Add a geojson point source.
                // Heatmap layers also work with a vector tile source.
                mapRef.current.addSource('earthquakes', {
                'type': 'geojson',
                'data': []
                });
                 
                mapRef.current.addLayer(
                {
                'id': 'earthquakes-heat',
                'type': 'heatmap',
                'source': 'earthquakes',
                'maxzoom': 9,
                'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                0,
                0,
                6,
                1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                9,
                20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                1,
                9,
                0
                ]
                }
                },
                'waterway-label'
                );
                 
                mapRef.current.addLayer(
                {
                'id': 'earthquakes-point',
                'type': 'circle',
                'source': 'earthquakes',
                'minzoom': 7,
                'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                16,
                ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                1,
                'rgba(33,102,172,0)',
                2,
                'rgb(103,169,207)',
                3,
                'rgb(209,229,240)',
                4,
                'rgb(253,219,199)',
                5,
                'rgb(239,138,98)',
                6,
                'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                0,
                8,
                1
                ]
                }
                },
                'waterway-label'
                );
                });
                
                
        }
    )

    return (
            <div className='column center'>
                <div id='map'></div>
                <AreaChart />
            </div>
            
    )
}
//     return (
//         <div className='column left'>
//             Heatmap
//         </div>
//     )
// }

export default HeatMap;