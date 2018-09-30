import React, { Fragment } from 'react';
import { HashRouter, Route, IndexRoute, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import SiderMenu from './layouts/SiderMenu';
import BasicLayout from './layouts/BasicLayout';
import GlobalFooter from './components/GlobalFooter';
import Authorized from './components/Authorized';

import { getRouterMap, getRouterSet } from './common/router';
import { setAuthority, getAuthority } from './utils/authority';

import './index.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    setAuthority([]);
  }

  // componentWillUnmount() {
  //   setAuthority([]);
  // }

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
            <Authorized routerMap={getRouterMap} />
          </BasicLayout>
          <GlobalFooter />
        </Layout>
      </HashRouter>
    );
  }
}
