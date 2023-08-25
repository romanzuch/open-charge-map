<template>
  <div id="mapContainer" class='w-full h-full'></div>
</template>
  
<script>
  import { ref, onMounted } from 'vue';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  export default {
    name: 'MapContainer',
    props: {
      lat: Number,
      lng: Number
    },
    setup(props) {
      var loading = ref<Boolean>(false);
      const token = process.env.VUE_APP_MAPBOX_TOKEN;
      var map = {};

      function createMap() {
        try {
          mapboxgl.accessToken = token;
          map = new mapboxgl.Map({
            container: 'mapContainer',
            center: [props.lng, props.lat],
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 16
          })
        }
        catch (err) {
          console.error('An error occured: %s', err);
        }
      }

      function placeMarkers(locations) {

        // Create a GeoJSON object
        const geoJson = {
          type: 'FeatureCollection',
          features: locations,
        };

        // add source
        map.addSource('locations', {
          type: 'geojson',
          data: geoJson, 
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        // add clusters with item count
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'locations',
          filter: ['has', 'point_count'],
          paint: {
            //   * Blue, 10px circles when point count is less than 100
            //   * Yellow, 20px circles when point count is between 100 and 750
            //   * Pink, 30px circles when point count is greater than or equal to 750
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
              10,
              100,
              20,
              750,
              30
            ]
          }
        });

        // group clusters with abbreviated point count
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

        // add unclustered points
        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'locations',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

      }

      onMounted(() => {
        createMap();
      })

      return {
        loading, 
        map,
        token,
        placeMarkers
      }
    }
  }
</script>
  