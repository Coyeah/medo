import React, {useCallback} from 'react';
import {Icon, Popconfirm, message} from 'antd';
import TextEdit from '@/components/TextEdit';
import Copycat from '@/components/Copycat';
import DelIcon from './DelIcon';

const WrappedTextEdit: React.FC = (props: object): React.ReactElement => {
  const {onDelete, prefixCls, value, ...restProps} = props;
  const onCopyClick = useCallback(() => {
    message.success('复制成功！');
  }, [value]);
  return (
    <div className={`${prefixCls}-input`}>
      <TextEdit value={value} {...restProps}>
        {onDelete && (
          <DelIcon onDelete={onDelete} />
        )}
        <Copycat value={value} onClick={onCopyClick} />
      </TextEdit>
    </div>
  )
}

export default WrappedTextEdit;
