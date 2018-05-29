// ListOperate.js
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';

class ListOperate extends Component {
  static propTypes = {
    todoId: PropTypes.number,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: 'todo',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { classPrefix } = this.props;
    const cx = classnames({
      [`${classPrefix}-operate`]: true,
    });

    const cxDone = classnames({
      [`${classPrefix}-operate-btn`]: true,
      [`${classPrefix}-operate-disable`]: this.props.todoId ? false : true,
    });

    const canDel = (this.props.todos.length ? true : false) && !this.props.todos.every((value, index) => {
      if (value.isDone) {
        return false;
      } else {
        return true;
      }
    });

    const cxDel = classnames({
      [`${classPrefix}-operate-btn`]: true,
      [`${classPrefix}-operate-disable`]: !canDel,
    });

    return (
      <div className={cx}>
        <div>{this.props.todoId} items waitting</div>
        <div className={cxDone} onClick={this.props.actions.doneAll}>FINISH ALL</div>
        <div className={cxDel} onClick={this.props.actions.delDone}>CLEAR FINISHED</div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  todoId: state.todoState.todoId,
  todos: state.todoState.todos,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ItemsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOperate)