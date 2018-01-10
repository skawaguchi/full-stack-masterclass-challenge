import React from 'react';

import './AppHeader.css';

function AppHeader() {
    return (
        <header className="app-header">
            <h1>{'Beau\'s Seasonal Selections'}</h1>
            <div className="logo-container">
                <img
                    alt="Beau's Logo"
                    className="logo"
                    src="/beaus-beige-logo.svg"
                />
            </div>
        </header>
    );
}

export default AppHeader;
