import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import App from './App';

import ProductListProvider from './ProductListProvider';

function RouterProvider() {
    return (
        <IntlProvider locale="en">
            <BrowserRouter>
                <ProductListProvider>
                    <App/>
                </ProductListProvider>
            </BrowserRouter>
        </IntlProvider>

    );
}

export default RouterProvider;
