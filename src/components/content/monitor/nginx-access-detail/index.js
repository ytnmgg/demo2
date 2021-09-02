import React, { Component } from "react";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  DatePicker,
  Button,
  Tooltip,
  Pagination,
} from "antd";
import moment from "moment";

import "./index.css";
import get_nginx_access_detail from "../../../../data/logs/nginx-access-deatail";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 100,

    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.id - b.id,
  },
  {
    title: "timeLocal",
    dataIndex: "timeLocal",
    width: 200,
  },
  {
    title: "remoteAddress",
    dataIndex: "remoteAddress",
    width: 160,
  },
  {
    title: "status",
    dataIndex: "status",
    width: 100,
    // filters: [],
    // onFilter: (value, record) => record.status === value,
  },
  {
    title: "bodyBytes",
    dataIndex: "bodyBytes",
    width: 120,
  },
  {
    title: "request",
    dataIndex: "request",
    ellipsis: {
      showTitle: false,
    },
    render: (request) => (
      <Tooltip placement="topLeft" title={request}>
        {request}
      </Tooltip>
    ),
  },
];

class Nginx_Access_Detail extends Component {
  state = {
    data: [],
    loading: false,
    range: {
      gmtBegin: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
      gmtEnd: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      pageIndex: 1,
      pageSize: 10,
    },
    total: 0,
  };

  componentDidMount() {
    this.refreshTable();
  }

  goBackToMonitor = () => {
    this.props.history.replace("/monitor");
  };

  disabledDate = (current) => {
    return current > moment().endOf("day");
  };

  fixDataAndMakeStatusFilter = (data) => {
    // let statusSet = new Set();
    for (let item of data) {
      item.timeLocal = moment(item.timeLocal).format("YYYY-MM-DD HH:mm:ss");
      // statusSet.add(item.status);
    }

    // for (let col of columns) {
    //   if (col.dataIndex === "status") {
    //     col.filters = [];
    //     statusSet.forEach((s) => {
    //       col.filters.push({ text: s, value: s });
    //     });
    //   }
    // }
  };

  refreshTable = () => {
    this.state.loading = true;
    this.setState(this.state);

    get_nginx_access_detail(this.state.range, this.renderTable);
  };

  renderTable = (data) => {
    this.fixDataAndMakeStatusFilter(data.data);

    this.state.data = data.data;
    this.state.loading = false;
    this.state.total = data.totalCount;

    this.setState(this.state);
  };

  changeRange = (dates) => {
    if (dates != undefined) {
      this.state.range = {
        gmtBegin: dates[0]
          .set({ hours: 0, minutes: 0, seconds: 0 })
          .format("YYYY-MM-DD HH:mm:ss"),
        gmtEnd: dates[1]
          .set({ hours: 23, minutes: 59, seconds: 59 })
          .format("YYYY-MM-DD HH:mm:ss"),
        pageIndex: this.state.range.pageIndex,
        pageSize: this.state.range.pageSize,
      };
    }
  };

  onPaginationChange = (page, pageSize) => {
    this.state.range.pageIndex = page === 0 ? 1 : page;
    this.state.range.pageSize = pageSize;

    this.refreshTable();
  };

  render() {
    return (
      <div>
        <div className="top-search">
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="" onClick={this.goBackToMonitor}>
                    监控面板首页
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Nginx日志详情</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={24} className="ant-page-header-heading-title">
              <span>查询日志</span>
            </Col>
            <Col span={8}>
              起止日期：
              <RangePicker
                defaultValue={[moment().startOf("day"), moment().endOf("day")]}
                format={"YYYY/MM/DD"}
                disabledDate={this.disabledDate}
                onChange={this.changeRange}
              />
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={this.refreshTable}>
                查询
              </Button>
            </Col>
          </Row>
        </div>

        <Row>
          <Table
            columns={columns}
            dataSource={this.state.data}
            style={{ width: "100%" }}
            rowKey={(columns) => columns.id}
            loading={this.state.loading}
            pagination={false}
          />
        </Row>
        <Row className="pagination-row" justify="end" align="middle">
          <Col>
            <Pagination
              size="default"
              total={this.state.total}
              defaultCurrent={1}
              current={this.state.range.pageIndex}
              showSizeChanger
              showQuickJumper
              onChange={this.onPaginationChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Nginx_Access_Detail;
