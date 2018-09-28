import React from 'react';
import {
  Button,
} from 'antd';

import './index.less';
import config from './typeConfig';

export default class Exception extends React.Component {
  static defaultProps = {
    backText: '返回首页',
    redirect: '/',
  }

  btnRender = () => {
    const Link = this.props.lineElement;

    if (this.props.lineElement) {
      return (
        <Link to={this.props.redirect}>
          <Button>{this.props.backText}</Button>
        </Link>
      )
    }
  }

  render() {
    const {
      type,
    } = this.props;

    const pageType = type in config ? type : '404';

    return (
      <div className={'exceptionLayout'}>
        <div className={'imgEle'} style={{ backgroundImage: `url(${config[pageType].img})` }} />
        <div className={'textEle'}>
          <h1>{config[pageType].title}</h1>
          <span>{config[pageType].desc}</span>
        </div>
        <div className={'btnEle'}>
          {this.btnRender()}
        </div>
      </div>
    )
  }
}

// reference: ant-design-pro
// url: https://github.com/ant-design/ant-design-pro/blob/master/src/components/Exception/index.js
