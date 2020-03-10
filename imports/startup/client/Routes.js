import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../../ui/components/dashboard/views/HelloWorld.js';
import Application from '../../ui/components/dashboard/views/Application.js';

// Middleware
import ProtectedRoute from './middleware/ProtectedRoute.js';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <ProtectedRoute path="/application" name="application" component={Application} />
        <ProtectedRoute path="/" name="dashboard" component={Dashboard} />
          
          
        </Switch>
      </Router>
    );
  }
}
