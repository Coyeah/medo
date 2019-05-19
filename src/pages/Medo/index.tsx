import React, {Fragment, Component} from 'react';
import {Card, Icon, Tag} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import Notepad from '@/components/Notepad';
import {generateUUID} from '@/utils/';
import {queryListData, updateListData} from '@/services';
import styles from './index.module.less';

const tags = ['分层级', '备忘录', '任务指标', '细化任务']
const {Add} = Notepad;

class Medo extends Component {
  state = {
    targetIndex: -1,
    data: [],
    set: [],
    map: {},
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let data = [];
    try {
      data = await queryListData();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ data });
    }
  }

  setData = async list => {
    await updateListData({ list });
  }

  formatData = (data) => {
    if (!data) data = this.state.data;
    let set = [], map = {};
    data.forEach(value => {
      set.push(value.id);
      map[value.id] = value;
    });
    this.setState({set, map});
  }
  /**
   * flag: 0 - add; 1 - change; 2 - delete; 3 - change remarks;
   * map: {'index': 'father-location', 'childrenIndex': 'children-location'}
   */
  handleNotepadItem = (flag, {index, childrenIndex, target}) => {
    const {data} = this.state;
    console.log(flag, index, childrenIndex, target);
    switch (flag) {
      case 0:
        if (typeof index !== 'undefined') {
          data[index].children.push({
            name: '',
            createTime: new Date(),
            remarks: [],
          })
        } else {
          data.push({
            id: generateUUID(),
            name: '',
            createTime: new Date(),
            children: [],
          })
        }
        break;
      case 1:
        if (typeof childrenIndex !== 'undefined') {
          data[index].children[childrenIndex].name = target;
        } else {
          data[index].name = target;
        }
        break;
      case 2:
        if (typeof childrenIndex !== 'undefined') {
          data[index].children.splice(childrenIndex, 1);
        } else {
          data.splice(index, 1);
        }
        break;
      case 3:
        data[index].children[childrenIndex].remarks = target;
        break;
    }
    this.setState({data}, () => {
      this.setData(data);
    })
  }

  addNewItem = () => {
    this.handleNotepadItem(0, {});
  }

  emptyRender = () => {
    return (
      <Card className={styles.empty}>
        <div className={styles.title}>思维导图式待办事项</div>
        {tags.map((value, index) => (
          <div key={index} className={styles.tag}>{value}</div>
        ))}
        <div className={styles.tips}>立刻开始记事之旅 <Icon type="caret-down" /></div>
      </Card>
    )
  }

  render() {
    const {data} = this.state;
    return (
      <div className={styles.layout}>
        {data.map((value, index) => (
          <Notepad
            key={value.id}
            index={index}
            name={value.name}
            list={value.children}
            onChange={this.handleNotepadItem}
          />
        ))}
        {data.length === 0 && this.emptyRender()}
        <Add onClick={this.addNewItem} />
      </div>
    )
  }
}

export default Medo;
