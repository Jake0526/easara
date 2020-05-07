import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Application from "../../ui/components/dashboard/views/Application.js";
import ApplicantProfile from "../../ui/components/dashboard/views/ApplicantProfile.js";
import Dashboard from "../../ui/components/dashboard/views/Dashboard";
import Ranking from "../../ui/components/dashboard/views/Ranking.js";
import RankingHistory from "../../ui/components/dashboard/views/RankingHistory.js";
import Settings from "../../ui/components/dashboard/views/Settings.js";
// Middleware
// import ProtectedRoute from "./middleware/ProtectedRoute.js";
import FakeRoute from "./middleware/FakeRoute.js";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <FakeRoute
            path="/application"
            name="application"
            component={Application}
          />
          <FakeRoute
            path="/applicant-profiles"
            name="applicant-profiles"
            component={ApplicantProfile}
          />
          <FakeRoute path="/ranking" name="application" component={Ranking} />
          <FakeRoute
            path="/ranking-history"
            name="ranking-history"
            component={RankingHistory}
          />
          <FakeRoute path="/settings" name="dashboard" component={Settings} />
          <FakeRoute path="/" name="dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
