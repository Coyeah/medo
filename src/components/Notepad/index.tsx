import React, {
  useCallback, useState,
} from 'react';
import {Card, Icon} from 'antd';
import classnames from 'classnames';
import Dialog from '@/components/Dialog';
import TextEdit from './WrappedTextEdit';
import AddIcon from './AddIcon';
import Item from './Item';
import Remarks from './Remarks';
import DelIcon from './DelIcon';
import './index.less';

const prefixCls = 'medo-item-box',
  indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
  cardBodyStyle = {padding: 15};

const Notepad: React.FC = (props: object): React.ReactElement => {
  const {
    index, name, list,
    onChange,
  } = props;
  const [isFold, setIsFold] = useState(list.length >= 7);
  const handleFold = useCallback(() => {
    setIsFold(!isFold);
  }, [isFold]);
  const addItem = useCallback(() => {
    setIsFold(false);
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
  const onRemarksChange = useCallback((childrenIndex) => {
    if (!onChange) return;
    const remarksProps = {
      list: list[childrenIndex].remarks,
      onClick: newList => {
        onChange(3, {index, childrenIndex, target: newList})
      }
    }
    Dialog.open({
      titleRender: () => (<div><Icon type="appstore" /> 任务备注</div>),
      transition: true,
      content: (
        <Remarks {...remarksProps} />
      ),
      maskClosable: true,
      footerRender: () => null
    })
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
        />
      </div>
      { !isFold && list.map((val, ind) => (
          <Item
            key={ind}
            prefixCls={prefixCls}
            item={val}
            onTextChange={value => onItemTextChange(value, ind)}
            onRemarksChange={() => onRemarksChange(ind)}
            onItemDelete={() => onItemDelete(ind)}
          />
        ))
      }
      <div className={`${prefixCls}-options`}>
        <Icon type="up-circle" onClick={handleFold} className={`${prefixCls}-options-icon`} style={{transform: isFold && 'rotate(180deg)'}} />
        <Icon type="plus-circle" onClick={addItem} className={`${prefixCls}-options-icon`} />
        <DelIcon onDelete={delItem} className={`${prefixCls}-options-icon`} />
      </div>
    </Card>
  )
}

Notepad.Add = (props: object): React.ReactElement => (
  <AddIcon prefixCls={prefixCls} {...props} />
);

export default Notepad;
