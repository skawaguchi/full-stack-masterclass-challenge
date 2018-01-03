import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppHeader from './AppHeader';
import Home from './Home';
import ProductDetails from './ProductDetails';
import NotFound from './NotFound';

import './App.css';

function App() {
    return (
        <main className="app">
            <AppHeader/>
            <Switch>
                <Route
                    component={ Home }
                    exact
                    path="/"
                />
                <Route
                    component={ ProductDetails }
                    path="/product/:productId"
                />
                <Route
                    component={ NotFound }
                    path="*"
                />
            </Switch>
        </main>
    );
}

export default App;
