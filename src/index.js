import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combinReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './router';

import rootReducer from './reducers';

const middleware = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

render(
  <Provider store={store}>
    < App / >
  </Provider>
, document.getElementById('root'));
