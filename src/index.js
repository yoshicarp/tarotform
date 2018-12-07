import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

ReactDOM.render(<App title="Tarotform" card_count="3"/>, document.getElementById('app'));

if(module.hot) {
	module.hot.accept();
}
