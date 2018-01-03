import React from 'react';

import MainNav from './MainNav';

import './AppHeader.css';

function AppHeader() {
    return (
        <header className="app-header">
            <img
                alt="Beau's Logo"
                className="logo"
                src="/beaus-black-logo.svg"
            />
            <MainNav/>
        </header>
    );
}

export default AppHeader;
