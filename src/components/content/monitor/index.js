import React, { Component } from "react";
import { Row, Col, Card, Tooltip } from "antd";
import PubSub from "pubsub-js";

import { ReloadOutlined } from "@ant-design/icons";

import Contianers from "./docker-containers";
import Nginx_Access from "./nginx-access";
import {
  TP_DOCKER_CONTAINERS_RELOAD,
  TP_DOCKER_NGINX_RELOAD,
} from "../../../common/config";

import "./index.css";

class Monitor extends Component {
  publishReshMsg = (topic) => {
    return () => {
      PubSub.publish(topic, {});
    };
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Nginx 访问"
              bordered={false}
              extra={
                <a
                  className="a-gray"
                  href="#"
                  onClick={this.publishReshMsg(TP_DOCKER_NGINX_RELOAD)}
                >
                  <Tooltip title="刷新数据">
                    <ReloadOutlined />
                  </Tooltip>
                </a>
              }
            >
              <Nginx_Access />
            </Card>
          </Col>
          <Col span={16}>
            <Card
              title="容器列表"
              bordered={false}
              extra={
                <a
                  className="a-gray"
                  href="#"
                  onClick={this.publishReshMsg(TP_DOCKER_CONTAINERS_RELOAD)}
                >
                  <Tooltip title="刷新列表">
                    <ReloadOutlined />
                  </Tooltip>
                </a>
              }
            >
              <Contianers />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Monitor;
