import React, {
  useCallback,
} from 'react';
import {Card, Icon} from 'antd';
import classnames from 'classnames';
import TextEdit from './WrappedTextEdit';
import AddIcon from './AddIcon';
import Item from './Item';
import './index.less';

const prefixCls = 'medo-item-box';
const cardBodyStyle = {padding: 25};
const indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const Notepad: React.FC = (props: object): React.ReactElement => {
  const {
    index, name, list,
    onChange,
  } = props;
  console.log(list.length);
  const addItem = useCallback(() => {
    onChange && onChange(0, {index});
  }, [onChange, index]);
  const delItem = useCallback(() => {
    onChange && onChange(2, {index});
  }, [onChange, index]);
  const onTextChange = useCallback(value => {
    onChange && onChange(1, {index, target: value})
  }, [onChange, index]);
  const onItemTextChange = useCallback((value, childrenIndex) => {
    onChange && onChange(1, {index, childrenIndex, target: value})
  }, [onChange, index]);
  const onItemDelete = useCallback((childrenIndex) => {
    onChange && onChange(2, {index, childrenIndex});
  }, [onChange, index]);
  return (
    <Card hoverable bodyStyle={cardBodyStyle}>
      <div className={`${prefixCls}-layout`}>
        <div className={`${prefixCls}-title-index ${prefixCls}-bold`}>
          {indexMap[index]}、
        </div>
        <TextEdit
          bold
          prefixCls={prefixCls}
          value={name}
          onConfirm={onTextChange}
          onDelete={delItem}
        />
      </div>
      {
        list.map((val, ind) => (
          <Item
            key={ind}
            prefixCls={prefixCls}
            item={val}
            onTextChange={value => onItemTextChange(value, ind)}
            onItemDelete={() => onItemDelete(ind)}
          />
        ))
      }
      <AddIcon prefixCls={prefixCls} onClick={addItem} />
    </Card>
  )
}

Notepad.Add = (props: object): React.ReactElement => (
  <AddIcon prefixCls={prefixCls} {...props} />
);

export default Notepad;
