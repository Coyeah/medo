import React, {Fragment} from 'react';
import {findDOMNode} from 'react-dom';
import {Button, Popover, Divider, Icon} from 'antd';
import moment from 'moment';
import styles from './index.less';

import {setStorage, getStorage} from '../../utils/storage';
import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import InputModel from '../../components/InputModel/';
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
      if (list[index].children.length === 10) return null;
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
  focItem = () => {
    this.changeItem();
    const {list, target} = this.state;
    if (target[1] < 0) {
      let temp = list.splice(target[0], 1);
      list.unshift(temp[0]);
    } else {
      let temp = list[target[0]].children.splice(target[1], 1);
      list[target[0]].children.unshift(temp[0]);
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
    });
  }
  renderOption = () => {
    const FuncContent = (
      <div>
        <a onClick={() => this.saveList([])}><Icon type="delete" /> 清除所有</a>
        <Divider type="vertical" />
        <a onClick={() => {window.open('https://www.coyeah.top/timer')}}><Icon type="branches" /> Timer（时间轴）</a>
      </div>
    );
    return (
      <Fragment>
        <Popover placement="right" content={FuncContent} trigger="click">
          <Button block
            icon="bars"
            style={{fontSize: '1.2rem'}}
            type="primary"
          />
        </Popover>
      </Fragment>
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
        <InputModel
          ref={el => {this.input = el}}
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false, target: [], inputValue: ''})}
          placeholder={'输入你要做的事情，然后，嗯，回车。'}
          onPressEnter={this.changeItem}
          onChange={this.onInputChange}
          value={this.state.inputValue}
        >
          <Button size="small" type="primary" onClick={this.focItem}>任务置顶</Button>
          <Divider type="vertical" />
          <Button size="small" type="danger" onClick={this.delItem}>删除条目</Button>
        </InputModel>
      </div>
    )
  }
}

export default Home;
