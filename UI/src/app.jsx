import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

import './css/site.css'; // your custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';

{/*Using HashRouter and wrapping the main page around the router*/ }
const element = (
    <Router>
        <Page />
    </Router>
);

const root = createRoot(document.getElementById('contents'));
root.render(element);