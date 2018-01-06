import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import ProductList from './ProductList';

import AppHeader from './AppHeader';

@inject('productListStore')
@observer
class Home extends Component {
    componentDidMount() {
        this.props.productListStore.fetchProducts();
    }

    render() {
        return (
            <section className="home">
                <AppHeader/>
                <ProductList
                    productListItems={this.props.productListStore.displayedProductList}
                />
            </section>
        );
    }
}

Home.wrappedComponent.propTypes = {
    productListStore: PropTypes.shape({
        fetchProducts: PropTypes.func.isRequired,
        displayedProductList: PropTypes.arrayOf(PropTypes.object)
    })
};

export default Home;
