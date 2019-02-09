/* eslint-disable rapid7/no-trailing-underscore */

// external dependencies
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import reduxThunk from 'redux-thunk';

// reducers
import repositories from 'reducers/repositoriesReducer';
import repository from 'reducers/repositoryReducer';
import userProfile from 'reducers/userProfileReducer';

const reducers = combineReducers({
  repositories,
  repository,
  userProfile,
});

const middleware = applyMiddleware(reduxThunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: 'github-io'})
  : compose;

const store = createStore(reducers, composeEnhancers(middleware));

export default store;
