import { combineReducers } from 'redux';

import global from './global';
import task from './task';

const rootReducer = combineReducers({
  global,
  task,
});

export default rootReducer;
