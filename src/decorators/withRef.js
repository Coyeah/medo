import React, { PureComponent } from 'react';
import _ from 'lodash';

export default WrappedComponent => class WithRef extends PureComponent {
  render() {
    const props = { ...this.props };
    const { getInstance } = props;
    if (_.isFunction(getInstance)) {
      props.ref = getInstance;
    }
    return <WrappedComponent {...props} />;
  }
}
