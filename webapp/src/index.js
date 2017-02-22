import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import './index.css';
import {browserHistory} from 'react-router';
import Routes from './routes';

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
    <Routes history={browserHistory}/>
  </Provider>,
  document.getElementById('root')
);
