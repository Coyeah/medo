import React, { Fragment } from 'react';

import './index.less';

export default class Home extends React.Component {
  render () {
    return (
      <div className={'homeLayout'}>
        <p className={'title'}>一个简单的 ToDo List</p>
        <ul style={{ listStyle: 'none' }}>
          <li className={'list'}>v1.0.0 - 基于 <code>redux</code> 的基础 ToDo List 实现基础代码框架。</li>
          <li className={'list'}>v1.1.0 - 新增 <code>FoldCard</code> 展示组件，修改 list 样式。</li>
          <li className={'list'}>v1.2.0 - 新增页面路由权限，用户登录注册功能；修改 menu 结构。</li>
        </ul>
      </div>
    )
  }
}
