import React, {Fragment} from 'react';
import {Button, Card, Icon, Tag, Typography} from 'antd';
import _ from 'lodash';
import identity from '@/decorators/identity';
import Notepad from '@/components/Notepad';
import TextEdit from '@/components/TextEdit';
import {queryListData} from '@/services';
import styles from './index.module.less';

// @identity('medo-user')
class Medo extends React.PureComponent {
  state = {
    targetIndex: -1,
    data: [],
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

  setData = value => {

  }

  render() {
    const {data} = this.state;
    console.log(data);
    return (
      <div className={styles.layout}>
        {data.map((value, index) => (
          <Notepad key={value.id} index={index} name={value.name} list={value.children} />
        ))}
      </div>
    )
  }
}

export default Medo;
