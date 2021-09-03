import React, { Component } from "react";
import { Layout } from "antd";

import LeftMenue from "./components/left_menue";
import TopMenue from "./components/top_menue";
import MyContent from "./components/content";

import "./App.css";

const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <LeftMenue />

          <Layout className="site-layout">
            <TopMenue />
            <Content className="main-content">
              <MyContent />
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
