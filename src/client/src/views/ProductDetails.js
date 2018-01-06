import React from 'react';

import AppContainer from './AppContainer';
import CloseLink from '../components/CloseLink';

function ProductDetails() {
    return (
        <AppContainer>
            <section className="product-details">
                <CloseLink/>
            </section>
        </AppContainer>
    );
}
export default ProductDetails;
