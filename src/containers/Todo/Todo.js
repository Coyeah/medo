import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Input/Input';

class Todo extends React.Component {
  render() {
    return (
      <div>
        <Input />
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
