// AddTodo.js

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';
import addTodo from '../actions/';
import { connect } from 'react-redux';

class AddTodo extends Component {
  static propTypes = {
    todoId: PropTypes.number,
    todos: PropTypes.array,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: 'todo',
  };

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleKeyDown(e) {
    if (e.keyCode == '13') {
      let inputValue = e.target.value;

      if (!inputValue) return false;

      let newTodoItem = {
        text: inputValue,
        isDone: false,
      }

      this.setState({
        inputValue: '',
      });

      this.props.actions.addTodo(newTodoItem);
    }
  }

  render() {
    const { inputValue } = this.state;
    const placeholder = 'What to do...';

    const { classPrefix } = this.props;
    const cx = classnames({
      [`${classPrefix}-input`]: true,
    });

    return (
      <div>
        <input className={cx} type="text" value={inputValue} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder={placeholder} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoId: state.todoState.todoId,
  todos: state.todoState.todos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ItemsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo)
