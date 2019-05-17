import React, {Fragment} from 'react';
import {Icon} from 'antd';
import classnames from 'classnames';
import Editor from './Editor';
import './index.less';

const prefixCls = 'medo-text-edit';

class TextEdit extends React.PureComponent {
  state = {
    isEdit: false,
    current: ''
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { prevValue } = prevState;
    const { value } = nextProps;
    const newState = {
      prevValue: value,
    };
    if (prevValue !== value) {
      newState.current = value;
    }
    return newState;
  }

  onEditChange = value => {
    if (value && typeof value === 'string') {
      this.setState({
        isEdit: !this.state.isEdit,
        current: value,
      });
    } else if (!!value) {
      this.setState({ isEdit: !this.state.isEdit });
      return;
    } else {
      this.setState({ isEdit: !this.state.isEdit });
      value = this.state.current;
    }
    const {prevValue} = this.state;
    if (value !== prevValue) {
      const {onConfirm} = this.props;
      onConfirm && onConfirm(value);
    }
  }

  onValueChange = value => {
    const {onChange} = this.props;
    this.setState({current: value}, () => {
      onChange && onChange(value);
    });
  }

  setContentRef = el => {
    this.contentRef = el;
  }

  contentRender = () => {
    const {
      props: {type, bold, children, placeholder},
      state: {isEdit, current},
      onEditChange, onValueChange, setContentRef
    } = this;
    if (isEdit) {
      return (
        <Editor
          prefixCls={prefixCls}
          type={type || 'input'}
          value={current}
          onChange={onValueChange}
          onConfirm={onEditChange}
        />
      )
    } else {
      return (
        <div ref={setContentRef} className={`${prefixCls}-content`}>
          {
            current ? (
              <span className={classnames({[`${prefixCls}-bold`]: bold})}>{current}</span>
            ) : (
              <span className={classnames(`${prefixCls}-placeholder`)}>{placeholder || `请编辑文本内容`}</span>
            )
          }
          <Icon onClick={onEditChange} className={`${prefixCls}-options`} type="edit" />
          {React.Children.map(children, (child, key) =>
            React.cloneElement(child, {
              className: `${prefixCls}-options`
            })
          )}
        </div>
      )
    }
  }

  render() {
    return (
      <div className={`${prefixCls}-layout`}>
        {this.contentRender()}
      </div>
    )
  }
}

export default TextEdit;
