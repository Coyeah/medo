import React from 'react';
import {Popover} from 'antd';

const Ellipsis: React.FC = (props: object): React.ReactElement => {
  const {text, limit, show} = props;
  if (typeof text === 'string' && text.length > limit) {
    if (show) {
      return (
        <Popover content={<span>{text}</span>}>
          <span>{text.slice(0, limit)}...</span>
        </Popover>
      )
    } else {
      return (
        <span>{text.slice(0, limit)}...</span>
      )
    }
  } else {
    return (
      <span>{text}</span>
    )
  }
}

export default Ellipsis;
