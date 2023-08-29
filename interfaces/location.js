class GeoData {
    constructor(ocmLocation) {
        if (ocmLocation !== null) {
            this.type = 'Point';
            this.geometry = new GeoGeometry(ocmLocation['AddressInfo']);
            this.properties = new Location(ocmLocation);
        }
    }
}

class GeoGeometry {
    constructor(addressInfo) {
        if (addressInfo !== null) {
            this.type = 'Point';
            this.coordinates = [addressInfo['Longitude'], addressInfo['Latitude']];
        }
    }
}

class Location {
    constructor(ocmLocation) {
        if (ocmLocation !== null) {
            this.id = ocmLocation['ID'];
            this.status = new LocationStatus(ocmLocation['StatusType']);
            this.connections = ocmLocation['Connections'].map((connection) => { return new LocationConnection(connection); });
            this.address = new LocationAddress(ocmLocation['AddressInfo']);
            this.operator = new LocationOperator(ocmLocation['OperatorInfo']);
        }
    }
}

class LocationStatus {
    constructor(status) {
        if (status !== null) {
            this.id = status['ID'];
            this.operational = status['IsOperational'] == 1 ? true : false;
            this.selectable = status['IsUserSelectable'];
        }
    }
}

class LocationConnection {
    constructor(connection) {
        if (connection !== null) {
            this.id = connection['ID'];
            this.type = new LocationConnectionType(connection['ConnectionType']);
            this.status = new LocationConnectionStatus(connection['StatusType']);
            this.power = connection['PowerKW'];
        }
    }
}

class LocationConnectionType {
    constructor(connectionType) {
        if (connectionType !== null) {
            this.id = connectionType['ID'];
            this.title = connectionType['Title'];
            this.titleOfficial = connectionType['FormalName'];
        }
    }
}

class LocationConnectionStatus {
    constructor(statusType) {
        if (statusType !== null) {
            this.operational = statusType['IsOperational'] == 1 ? true : false;
            this.selectable = statusType['IsUserSelectable'] == 1 ? true : false;
        } else {
            this.operational = false;
            this.selectable = false;
        }
    }
}

class LocationAddress {
    constructor(address) {
        if (address !== null) {
            this.id = address['ID'];
            this.title = address['Title'];
            this.street = address['AddressLine1'];
            this.city = address['Town'];
            this.postcode = address['Postcode'];
            this.country = address['Country']['Title'];
            this.lat = address['Latitude'];
            this.lng = address['Longitude'];
        }
    }
}

class LocationOperator {
    constructor(operator) {
        if (operator !== null) {
            this.website = operator['WebsiteURL'] !== null ? operator['WebsiteURL'] : "undefined";
            this.id = operator['ID'];
            this.title = operator['Title'];
            this.phonePrimary = operator['PhonePrimaryContact'] !== null ? operator['PhonePrimaryContact'] : 'undefined';
            this.phoneSecondary = operator['PhoneSecondaryContact'] !== null ? operator['PhoneSecondaryContact'] : 'undefined';
        }
    }
}

module.exports = GeoData;