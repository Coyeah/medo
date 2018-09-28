import React, { Fragment } from 'react';
import { HashRouter, Route, IndexRoute, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import SiderMenu from './layouts/SiderMenu';
import BasicLayout from './layouts/BasicLayout';
import GlobalFooter from './components/GlobalFooter';

import { getRouterMap, getRouterSet } from './common/router';

import './index.less';

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
          <SiderMenu />
          <BasicLayout>
            <Route exact path="/" render={() => (
              <Redirect to="/home"/>
            )}/>
            {this.routeMaker(getRouterMap, getRouterSet)}
          </BasicLayout>
          <GlobalFooter />
        </Layout>
      </HashRouter>
    );
  }
}
