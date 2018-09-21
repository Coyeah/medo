import React, { Fragment } from 'react';
import {
  Button,
  Icon,
} from 'antd';

import PlusModal from './PlusModal';

// import './index.less';

export default class InputModal extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.showModal}>
          <Icon type="plus" theme="outlined" />
        </Button>
        <PlusModal addTask={this.props.addTask} visible={this.state.visible} showModal={this.showModal} closeModal={this.closeModal} />
      </Fragment>
    )
  }
}
