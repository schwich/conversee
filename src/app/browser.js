import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import * as reducers from './redux/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import App from './App';

import 'normalize.css';
import './browser.css';

const store = createStore(
  combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));