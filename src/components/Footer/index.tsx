import React from 'react';
import {Icon} from 'antd';
import styles from './index.module.less';
import {location} from '../../common/config';

const Footer: React.FC = (): React.ReactElement => (
  <div id={styles.footer}>
    <div className={styles.social}>
      {
        location.map((value, index) => (
          <div key={index} className={styles.underline}>
            <a href={value.path} target='_blank'>
              <Icon type={value.icon} />
            </a>
          </div>
        ))
      }
    </div>
    <p>Copyright {(new Date()).getFullYear() === 2019 ? '2019' : `2019 - ${(new Date()).getFullYear()}`} &copy; Created by Coyeah</p>
  </div>
)

export default Footer;
