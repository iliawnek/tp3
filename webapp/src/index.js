import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
