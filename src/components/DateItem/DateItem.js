import React from 'react';

import style from './style.scss';

export default class DateItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cx = 'DateItem';
    const style = this.props.now ? {} : {};

    return (
      <div className={cx} style={style}>
        <p>{this.props.title}</p>
      </div>
    );
  }
}
