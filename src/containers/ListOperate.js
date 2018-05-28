// ListOperate.js
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';

class ListOperate extends Component {
  render() {
    return (
      <div>
        <div>{this.props.todoId}</div>
        <div onClick={this.props.actions.doneAll}>FINISH ALL</div>
        <div onClick={this.props.actions.delDone}>CLEAR FINISHED</div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  todoId: state.todoState.todoId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ItemsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOperate)