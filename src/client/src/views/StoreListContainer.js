import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';

@inject('storeListStore')
@observer
class StoreListContainer extends Component {
    componentDidMount() {
        const { postalCode } = this.props.storeListStore;

        this.props.storeListStore.fetchStores(this.props.productId, postalCode);
    }

    render() {
        const hasStores = this.props.storeListStore.storeList !== null;

        return (
            hasStores ? this.props.children : <Loader/>
        );
    }
}

StoreListContainer.propTypes = {
    children: PropTypes.node.isRequired,
    productId: PropTypes.string.isRequired,
    storeListStore: PropTypes.shape({
        fetchStores: PropTypes.func.isRequired
    })
};

export default StoreListContainer;
