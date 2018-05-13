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
      this.state.todos.unshift(newTodoItem);
      this.setState({
        todos: this.state.todos,
      });
    }
  }

  resetTodoItem(newTodoItem) {
    let todoList = [];
    let todoTarget = new Object();

    this.state.todos.map((todo, index) => {
      if (todo.text == newTodoItem.text) {
        todo.isDone = newTodoItem.isDone;
        todoTarget = todo;
      } else {
        todoList.push(todo);
      }
    });

    if (todoTarget.isDone) {
      todoList.push(todoTarget);
    } else {
      todoList.unshift(todoTarget);
    }

    this.setState({
      todos: todoList,
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

  renderList() {
    const { classPrefix } = this.props;

    return(
      <List
        key="list"
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
        {this.renderList()}
        {this.renderOperate()}
      </div>
    );
  }
}

export default Todo;