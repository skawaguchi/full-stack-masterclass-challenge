import React from 'react';
import { HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import App from '../views/App';

import ProductListProvider from './ProductListProvider';
import StoreListProvider from './StoreListProvider';
import UIProvider from './UIProvider';
import { HistoryStoreProviderWithRouter } from './HistoryStoreProvider';

function RouterProvider() {
    return (
        <IntlProvider locale="en">
            <HashRouter>
                <ProductListProvider>
                    <StoreListProvider>
                        <UIProvider>
                            <HistoryStoreProviderWithRouter>
                                <App/>
                            </HistoryStoreProviderWithRouter>
                        </UIProvider>
                    </StoreListProvider>
                </ProductListProvider>
            </HashRouter>
        </IntlProvider>

    );
}

export default RouterProvider;
