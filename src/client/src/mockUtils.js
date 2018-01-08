import React, { Component } from 'react';
import Chance from 'chance';

const chance = new Chance();

export function getProduct(overrides) {
    return {
        description: null,
        id: chance.natural(),
        image_url: chance.url({
            extensions: ['png']
        }),
        image_thumb_url: chance.url({
            extensions: ['png']
        }),
        name: chance.sentence(),
        package: chance.word(),
        primary_category: chance.word(),
        price_in_cents: chance.natural(),
        producer_name: chance.hash(),
        secondary_category: chance.word(),
        style: chance.sentence(),
        tasting_note: chance.sentence(),
        tertiary_category: chance.word(),
        varietal: chance.word(),
        ...overrides
    };
}

export function getAdaptedProduct(overrides) {
    return {
        description: null,
        id: chance.sentence(),
        imageUrl: chance.url({
            extensions: ['png']
        }),
        imageThumbUrl: chance.url({
            extensions: ['png']
        }),
        name: chance.sentence(),
        price: chance.natural(),
        productPackage: chance.word(),
        style: chance.sentence(),
        tastingNote: chance.sentence(),
        varietal: chance.word(),
        ...overrides
    };
}

export function getProductListItem(overrides) {
    return {
        id: chance.hash(),
        imagePath: chance.url({
            extensions: ['png']
        }),
        imageThumbPath: chance.url({
            extensions: ['png']
        }),
        name: chance.sentence(),
        ...overrides
    };
}

export function getStore(overrides) {
    return {
        address_line_1: chance.sentence(),
        address_line_2: chance.sentence(),
        city: chance.city(),
        distance_in_meters: chance.natural,
        fax: chance.phone(),
        has_beer_cold_room: chance.bool(),
        has_parking: chance.bool(),
        has_transit_access: chance.bool(),
        has_wheelchair_accessability: chance.bool(),
        id: chance.natural(),
        postal_code: chance.postal(),
        quantity: chance.natural(),
        telephone: chance.phone(),
        sunday_open: chance.natural({ min: 0, max: 1440}),
        sunday_close: chance.natural({ min: 0, max: 1440}),
        monday_open: chance.natural({ min: 0, max: 1440}),
        monday_close: chance.natural({ min: 0, max: 1440}),
        tuesday_open: chance.natural({ min: 0, max: 1440}),
        tuesday_close: chance.natural({ min: 0, max: 1440}),
        wednesday_open: chance.natural({ min: 0, max: 1440}),
        wednesday_close: chance.natural({ min: 0, max: 1440}),
        thursday_open: chance.natural({ min: 0, max: 1440}),
        thursday_close: chance.natural({ min: 0, max: 1440}),
        friday_open: chance.natural({ min: 0, max: 1440}),
        friday_close: chance.natural({ min: 0, max: 1440}),
        saturday_open: chance.natural({ min: 0, max: 1440}),
        saturday_close: chance.natural({ min: 0, max: 1440}),
        ...overrides
    };
}

class MockReactClass extends Component {
    render() {
        return (
            <div/>
        );
    }
}

export function getMockReactClass() {
    return MockReactClass;
}
