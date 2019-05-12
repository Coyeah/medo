import React from 'react';
import {Icon} from 'antd';
import TextEdit from '@/components/TextEdit';

const WrappedTextEdit: React.FC = (props: object): React.ReactElement => {
  const {onDelete, prefixCls, ...restProps} = props;
  return (
    <div className={`${prefixCls}-input`}>
      <TextEdit {...restProps}>
        {onDelete && (
          <Icon type="delete" onClick={onDelete} />
        )}
      </TextEdit>
    </div>
  )
}

export default WrappedTextEdit;
