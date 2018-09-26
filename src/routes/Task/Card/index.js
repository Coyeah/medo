import React from 'react';
import {
  Button,
  Tooltip,
} from 'antd';

import './index.less';

export default class Card extends React.Component {
  state = { visible: false }

  handleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleVisibleFalse = () => {
    this.setState({
      visible: false,
    })
  }

  handleCheck = (e) => {
    e.stopPropagation();

    this.props.handleOK && this.props.handleOK(this.props.info.id);

    this.handleVisible();
  }

  handleClose = (e) => {
    e.stopPropagation();

    this.props.handleCancel && this.props.handleCancel(this.props.info.id);

    this.handleVisible();
  }

  handleReset = (e) => {
    e.stopPropagation();

    this.props.handleBack && this.props.handleBack(this.props.info.id);

    this.handleVisible();
  }

  titleRender = () => {
      let style = {};
      if (this.props.info.status === 1) {
        style = {
          textDecoration: 'line-through'
        };
      }
      if (this.props.toolTip) {
        return <div style={style} className={'title'}><Tooltip arrowPointAtCenter title={this.props.toolTip}>{this.props.title || ''}</Tooltip></div>
      } else {
        return <div style={style} className={'title'}>{this.props.title}</div>
      }
  }

  operationRender = () => {
    let style = {
        right: '-100%'
    };

    if (this.state.visible) {
      style = { right: '0' };
    }

    return (
      <div style={style} className={'operation'}>
        <Button shape="circle" icon="close" onClick={this.handleClose} />
        <Button shape="circle" icon="check" onClick={this.handleCheck} />
        <Button shape="circle" icon="sync" onClick={this.handleReset} />
      </div>
    )
  }

  render() {
    let { width, height, style } = this.props;
    style = style || {};

    let color = null;
    switch (this.props.info.status) {
      case 1: {
        color = '#DFF0D8';
        break;
      }
      case 2: {
        color = '#F2DEDE';
        break;
      }
      default: {

      }
    }

    const inStyle = {
      width: width || '100%',
      height,
      border: color ? `1px solid ${color}` : null,
      borderLeft: color ? `50px solid ${color}` : null,
      color: color ? `#888` : null,
      ...style
    }

    // if (this.props.info.status === 1) {
    //   inStyle.border = '1px solid #DFF0D8';
    //   inStyle.borderLeft = '50px solid #DFF0D8';
    //   inStyle.color = '#888';
    // } else {
    //
    // }
    //


    return (
      <div style={inStyle} className={'cardLayout'} onClick={this.handleVisible} onMouseLeave={this.handleVisibleFalse}>
        {this.titleRender()}
        {this.operationRender()}
      </div>
    )
  }
}
