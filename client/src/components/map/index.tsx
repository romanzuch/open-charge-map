'use client'

import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';

export default function Map() {
    const accessToken = process.env.MAPBOX_KEY as string;
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [13.404954, 52.520008], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
        return() => {
            map.remove()
        }
    }, []);

    return (
        <div>
            {/* map container */}
            <div className='w-screen h-screen rounded-md' id='map' />
        </div>
    )
}