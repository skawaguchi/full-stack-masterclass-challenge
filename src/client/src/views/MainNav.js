import React from 'react';

import { Link } from 'react-router-dom';

function MainNav() {
    return (
        <nav className="main-nav">
            <Link to='/'>{'Home'}</Link>
        </nav>
    );
}
export default MainNav;
