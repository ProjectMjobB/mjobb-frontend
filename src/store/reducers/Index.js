import todoReducers from './Reducers';
import AuthReducer from './AuthReducer';
import CategoryReducer from './Reducers';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  todoReducers,
  AuthReducer,
  CategoryReducer,
});

export default rootReducers;
