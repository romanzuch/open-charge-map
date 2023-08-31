interface Location {
    type: string;
    geometry: LocationGeometry;
    properties: LocationProperties;
}

interface LocationGeometry {
    type: string;
    coordinates: number[];
}

interface LocationProperties {
    id: number;
    status: LocationStatus;
    connections: LocationConnections[];
    address: LocationAddress;
    operator: LocationOperator;
}

interface LocationStatus {
    id: number;
    operational: boolean;
    selectable: boolean;
}

interface LocationConnections {
    id: number;
    type: LocationConnectionType;
    status: LocationConnectionStatus;
    power: number;
}

interface LocationConnectionType {
    id: number;
    title: string;
    titleOfficial: string;
}

interface LocationConnectionStatus {
    operational: boolean;
    selectable: boolean;
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
}

interface LocationOperator {
    id: number;
    website: string;
    title: string;
    phonePrimary: string;
    phoneSecondary: string;
}