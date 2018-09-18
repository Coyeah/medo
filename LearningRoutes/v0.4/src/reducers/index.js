// index.js

import { combineReducers } from 'redux';
import todoState from './todoState';

const rootReducer = combineReducers({
  todoState,
});

export default rootReducer;