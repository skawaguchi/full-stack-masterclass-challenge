import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './Home';
import ProductDetails from './ProductDetails';
import BeerFinder from './BeerFinder';
import NotFound from './NotFound';

import './App.css';

function App() {
    return (
        <main className="app">
            <Switch>
                <Route
                    component={ Home }
                    exact
                    path="/"
                />
                <Route
                    component={ ProductDetails }
                    exact
                    path="/product/:productId"
                />
                <Route
                    component={ BeerFinder }
                    exact
                    path="/product/:productId/beer-finder"
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
