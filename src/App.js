import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Left_Menue from "./components/left_menue";
import Top_Menue from "./components/top_menue";
import MyContent from "./components/content";

import "./App.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Left_Menue />
          


          <Layout className="site-layout">
          <Top_Menue />
            <Content style={{ margin: "0 16px" }}>
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}
              
              <MyContent/>
              
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Rick Design ©2018 Created by Rick Wang
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
