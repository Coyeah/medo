import React, {useCallback} from 'react';
import {Row, Col, Popover, Icon} from 'antd';
import classnames from 'classnames';
import TextEdit from './WrappedTextEdit';

const Item: React.FC = (props: object): React.ReactElement => {
  const {item: {name, remarks}, onTextChange, onItemDelete, onRemarksChange, prefixCls, ...restProps} = props;
  let content = (<span>点击添加备注</span>),
    hasRemarks = false;
  if (remarks && remarks.length > 0) {
    hasRemarks = true;
    content = remarks.map((value, index) => (
      <div key={index}>{value}</div>
    ))
  }
  return (
    <div className={`${prefixCls}-sub`}>
      <div className={`${prefixCls}-prefix`}>
        <Popover content={content} placement="left">
          <Icon
            className={classnames({[`${prefixCls}-prefix-work`]: hasRemarks})}
            type="appstore"
            theme="filled"
            onClick={onRemarksChange}
          />
        </Popover>
      </div>
      <TextEdit
        prefixCls={prefixCls}
        value={name}
        onConfirm={onTextChange}
        onDelete={onItemDelete}
      />
    </div>
  )
}

export default Item;
