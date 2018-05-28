// configureStore.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const buildStore = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = buildStore(rootReducer, initialState);
  return store;
}