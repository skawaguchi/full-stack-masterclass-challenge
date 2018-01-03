import Chance from 'chance';

const chance = new Chance();

export function getProduct() {
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
        varietal: chance.word()
    };
}
