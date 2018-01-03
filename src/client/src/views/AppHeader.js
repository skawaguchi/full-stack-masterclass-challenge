import React from 'react';
import PropTypes from 'prop-types';

function App(props) {
    const homeClickHandler = () => {
        props.onHomeClicked();
    };

    return (
        <header className="app-header">
            <a className='home-link' onClick={homeClickHandler}>{'Home'}</a>
        </header>
    );
}

App.propTypes = {
    onHomeClicked: PropTypes.func.isRequired
};

export default App;
