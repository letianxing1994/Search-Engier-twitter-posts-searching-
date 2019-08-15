import React, { Component } from 'react';
import { Input, Typography, message } from 'antd';
import HistoryTags from './historyTags';

const { Title } = Typography;
const Search = Input.Search;

class SearchBar extends Component {

  state = {
    small: false,
  };

  warning = () => {
    message.warning('Search for something useful instead.');
  };

  searchQuery = v => {
    if (v.length === 0) {
      this.warning();
      return;
    }
    this.setState({
      query: v
    }, () => {this.props.callback(this.state.query)})
      ;
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      small: newProps.display,
    }, () => {
      //console.log(this.state);
    });
  }

  directSearch = (v) => {
    this.searchQuery(v);
    this.changeInput(v);
  }

  changeInput = (v) => {
    return v;
  }

  render() {
    let size = this.state.small ? "default":"large";
    let titleLvl = this.state.small ? 4:1;
    return (
      <React.Fragment>
        <Title level={titleLvl}>Twitter Searcher</Title>
        <Search
          placeholder="query @user #hashtag"
          enterButton="Search"
          size={size}
          allowClear
          onSearch={value => this.searchQuery(value)}
        />
        <HistoryTags query={this.state.query} callback={this.directSearch}/>
      </React.Fragment>
    );
  }
}

export default SearchBar;