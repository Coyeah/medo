import React from 'react';
import {Button, Popover, Divider, Modal} from 'antd';
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
    visible: false,
    target: [],
  };

  componentDidMount() {
    this.setState({
      list: getStorage(),
    });
  };

  onInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  saveList = (list = []) => {
    if (list instanceof Array) {
      setStorage(list);
      this.setState({
        list,
        inputValue: '',
        visible: false,
        target: [],
      });
    }
  }

  addItem = (index = -1, ind = -1) => {
    const {list} = this.state;
    if (index >= 0) {
      list[index].children.push({
        name: '',
        createTime: moment(),
      })
    } else {
      list.push({
        name: '',
        children: [],
        createTime: moment(),
      })
    }
    this.saveList(list);
  }

  changeItem = () => {
    const {list, inputValue, target} = this.state;
    if (target[1] < 0) {
      list[target[0]].name = inputValue;
    } else {
      list[target[0]].children[target[1]].name = inputValue;
    }
    this.saveList(list);
  }

  delItem = () => {
    const {list, target} = this.state;
    if (target[1] < 0) {
      list.splice(target[0], 1);
    } else {
      list[target[0]].children.splice(target[1], 1);
    }
    this.saveList(list);
  }

  onItemClick = (target) => {
    const {list} = this.state;
    let inputValue = '';
    if (target[1] < 0) {
      inputValue = list[target[0]].name;
    } else {
      inputValue = list[target[0]].children[target[1]].name;
    }
    this.setState({
      visible: true,
      target,
      inputValue,
    })
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

  renderInputModel = () => {
    return (
      <Modal
        visible={this.state.visible}
        onCancel={() => this.setState({visible: false, target: [], inputValue: ''})}
        footer={null}
        closable={false}
      >
        <InputBox
          placeholder={'输入你要做的事情，然后，嗯，回车。'}
          onPressEnter={this.changeItem}
          onChange={this.onInputChange}
          value={this.state.inputValue}
          style={{padding: 20}}
        />
        <Button block size="small" type="danger" onClick={this.delItem}>删除条目</Button>
      </Modal>
    )
  }

  render() {
    return (
      <div id={styles.layout} style={{minHeight: document.body.offsetHeight}}>
        <Header />
        <Box
          data={this.state.list}
          addItem={this.addItem}
          onClick={this.onItemClick}
        />
        <Footer />
        <Fixed funcConponent={this.renderOption} />
        {this.renderInputModel()}
      </div>
    )
  }
}

export default Home;
