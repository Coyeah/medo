import React, {Fragment, Component} from 'react';
import {
  Button, Card, Icon, Tag,
} from 'antd';
import styles from './index.module.less';
import {getStorage, setStorage} from '../../utils/storage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Box from '../../components/Box';


class Home extends Component<Props, object> {
  state = {
    data: [],
  }

  componentDidMount() {
    const data = getStorage() || [];
    this.setState({data});
  }

  boxRender = () => {
    const {data} = this.state;
    if (!data || data.length === 0) {
      return (
        <Card>
          <div style={{textAlign: 'center'}}>
            <h1>思维导图式待办事项</h1>
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
          <Box name={vlaue.name} index={index} list={children} />
        ))
      }
      </Fragment>
    )
  }

  render() {
    return (
      <div id={styles.layout} style={{minHeight: document.body.offsetHeight - 10}}>
        <Header />
        {this.boxRender()}
        <Button block type='primary' style={{marginTop: 20}}>添加任务</Button>
        <Footer />
      </div>
    )
  }
}

export default Home;
