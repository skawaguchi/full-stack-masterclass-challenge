import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

import ProductListProvider from './ProductListProvider';

function RouterProvider() {
    return (
        <BrowserRouter>
            <ProductListProvider>
                <AppContainer/>
            </ProductListProvider>
        </BrowserRouter>
    );
}

export default RouterProvider;
