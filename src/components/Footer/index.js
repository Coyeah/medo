import React from 'react';
import {Icon} from 'antd';
import styles from './index.less';

import config from '../../common/config';

export default function Footer () {
  return (
    <div id={styles.footer}>
      <div className={styles.social}>
        {
          config.map((value, index) => (
            <div key={index} className={styles.underline}>
              <a href={value.path} target='_blank'>
                <Icon type={value.icon} />
              </a>
            </div>
          ))
        }
      </div>
      <p>Copyright 2019 &copy; Created by Coyeah</p>
    </div>
  )
}
