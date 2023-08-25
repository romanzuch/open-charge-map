<template>
  <main class='flex flex-col w-full justify-center items-center m-0 p-0 h-[100vh]'>
    <!-- Top Container -->
    <div class='flex flex-col w-full justify-center items-center'>
      <h1 class='text-4xl font-bold my-8'>Ladestationen</h1>
      <!-- Data Input -->
      <div class='mb-6 w-11/12 md:w-5/12'>
        <div class='flex flex-col items-start w-full mb-2'>
          <p class='text-xs mb-2'>Latitude</p>
          <input-field :value='latitude' placeholder='Latitude' />
        </div>
        <div class='flex flex-col items-start w-full mb-2'>
          <p class='text-xs mb-2'>Longitude</p>
          <input-field :value='longitude' placeholder='Longitude' />
        </div>
        <div class='flex flex-row items-end w-full mb-2'>
          <div class='flex flex-col items-start flex-grow mr-4'>
            <p class='text-xs mb-2'>Distance (in km)</p>
            <input-field :value='distance' placeholder='Distance' />
          </div>
          <button class='shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-green-600' @click='searchLocations'>Search</button>
        </div>
      </div>
    </div>

    <!-- Data Display -->
    <div class="w-full h-[50vh]">
      <!-- Map Container -->
      <map-container 
        :lat='latitude?.valueOf()' 
        :lng='longitude?.valueOf()' 
        :locations='locations'
        ref="mapContainerRef"
      />
    </div>

  </main>
</template>

<script lang='ts'>
  import { ref, Ref } from 'vue';
  import GeoData from '@/interfaces/location';
  import MapContainer from '@/components/mapContainer.vue';
  import InputField from '@/components/inputField.vue';
  import { buildRequest, fetchLocations } from '@/services/apiService';
  
  export default {
    name: 'App',
    components: {
      MapContainer,
      InputField
    },
    setup() {
      // Variables
      var locations = ref<GeoData[]>([]);
      var apiError = ref<string>();
      var latitude = ref<number>(52.54364156670149);
      var longitude = ref<number>(13.421775591137497);
      var distance = ref<number>(100);
      var isLoading = ref<boolean>();
      const url: string = `${process.env.VUE_APP_API_URL}/locations`;
      // eslint-disable-next-line
      const mapContainerRef: Ref<null | { placeMarkers: (locations: GeoData[]) => void }> = ref(null);

      function searchLocations() {
        isLoading.value = true;
        getLocations();
      }

      async function getLocations() {
        try {
          const request = buildRequest(latitude.value, longitude.value, distance.value);
          await fetchLocations(request)
          .then(res => {
            locations.value = res;
            isLoading.value = false;
            if (mapContainerRef.value !== null) {
              mapContainerRef.value.placeMarkers(res as GeoData[]);
            } 
          })
        } catch (error) {
          apiError.value = error as string;
        }
      }

      return {
        url,
        latitude, 
        longitude,
        locations,
        getLocations,
        apiError,
        isLoading,
        distance,
        searchLocations,
        mapContainerRef
      }
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/assets/styles/app.scss';
</style>
