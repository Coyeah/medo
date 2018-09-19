import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout,
  Menu,
  Icon,
} from 'antd';
const { Header } = Layout;

import { menuData } from '../common/menu';

class BlankLayout extends React.Component {
  menuItemRender = () => {
    return menuData.map(value => {
      return (
        <Menu.Item key={value.path}>
          <Link to={`/${value.path}`}>
            <Icon type={value.icon} />
            <span>{value.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <Header>
        <div className="logo">ToDo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          {this.menuItemRender()}
        </Menu>
      </Header>
    )
  }
}

export default  withRouter(BlankLayout)
