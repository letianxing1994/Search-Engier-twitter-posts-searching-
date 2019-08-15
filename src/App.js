import React, { Component } from 'react';
import SearchBar from './components/searchbar';
import ResultList from './components/resultList';
import logoPic from './logo.png';
import './App.css';

import { Row, Col } from 'antd';

import { Layout } from 'antd';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    query: "",
    show: false,
  };

  passQuery = (query) => {
    // console.log("passing query:" + query);
    this.setState({
      query: query,
      show: true,
    });
  }

  restoreShow = () => {
    this.setState({show: false});
  }

  render() {
    let size = this.state.show ? 65 : 200;
    return (
      <Layout style={{ background: '#fff'}}>
        <Content style={{ padding: '0 50px', marginTop: 105 }}>
          <div style={{ padding: 24, minHeight: 800 }}>
            <Row>
              <Col span={12} offset={6}>
                <div align="center" display="block">
                  <br />
                  <img src={logoPic} alt='twitter_logo' width={size} onClick={this.restoreShow}/>
                  <br /><br /><br />
                  <SearchBar callback={this.passQuery} displayLarge={this.state.show}/>
                  <ResultList query={this.state.query} display={this.state.show} />
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>

          INFSCI 2140 Spring 2019, by Zhaoxuan Li, Jingzhi Wang, Tianxing Le
        </Footer>
      </Layout>



    );
  }
}

export default App;
