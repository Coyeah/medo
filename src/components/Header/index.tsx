import React from "react";
import styles from './index.module.less';

const Header: React.FC = (): React.ReactElement => (
  <div className={styles.title}>
    Medo
    <span className={styles.subTitle}>A Memo For Todo</span>
  </div>
);

export default Header;
