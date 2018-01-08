import {
    action,
    observable
} from 'mobx';

import { getStores } from '../repositories/Stores';
import { getGeo } from '../repositories/Geo';

const postalCodeRegEx = /([A-Z]\d[A-Z] ?\d[A-Z]\d)|(^[A-Z]\d[A-Z]$)/;
const maximumCharacterLength = 6;
const whiteSpaceRegex = /\s/g;

function isValidPostalCode(postalCode) {
    const upperCased = postalCode.toUpperCase();
    const noWhiteSpace = postalCode.replace(whiteSpaceRegex, '');

    return upperCased.match(postalCodeRegEx) !== null &&
        noWhiteSpace.length <= maximumCharacterLength;
}

class StoreListStore {
    @observable storeList = null;
    @observable postalCode = null;

    @action
    setStores(newStores) {
        this.storeList = newStores.map((store) => ({
            addressLine1: store.address_line_1,
            addressLine2: store.address_line_2,
            city: store.city,
            distance: store.distance_in_meters / 1000,
            fax: store.fax,
            hasBeerColdRoom: store.has_beer_cold_room,
            hasParking: store.has_parking,
            hasTransitAccess: store.has_transit_access,
            hasWheelchairAccess: store.has_wheelchair_accessability,
            id: store.id.toString(),
            postalCode: store.postal_code,
            quantity: store.quantity,
            telephone: store.telephone,
            sunday: { close: store.sunday_close, open: store.sunday_open },
            monday: { close: store.monday_close, open: store.monday_open },
            tuesday: { close: store.tuesday_close, open: store.tuesday_open },
            wednesday: { close: store.wednesday_close, open: store.wednesday_open },
            thursday: { close: store.thursday_close, open: store.thursday_open },
            friday: { close: store.friday_close, open: store.friday_open },
            saturday: { close: store.saturday_close, open: store.saturday_open }
        }));
    }

    @action
    async fetchStores(productId, postalCode) {
        try {
            const stores = await getStores(productId, postalCode);

            this.setStores(stores.data.result);
        } catch (err) {
            throw new Error(err);
        }
    }

    @action
    async refreshStores(productId, postalCode) {
        this.postalCode = postalCode;

        if (isValidPostalCode(postalCode)) {
            return this.fetchStores(productId, postalCode);
        }

        return null;
    }

    @action async fetchGeo() {
        try {
            const geo = await getGeo();

            this.postalCode = geo.data.zip_code;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default StoreListStore;
