import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import HelloWorld from './components/HelloWord/HelloWorld';

// if (module.hot) {
//   module.hot.accept(() => {
//     render(<HelloWorld />, document.getElementById('root'));
//   })
// }

render(<HelloWorld />, document.getElementById('root'));
