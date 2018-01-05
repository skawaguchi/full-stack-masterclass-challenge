import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject } from 'mobx-react';

@inject('productListStore') class Home extends Component {
    componentDidMount() {
        this.props.productListStore.fetchProducts();
    }

    render() {
        return (
            <section className="home">
            </section>
        );
    }
}

Home.wrappedComponent.propTypes = {
    productListStore: PropTypes.shape({
        fetchProducts: PropTypes.func.isRequired
    })
};

export default Home;
