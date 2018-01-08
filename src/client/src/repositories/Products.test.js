import sinon from 'sinon';
import axios from 'axios';

import * as productsRepo from './Products';

import { getProduct } from '../mockUtils';

import { repoKey } from './repoKey';

const sandbox = sinon.sandbox.create();

describe('Products repository', () => {
    let getStub;

    beforeEach(() => {
        getStub = sandbox.stub(axios, 'get');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call the list of products', () => {
        const repoUrl = 'http://lcboapi.com/products';
        const expectedOptions = {
            headers: {
                Authorization: `token ${repoKey}`
            },
            params: {
                per_page: 100,
                q: 'beaus',
                where: 'is_seasonal',
                where_not: 'is_dead'
            }
        };

        const responseMockData = [
            getProduct()
        ];

        getStub.returns(Promise.resolve(responseMockData));

        productsRepo.getProducts();

        sinon.assert.calledOnce(getStub);
        sinon.assert.calledWithExactly(getStub, repoUrl, expectedOptions);
    });
});
