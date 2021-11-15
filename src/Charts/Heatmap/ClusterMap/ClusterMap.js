import React, { useEffect, useRef } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl';
import {geoJsonData} from './geoJsonData'
import AreaChart from '../../AreaChart/AreaChart';
// import ReactMapGL, { FlyToInterpolator, NavigationControl } from 'react-map-gl';    
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const HexMap = ()=> {
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
            mapRef.current.on('load', () => {
                // Add a new source from our GeoJSON data and
                // set the 'cluster' option to true. GL-JS will
                // add the point_count property to your source data.
                mapRef.current.addSource('earthquakes', {
                type: 'geojson',
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data: geoJsonData,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });
                 
                mapRef.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'earthquakes',
                filter: ['has', 'point_count'],
                paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
                ],
                'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
                ]
                }
                });
                 
                mapRef.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'earthquakes',
                filter: ['has', 'point_count'],
                layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
                }
                });
                 
                mapRef.current.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'earthquakes',
                filter: ['!', ['has', 'point_count']],
                paint: {
                'circle-color': '#11b4da',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
                }
                });
                 
                // inspect a cluster on click
                mapRef.current.on('click', 'clusters', (e) => {
                const features = mapRef.current.queryRenderedFeatures(e.point, {
                layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                mapRef.current.getSource('earthquakes').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                if (err) return;
                 
                mapRef.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
                });
                }
                );
                });
                 
                // When a click event occurs on a feature in
                // the unclustered-point layer, open a popup at
                // the location of the feature, with
                // description HTML from its properties.
                mapRef.current.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const mag = e.features[0].properties.mag;
                const tsunami =
                e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
                 
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
                )
                .addTo(mapRef.current);
                });
                 
                mapRef.current.on('mouseenter', 'clusters', () => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
                });
                mapRef.current.on('mouseleave', 'clusters', () => {
                mapRef.current.getCanvas().style.cursor = '';
                });
                });
        },[]
    );
    
    return (
    <div className='column center'>
        <div className='chart-title'><i className='bx bx-line-chart'></i>(3) Cluster Map of reverse request sources</div>
        <div id='map'></div>
        <AreaChart />
    </div>
    )
};


export default HexMap;