import React, { Component } from "react";
import { Table, Tag, Space, Tooltip,Button } from "antd";
import PubSub from "pubsub-js";

import list_containers from "../../../../data/docker/list-container";
import { TP_DOCKER_CONTAINERS_RELOAD } from "../../../../common/config";

class Containers extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    this.token = PubSub.subscribe(TP_DOCKER_CONTAINERS_RELOAD, (msg, data) => {
      this.setState({ ...this.state, loading: true });
      list_containers().then((data) => {
        this.renderTable(data);
      });
    });

    list_containers().then((data) => {
      this.renderTable(data);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  renderTable = (data) => {
    this.setState({ data: data, loading: false });
  };

  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      with: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (container_id) => (
        <Tooltip placement="topLeft" title={container_id}>
          {container_id}
        </Tooltip>
      ),
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "镜像",
      dataIndex: "imageName",
      key: "imageName",
    },
    {
      title: "命令",
      dataIndex: "command",
      key: "command",
      with: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (command) => (
        <Tooltip placement="topLeft" title={command}>
          {command}
        </Tooltip>
      ),
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        const { code, description } = status;

        let color = "volcano";
        switch (code) {
          case "running":
            color = "green";
            break;
          case "created":
          case "restarting":
            color = "geekblue";
            break;
          default:
            color = "volcano";
            break;
        }

        return (
          <div>
            <Tooltip placement="topLeft" title={description}>
              <Tag color={color} key={code}>
                {code}
              </Tag>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Button type="link" onClick={this.clickDetail(record)}>
              详情
            </Button>
          </Space>
        );
      },
    },
  ];

  clickDetail = (record) => {
    return () => {
      alert(record.id);
    };
  };

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        pagination={false}
        rowKey={(columns) => columns.id}
        loading={this.state.loading}
      />
    );
  }
}

export default Containers;
