// Todo.js

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Input from './Input';
import List from './List';

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
    this.state.todos.push(newTodoItem);
    this.setState({
      todos: this.state.todos,
    });
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
      </div>
    );
  }
}

export default Todo;