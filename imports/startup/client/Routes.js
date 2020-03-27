import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../../ui/components/dashboard/views/Dashboard';
import Application from '../../ui/components/dashboard/views/Application.js';
import Ranking from '../../ui/components/dashboard/views/Ranking.js';

// Middleware
import ProtectedRoute from './middleware/ProtectedRoute.js';
import FakeRoute from './middleware/ProtectedRoute.js';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
<<<<<<< HEAD
          <FakeRoute path="/application" name="application" component={Application} />
          <FakeRoute path="/ranking" name="application" component={Ranking} />
          <FakeRoute path="/" name="dashboard" component={Dashboard} />
=======
          <ProtectedRoute path="/application" name="application" component={Application} />
          <ProtectedRoute path="/ranking" name="application" component={Ranking} />
          <ProtectedRoute path="/" name="dashboard" component={Dashboard} />
>>>>>>> d08a7749473b01302a4d8dc3180c7b32356c26fc
        </Switch>
      </Router>
    );
  }
}
