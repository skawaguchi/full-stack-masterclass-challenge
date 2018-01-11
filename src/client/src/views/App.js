import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './Home';
import ProductDetails from './ProductDetails';
import BeerFinder from './BeerFinder';
import Error from './Error';

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
                    component={ Error }
                    path="*"
                />
            </Switch>
        </main>
    );
}

export default App;
