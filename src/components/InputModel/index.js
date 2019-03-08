import React from 'react';
import {findDOMNode} from 'react-dom';
import {Modal, Input} from 'antd';

export default class InpudModel extends React.PureComponent {
  componentDidUpdate() {
    this.inputFocus();
  }
  inputFocus = () => {
    if (!this.input) return null;
    const input = findDOMNode(this.input);
    input.focus();
  }
  render() {
    const {props} = this
    return (
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        footer={null}
        closable={false}
      >
        <Input
          ref={el => {this.input = el; this.inputFocus()}}
          placeholder={props.placeholder}
          onPressEnter={props.onPressEnter}
          onChange={props.onChange}
          value={props.value}
          style={{padding: 20}}
        />
        <div style={{textAlign: 'right', marginTop: 20}}>
          {props.children}
        </div>
      </Modal>
    )
  }
}
