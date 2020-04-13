import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../../ui/components/dashboard/views/Dashboard';
import Application from '../../ui/components/dashboard/views/Application.js';
import Ranking from '../../ui/components/dashboard/views/Ranking.js';

// Middleware
import ProtectedRoute from './middleware/ProtectedRoute.js';
import FakeRoute from './middleware/FakeRoute.js';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <FakeRoute path="/application" name="application" component={Application} />
          <FakeRoute path="/ranking" name="application" component={Ranking} />
          <FakeRoute path="/" name="dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
