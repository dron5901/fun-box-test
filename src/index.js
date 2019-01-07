import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapApp from './MapApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MapApp />, document.getElementById('root'));

serviceWorker.unregister();
