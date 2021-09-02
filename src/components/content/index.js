import React, { Component } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import Monitor from './monitor';
import Other from './other';
import Nginx_Access_Detail from './monitor/nginx-access-detail';

class Content extends Component {
  render() {
    return <div>
         <Switch>
              <Route path="/monitor/nginx-access-detail" component={Nginx_Access_Detail} />
              <Route path="/monitor" component={Monitor} />
              <Route path="/other" component={Other} />
              <Redirect to="/monitor" />
            </Switch>
    </div>;
  }
}

export default Content;
