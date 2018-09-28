import React from 'react';
import {
  Layout,
  Breadcrumb,
} from 'antd';
const { Comntent } = Layout;
import { withRouter } from 'react-router-dom';

import { menuMap } from '../common/router';

const { Content } = Layout;

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { match, location, history } = this.props
  }

  render() {
    return (
      <Content className={'contentLayout'} style={{ marginTop: 64 }}>
        {this.props.children}
      </Content>
    )
  }
}

export default withRouter(BasicLayout);
