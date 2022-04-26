import React, { Component } from "react";
import moment from "moment";
import { Line } from "@ant-design/charts";
// import Line from "@ant-design/charts/es/plots/line";
import { Spin, Card, Tooltip, Space, Button, DatePicker } from "antd";
import { withRouter } from "react-router-dom";

import get_nginx_access_points from "../../../../data/logs/nginx-access-points";

const { RangePicker } = DatePicker;

class NginxAccessPoints extends Component {
  range = {
    gmtBegin: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    gmtEnd: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
  };

  state = {
    data: [],
    loading: true,
    range: this.range,
    grafanaSrc: "",
  };

  config = {
    data: this.state.data,
    xField: "time",
    yField: "count",
    seriesField: "status",
    height: 180,
    padding: "auto",
    smooth: true,
    xAxis: { tickCount: 5 },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return "".concat(s, ",");
          });
        },
      },
    },
    color: ["#3f8600", "#cf1322"],
    tooltip: {
      enterable: true,
      customContent: (title, data) => {
        return (
          <div>
            <div className="g2-tooltip-title">{title}点</div>
            <ul className="g2-tooltip-list">
              {data.map((item) => {
                return (
                  <li key={item.name} className="g2-tooltip-list-item">
                    <span
                      className="g2-tooltip-marker"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="g2-tooltip-name">{item.name}:</span>
                    <span className="g2-tooltip-value">
                      <Tooltip title="查询详情" mouseEnterDelay="1">
                        <button
                          className="link-button"
                          onClick={this.toNginxAccessDetail({ title })}
                        >
                          {item.value}
                        </button>
                      </Tooltip>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      },
    },
  };

  toNginxAccessDetail = (time) => {
    return () => {
      this.props.history.push({
        pathname: "/monitor/nginx-access-detail",
        params: { point: time.title },
      });
    };
  };

  refreshLines = () => {
    this.setState({ ...this.state, range: this.range, loading: true });
    get_nginx_access_points(this.range).then((data) => {
      this.renderLines(data);
    });
  };

  renderLines = (data) => {
    this.config = {
      ...this.config,
      data: data,
    };

    this.setState({
      ...this.state,
      data: data,
      loading: false,
    });
  };

  componentDidMount() {
    var nowDate = new Date();
    var nowDateMs = Date.parse(nowDate);
    nowDate.setDate(nowDate.getDate() - 1);
    var dateYesterdayMs = Date.parse(nowDate);

    var grafanaSrc = "http://47.99.61.11:3000/d-solo/GNa_gYQnk/nginxaccess?orgId=1&from=" + dateYesterdayMs + "&to=" + nowDateMs + "&panelId=2";

    this.setState(
      {
        ...this.state,
        grafanaSrc: grafanaSrc,
      }
    );

    get_nginx_access_points(this.range).then((data) => {
      this.renderLines(data);
    });
  }

  disabledDate = (current) => {
    return current > moment().endOf("day");
  };

  changeRange = (dates) => {
    if (dates !== undefined) {
      this.range = {
        gmtBegin: dates[0]
          .set({ hours: 0, minutes: 0, seconds: 0 })
          .format("YYYY-MM-DD HH:mm:ss"),
        gmtEnd: dates[1]    
          .set({ hours: 23, minutes: 59, seconds: 59 })
          .format("YYYY-MM-DD HH:mm:ss"),
      };
    }
  };

  render() {
    return (
      <iframe src={this.state.grafanaSrc} width="450" height="200" frameborder="0"></iframe>            

      // <Card
      //   className="monitor-card"
      //   title="Nginx访问小时趋势"
      //   bordered={false}
      //   extra={
      //     <div>
      //       <Space size={20}>
      //         起止日期：
      //         <RangePicker
      //           defaultValue={[moment().startOf("day"), moment().endOf("day")]}
      //           format={"YYYY/MM/DD"}
      //           disabledDate={this.disabledDate}
      //           onChange={this.changeRange}
      //         />
      //         <Tooltip title="查询数据">
      //           <Button type="primary" onClick={this.refreshLines}>
      //             查询
      //           </Button>
      //         </Tooltip>
      //       </Space>
      //     </div>
      //   }
      // >
      //   <Spin spinning={this.state.loading}>
      //     <Line {...this.config} />
      //   </Spin>
      // </Card>
    );
  }
}

export default withRouter(NginxAccessPoints);
