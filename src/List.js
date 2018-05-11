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

    let newTodoItem = {
      text: text,
      isDone: isDone,
    }

    this.props.resetTodoItem(newTodoItem);
  }

  getList() {
    return(
      this.props.todos.map((todo, index) => {
        const { classPrefix } = this.props;

        const cx = classnames({
          [`${classPrefix}-item`]: true,
          [`${classPrefix}-done`]: todo.isDone,
        });

        const cxText = classnames({
          [`${classPrefix}-item-text`]: true,
        });

        const cxOperate = classnames({
          [`${classPrefix}-item-operate`]: true,
        });

        const done = todo.isDone ? "取消" : "完成"; 

        // return(
        //   <li className={cx} role="todoItem"><input type="checkbox" value={todo.text} checked={todo.isDone} onChange={this.handleCheckBox} />{todo.text}</li>
        // );
        return(
          <li className={cx} role="todoItem">
            <div className={cxText}>{todo.text}</div>
            <div className={cxOperate}>
              <div data-isDone={todo.isDone} data-text={todo.text} onClick={this.handleCheckBox}>{done}</div>
            </div>
          </li>
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