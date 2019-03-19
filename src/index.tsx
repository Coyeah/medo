if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  // require('../mock/example.js');
}

import React from 'react';
import {render} from 'react-dom';
import App from './page/Home';

render(
  <App />,
  document.getElementById('root')
);
