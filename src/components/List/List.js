import React from 'react';

import style from './style.scss';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList = (data) => {
    if (data.length === 0) {
      const cx = 'emptyList'
      return (
        <li><p className={cx}>暂无数据</p></li>
      )
    } else {
      return (
        data.map(value => {
          return (
            <li><div>{value.content}</div><div>{value.createAt}</div><div><a href="#">DEL</a></div></li>
          )
        })
      )
    }
  }

  render() {
    const cx = 'listModule';
    const cxTitle = 'title';
    const cxList = 'list';

    return (
      <div className={cx}>
        <ul className={cxTitle}>
          <li><div>内容</div><div>时间</div><div>操作</div></li>
        </ul>
        <ul className={cxList}>
          {this.renderList(this.props.data)}
        </ul>
      </div>
    )
  }
}
