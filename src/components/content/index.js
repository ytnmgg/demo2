import React, { Component } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import Monitor from './monitor';
import Other from './other';

import "./index.css";

class Content extends Component {
  render() {
    return <div className="main-content">
         <Switch>
              <Route path="/monitor" component={Monitor} />
              <Route path="/other" component={Other} />
              <Redirect to="/monitor" />
            </Switch>
    </div>;
  }
}

export default Content;
