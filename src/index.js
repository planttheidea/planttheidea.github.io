// external dependencies
import {
  createHashHistory
} from 'history';
import React from 'react';
import {
  render
} from 'react-dom';
import {
  Provider
} from 'react-redux';
import {
  IndexRoute,
  Route,
  Router,
  useRouterHistory
} from 'react-router';

// components
import App from './App';

// routes
import {
  routes
} from './constants/routes';

// store
import store from './store';

const HISTORY = useRouterHistory(createHashHistory)({
  queryKey: false
});

let div = document.querySelector('#app-container');

if (!div) {
  div = document.createElement('div');

  div.id = 'app-container';

  document.body.appendChild(div);
}

render((
  <Provider store={store}>
    <Router history={HISTORY}>
      <Route
        component={App}
        path="/"
      >
        {routes.map(({component, href}, routeIndex) => {
          if (href === '/') {
            return (
              <IndexRoute
                component={component}
                key={`route-${routeIndex}`}
              />
            );
          }

          return (
            <Route
              component={component}
              key={`route-${routeIndex}`}
              path={href}
            />
          );
        })}
      </Route>
    </Router>
  </Provider>
), div);
