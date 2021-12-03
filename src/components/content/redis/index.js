import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  Input,
  Button,
  Space,
  Popconfirm,
} from "antd";

import "./index.css";
import list_redis from "../../../data/redis/list";
import remove_redis from "../../../data/redis/remove";

class Redis extends Component {
  columns = [
    {
      title: "Redis键",
      dataIndex: "redisKey",
      ellipsis: {
        showTitle: false,
      },
      render: (redisKey) => (
        <Tooltip placement="topLeft" title={redisKey}>
          {redisKey}
        </Tooltip>
      ),
      width: 680,
    },
    {
      title: "Redis值",
      dataIndex: "redisValue",
      ellipsis: {
        showTitle: false,
      },
      render: (redisValue) => (
        <Tooltip placement="topLeft" title={redisValue}>
          {redisValue}
        </Tooltip>
      ),
    },
    {
      title: "操作",
      dataIndex: "op",
      width: 200,
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="topLeft"
              title="是否确认删除？"
              onConfirm={this.deleteKey(record)}
              okText="确定"
              cancelText="关闭"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  prefix = "SESSION";
  tableData = [];

  state = {
    data: this.tableData,
    loading: false,
    prefix: this.prefix,
  };

  renderTable = (data) => {
    this.makeTableData(data.data);

    this.setState({
      ...this.state,
      data: this.tableData,
      loading: false,
    });
  };

  makeTableData = (data) => {
    this.tableData = [];
    if (data === undefined) {
      return;
    }

    for (let key in data) {
      this.tableData.push({
        redisKey: key,
        redisValue: JSON.stringify(data[key]),
      });
    }
  };

  refreshTable = () => {
    this.setState({ ...this.state, prefix: this.prefix, loading: true });
    list_redis({ prefix: this.prefix }).then((data) => {
      this.renderTable(data);
    });
  };

  onChange = (e) => {
    const { value } = e.target;
    this.prefix = value;
  };

  deleteKey = (record) => {
    return () => {
      remove_redis({ key: record.redisKey }).then(() => {
        this.refreshTable();
      });
    };
  };

  render() {
    return (
      <div>
        <div className="top-search">
          <Row gutter={[0, 24]}>
            <Col span={24} className="ant-page-header-heading-title">
              <span>查询Redis内容</span>
            </Col>
            <Col span={8}>
              <Input
                addonBefore="key前缀"
                defaultValue="SESSION"
                placeholder="输入key前缀"
                onChange={this.onChange}
              />
            </Col>
            <Col span={4}>
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
            columns={this.columns}
            dataSource={this.state.data}
            style={{ width: "100%" }}
            rowKey={(columns) => columns.redisKey}
            loading={this.state.loading}
            pagination={false}
          />
        </Row>
      </div>
    );
  }
}

export default Redis;
