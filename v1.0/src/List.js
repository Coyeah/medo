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
    let value = e.target.value;
    let isDone = e.target.checked;

    let newTodoItem = {
      text: value,
      isDone: isDone,
    }

    this.props.resetTodoItem(newTodoItem);
  }

  getList() {
    // let str = '';
    // this.props.todos.map((todo, index) => {
    //   str = str + "<li>" + todo.text + "</li>";
    // })
    // console.log(str);
    
    return(
      this.props.todos.map((todo, index) => {
        const { classPrefix } = this.props;

        const cx = classnames({
          [`${classPrefix}-item`]: true,
          [`${classPrefix}-done`]: todo.isDone,
        });

        return(
          <li className={cx} role="todoItem"><input type="checkbox" value={todo.text} checked={todo.isDone} onChange={this.handleCheckBox} />{todo.text}</li>
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