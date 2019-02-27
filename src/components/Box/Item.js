import React from 'react';
import {
  Icon, Popover, Divider,
} from 'antd';
import styles from './index.less';

export default function (props) {

  const content = (
    <div>
      Hello World
    </div>
  );

  return (
    <div className={styles.panel}>
      {
        props.new ? (
        <div className={styles.block}>
          <Icon type="plus" /><Divider type="vertical" />{props.title}
        </div>
        ) : (
        <Popover placement="topLeft" content={content} trigger="click">
          <div className={styles.block}>
            <Icon type="tag" /><Divider type="vertical" />{props.title}
          </div>
        </Popover>
        )
      }
      <div style={{marginLeft: 50}}>
        {props.children}
      </div>
    </div>
  )
}
