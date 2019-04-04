import React, { PureComponent } from 'react';
import _ from 'lodash';

export default (merge = true) => WrappedComponent => class WithSetProps extends PureComponent {
  state = {};

  setProps = props => {
    const { state } = this;
    // merge 是在两个对象遇到相同属性时，如果属性值为纯对象或集合时，则把两个属性值和合并而并不覆盖。
    this.setState(merge ? _.merge({}, state, props) : {...state, ...props});
  };

  forceUpdateProps = () => {
    this.forceUpdate();
  };

  render() {
    const { setProps, forceUpdateProps, props, state } = this;
    const methods = { setProps, forceUpdateProps };
    const mergeStateToProps = merge ? _.merge({}, props, state, methods) : { ...props, ...state, ...methods};
    return <WrappedComponent {...mergeStateToProps} />
  }
}
