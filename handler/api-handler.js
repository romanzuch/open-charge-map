require('dotenv').config()
var axios = require('axios');
const url = require('url');
const GEODATA_TYPE = require('../interfaces/location');

class Handler {

    output;
    type;
    lat;
    lng;
    distance;
    power;
    isoCode;
    key;
    count;
    distanceUnit;
    test;

    constructor(req) {
        this.req = req; // request passed from axios
        this.deconstructQueryParams();
    };

    deconstructQueryParams() {
        const params = this.req.query;
        this.output = this.getValueOrDefault(params, 'output', 'json');
        this.type = this.getValueOrDefault(params, 'type', null);
        this.lat = this.getValueOrDefault(params, 'lat', null);
        this.lng = this.getValueOrDefault(params, 'lng', null);
        this.distance = this.getValueOrDefault(params, 'distance', null);
        this.power = this.getValueOrDefault(params, 'power', null);
        this.isoCode = this.getValueOrDefault(params, 'isoCode', 'DE');
        this.key = this.getValueOrDefault(params, 'key', process.env.API_KEY);
        this.count = this.getValueOrDefault(params, 'count', 10);
        this.distanceUnit = 'km';
        this.test = this.getValueOrDefault(params, 'test', null);
    }

    getValueOrDefault(object, key, defaultValue) {
        return key in object && object[key] !== '' ? object[key] : defaultValue;
    }

    buildRequest() {
        const params = {
            output: this.output,
            countrycode: this.isoCode,
            distance: this.distance !== null ? this.distance : undefined,
            latitude: this.lat !== null ? this.lat : undefined,
            longitude: this.lng !== null ? this.lng : undefined,
            maxresults: this.count,
            distanceUnit: this.distanceUnit,
            key: this.key,
        };

        return {
            method: 'GET',
            url: 'https://api.openchargemap.io/v3/poi/',
            params,
            headers: {
                'User-Agent': 'Open Street Map Express'
            }
        };
    }

    async getLocations() {
        try {
            if (this.test == "true") {
                console.log("request type >>> local");
                const testData = require('./testResponse.json');
                const filteredTestData = testData.map(entry => new GEODATA_TYPE(entry));
                return { data: filteredTestData }; 
            } else {
                console.log("request type >>> remote");
                const request = this.buildRequest();
                const response = await axios(request);
                const filteredLocationData = response.data.map(entry => new GEODATA_TYPE(entry));
                return { data: filteredLocationData };
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Handler;