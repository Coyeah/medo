import React, {useCallback} from 'react';
import {Icon, message} from 'antd';
import TextEdit from '@/components/TextEdit';
import Copycat from '@/components/Copycat';

const WrappedTextEdit: React.FC = (props: object): React.ReactElement => {
  const {onDelete, prefixCls, value, ...restProps} = props;
  const onCopyClick = useCallback(() => {
    message.success('复制成功！');
  }, [value]);
  return (
    <div className={`${prefixCls}-input`}>
      <TextEdit value={value} {...restProps}>
        {onDelete && (
          <Icon type="delete" onClick={onDelete} />
        )}
        <Copycat value={value} onClick={onCopyClick} />
      </TextEdit>
    </div>
  )
}

export default WrappedTextEdit;
