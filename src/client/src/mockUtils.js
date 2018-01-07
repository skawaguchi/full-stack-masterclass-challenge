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
