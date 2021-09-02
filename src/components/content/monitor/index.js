import React, { Component } from "react";
import { Row, Col, Card, Tooltip, Space } from "antd";
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

  toNginxAccessDetail = () => {
    this.props.history.push("/monitor/nginx-access-detail");
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Nginx日访问量"
              bordered={false}
              extra={
                <div>
                  <Space size={20}>
                    <a
                      className="a-gray"
                      href=""
                      onClick={this.toNginxAccessDetail}
                    >
                      <Tooltip title="到列表详情页">查看详情</Tooltip>
                    </a>
                    <a
                      className="a-gray"
                      href=""
                      onClick={this.publishReshMsg(TP_DOCKER_NGINX_RELOAD)}
                    >
                      <Tooltip title="刷新数据">
                        <ReloadOutlined />
                      </Tooltip>
                    </a>
                  </Space>
                </div>
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
                  href=""
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
