import React, { Component } from "react";
import { Statistic, Row, Col, Spin } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import PubSub from "pubsub-js";

import get_nginx_status from "../../../../data/logs/nginx-status";
import { TP_DOCKER_NGINX_RELOAD } from "../../../../common/config";

class Nginx_Access extends Component {
  state = {
    data: {
      today: {
        countOf200: 0,
        countOf3xx: 0,
        countOf4xx: 0,
        countOf5xx: 0,
        countOfOthers: 0,
      },
      yesterday: {
        countOf200: 0,
        countOf3xx: 0,
        countOf4xx: 0,
        countOf5xx: 0,
        countOfOthers: 0,
      },
    },
    loading: true,
  };

  componentDidMount() {
    this.token = PubSub.subscribe(TP_DOCKER_NGINX_RELOAD, (msg, data) => {
      this.setState({ ...this.state, loading: true });

      get_nginx_status().then((data) => {
        this.renderChart(data);
      });
    });

    get_nginx_status().then((data) => {
      this.renderChart(data);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  renderChart = (data) => {
    this.setState({ data: data, loading: false });
  };

  render() {
    const { data } = this.state;
    const countOf200Diff =
      ((data.today.countOf200 - data.yesterday.countOf200) /
        data.yesterday.countOf200) *
      100;
    const countOf4xxDiff =
      ((data.today.countOf4xx - data.yesterday.countOf4xx) /
        data.yesterday.countOf4xx) *
      100;

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Row gutter={[16, 32]}>
            <Col span={12}>
              <Statistic title="200响应" value={data.today.countOf200} />

              <Statistic
                title=""
                value={Math.abs(countOf200Diff)}
                precision={2}
                valueStyle={{
                  color: countOf200Diff >= 0 ? "#3f8600" : "#cf1322",
                  fontSize: 12,
                }}
                prefix={
                  countOf200Diff >= 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                suffix="%"
              />
            </Col>
            <Col span={12}>
              <Statistic title="4xx响应" value={data.today.countOf4xx} />
              <Statistic
                title=""
                value={Math.abs(countOf4xxDiff)}
                precision={2}
                valueStyle={{
                  color: countOf4xxDiff >= 0 ? "#3f8600" : "#cf1322",
                  fontSize: 12,
                }}
                prefix={
                  countOf4xxDiff >= 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                suffix="%"
              />
            </Col>
            <Col span={6}>
              <Statistic title="3xx响应" value={data.today.countOf3xx} />
            </Col>

            <Col span={6}>
              <Statistic title="5xx响应" value={data.today.countOf5xx} />
            </Col>
            <Col span={6}>
              <Statistic title="其它响应" value={data.today.countOfOthers} />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default Nginx_Access;
