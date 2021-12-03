import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  Pagination,
} from "antd";
import moment from "moment";

import "./index.css";
import list_users from "../../../data/user";

const columns = [
  {
    title: "uid",
    dataIndex: "uid",
    width: 100,

    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.id - b.id,
  },
  {
    title: "登录名",
    dataIndex: "name",
    width: 160,
  },
  {
    title: "角色",
    dataIndex: "role",
    width: 160,
  },
  {
    title: "创建时间",
    dataIndex: "gmtCreate",
    width: 200,
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 100,
    // filters: [],
    // onFilter: (value, record) => record.status === value,
  },
  {
    title: "password（加密后）",
    dataIndex: "password",
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: (password) => (
      <Tooltip placement="topLeft" title={password}>
        {password}
      </Tooltip>
    ),
  },
];

class User extends Component {
  range = {
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
    list_users(this.range).then((data) => {
      this.renderTable(data);
    });
  }

  renderTable = (data) => {
    this.fixDataAndMakeStatusFilter(data.data.data);
    this.setState({
      ...this.state,
      data: data.data.data,
      loading: false,
      total: data.totalCount,
    });
  };

  fixDataAndMakeStatusFilter = (data) => {
    // let statusSet = new Set();
    for (let item of data) {
      item.gmtCreate = moment(item.gmtCreate).format("YYYY-MM-DD HH:mm:ss");
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

  onPaginationChange = (page, pageSize) => {
    this.range.pageIndex = page === 0 ? 1 : page;
    this.range.pageSize = pageSize;
    this.refreshTable();
  };

  refreshTable = () => {
    this.setState({ ...this.state, range: this.range, loading: true });
    list_users(this.range).then((data) => {
      this.renderTable(data);
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Table
            columns={columns}
            dataSource={this.state.data}
            style={{ width: "100%" }}
            rowKey={(columns) => columns.uid}
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

export default User;
