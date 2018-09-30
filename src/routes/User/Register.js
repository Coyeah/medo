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

import { USER_REGISTER_REQ } from '../../sagas/global';

class Register extends React.Component {
  checkPassword = (rule, value, callback) => {
    if (!value) {
       callback('Please input your Password!');
     } else {
      if (value.length < 6) {
        callback('Password is not long enough!');
      } else {
        callback();
      }
     }
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Entered passwords do not match!');
    } else {
      callback();
    }
  }

  handleOk = (parse) => {
    this.props.dispatch({
      type: USER_REGISTER_REQ,
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
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ validator: this.checkPassword }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="至少六位密码，区分大小写" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ validator: this.checkConfirm }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
          或 <Link to='/user/login'>已有账户</Link>
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

export default connect()(Form.create()(Register));
