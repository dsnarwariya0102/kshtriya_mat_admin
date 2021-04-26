import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AdminLogin from "../admin/login/AdminLogin";
import Dashboard from "../admin/dashboard/Dashboard";

export default function AdminRouter(props) {
  return (
    <div>
      <Router>
        <Route
          component={AdminLogin}
          path="/AdminLogin"
          exact
          strict
          history={props.history}
        />
        <Route
          component={Dashboard}
          path="/Dashboard"
          exact
          strict
          history={props.history}
        />
      </Router>
    </div>
  );
}
