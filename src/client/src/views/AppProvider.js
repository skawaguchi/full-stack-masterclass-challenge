import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import App from './App';

import ProductListProvider from './ProductListProvider';

function RouterProvider() {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
                <ProductListProvider>
                    <App/>
                </ProductListProvider>
            </IntlProvider>
        </BrowserRouter>
    );
}

export default RouterProvider;
