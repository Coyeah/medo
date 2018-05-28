import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
// import configureStore from './configureStore';

import { createStore } from 'redux';
import rootReducer from './reducers';

// const store = configureStore();
const store = createStore(rootReducer);
console.log(store.getState());

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Main />, document.getElementById('root'));