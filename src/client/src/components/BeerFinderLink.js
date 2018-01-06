import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/fontawesome-free-solid';

import './BeerFinderLink.css';

function BeerFinderLink(props) {
    return (
        <Link
            className='beer-finder-link'
            to={ `/product/${props.productNumber}/beer-finder` }
        >
            <FontAwesomeIcon icon={ faMapMarker }/>
        </Link>
    );
}

BeerFinderLink.propTypes = {
    productNumber: PropTypes.string.isRequired
};

export default BeerFinderLink;
