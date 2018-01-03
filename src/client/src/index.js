import React from 'react';
import ReactDOM from 'react-dom';

import AppProvider from './views/AppProvider';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <AppProvider/>,
    document.getElementById('root')
);
registerServiceWorker();
