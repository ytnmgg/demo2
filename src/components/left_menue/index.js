import {
  DashboardOutlined,
  DesktopOutlined,
  FileOutlined,
  FullscreenExitOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

class Left_Menue extends Component {
  state = {
    collapsed: false,
    displayMainTitle: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed: collapsed, displayMainTitle: !collapsed });
  };

  render() {
    const { collapsed, displayMainTitle } = this.state;

    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="main-container clearfix">
          <div className="main-logo">
            <FullscreenExitOutlined />
          </div>

          <div
            className="main-title"
            style={{ display: displayMainTitle ? "block" : "none" }}
          >
            Focus
          </div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="1" icon={<DashboardOutlined />} title="监控">
            <Menu.Item key="1_1">
              <NavLink to="/monitor">总体</NavLink>
            </Menu.Item>
            <Menu.Item key="1_2">
              <NavLink to="/app">应用</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/other">其它</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Left_Menue;
