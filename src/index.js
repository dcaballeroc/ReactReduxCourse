import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';
import './index.scss';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.querySelector('.container')
);
