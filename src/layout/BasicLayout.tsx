import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './basicLayout.module.less';

const BasicLayout = props => {
  return (
    <div className={styles.basicLayout}>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.container}>
        {props.children}
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
      <div className={styles.background} />
    </div>
  )
}

export default BasicLayout;
