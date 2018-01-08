import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';

@inject('storeListStore')
@observer
class StoreListContainer extends Component {
    componentDidMount() {
        this.props.storeListStore.fetchStores(this.props.productId);
    }

    render() {
        const hasStores = this.props.storeListStore.storeList.length > 0;

        return (
            hasStores ? this.props.children : <Loader/>
        );
    }
}

StoreListContainer.propTypes = {
    children: PropTypes.node.isRequired,
    productId: PropTypes.string.isRequired
};

export default StoreListContainer;
