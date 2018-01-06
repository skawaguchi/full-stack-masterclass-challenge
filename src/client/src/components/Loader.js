import React from 'react';

import './Loader.css';

function Loader() {
    return (
        <div className='loader'>
            <img
                alt='Loading...'
                src={ '/loading.gif' }
            />
            <span>{'Loading...'}</span>
        </div>
    );
}

export default Loader;
