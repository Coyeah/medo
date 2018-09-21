import React from 'react';
import {
  Icon
} from 'antd';

import './index.less';

class About extends React.Component {
  render() {
    return (
      <div className={'aboutLayout'}>
        <p className={'title'}>一个简单的 ToDo List</p>

        <p>目的在于重构原有的 Todo List，想着使用自己学到的东西去刻意练习。使得项目显得有些部分是没有必要和臃肿的。</p>

        <p>本想着使用 <code>redux</code> 和 <code>redux-saga</code> 来对状态进行处理的。</p>

        <p>想起了不知道在哪看来的一句话：</p>

        <blockquote>
          <p>如果你不知道是否需要 Redux，那就是不需要它。</p>
        </blockquote>

        <p>感觉很多技术都可以套用这个道理，写着写着也就觉得不需要了。就没有往下这个方向去写了。但是还是需要强调刻意练习的重要性。</p>

        <p>当前状态是用 react 的状态管理，并没有后台的支持。当中还会存在一些代码设计上的问题，往后会继续补充和更新。</p>

        <p>用到相关的主要技术有：</p>

        <p><code>antd</code>、<code>react-router</code>、<code>webpack</code>、<code>react</code>、<code>less</code>、<code>redux</code>。</p>

        <p>如有任何问题，欢迎向我提出。乐意解答和一起交流。</p>

        <p><Icon type="home" theme="outlined" /> <a href='http://www.coyeah.top' target='_Blank'>www.coyeah.top</a></p>
        <p><Icon type="github" theme="outlined" /> <a href='https://github.com/Coyeah/react-todo' target='_Blank'>github.com/Coyeah/react-todo</a></p>
        <p><Icon type="mail" theme="outlined" /> <a href='mailto:coyeah_chen@outlook.com' target='_Blank'>coyeah_chen@outlook.com</a></p>

        <p className={'sign'}>—— Coyeah</p>
      </div>
    )
  }
}

export default About;
