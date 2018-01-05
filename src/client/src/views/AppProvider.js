import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import ProductListProvider from './ProductListProvider';

function RouterProvider() {
    return (
        <BrowserRouter>
            <ProductListProvider>
                <App/>
            </ProductListProvider>
        </BrowserRouter>
    );
}

export default RouterProvider;
