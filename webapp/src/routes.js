import React from 'react';
import {Router, Route} from 'react-router';

import App from './pages/App';
import Account from './pages/Account';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}/>
    <Route path="/:id" component={Account}/>
  </Router>
);

export default Routes;