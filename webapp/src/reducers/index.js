import account from './accountReducer';
import app from './appReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  account,
  app,
});
