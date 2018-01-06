import React from 'react';

import AppContainer from './AppContainer';
import CloseLink from '../components/CloseLink';

function BeerFinder() {
    return (
        <AppContainer>
            <section className="beer-finder">
                <CloseLink/>
            </section>
        </AppContainer>
    );
}
export default BeerFinder;
