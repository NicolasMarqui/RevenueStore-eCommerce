import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'leaflet/dist/leaflet.css';

import Routing from './router/Routering';

ReactDOM.render(<Routing />, document.getElementById('root'));
serviceWorker.unregister();
