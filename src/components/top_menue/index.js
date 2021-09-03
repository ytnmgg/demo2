import React, { Component } from "react";
import { Button } from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";

import "./index.css";

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
          </ul>
        </div>
      </div>
    );
  }
}

export default Top_Menue;
