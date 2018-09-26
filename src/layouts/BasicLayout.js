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

  componentDidMount() {
    // const { match, location, history } = this.props
  }

  render() {
    return (
      <Content className={'contentLayout'}>
        {this.props.children}
      </Content>
    )
  }
}

export default withRouter(BasicLayout)
