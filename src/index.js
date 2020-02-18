import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let isTrainer = false;

ReactDOM.render(<App isTrainer={isTrainer} />, document.getElementById('root'));
