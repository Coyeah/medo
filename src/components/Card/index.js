import React from 'react';

import './index.less';

export default class Card extends React.Component {
  titleRender = () => {
    if (this.props.title) {
      return <p className={'title'}>{this.props.title}</p>
    } else {
      return null;
    }
  }

  render() {
    let { width, style } = this.props;
    style = style || {};
    const inStyle = {
      width,
      ...style
    }

    return (
      <div style={inStyle} className={'cardLayout'}>
        {this.titleRender()}
        {this.props.children}
      </div>
    )
  }
}
