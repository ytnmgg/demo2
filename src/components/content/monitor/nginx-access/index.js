import React, { Component } from "react";
import { Statistic, Row, Col,Spin } from "antd";
import PubSub from "pubsub-js";

import get_nginx_status from "../../../../data/logs/nginx-status";
import { TP_DOCKER_NGINX_RELOAD } from "../../../../common/config";

class Nginx_Access extends Component {
  state = {
    data: {
      statusCount: {},
      countOf200: 0,
      countOf3xx: 0,
      countOf4xx: 0,
      countOf5xx: 0,
      countOfOthers: 0,
    },
    loading: true,
  };

  componentDidMount() {
    this.token = PubSub.subscribe(TP_DOCKER_NGINX_RELOAD, (msg, data) => {
      this.state.loading = true;
      this.setState(this.state);

      get_nginx_status("", this.renderChart);
    });

    get_nginx_status("", this.renderChart);
  }

  renderChart = (data) => {
    this.setState({ data: data, loading: false });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Spin spinning={this.state.loading}>
        <Row gutter={[16, 32]}>
          <Col span={6}>
            <Statistic title="200响应" value={data.countOf200} />
          </Col>
          <Col span={6}>
            <Statistic title="3xx响应" value={data.countOf3xx} />
          </Col>
          <Col span={6}>
            <Statistic title="4xx响应" value={data.countOf4xx} />
          </Col>
          <Col span={6}>
            <Statistic title="5xx响应" value={data.countOf5xx} />
          </Col>
          <Col span={6}>
            <Statistic title="其它响应" value={data.countOfOthers} />
          </Col>
        </Row>
        </Spin>
      </div>
    );
  }
}

export default Nginx_Access;
