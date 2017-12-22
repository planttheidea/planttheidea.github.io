// external dependencies
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {injectGlobal} from 'styled-components';
import styledNormalize from 'styled-normalize';

// app
import App from 'components/App';

// store
import store from './store';

/* eslint-disable no-unused-expressions */
injectGlobal`
  ${styledNormalize};

  * {
    box-sizing: border-box;
    font-family: inherit;
    position: relative;
  }

  body {
    background-color: #d8d3d2;
    color: #5d5d5d;
    font-family: sans-serif;
    font-size: 14px;
  }
`;
/* eslint-enable*/

const appContainer = document.createElement('div');
const drawerContainer = document.createElement('div');

appContainer.id = 'app-content';
drawerContainer.id = 'drawer';

document.body.appendChild(appContainer);
document.body.appendChild(drawerContainer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  appContainer
);
