import React, { Component } from "react";
import { Row, Col, Card, Tooltip, Space, Button } from "antd";
import PubSub from "pubsub-js";

import { ReloadOutlined } from "@ant-design/icons";

import Contianers from "./docker-containers";
import NginxAccess from "./nginx-access";
import NginxAccessPoints from "./nginx-access-points";
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
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card
              className="monitor-card"
              title="Nginx日访问量"
              bordered={false}
              extra={
                <div>
                  <Space size={20}>
                    <Button
                      type="link"
                      className="a-gray"
                      onClick={this.toNginxAccessDetail}
                    >
                      <Tooltip title="到列表详情页">查看详情</Tooltip>
                    </Button>
                    <Button
                      type="link"
                      className="a-gray"
                      onClick={this.publishReshMsg(TP_DOCKER_NGINX_RELOAD)}
                    >
                      <Tooltip title="刷新数据">
                        <ReloadOutlined />
                      </Tooltip>
                    </Button>
                  </Space>
                </div>
              }
            >
              <NginxAccess />
            </Card>
          </Col>
          <Col span={16}>
            <NginxAccessPoints/>
          </Col>
          <Col span={24}>
            <Card
              className="monitor-card"
              title="容器列表"
              bordered={false}
              extra={
                <Button
                  type="link"
                  className="a-gray"
                  onClick={this.publishReshMsg(TP_DOCKER_CONTAINERS_RELOAD)}
                >
                  <Tooltip title="刷新列表">
                    <ReloadOutlined />
                  </Tooltip>
                </Button>
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
