import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import HelloWorld from './components/HelloWord/HelloWorld';

render(<HelloWorld />, document.getElementById('root'));
