import React from 'react';
import {Drawer, Row, Col} from 'antd';
import styles from './index.less';

import logo from '../../assets/logo.svg';

const InfoContent = () => (
  <div>
    <Row>
      <Col span={4} >
        <img src={logo} style={{width: '100%'}}/>
      </Col>
    </Row>
  </div>
);

export default class Fixed extends React.PureComponent {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div id={styles.fixed}>
        <div>
          {this.props.funcConponent()}
        </div>
        <div><img onClick={this.showDrawer}
            src={logo}
            style={{width: '100%'}}
             /></div>
        <Drawer
            closable={false}
            onClose={this.onClose}
            placement="right"
            title="关于作者"
            visible={this.state.visible}
            width={640}
        >
          <InfoContent />
        </Drawer>
      </div>
    );
  }
}
