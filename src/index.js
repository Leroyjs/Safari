import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let isTrainer = true;
let isAdmin = true;
const whoIsIt = 'isClient';

ReactDOM.render(<App whoIsIt={whoIsIt} />, document.getElementById('root'));
