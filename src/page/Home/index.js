import React from 'react';
import {Button, Popover, Divider} from 'antd';
import moment from 'moment';
import styles from './index.less';

import {setStorage, getStorage} from '../../utils/storage';
import InputBox from '../../components/InputBox/';
import ListBox from '../../components/ListBox/';
import Footer from '../../components/Footer/';
import Fixed from '../../components/Fixed/';

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

  saveList = (list) => {
    this.setState({
      list,
      inputValue: '',
    });
    setStorage(list);
  }

  onInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addItem = (item) => {
    const {inputValue, list} = this.state;
    if (!item) {
      item = {
        content: inputValue,
        createTime: moment(Date.now()).format('YYYY/MM/DD HH:mm'),
        status: doing,
      };
    }

    let key = 0;
    list.some((value, index) => {
      if (value.status >= item.status) return true;
      key = index + 1;
      return false;
    })
    list.splice(key, 0, item);
    this.saveList(list);
  };

  delItem = (index) => {
    const {list} = this.state;
    list.splice(index, 1);
    this.saveList(list);
  }

  statusItem = (index, status) => {
    const {list} = this.state;
    let item = list.splice(index, 1)[0];
    item.status = status;
    this.addItem(item);
  }

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
        <div className={styles.title}>
          Medo
          <span className={styles.subTitle}>A Memo For Todo</span>
        </div>
        <InputBox
          placeholder={'输入你要做的事情，然后，嗯，回车。'}
          onPressEnter={() => this.addItem()}
          onChange={this.onInputChange}
          value={this.state.inputValue}
          style={{padding: 20}}
        />
        <ListBox
          list={this.state.list}
          onDelete={this.delItem}
          onUrgent={(index) => this.statusItem(index, urgent)}
          onWait={(index) => this.statusItem(index, wait)}
          onCancel={(index) => this.statusItem(index, cancel)}
          onOk={(index) => this.statusItem(index, done)}
          onDoing={(index) => this.statusItem(index, doing)}
        />
        <Footer />
        <Fixed funcConponent={this.renderOption} />
      </div>
    )
  }
}

export default Home;
