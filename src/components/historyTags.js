import React, { Component } from 'react';
import { Tag, Typography } from 'antd';

const { Title, Text } = Typography;

class HistoryTags extends Component {
  state = {
    tags: [],
    inputValue: "",
  };

  clearAll = () => {
    this.setState({tags: []});
  }

  addTag = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags
    });
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      inputValue: newProps.query,
    }, () => {
      this.addTag();
    });
  }

  render() {
    const { tags } = this.state;
    let tagsList = tags.length ? (
      tags.map((tag, index) => {
        const tagElem = (
          <Tag
            key={tag}
            onClick={() => this.props.callback(tag)}>
            {tag}
          </Tag>
        );
        return tagElem;
      })
    ) : (
      <Text>No search history yet.</Text>
    );
    return (
      <div>
        <br /><br />
        <Title level={4} onClick={this.clearAll}>Search History (click to clear)</Title>
        {tagsList}
      </div>
    );
  }
}
export default HistoryTags;