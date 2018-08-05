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
    const { actions } = this.props;
    const placeholder = 'What to do...';

    return (
      <div>
        <Input placeholder={placeholder} actions={actions}  />
        <List data={list} actions={actions} />
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
