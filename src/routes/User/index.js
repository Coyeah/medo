import React, { Fragment } from 'react';
import {
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.less';
import userAvatar from '../../assets/user.svg';

import { USER_CLEAR } from '../../reducers/global';

class User extends React.Component {
  handleLogout = () => {
    this.props.dispatch({ type: USER_CLEAR });
  }

  userInfoRender = () => {
    const { currentUser } = this.props.global;
    if (currentUser.token) {
      return (
        <Fragment>
          <h1>{currentUser.username || 'admin'}</h1>
          <div
            style={{ textAlign: 'center', margin: '30px 0', cursor: 'pointer' }}
            onClick={this.handleLogout}
          >
            注销
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Link to={'/user/login'}><div className={'operation-btn'}>登录</div></Link>
          <Link to={'/user/register'}><div className={'operation-btn'}>注册</div></Link>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className={'userLayout'}>
        <div className={'prefix'}>ToDo</div>
        <div className={'avatar'} style={{ backgroundImage: `url(${userAvatar})` }} />
        <div className={'info'}>
          {this.userInfoRender()}
        </div>
        <div className={'suffix'}>打造一个适用好用的任务管理，用它方便地组织和安排计划。</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  global: state.global,
});

export default connect(
  mapStateToProps
)(User);
