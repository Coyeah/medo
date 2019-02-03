import React from 'react';
import {Tag, Divider, Button, Popover} from 'antd';
import styles from './index.less';

const status = ['紧急', '进行', '待办', '完成', '取消'];
const colors = ['#F5222D', '#1890FF', '#FAAD14', '#52C41A', '#D9D9D9'];

export default function ListItem (props) {

  const content = (
    <div>
      <a onClick={props.onUrgent}>紧急</a>
      <Divider type="vertical" />
      <a onClick={props.onDoing}>进行</a>
      <Divider type="vertical" />
      <a onClick={props.onWait}>待办</a>
      <Divider type="vertical" />
      <a onClick={props.onOk}>完成</a>
      <Divider type="vertical" />
      <a onClick={props.onCancel}>取消</a>
      <Divider type="vertical" />
      <a onClick={props.onDelete}>删除</a>
    </div>
  );
  const Option = () => {
    return (
      <Popover content={content} trigger="click" placement="right">
        <Button type="primary" ghost icon="ellipsis" size="small" />
      </Popover>
    )
  };

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div style={{lineHeight: '1.6rem'}}>
          <Tag color={colors[props.status]}>{status[props.status]}</Tag>
          <span
            style={{
              color: props.status === 0 ? colors[props.status] : '',
              textDecoration: props.status === 4 ? 'line-through' : '',
            }}
          >{props.children}</span>
        </div>
      </div>
      <div className={styles.option}>
        <span style={{textAlign: 'right', fontSize: '0.8rem'}}>{props.time}</span>
        <Divider type="vertical" />
        <Option />
      </div>
    </div>
  )
}
