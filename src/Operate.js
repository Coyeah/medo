// Operate.js

import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Operate extends Component {
  static propsTypes = {
    classPrefix: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
  }

  handleClickAll(e) {
    this.props.checkTodoAll(true);
  }

  handleClickDel(e) {
    this.props.checkTodoDel(true);
  }

  render() {
    const { classPrefix } = this.props;

    const cx = classnames({
      [`${classPrefix}-operate`]: true,
    });

    return(
      <div className={cx} role="listoperate">
        <button onClick={this.handleClickAll}>全选</button><button onClick={this.handleClickDel}>删除已完成</button>
      </div>
    );
  }
}

export default Operate;