import React, {Fragment, Component} from 'react';
import {
  Button, Card, Icon, Tag,
  Typography
} from 'antd';
import _ from 'lodash';
import styles from './index.module.less';
import {storage, generateUUID} from '../../utils';
import identity from '../../decorators/identity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Box from '../../components/Box';
import Edit from '../../components/Edit';
import Panel from '../../components/Panel';
import Fixed from '../../components/Fixed';
import FixedItem from '../../components/Fixed/FixedItem';
import Dialog from '../../components/Dialog';

const { Paragraph } = Typography;

@identity('medo-user')
class Home extends Component<Props, object> {
  state = {
    targetIndex: -1,
    visible: false,
    data: [],
    isNormal: true,
  }

  componentDidMount() {
    const data = storage('medo-list') || [];
    this.setState({data});
  }

  saveStorage = value => {
    storage('medo-list', value);
  }

  showEdit = (index) => {
    this.setState({ visible: true, targetIndex: index, });
  }

  onClose = () => {
    this.setState({ visible: false, targetIndex: -1 });
  }

  onSubmit = (item) => {
    if (!item.id) item.id = generateUUID();
    let {data, targetIndex} = this.state;
    if (targetIndex < 0) return;
    if (data.length === targetIndex) {
      data.push(item);
    } else {
      data.splice(targetIndex, 1, item);
    }
    this.saveStorage(data);
    this.setState({data}, () => {
      this.onClose();
    });
  }

  onRecycle = bin => {
    if (bin.length === 0) return;
    let binList = storage('medo-bin') || [];
    bin = [...bin, ...binList];
    storage('medo-bin', bin.slice(0,10));
  }

  onDelete = () => {
    const {data, targetIndex} = this.state;
    let item = data.splice(targetIndex, 1);
    this.saveStorage(data);
    this.setState({data}, () => {
      this.onClose();
    });
  }

  onTop = () => {
    const {data, targetIndex} = this.state;
    data.unshift(data.splice(targetIndex, 1)[0]);
    this.saveStorage(data);
    this.setState({data}, () => {
      this.onClose();
    });
  }

  boxRender = () => {
    const {data} = this.state;
    if (!data || data.length === 0) {
      return (
        <Card>
          <div style={{textAlign: 'center'}} className={styles.panel}>
            <h1 className={styles.color}>思维导图式待办事项</h1>
            <Tag>分层级</Tag>
            <Tag>备忘录</Tag>
            <Tag>细化任务</Tag>
            <Button type='primary' style={{margin: '20px 25%', width: '50%'}} onClick={() => this.showEdit(this.state.data.length)}>添加任务</Button>
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

  recycleRender = () => {
    let bin = storage('medo-bin') || [];
    Dialog.open({
      titleRender: () => (<div><Icon type="delete" /> 回收站</div>),
      transition: true,
      render: () => (
        <Fragment>
          {
            bin.map((value, key) => (
              <Paragraph key={key} copyable>{value.name}</Paragraph>
            ))
          }
          {
            bin.length === 0 && (<h2 style={{textAlign: 'center'}}>空</h2>)
          }
        </Fragment>
      ),
      okText: '清空',
      cancelText: '返回',
      maskClosable: true,
      onSubmit: () => storage('medo-bin', null),
    })
  }

  render() {
    const {data, targetIndex, isNormal} = this.state;
    return (
      <div id={styles.layout} style={{minHeight: document.body.offsetHeight - 3}}>
        <div className={styles.background} />
        <Header />
        <div className={styles.box} style={{width: isNormal ? 630 : 1230}}>
          {
            isNormal ?
             (
               <Fragment>
                 {this.boxRender()}
                 <Edit
                   visible={this.state.visible}
                   onClose={this.onClose}
                   onDelete={this.onDelete}
                   onTop={this.onTop}
                   init={_.cloneDeep(data[targetIndex])}
                   onSubmit={this.onSubmit}
                   onRecycle={this.onRecycle}
                 />
               </Fragment>
             ) : (
               <Panel />
             )
          }
        </div>
        <Fixed>
          <FixedItem icon="calendar" text="日历" onClick={() => this.setState({isNormal: !isNormal})} />
          <FixedItem icon="plus" text="添加任务" disabled={!isNormal} onClick={() => this.showEdit(this.state.data.length)} type='primary' />
          <FixedItem icon="delete" text="回收站" disabled={!isNormal} onClick={this.recycleRender}/>
        </Fixed>
        <Footer />
      </div>
    )
  }
}

export default Home;
