// Todo.js

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TodoList from './TodoList';
import Calendar from './Calendar';

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
    classPrefix: 'todo-main',
  };

  constructor(props) {
    super(props);

    this.resetOnDate = this.resetOnDate.bind(this);

    let date = new Date();

    this.state = {
      onDate: date.toLocaleDateString(),
    };
  }

  resetOnDate(newDate) {
    this.setState({
      onDate: newDate,
    });
  }

  render() {
    const { className } = this.props;
    const { classPrefix } = this.props;

    const cx = classnames(className, 'ui-todo');

    const cxTodoList = `${classPrefix}-todolist`;

    const cxCalendar = `${classPrefix}-calendar`;

    const onDate = this.state.onDate;

    return(
      <div className={cx}>
        <TodoList className={cxTodoList} classPrefix={cxTodoList} onDate={onDate} />
        <Calendar 
          className={cxCalendar} 
          classPrefix={cxCalendar} 
          onDate={onDate}
          resetOnDate={this.resetOnDate.bind(this)} 
        />
      </div>
    );
  }
}

export default Todo;