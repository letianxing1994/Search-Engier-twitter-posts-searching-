import React, { Component } from "react";
import { List, Empty } from "antd";
import { Typography } from "antd";

import Axios from "axios";

const { Title } = Typography;

class ResultList extends Component {
  state = {
    results: [],
    query: "",
    display: false,
    time: 0,
    loading: true,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      query: newProps.query,
      display: newProps.display,
      loading: true,
    }, () => {
      console.log(this.state.query);
      this.loadResults();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadResults = () => {
    if (this.state.display) {
      // const path = `http://5cad37b601a0b80014dcd321.mockapi.io/api/v1/results/`;
      const path = `http://localhost:8000/results/`;
      Axios.get(path, {
        params: {
          query: this.state.query
        }
      }).then(r => {
        this.setState({
          results: r.data.results,
          time: r.data.time,
          loading: false,
        }, ()=>{console.log(this.state)})
      });
    }
  };

  render() {
    let { results } = this.state;
    let resultsList = results.length ? (
      item => (
        <List.Item>
          <List.Item.Meta
            title={item.name}
          />
          {item.tweet}
        </List.Item>
      )
    ) : (
        <Empty />
      );
    let toBeReturned = this.state.display ? (
      <React.Fragment>
        <br /><br />
        <div align="center">
          <Title level={4} >Retrieved {this.state.results.length} results, takes about {Math.round(this.state.time * 100) / 100} secs</Title>
        </div>
        <div align="left">
          <List
            itemLayout="vertical"
            pagination={{
              pageSize: 6
            }}
            size="large"
            dataSource={results}
            renderItem={resultsList}
            loading={this.state.loading}
          />
        </div>

      </React.Fragment>
    ) : (
        <div></div>
      );
    return (
      toBeReturned
    );
  }
}

export default ResultList;
