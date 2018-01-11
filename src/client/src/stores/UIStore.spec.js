import sinon from 'sinon';

import UIStore from './UIStore';

const sandbox = sinon.sandbox.create();

describe('UIStore', () => {
    let store;

    function makeStore() {
        store = new UIStore();
    }

    beforeEach(() => {
        makeStore();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the store has initialized', () => {
        it('should default the app history to null', () => {
            expect(store.appHistory).toEqual(null);
        });

        it('should set the app history', () => {
            const expectedHistory = {};

            store.appHistory = {};

            expect(store.appHistory).toEqual(expectedHistory);
        });
    });

    describe('Given the store has a history', () => {
        let historyMock;

        beforeEach(() => {
            historyMock = {
                push: sandbox.stub()
            };

            store.appHistory = historyMock;
        });

        it('should push a location to the app history', () => {
            const newLocation = {
                pathname: '/some/path'
            };

            store.pushLocation(newLocation);

            sinon.assert.calledOnce(historyMock.push);
            sinon.assert.calledWithExactly(historyMock.push, newLocation);
        });
    });
});
