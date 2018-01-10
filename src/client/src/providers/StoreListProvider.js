import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';

import { Stores } from '../stores/index';

function StoreListProvider(props) {
    return (
        <Provider storeListStore={ Stores.storeListStore }>
            { props.children }
        </Provider>
    );
}

StoreListProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default StoreListProvider;
