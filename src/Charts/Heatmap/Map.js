import React, {useEffect} from "react";
import L from 'leaflet';
import { heatLayer } from './leaflet-heat';
import heatmap_data from "./heatMapData";

const Map = ()=> {

    const mapRef = React.useRef(null);
    const heatmapRef = React.useRef(null);
    useEffect( ()=> {
        const layer1 = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
            { opacity: 0.3 });
        const cfg = {
            "radius":2,
            "maxOpacity":.8,
            "scaleRadius": true,
            "useLocalExtrema": true,
            "latField": "lat",
            "lngField": "lng",
            "valueField": "count"
        };
        // const heatmap_data = [
        //     {"lat": 27.703491949999997, "lng": 85.31797474524079, "count": 8285.0},
        //     {"lat": 27.701138415492952, "lng": 85.32198409870618, "count": 1486.0},
        //     {"lat": 27.707387527499996, "lng": 85.32715187015498, "count": 1325.0},
        //     {"lat": 27.699820713888883, "lng": 85.31191087283202, "count": 889.0}]
        // heatmapRef.current = new HeatmapOverlay(cfg)
        mapRef.current =L.map('map', {
            center: [27.700769, 85.300140],
            zoom: 13,
            layers:[layer1]
        });
        // heatmapRef.setData(heatmap_data);
    }, []);
    useEffect(
        ()=> {
            heatLayer(heatmap_data).addTo(mapRef.current)
        }
    )
}


export default Map;
