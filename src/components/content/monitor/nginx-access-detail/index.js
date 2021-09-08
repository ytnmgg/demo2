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
  range = {
    gmtBegin: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    gmtEnd: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
    pageIndex: 1,
    pageSize: 10,
  };

  state = {
    data: [],
    loading: true,
    range: this.range,
    total: 0,
  };

  componentDidMount() {
    get_nginx_access_detail(this.range).then((data) => {
      this.renderTable(data);
    });
  }

  // 加载跳转地址传递过来的时间点，初始化时间选择框
  loadPointParam() {
    if (
      this.props.location.params !== undefined &&
      this.props.location.params.point !== undefined
    ) {
      this.range = {
        ...this.range,
        gmtBegin: this.props.location.params.point + ":00:00",
        gmtEnd: this.props.location.params.point + ":59:59",
      };
    }
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
    this.setState({ ...this.state, range: this.range, loading: true });
    get_nginx_access_detail(this.range).then((data) => {
      this.renderTable(data);
    });
  };

  renderTable = (data) => {
    this.fixDataAndMakeStatusFilter(data.data);
    this.setState({
      ...this.state,
      data: data.data,
      loading: false,
      total: data.totalCount,
    });
  };

  changeRange = (dates, dateStrings) => {
    if (dates !== undefined) {
      this.range = {
        gmtBegin: dates[0].set({ seconds: 0 }).format("YYYY-MM-DD HH:mm:ss"),
        gmtEnd: dates[1].set({ seconds: 59 }).format("YYYY-MM-DD HH:mm:ss"),
        pageIndex: this.range.pageIndex,
        pageSize: this.range.pageSize,
      };
    }
  };

  onPaginationChange = (page, pageSize) => {
    this.range.pageIndex = page === 0 ? 1 : page;
    this.range.pageSize = pageSize;
    this.refreshTable();
  };

  render() {
    this.loadPointParam();
    return (
      <div>
        <div className="top-search">
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Button type="link" onClick={this.goBackToMonitor}>
                    监控面板首页
                  </Button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Nginx日志详情</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={24} className="ant-page-header-heading-title">
              <span>查询日志</span>
            </Col>
            <Col span={24}>
              起止时间：
              <RangePicker
                defaultValue={[
                  moment(this.range.gmtBegin, "YYYY-MM-DD HH:mm:ss"),
                  moment(this.range.gmtEnd, "YYYY-MM-DD HH:mm:ss"),
                ]}
                disabledDate={this.disabledDate}
                onChange={this.changeRange}
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
              <Button
                type="primary"
                onClick={this.refreshTable}
                style={{ marginLeft: "10px" }}
              >
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
