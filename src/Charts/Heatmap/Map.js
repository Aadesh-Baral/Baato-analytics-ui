import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import AreaChart from "../AreaChart/AreaChart";
import { addressPoints } from "./addressPoints";

export default function Map() {
  useEffect(() => {
    var map = L.map("map").setView([27.700769, 85.300140], 12);

    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.heatLayer(addressPoints, {'radius':12.5}).addTo(map);
  }, []);

  return (
    <div className='column center'>
        <div id='map'></div>
        <AreaChart />
    </div>
  )
}