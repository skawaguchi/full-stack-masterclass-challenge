import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import AppContainer from './AppContainer';
import AppHeader from './AppHeader';
import ProductList from './ProductList';

@inject('productListStore')
@observer
class Home extends Component {
    render() {
        return (
            <AppContainer>
                <section className="home">
                    <AppHeader/>
                    <ProductList
                        productListItems={this.props.productListStore.displayedProductList}
                    />
                </section>
            </AppContainer>
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
