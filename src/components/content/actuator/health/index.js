import { Badge, Card, Col, Divider, Row, Spin } from "antd";
import React, { Component } from "react";
import get_actuator_health from "../../../../data/actuator/health";

class Health extends Component {
  state = {
    status: "DOWN",
    db_status: "DOWN",
    ping_status: "DOWN",
    disk_status: "DOWN",
    disk_usage: 0,
    loading: true,
  };

  componentDidMount() {
    get_actuator_health().then((data) => {
      var status = this.state.status;
      var db_status = this.state.db_status;
      var ping_status = this.state.ping_status;
      var disk_status = this.state.disk_status;
      var disk_usage = this.state.disk_usage;
      if (data !== undefined) {
        status = data.status;

        if (data.components !== undefined) {
          if (data.components.db !== undefined) {
            db_status = data.components.db.status;
          }
          if (data.components.ping !== undefined) {
            ping_status = data.components.ping.status;
          }
          if (data.components.diskSpace !== undefined) {
            disk_status = data.components.diskSpace.status;
            disk_usage = (
              (100 *
                (data.components.diskSpace.details.total -
                  data.components.diskSpace.details.free)) /
              data.components.diskSpace.details.total
            ).toFixed(1);
          }
        }
      }
      this.setState({
        ...this.state,
        status: status,
        db_status: db_status,
        ping_status: ping_status,
        disk_status: disk_status,
        disk_usage: disk_usage,
        loading: false,
      });
    });
  }

  render() {
    var status = this.state.status === "UP" ? "processing" : "error";

    var db_status = this.state.db_status === "UP" ? "processing" : "error";
    var db_text = this.state.db_status === "UP" ? "up" : "error";

    var ping_status = this.state.ping_status === "UP" ? "processing" : "error";
    var ping_text = this.state.ping_status === "UP" ? "up" : "error";

    var disk_status = this.state.disk_status === "UP" ? "processing" : "error";
    var disk_usage = this.state.disk_usage;

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Card className="font-title" style={{ width: "100%" }}>
            <Row>
              <Col span={4}>
                <Badge status={status} text="健康状况" />
                <Divider
                  type="vertical"
                  style={{ height: "30px", marginLeft: "40px" }}
                />
              </Col>

              <Col span={4}>
                DB： <Badge status={db_status} text={db_text} />
              </Col>
              <Col span={4}>
                PING： <Badge status={ping_status} text={ping_text} />
              </Col>
              <Col span={4}>
                DISK： <Badge status={disk_status} text={disk_usage + "%"} />
              </Col>
            </Row>
          </Card>
        </Spin>
      </div>
    );
  }
}

export default Health;
