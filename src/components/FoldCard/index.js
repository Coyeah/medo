import React from 'react';
import {
  Button,
} from 'antd';

import './index.less';

export default class Card extends React.Component {
  state = { visible: false }

  handleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  titleRender = () => {
    const { status } = this.props;

    let color = '#888', textDecoration = 'none';
    if (status === 'danger') {
      color = '#F2DEDE';
    } else if (status === 'success') {
      color = '#DFF0D8';
      textDecoration = 'line-through';
    }

    return <div className={'title'} style={{ color, textDecoration, }}>{this.props.title || ''}</div>
  }

  detialRender = () => {
    if (this.state.visible && this.props.children) {
      return (
        <div className={'detial'}>
          {this.props.children}
        </div>
      )
    }
  }

  render() {
    const { width, height, status } = this.props;
    const style = this.props.style || {};

    let color = '#888';
    if (status === 'danger') {
      color = '#F2DEDE';
    } else if (status === 'success') {
      color = '#DFF0D8'
    }

    return (
      <div
        className={'cardLayout'}
        style={{
          width: width || '100%',
          border: `1px solid ${color}`,
          borderLeft: `20px solid ${color}`,
          ...style
        }}
        onClick={this.handleVisible}
      >
        {this.titleRender()}
        {this.detialRender()}
      </div>
    )
  }
}
