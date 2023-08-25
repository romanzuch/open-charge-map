interface GeoData {
    type: string;
    geometry: GeoGeometry;
    properties: Location;
}

interface GeoGeometry {
    type: string;
    coordinates: Array<number>;
}

interface Location {
    id: number;
    status: LocationStatus;
    connections: LocationConnection[];
    address: LocationAddress;
    operator: LocationOperator;
    // ... other location properties
}

interface LocationStatus {
    operational: boolean | null;
    selectable: boolean;
    id: number;
}

interface LocationConnection {
    id: number;
    type: {
        titleOfficial: string;
        id: number;
        title: string;
    };
    status: {
        operational: boolean;
        selectable: boolean;
    };
    power: number;
}

interface LocationAddress {
    id: number;
    title: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
    lat: number;
    lng: number;
    // ... other address properties
}

interface LocationOperator {
    id: number;
    title: string;
    website: string;
    contact: string | undefined;
    // ... other operator properties
}

export default GeoData;
export {
    GeoGeometry,
    Location,
    LocationStatus,
    LocationConnection,
    LocationAddress,
    LocationOperator
}