import React, { Component } from 'react';
import Chance from 'chance';

const chance = new Chance();

export function getProduct(overrides) {
    return {
        description: null,
        id: chance.hash(),
        image_url: chance.url({
            extensions: ['png']
        }),
        image_thumb_url: chance.url({
            extensions: ['png']
        }),
        name: chance.sentence(),
        primary_category: chance.word(),
        price_in_cents: chance.natural(),
        producer_name: chance.hash(),
        product_number: chance.hash(),
        secondary_category: chance.word(),
        tertiary_category: chance.word(),
        varietal: chance.word(),
        ...overrides
    };
}

export function getProductListItem(overrides) {
    return {
        id: chance.hash(),
        image_url: chance.url({
            extensions: ['png']
        }),
        image_thumb_url: chance.url({
            extensions: ['png']
        }),
        name: chance.sentence(),
        product_number: chance.hash(),
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
