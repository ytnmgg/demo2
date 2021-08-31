import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";

import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

class Top_Menue extends Component {
  render() {
    return (
      <div className="top-menue">
        <div className="control-list">
          <ul>
            <li>
              <a className="a-gray" href="#">
                <SearchOutlined />
              </a>
            </li>
            <li>
              <a className="a-gray" href="#">
                <QuestionCircleOutlined />
              </a>
            </li>
            <li>
              <a className="a-gray" href="#">
                <BellOutlined />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Top_Menue;
