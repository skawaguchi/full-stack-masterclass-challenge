import sinon from 'sinon';

import StoreListStore from './StoreListStore';

import { getStore } from '../mockUtils';
import * as storesRepository from '../repositories/Stores';
import * as geoRepository from '../repositories/Geo';

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
        let getGeoStub;
        let adaptedStore;
        let originalStore;

        function setupStoreMock(overrides) {
            storeListMockData = overrides || [
                getStore(),
                getStore(),
                getStore()
            ];

            store.setStores(storeListMockData);

            /* eslint-disable prefer-destructuring */
            adaptedStore = store.storeList[0];
            originalStore = storeListMockData[0];
            /* eslint-enable */
        }

        beforeEach(() => {
            getStoresStub = sandbox.stub(storesRepository, 'getStores');
            getGeoStub = sandbox.stub(geoRepository, 'getGeo');
        });

        describe('Given any store data', () => {
            beforeEach(() => {
                setupStoreMock();
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

        it('should return the list of stores sorted by distance', () => {
            setupStoreMock([
                getStore({ distance_in_meters: 1000, id: 'first' }),
                getStore({ distance_in_meters: 10, id: 'second' }),
                getStore({ distance_in_meters: 100, id: 'third' })
            ]);

            const sortedList = store.getStoresByDistance();

            expect(sortedList[0].id).toEqual('second');
            expect(sortedList[1].id).toEqual('third');
            expect(sortedList[2].id).toEqual('first');
        });

        describe('when fetching the postal code is successful', () => {
            it('should update the store with the fetched postal code', async () => {
                const postalCodeMock = 'some postal code';
                const expectedResults = {
                    data: {
                        zip_code: postalCodeMock
                    }
                };

                getGeoStub.returns(Promise.resolve(expectedResults));

                await store.fetchGeo();

                expect(store.postalCode).toEqual(postalCodeMock);
            });
        });

        describe('When fetching the postal code fails', () => {
            it('should throw an error', async () => {
                expect.assertions(1);

                const expectedError = 'some error';

                getGeoStub
                    .returns(Promise.reject(expectedError));

                try {
                    await store.fetchGeo();
                } catch (err) {
                    expect(err).toEqual(new Error(expectedError));
                }
            });
        });
    });
});
