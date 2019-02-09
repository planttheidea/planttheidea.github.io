// external dependencies
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// app
import App from 'components/App';

// fonts
import 'typeface-aleo';
import 'typeface-cooper-hewitt';

// store
import store from './store';

// utils
import {setAxiosDefaults} from 'utils/axios';

setAxiosDefaults();

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
