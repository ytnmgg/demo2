import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Monitor from "./monitor";
import Actuator from './actuator';
import Other from "./other";
import Nginx_Access_Detail from "./monitor/nginx-access-detail";
import E403 from './e403';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/monitor/nginx-access-detail"
            component={Nginx_Access_Detail}
          />
          <Route path="/monitor" component={Monitor} />
          <Route path="/app" component={Actuator} />
          <Route path="/other" component={Other} />
          <Route path="/exception/403" component={E403}/>
          <Redirect to="/monitor" />
        </Switch>
      </div>
    );
  }
}

export default Content;
