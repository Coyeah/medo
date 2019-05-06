import React, {Fragment} from 'react';
import {Icon} from 'antd';
import classnames from 'classnames';
import Editor from './Editor';
import styles from './index.module.less';

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
      props: {type, bold, children},
      state: {isEdit, current},
      onEditChange, onValueChange, setContentRef
    } = this;
    if (isEdit) {
      return <Editor type={type || 'input'} value={current} onChange={onValueChange} onConfirm={onEditChange} />
    } else {
      return (
        <div ref={setContentRef} className={styles['text-edit-content']}>
          <span className={classnames({[styles['text-edit-bold']]: bold})}>{current}</span>
          <Icon onClick={onEditChange} className={styles['text-edit-options']} type="edit" />
          {React.Children.map(children, (child, key) =>
            React.cloneElement(child, {
              className: styles['text-edit-options']
            })
          )}
        </div>
      )
    }
  }

  render() {
    return (
      <div className={styles['text-edit-layout']}>
        {this.contentRender()}
      </div>
    )
  }
}

export default TextEdit;
