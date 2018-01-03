import React from 'react';

import { Link } from 'react-router-dom';

import './MainNav.css';

function MainNav() {
    return (
        <nav className="main-nav">
            <Link to='/'>{'Seasonal Beverages'}</Link>
        </nav>
    );
}
export default MainNav;
