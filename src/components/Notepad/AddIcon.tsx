import React from 'react';
import {Icon} from 'antd';

const textStyle = {marginRight: 8};

const AddIcon: React.FC = (props: object): React.ReactElement => {
  const {prefixCls, text, ...restProps} = props;
  return (
    <div className={`${prefixCls}-add`} {...restProps}>
      {text && (<span style={textStyle}>{text}</span>)}
      <Icon type="plus-circle" />
    </div>
  )
}

export default AddIcon;
