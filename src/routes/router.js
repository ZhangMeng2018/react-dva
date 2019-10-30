import React, {PropTypes} from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import AppContainer from './AppContainer/index';

const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/app" component={AppContainer} />
        <Redirect from="/" to="/app" />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
