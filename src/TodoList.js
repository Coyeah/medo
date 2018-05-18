// TodoList.js

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
    classPrefix: 'todo-main-todolist',
  };

  constructor(props) {
    super(props);

    this.addTodoItem = this.addTodoItem.bind(this);
    this.resetTodoItem = this.resetTodoItem.bind(this);
    this.checkTodoAll = this.checkTodoAll.bind(this);
    this.checkTodoDel = this.checkTodoDel.bind(this);

    this.state = {
      todos: [],
    };
  }

  addTodoItem(newTodoItem) {
    let isExist = false;

    this.props.todos.map((todo, index) => {
      if (todo.text == newTodoItem.text) {
        isExist = true;
      }
    });

    if (!isExist) {
      this.props.todos.unshift(newTodoItem);
      this.props.updateTodos(this.props.todos)
    }
  }

  resetTodoItem(newTodoItem) {
    let todoList = [];
    let todoTarget = new Object();

    this.props.todos.map((todo, index) => {
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

    this.props.updateTodos(todoList);
  }

  checkTodoAll(isCheckAll) {
    if (isCheckAll && this.props.todos != null) {
      this.props.todos.map((todo, index) => {
        if (todo.startTime == this.props.onDate) { 
          todo.isDone = true;
        }
      });

      this.props.updateTodos(this.props.todos);
    }
  }

  checkTodoDel(isCheckDel) {
    if (isCheckDel && this.props.todos != null) {
      let newTodos = [];

      this.props.todos.map((todo, index) => {
        if (!todo.isDone || todo.startTime != this.props.onDate) {
          newTodos.push(todo);
        }
      });
      
      this.props.updateTodos(newTodos);
    }
  }

  renderTodoInput() {
    const { classPrefix } = this.props;

    return(
      <Input
        key="todoInput"
        classPrefix={classPrefix}
        addTodoItem={this.addTodoItem.bind(this)}
        onDate={this.props.onDate}
      />
    );
  }

  renderList() {
    const { classPrefix } = this.props;

    return(
      <List
        key="list"
        classPrefix={classPrefix}
        todos={this.props.todos}
        resetTodoItem={this.resetTodoItem.bind(this)}
        onDate={this.props.onDate}
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
    const cx = className;

    return(
      <div className={cx}>
        <div>
          {this.renderTodoInput()}
          {this.renderList()}
          {this.renderOperate()}
        </div>

      </div>
    );
  }
}

export default Todo;