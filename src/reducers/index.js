import { combineReducers } from 'redux';
import jobsReducer from './jobs';
import filterReducer from './filter';

const rootReducer = combineReducers({
  jobs: jobsReducer,
  filter: filterReducer,
});

export default rootReducer;
