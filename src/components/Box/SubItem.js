import React, {Fragment} from 'react';
import {
  Icon, Divider,
} from 'antd';
import classnames from 'classnames';
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
      <div className={classnames({[styles.block]: true, [styles.append]: true})} onClick={props.onClick}>
        <Icon type={'plus'} /><Divider type="vertical" />{props.children}
      </div>
    )
  } else {
    return (
      <div className={styles.block} onClick={props.onClick}>
        {number[props.index]}<Divider type="vertical" />{props.children}
      </div>
    )
  }
}
