// external dependencies
import {
  createStore
} from 'redux';

// reducers
import appReducer from './reducers/index';

const store = createStore(appReducer);

export default store;
