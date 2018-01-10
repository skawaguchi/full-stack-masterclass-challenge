import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';

@inject('productListStore')
@observer
class ProductListContainer extends Component {
    componentDidMount() {
        if (this.props.productListStore.productList.length === 0) {
            this.props.productListStore.fetchProducts();
        }
    }

    render() {
        const hasProducts = this.props.productListStore.productList.length > 0;

        return (
            hasProducts ? this.props.children : <Loader/>
        );
    }
}

ProductListContainer.propTypes = {
    children: PropTypes.node.isRequired,
    productListStore: PropTypes.shape({
        fetchProducts: PropTypes.func.isRequired,
        productList: PropTypes.object
    })
};

export default ProductListContainer;
