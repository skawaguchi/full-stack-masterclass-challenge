import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';

import { Stores } from '../stores/index';

function ProductListProvider(props) {
    return (
        <Provider productListStore={ Stores.productListStore }>
            { props.children }
        </Provider>
    );
}

ProductListProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProductListProvider;
