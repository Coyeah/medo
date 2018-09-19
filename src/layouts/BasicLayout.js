import React from 'react';
import {
  Layout,
  Breadcrumb,
} from 'antd';
const { Comntent } = Layout;
import { withRouter } from 'react-router-dom';

import { menuMap } from '../common/menu';

const { Content } = Layout;

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        {this.props.children}
      </Content>
    )
  }
}

export default withRouter(BasicLayout)
