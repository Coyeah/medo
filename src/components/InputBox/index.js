import React from 'react';
import {Input} from 'antd';

export default function InputBox (props) {
  return (
    <div style={{ margin: '0 15px'}}>
      <Input {...props} />
    </div>
  )
}
