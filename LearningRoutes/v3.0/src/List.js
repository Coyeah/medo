// List.js

import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class List extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    todos: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleCheckBox(e) {
    let text = e.target.getAttribute('data-text');
    let isDone = e.target.getAttribute('data-isDone') == "false" ? true : false;  // typeof isDone => string
    let startTime = e.target.getAttribute('data-startTime');

    let newTodoItem = {
      text: text,
      isDone: isDone,
      startTime: startTime,
    }

    this.props.resetTodoItem(newTodoItem);
  }

  getList() {
    return(
      this.props.todos.map((todo, index) => {
        if (todo.startTime == this.props.onDate) {
          const { classPrefix } = this.props;

          const cx = classnames({
            [`${classPrefix}-item`]: true,
          });

          const cxText = classnames({
            [`${classPrefix}-item-text`]: true,
            [`${classPrefix}-done`]: todo.isDone,
          });

          const cxOperate = classnames({
            [`${classPrefix}-item-operate`]: true,
          });

          const done = todo.isDone ? "取消" : "完成"; 

          return(
            <li className={cx} role="todoItem">
              <div className={cxText}>{todo.text}</div>
              <div className={cxOperate}>
                <div data-isDone={todo.isDone} data-text={todo.text} data-startTime={todo.startTime} onClick={this.handleCheckBox}>{done}</div>
              </div>
            </li>
          );
        } 
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