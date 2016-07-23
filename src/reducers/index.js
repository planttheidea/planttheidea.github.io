// external dependencies
import {
  combineReducers
} from 'redux';

// menu
import menuReducer from './menuReducer';

const appReducer = combineReducers({
  menu: menuReducer
});

export default appReducer;
