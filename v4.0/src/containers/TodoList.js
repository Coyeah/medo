// TodoList.js

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';

import ListItem from '../components/ListItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <ListItem todos={this.props.todoState.todos} doneTodo={this.props.actions.doneTodo} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoState: state.todoState,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ItemsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
