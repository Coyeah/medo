import React, { Fragment } from 'react';
import {
  Layout
} from 'antd';

const { Footer } = Layout;

export default class GlobalFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        ToDo List ©2018 Created by Coyeah Chen
      </Footer>
    )
  }
}
