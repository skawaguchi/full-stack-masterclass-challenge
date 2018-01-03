import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

function RouterProvider() {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}

export default RouterProvider;
