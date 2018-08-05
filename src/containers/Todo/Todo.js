import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Action from '../../reducers/Todo/action';
import Input from '../../components/Input/Input';
import List from '../../components/List/List';

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props.todo;
    const placeholder = 'What to do...';
    const actions = {
      addTodo: this.props.actions.addTodo,
    }

    return (
      <div>
        <Input placeholder={placeholder} actions={actions}  />
        <List data={list} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todo: state.Todo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Action, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
