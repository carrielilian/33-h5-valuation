/* eslint-disable react/no-array-index-key */
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from 'components/Login/Login';

export default (
  <HashRouter>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
    </Switch>
  </HashRouter>
);
