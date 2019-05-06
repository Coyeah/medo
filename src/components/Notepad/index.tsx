import React from 'react';
import {Row, Col, Card} from 'antd';
import classnames from 'classnames';
import TextEdit from '@/components/TextEdit';
import Item from './Item';
import './index.less';

const prefixCls = 'medo-item-box';
const cardBodyStyle = {padding: 25};
const indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const Notepad: React.FC = (props: object): React.ReactElement => {
  const {
    index, name, list
  } = props;
  return (
    <Card hoverable bodyStyle={cardBodyStyle}>
      <div className={`${prefixCls}-layout`}>
        <div className={`${prefixCls}-title-index ${prefixCls}-bold`}>{indexMap[index]}、</div>
        <div className={`${prefixCls}-input`}><TextEdit value={name} bold /></div>
      </div>
      {
        list.map((value, index) => (
          <Item key={index} item={value} prefixCls={prefixCls} />
        ))
      }
    </Card>
  )
}

export default Notepad;
