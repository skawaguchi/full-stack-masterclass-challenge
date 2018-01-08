import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';

@inject('storeListStore')
@observer
class PostalCodeContainer extends Component {
    componentDidMount() {
        if (!this.props.storeListStore.postalCode) {
            this.props.storeListStore.fetchGeo();
        }
    }

    render() {
        const hasPostalCode = this.props.storeListStore.postalCode !== null;

        return (
            hasPostalCode ? this.props.children : <Loader/>
        );
    }
}

PostalCodeContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export default PostalCodeContainer;
