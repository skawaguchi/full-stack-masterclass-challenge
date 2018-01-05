import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';

import { Stores } from '../stores/index';

function RouterProvider(props) {
    return (
        <Provider productList={ Stores.productList }>
            { props.children }
        </Provider>
    );
}

RouterProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default RouterProvider;
