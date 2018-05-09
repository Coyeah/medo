// Todo.js

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Input from './Input';
import List from './List';
import Operate from './Operate';

class Todo extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    // children: PropTypes.oneOfType([
    //   PropTypes.arrayOf(PropTypes.node),
    //   PropTypes.node,
    // ]),
  };

  static defaultProps = {
    classPrefix: 'todo',
  };

  constructor(props) {
    super(props);

    this.addTodoItem = this.addTodoItem.bind(this);

    this.state = {
      todos: [],
    };
  }

  addTodoItem(newTodoItem) {
    let isExist = false;

    this.state.todos.map((todo, index) => {
      if (todo.text == newTodoItem.text) {
        isExist = true;
      }
    });

    if (!isExist) {
      this.state.todos.push(newTodoItem);
      this.setState({
        todos: this.state.todos,
      });
    }
  }

  resetTodoItem(newTodoItem) {
    this.state.todos.map((todo, index) => {
      if (todo.text == newTodoItem.text) {
        todo.isDone = newTodoItem.isDone;
      }
    });

    this.setState({
      todos: this.state.todos,
    });
  }

  checkTodoAll(isCheckAll) {
    if (isCheckAll) {
      this.state.todos.map((todo, index) => {
        todo.isDone = true;
      });

      this.setState({
        todos: this.state.todos,
      });
    }
  }

  checkTodoDel(isCheckDel) {
    if (isCheckDel) {
      let newTodos = [];

      this.state.todos.map((todo, index) => {
        if (!todo.isDone) {
          newTodos.push(todo);
        }
      });

      this.setState({
        todos: newTodos,
      });
    }
  }

  renderTodoInput() {
    const { classPrefix } = this.props;

    return(
      <Input
        key="todoInput"
        classPrefix={classPrefix}
        addTodoItem={this.addTodoItem.bind(this)}
      />
    );
  }

  renderListItem() {
    const { classPrefix } = this.props;

    return(
      <List
        key="listItem"
        classPrefix={classPrefix}
        todos={this.state.todos}
        resetTodoItem={this.resetTodoItem.bind(this)}
      />
    );
  }

  renderOperate() {
    const { classPrefix } = this.props;

    return(
      <Operate
        key="operate"
        classPrefix={classPrefix}
        checkTodoAll={this.checkTodoAll.bind(this)}
        checkTodoDel={this.checkTodoDel.bind(this)}
      />
    );
  }

  render() {
    const { className } = this.props;
    const cx = classnames(className, 'ui-todo');

    return(
      <div className={cx}>
        {this.renderTodoInput()}
        {this.renderListItem()}
        {this.renderOperate()}
      </div>
    );
  }
}

export default Todo;