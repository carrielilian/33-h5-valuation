/* eslint-disable react/no-array-index-key */
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from 'components/Main/Main';

export default (
  <HashRouter>
    <Switch>
      <Route path="/" component={Main} exact />
    </Switch>
  </HashRouter>
);
