import Home from './container/Home';
import ReactDOM from 'react-dom';
import React from 'react';
// import { Helmet } from 'react-helmet';
import 'normalize.css';
import './style.scss';

ReactDOM.render(
    <React.StrictMode>
        {/* <Helmet>
            <title>{window.localStorage.Myname}</title>
        </Helmet> */}
        <Home />
    </React.StrictMode>,
    document.getElementById('root')
);
