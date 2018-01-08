import sinon from 'sinon';
import axios from 'axios';

import * as geoRepo from './Geo';

import { getGeo } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('Geo repository', () => {
    let getStub;

    beforeEach(() => {
        getStub = sandbox.stub(axios, 'get');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call the list of products', () => {
        const repoUrl = 'https://freegeoip.net/json/';

        const responseMockData = [
            getGeo()
        ];

        getStub.returns(Promise.resolve(responseMockData));

        geoRepo.getGeo();

        sinon.assert.calledOnce(getStub);
        sinon.assert.calledWithExactly(getStub, repoUrl);
    });
});
