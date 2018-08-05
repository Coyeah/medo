import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/';
import Router from './common/router';

const middleware = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

// console.log(store.getState());

render(
  <Provider store={store}>
    <Router />
  </Provider>
, document.getElementById('root'));
