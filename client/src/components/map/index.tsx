'use client'

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';

export default function MapContainer() {
    const accessToken = process.env.MAPBOX_KEY as string;
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const newMap = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [13.404954, 52.520008], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });
        setMap(newMap);
        return() => {
            if (map) {
                map.remove()
            }
        }
    }, []);

    useEffect(() => {
       // fetch locations and place markers on the map
    });

    return (
        <div>
            {/* map container */}
            <div className='w-screen h-screen rounded-md' id='map' />
        </div>
    )
}