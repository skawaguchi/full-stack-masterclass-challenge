import sinon from 'sinon';

import StoreListStore from './StoreListStore';

import { getStore } from '../mockUtils';
import * as storesRepository from '../repositories/Stores';

const sandbox = sinon.sandbox.create();

describe('StoreListStore', () => {
    let store;

    function makeStore() {
        store = new StoreListStore();
    }

    beforeEach(() => {
        makeStore();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Initialization', () => {
        it('should default the product list to empty', () => {
            expect(store.storeList).toHaveLength(0);
        });
    });

    describe('Fetching and adapting data', () => {
        let storeListMockData;
        let getStoresStub;
        let adaptedStore;
        let originalStore;

        beforeEach(() => {
            getStoresStub = sandbox.stub(storesRepository, 'getStores');

            storeListMockData = [
                getStore()
            ];

            store.setStores(storeListMockData);

            /* eslint-disable prefer-destructuring */
            adaptedStore = store.storeList[0];
            originalStore = storeListMockData[0];
            /* eslint-enable */
        });

        it('should fetch the stores', () => {
            const productId = 'someId';

            getStoresStub.returns(Promise.resolve({
                data: {
                    result: [
                        getStore()
                    ]
                }
            }));

            store.fetchStores(productId);

            sinon.assert.calledOnce(getStoresStub);
            sinon.assert.calledWithExactly(getStoresStub, productId);
        });

        describe('when fetching the stores is successful', () => {
            it('should update the store with the fetched stores', async () => {
                const storeMock = getStore();
                const expectedResults = {
                    data: {
                        result: [
                            storeMock
                        ]
                    }
                };

                getStoresStub.returns(Promise.resolve(expectedResults));

                await store.fetchStores();

                expect(store.storeList).toHaveLength(expectedResults.data.result.length);
            });
        });

        it('should set the store list and adapt the necessary values', () => {
            expect(store.storeList).toHaveLength(storeListMockData.length);
        });

        it('should adapt the location values', () => {
            expect(adaptedStore.addressLine1).toEqual(originalStore.address_line_1);
            expect(adaptedStore.addressLine2).toEqual(originalStore.address_line_2);
            expect(adaptedStore.city).toEqual(originalStore.city);
            expect(adaptedStore.distance).toEqual(originalStore.distance_in_meters / 1000);
            expect(adaptedStore.postalCode).toEqual(originalStore.postal_code);
        });

        it('should adapt the store values', () => {
            expect(adaptedStore.hasBeerColdRoom).toEqual(originalStore.has_beer_cold_room);
            expect(adaptedStore.hasParking).toEqual(originalStore.has_parking);
            expect(adaptedStore.hasTransitAccess).toEqual(originalStore.has_transit_access);
            expect(adaptedStore.hasWheelchairAccess).toEqual(originalStore.has_wheelchair_accessability);
            expect(adaptedStore.id).toEqual(originalStore.id.toString());
        });

        it('should adapt the inventory values', () => {
            expect(adaptedStore.quantity).toEqual(originalStore.quantity);
        });

        it('should adapt the contact values', () => {
            expect(adaptedStore.fax).toEqual(originalStore.fax);
            expect(adaptedStore.telephone).toEqual(originalStore.telephone);
        });

        it('should adapt the hours of operation values', () => {
            const expectedDays = [
                'monday',
                'friday',
                'saturday',
                'sunday',
                'tuesday',
                'thursday',
                'wednesday'
            ];

            expectedDays.forEach((day) => {
                expect(adaptedStore[day]).toEqual({
                    close: originalStore[`${day}_close`],
                    open: originalStore[`${day}_open`]
                });
            });
        });

        describe('When fetching the stores fails', () => {
            it('should throw an error', async () => {
                expect.assertions(1);

                const expectedError = 'some error';

                getStoresStub
                    .returns(Promise.reject(expectedError));

                try {
                    await store.fetchStores();
                } catch (err) {
                    expect(err).toEqual(new Error(expectedError));
                }
            });
        });
    });
});
