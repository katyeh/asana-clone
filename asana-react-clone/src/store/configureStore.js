import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
// import movies from './movies';
import project from './reducers/project';
import authentication from './actions/authentication';
import ui from './reducers/ui';
import currentProject from './reducers/current-proj';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  // TODO: Add Reducers here
  authentication,
  project,
  currentProject,
  ui,
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
