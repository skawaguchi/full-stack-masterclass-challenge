import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

import './CloseLink.css';

function CloseLink() {
    return (
        <Link
            className='close-link'
            to={ '/' }
        >
            <FontAwesomeIcon icon={ faTimes }/>
        </Link>
    );
}

export default CloseLink;
