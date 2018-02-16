import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as reducers from './redux/reducers';
import { createStore, combineReducers } from 'redux';

import 'normalize.css';
import './browser.css';

import App from './App';

const store = createStore(
  combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));