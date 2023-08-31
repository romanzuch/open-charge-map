import testData from './testData.json';

class ApiService {
    constructor() {

    }
    fetchLocations() {
        return {
            type: 'FeatureCollection',
            features: testData.data,
        };
    }
}

export default ApiService;