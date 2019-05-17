import React, { useState, useEffect, useRef} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
// import identity from '@/decorators/identity';
import styles from './basicLayout.module.less';

const {MenuItem} = Menu;

// @identity('medo-user')
const BasicLayout = props => {
  const {config} = props;
  const [paddingBottom, setPaddingBottom] = useState(0);
  const footerRef = useRef(null);
  useEffect(() => {
    if (!!footerRef.current) {
      setPaddingBottom(footerRef.current.offsetHeight);
    }
  });
  const location = window.location.hash;
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
        <Menu>
          {config.map(({path, icon, name}) => (
            <MenuItem key={path} icon={icon} path={path} name={name} focus={location.replace('#', '') === path} />
          ))}
        </Menu>
      </div>
      <div className={styles.background} />
    </>
  )
}

export default BasicLayout;
