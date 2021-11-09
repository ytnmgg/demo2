import React, { Component } from "react";
import { Button, Tooltip } from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./index.css";
import logout_from_sso from "../../data/sso/logout";

class Top_Menue extends Component {
  render() {
    return (
      <div className="top-menue">
        <div className="control-list">
          <ul>
            <li>
              <Button type="link" className="a-gray">
                <SearchOutlined />
              </Button>
            </li>
            <li>
              <Button type="link" className="a-gray">
                <QuestionCircleOutlined />
              </Button>
            </li>
            <li>
              <Button type="link" className="a-gray">
                <BellOutlined />
              </Button>
            </li>
            <li>
              <Tooltip placement="bottom" title="退出登录">
                <Button
                  type="link"
                  className="a-gray"
                  onClick={this.onLogoutClick}
                >
                  <PoweroffOutlined />
                </Button>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  onLogoutClick = () => {
    const loginPage = "/login_page";
    logout_from_sso()
      .then(() => {
        window.location.replace(loginPage);
      })
      .catch(() => {
        window.location.replace(loginPage);
      });
  };
}

export default Top_Menue;
