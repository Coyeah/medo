import React, {Fragment, PureComponent} from 'react';
import {
  Button, Popover, Icon
} from 'antd';
import moment from 'moment';
import styles from './index.module.less';
import {getStorage} from '../../utils/storage';
import blober from '../../utils/blober';

const FixedItem: React.FC = (props: object): React.ReactElement => {
  let body = !!props.text && <b>{props.text}</b>;
  if (props.render) {
    body = props.render;
  }
  return (
    <Fragment>
      {body && (
        <Popover content={body} placement="right" trigger="hover">
          <Button onClick={props.onClick} icon={props.icon} style={{fontSize: 20, marginBottom: 8}} />
        </Popover>
      )}
      {!body && (<Button onClick={props.onClick} icon={props.icon} style={{fontSize: 20, marginBottom: 8}} />)}
    </Fragment>
  )
}

export default class Fixed extends PureComponent {
  onDownload = () => {
    let list = getStorage();
    if (list.length === 0) return;
    let target = '';
    list.forEach((value, index) => {
      target += `# ${index + 1}: ${value.name} [createTime: ${moment(value.createTime).format('YYYY-MM-DD HH:mm:SS')}]\n\n`;
      value.children && value.children.forEach((val, ind) => {
        target += `## ${index + 1}-${ind + 1}: ${val.name} [createTime: ${moment(value.createTime).format('YYYY-MM-DD HH:mm:SS')}]\n\n`;
      });
    });
    blober(target, `medo-list-${moment().format('YYYYMMDD')}.md`, 'text/plain');
  }

  introRender = () => {
    return (
      <Fragment>
        <h2>Coyeah</h2>
        <p>面向前端开发，在折腾的道路上不断折腾。</p>
        <p>一个在入门 React 的时候练手的项目 —— Todo List。再再再一次重写。</p>
        <p>在之前开发的 Todo List 中，为了刻意联系，因此尝试在不断的在项目中加各种，如 redux、antd 等。很赘余，很繁重。也没见的多好看。</p>
        <p><del>现在，化繁为简。只用简单的模块化和 react，再加些 antd 的样式作佐料。</del></p>
        <p>呸！又折腾了 <b>TypeScript</b>。（回看 branch v0.1.0）</p>
        <p>Github项目 >> <a href="https://github.com/Coyeah/medo">传送门</a></p>
        <p>如果喜欢，给我一个 <Icon type="star" />Star。</p>
      </Fragment>
    )
  }

  render() {
    return (
      <div id={styles.fixed}>
        <FixedItem icon="smile" render={this.introRender()} />
        <FixedItem icon="download" text="下载至本地" onClick={this.onDownload} />
      </div>
    )
  }
}
