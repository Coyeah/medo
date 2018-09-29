import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout,
  Menu,
  Icon,
} from 'antd';
const { Header } = Layout;

import { getMenuSet } from '../common/router';

class SiderMenu extends React.Component {
  menuItemRender = () => {
    return getMenuSet.map(value => {
      if (value.path && value.icon && value.name) {
        return (
          <Menu.Item key={value.path}>
            <Link to={value.path}>
              <Icon type={value.icon} />
              <span>{value.name}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const { location } = this.props

    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">ToDo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          {this.menuItemRender()}
        </Menu>
      </Header>
    )
  }
}

export default withRouter(SiderMenu)
