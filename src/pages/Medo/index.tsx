import React, {Fragment} from 'react';
import {Card, Icon, Tag} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import identity from '@/decorators/identity';
import Notepad from '@/components/Notepad';
import {generateUUID} from '@/utils/';
import {queryListData, updateListData} from '@/services';
import styles from './index.module.less';

const {Add} = Notepad;

// @identity('medo-user')
class Medo extends React.Component {
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
   * flag: 0 - add; 1 - change; 2 - delete;
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
    }
    console.log(data);
    this.setState({data}, () => {
      this.setData(data);
    })
  }

  addNewItem = () => {
    this.handleNotepadItem(0, {});
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
        <Add onClick={this.addNewItem} />
      </div>
    )
  }
}

export default Medo;
