import React, { useState, useEffect, useRef} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './basicLayout.module.less';

const BasicLayout = props => {
  const [paddingBottom, setPaddingBottom] = useState(0);
  const footerRef = useRef(null);
  useEffect(() => {
    if (!!footerRef.current) {
      setPaddingBottom(footerRef.current.offsetHeight);
    }
  });
  return (
    <>
      <div className={styles.basicLayout} style={{paddingBottom}}>
        <header className={styles.header}>
          <Header />
        </header>
        <div className={styles.container}>
          {props.children}
        </div>
        <footer className={styles.footer} ref={footerRef}>
          <Footer />
        </footer>
      </div>
      <div className={styles.background} />
    </>
  )
}

export default BasicLayout;
