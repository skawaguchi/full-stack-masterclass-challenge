import sinon from 'sinon';
import axios from 'axios';

import * as productsRepo from './Products';

import { getProduct } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('Products respository', () => {
    let getStub;

    beforeEach(() => {
        getStub = sandbox.stub(axios, 'get');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call the list of products', () => {
        const repoUrl = 'http://lcboapi.com/products';
        const params = {
            q: 'beau\'s',
            where: 'is_seasonal',
            where_not: 'is_dead'
        };

        const responseMockData = [
            getProduct()
        ];

        getStub.returns(Promise.resolve(responseMockData));

        productsRepo.getProducts();

        sinon.assert.calledOnce(getStub);
        sinon.assert.calledWithExactly(getStub, repoUrl, params);
    });
});
