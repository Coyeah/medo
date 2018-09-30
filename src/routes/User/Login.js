import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd';
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.less';
import userAvatar from '../../assets/user.svg';

import { USER_LOGIN_REQ } from '../../sagas/global';

class Login extends React.Component {
  handleOk = (parse) => {
    this.props.dispatch({
      type: USER_LOGIN_REQ,
      payload: {
        ...parse
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.handleOk(values);
      }
    });
  }

  formRender = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <Link to='/user/register'>即刻注册</Link>
        </FormItem>
      </Form>
    )
  }

  render() {
    return (
      <div className={'userLayout'}>
        <div className={'prefix'}>ToDo</div>
        <div className={'avatar'} style={{ backgroundImage: `url(${userAvatar})` }} />
        {this.formRender()}
        <div className={'suffix'}>打造一个适用好用的任务管理，用它方便地组织和安排计划。</div>
      </div>
    )
  }
}

export default connect()(Form.create()(Login));
