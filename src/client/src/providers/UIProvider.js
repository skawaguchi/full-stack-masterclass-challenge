import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';

import { Stores } from '../stores/index';

function UIProvider(props) {
    return (
        <Provider uiStore={ Stores.uiStore }>
            { props.children }
        </Provider>
    );
}

UIProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default UIProvider;
