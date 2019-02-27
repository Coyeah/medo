import React from 'react';
import {Button, Popover, Divider} from 'antd';
import moment from 'moment';
import styles from './index.less';

import {setStorage, getStorage} from '../../utils/storage';
import InputBox from '../../components/InputBox/';
import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import Fixed from '../../components/Fixed/';
import Box from '../../components/Box';

const [urgent, doing, wait, done, cancel] = [0,1,2,3,4];

class Home extends React.Component {
  state = {
    inputValue: '',
    list: [],
  };

  componentDidMount() {
    this.setState({
      list: getStorage(),
    });
  };

  renderOption = () => {
    const FuncContent = (
      <div>
        <a onClick={() => this.saveList([])}>清除所有</a>
      </div>
    );

    return (
      <Popover placement="top" content={FuncContent} trigger="click">
        <Button block
          icon="edit"
          style={{fontSize: '1.2rem'}}
          type="primary"
        />
      </Popover>
    )
  }

  render() {
    return (
      <div id={styles.layout} style={{minHeight: document.body.offsetHeight}}>
        <Header />
        <Box />
        <Footer />
        <Fixed funcConponent={this.renderOption} />
      </div>
    )
  }
}

export default Home;
