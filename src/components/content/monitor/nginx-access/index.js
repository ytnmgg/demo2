import React, { Component } from "react";
import { Statistic, Row, Col } from "antd";

import get_nginx_status from "../../../../data/logs/nginx-status";

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
    // this.token = PubSub.subscribe(TP_DOCKER_CONTAINERS_RELOAD, (msg, data) => {
    //   this.state.loading = true;
    //   this.setState(this.state);

    //   list_containers("", this.renderTable);
    // });

    get_nginx_status("", this.renderChart);
  }

  renderChart = (data) => {
    this.setState({ data: data, loading: false });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default Nginx_Access;
