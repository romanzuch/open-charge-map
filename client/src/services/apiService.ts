import axios from 'axios';
import GeoData from '@/interfaces/location';

export function buildRequest(latitude: number, longitude: number, distance: number) {
  const params = {
    output: 'json',
    countrycode: 'DE',
    count: 10,
    lat: latitude,
    lng: longitude,
    distance: distance
  };

  return {
    method: 'GET',
    url: 'http://localhost:9999/locations',
    params: params,
    headers: {
      'User-Agent': 'Open Street Map Express'
    }
  };
}

export async function fetchLocations(requestConfig: any): Promise<GeoData[]> {
    const response = await axios(requestConfig);
    return response.data.data;
}