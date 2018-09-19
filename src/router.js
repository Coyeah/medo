import React, { Fragment } from 'react';
import { HashRouter, Route, IndexRoute } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import BlankLayout from './layouts/BlankLayout';
import BasicLayout from './layouts/BasicLayout';

import { getRouterData, getRouterSet } from './common/router';

import './index.less';

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  routeMaker = (obj, arr) => {
    return arr.map((value, index) => {
      return <Route key={index} path={value.toString()} exact component={obj[value].component} />
    })
  }

  render() {
    return (
      <HashRouter basename='/'>
        <Layout className={"layout"}>
          <BlankLayout />
          <BasicLayout>
            {this.routeMaker(getRouterData, getRouterSet)}
          </BasicLayout>
          <Footer style={{ textAlign: 'center' }}>
            ToDo List ©2018 Created by Coyeah Chen
          </Footer>
        </Layout>
      </HashRouter>
    );
  }
}
