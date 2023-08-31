'use client'

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import ApiService from '@/services/apiService';
import Location from '@/src/models/location';

export default function MapContainer() {
    const accessToken = process.env.MAPBOX_KEY as string;
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [ markers, setMarkers ] = useState<mapboxgl.Marker | null>(null);
    const apiService = new ApiService();
    
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
        const features = apiService.fetchLocations();
        console.log(features);
        if (map) {
            map.addSource('locations', {
                type: 'geojson',
                data: features,
                cluster: false,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });
            map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'locations',
                    filter: ['has', 'point_count'],
                    paint: {
                        // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
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
                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'locations',
                    filter: ['has', 'point_count'],
                    layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                    }
                });
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'locations',
                    'layout': {
                    'icon-image': 'custom-marker',
                    'text-field': ['get', 'properties.address.title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                    }
                });
            });
        }
    });

    return (
        <div>
            {/* map container */}
            <div className='w-screen h-screen rounded-md' id='map' />
        </div>
    )
}