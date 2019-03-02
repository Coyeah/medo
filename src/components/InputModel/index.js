import React from 'react';
import {Modal, Input} from 'antd';

export default class InpudModel extends React.PureComponent {
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
