import React from 'react';

import style from './style.scss';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cx = 'buttonModule';

    let text = '';
    if (typeof this.props.children === 'string') {
      text = this.props.children;
    }

    return (
      <span className={cx} onClick={this.props.onChange}>{text}</span>
    )
  }
}
