import React from 'react';
import {Drawer, Divider, Row, Col} from 'antd';
import styles from './index.less';

import logo from '../../assets/logo.svg';

const InfoContent = () => (
  <div>
    <Row>
      <Col offset={10} span={4} >
        <img src={logo} style={{width: '100%'}}/>
      </Col>
    </Row>
    <Divider>关于作者</Divider>
    <p>Coyeah （奇怪的英文名字）</p>
    <p>大四软工，读着某个不知名的三本，面相前端开发。</p>
    <p>美剧 & 旅行，想跑去外面多看看。</p>
    <p>有着很多很多想做的事情，好奇、幻想、爱折腾。</p>
    <p><b>wubba lubba dub dub</b></p>
    <Divider>关于项目</Divider>
    <p>2019-02-27更新：用了思维导图的方式来建立Todo List，分层级。更好的细化任务。</p>
    <p>一个在入门 React 的时候练手的项目—— Todo List。再再再一次重写。</p>
    <p>在之前开发的 Todo List 中，为了刻意联系，因此尝试在不断的在项目中加各种，如 redux、antd 等。很赘余，很繁重。也没见的多好看。</p>
    <p>现在，化繁为简。只用简单的模块化和 react，再加些 antd 的样式作佐料。</p>
    <p>Github项目<a href="https://github.com/Coyeah/medo">传送门</a></p>
  </div>
);

export default class Fixed extends React.PureComponent {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div id={styles.fixed}>
        <div>
          {this.props.funcConponent()}
        </div>
        <div><img onClick={this.showDrawer}
            src={logo}
            style={{width: '100%'}}
             /></div>
        <Drawer
            closable={false}
            onClose={this.onClose}
            placement="right"
            visible={this.state.visible}
            width={640}
        >
          <InfoContent />
        </Drawer>
      </div>
    );
  }
}
