import React from 'react';
import {
  Icon, Divider,
} from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export default function (props) {

  return (
    <div className={styles.panel}>
      {
        props.new ? (
          <div className={classnames({[styles.block]: true, [styles.append]: true})} onClick={props.onClick}>
            <Icon type="plus"/><Divider type="vertical" />{props.title}
          </div>
        ) : (
          <div className={styles.block} onClick={props.onClick}>
            <Icon type="tag" /><Divider type="vertical" />{props.title}
          </div>
        )
      }
      <div style={{marginLeft: 50}}>
        {props.children}
      </div>
    </div>
  )
}
