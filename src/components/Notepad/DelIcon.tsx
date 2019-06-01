import React from 'react';
import {Icon, Popconfirm} from 'antd';

const DelIcon: React.FC = (props: object): React.ReactElement => {
  const {onDelete, ...restProps} = props;
  return (
    <Popconfirm
      title="确认删除该任务项？"
      onConfirm={onDelete}
      okText="确认"
      cancelText="取消"
    >
      <Icon type="delete" {...restProps} />
    </Popconfirm>
  )
}

export default DelIcon;
