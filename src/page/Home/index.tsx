import React, {Fragment, Component} from 'react';
import {
  Button, Card, Icon, Tag,
} from 'antd';
import _ from 'lodash';
import styles from './index.module.less';
import {getStorage, setStorage} from '../../utils/storage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Box from '../../components/Box';
import Edit from '../../components/Edit';

class Home extends Component<Props, object> {
  state = {
    targetIndex: -1,
    visible: false,
    data: [],
  }

  componentDidMount() {
    const data = getStorage() || [];
    this.setState({data});
  }

  showEdit = (index) => {
    this.setState({ visible: true, targetIndex: index, });
  }

  onClose = () => {
    this.setState({ visible: false, targetIndex: -1 });
  }

  onSubmit = (item) => {
    let {data, targetIndex} = this.state;
    if (targetIndex < 0) return;
    if (data.length === targetIndex) {
      data.push(item);
    } else {
      data.splice(targetIndex, 1, item);
    }
    setStorage(data);
    this.setState({data}, () => {
      this.onClose();
    });
  }

  onDelete = () => {
    const {data, targetIndex} = this.state;
    data.splice(targetIndex, 1);
    setStorage(data);
    this.setState({data}, () => {
      this.onClose();
    });
  }

  boxRender = () => {
    const {data} = this.state;
    if (!data || data.length === 0) {
      return (
        <Card>
          <div style={{textAlign: 'center'}}>
            <h2>思维导图式待办事项</h2>
            <Tag>分层级</Tag>
            <Tag>备忘录</Tag>
            <Tag>细化任务</Tag>
          </div>
        </Card>
      )
    }
    return (
      <Fragment>
        {
          data.map(({name, children}, index) => (
            <Box name={name} index={index} list={children} key={`${name}-${index}`} onClick={() => this.showEdit(index)} />
          ))
        }
      </Fragment>
    )
  }

  render() {
    const {data, targetIndex} = this.state;
    return (
      <div id={styles.layout} style={{minHeight: document.body.offsetHeight - 3}}>
        <Header />
        <div className={styles.box}>
          {this.boxRender()}
          <Button block type='primary' style={{marginTop: 20}} onClick={() => this.showEdit(this.state.data.length)}>添加任务</Button>
          <Edit
            visible={this.state.visible}
            onClose={this.onClose}
            onDelete={this.onDelete}
            init={_.cloneDeep(data[targetIndex])}
            onSubmit={this.onSubmit}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;
