import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import ProductListContainer from './ProductListContainer';
import AppHeader from './AppHeader';
import ProductList from './ProductList';

import './Home.css';

@inject('productListStore')
@observer
class Home extends Component {
    render() {
        return (
            <ProductListContainer>
                <AppHeader/>
                <section className="home">
                    <ProductList
                        productListItems={this.props.productListStore.displayedProductList}
                    />
                </section>
            </ProductListContainer>
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
