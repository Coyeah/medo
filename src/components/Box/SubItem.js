import React, {Fragment} from 'react';
import {
  Icon, Popover, Divider,
} from 'antd';
import styles from './index.less';

const number = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
];

export default function (props) {

  const content = (
    <div>
      Hello World
    </div>
  );

  if (props.new) {
    return (
      <div className={styles.block}>
        <Icon type={'plus'} /><Divider type="vertical" />{props.children}
      </div>
    )
  } else {
    return (
      <Popover placement="topLeft" content={content} trigger="click">
        <div className={styles.block}>
          {number[props.index]}<Divider type="vertical" />{props.children}
        </div>
      </Popover>
    )
  }
}
