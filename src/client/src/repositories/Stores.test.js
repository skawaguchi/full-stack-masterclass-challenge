import sinon from 'sinon';
import axios from 'axios';

import * as storesRepo from './Stores';

import { repoKey } from './repoKey';

import { getStore } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('Stores repository', () => {
    let getStub;

    beforeEach(() => {
        getStub = sandbox.stub(axios, 'get');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call the list of stores that has a specific product', () => {
        const postalCode = 'some code';
        const productId = 'someId';
        const repoUrl = 'http://lcboapi.com/stores';
        const expectedOptions = {
            headers: {
                Authorization: `token ${repoKey}`
            },
            params: {
                geo: postalCode,
                order: 'distance_in_meters',
                per_page: 100,
                product_id: productId
            }
        };

        const responseMockData = [
            getStore()
        ];

        getStub.returns(Promise.resolve(responseMockData));

        storesRepo.getStores(productId, postalCode);

        sinon.assert.calledOnce(getStub);
        sinon.assert.calledWithExactly(getStub, repoUrl, expectedOptions);
    });
});
