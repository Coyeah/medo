import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import {Input} from 'antd';
import styles from './index.module.less';

const { TextArea } = Input;

const Editor: React.FC = (props: object): React.ReactElement => {
  const {type, value, onConfirm, onChange, ...restProps} = props;
  const Wrapped = type === 'textarea' ? TextArea : Input;
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const onInputBlur = useCallback(() => {
    onConfirm && onConfirm();
  }, [onConfirm]);
  const onInputChange = useCallback(e => {
    if (e && e.target && typeof e.target.value === 'string') onChange && onChange(e.target.value);
  }, [onChange]);
  return (
    <div className={styles['text-edit-textarea']} {...restProps}>
      <Wrapped
        ref={inputRef}
        value={value}
        onBlur={onInputBlur}
        onChange={onInputChange}
        onPressEnter={onInputBlur}
      />
    </div>
  )
}

export default Editor;

// class Editor extends React.PureComponent {
//
//   componentDidMount() {
//     if (this.inputRef) {
//       this.inputRef.focus();
//     }
//   }
//
//   setInputRef = el => {
//     this.inputRef = el;
//   }
//
//   onInputBlur = () => {
//     const {onConfirm} = this.props;
//     onConfirm && onConfirm();
//   }
//
//   onInputChange = e => {
//     if (e && e.target && e.target.value) {
//       const {onChange} = this.props;
//       onChange && onChange(e.target.value);
//     }
//   }
//
//   render() {
//     const {type, value} = this.props;
//     const Wrapped = type === 'textarea' ? TextArea : Input;
//
//     return (
//       <div className={styles['text-edit-textarea']}>
//         <Wrapped
//           ref={this.setInputRef}
//           onBlur={this.onInputBlur}
//           value={value}
//           onChange={this.onInputChange}
//         />
//       </div>
//     )
//   }
// }
