import React, { Fragment } from 'react';

import './index.less';

export default class Home extends React.Component {
  render () {
    return (
      <div className={'homeLayout'}>
        <p className={'title'}>一个简单的 ToDo List</p>
        <ul style={{ listStyle: 'none' }}>
          <li className={'list'}>v1.0.0 - 基于 <code>redux</code> 的基础 ToDo List 实现基础代码框架。</li>
          <li className={'list'}>v1.0.1 - 实现路由跳转修正，List 样式修改。</li>
        </ul>
      </div>
    )
  }
}
