// List.js

import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class List extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    todos: PropTypes.array,
  };

  getList() {
    let str = '';
    this.props.todos.map((todo, index) => {
      str = str + "<li>" + todo.text + "</li>";
    })
    return(
      this.props.todos.map((todo, index) => {
        return(
          <li>{todo.text}</li>
        );
      })
    );
  }

  render() {
    const { classPrefix } = this.props;

    const cx = classnames({
      [`${classPrefix}-list`]: true,
    });

    return(
      <div>
        <ul className={cx} role="todolist">
          {this.getList()}
        </ul>
      </div>
    );
  }
};

export default List;