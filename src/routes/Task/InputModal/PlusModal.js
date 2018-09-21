import React, { Fragment } from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class TaskForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        let deadline, createTime, id;
        {
          let date = new Date(values.deadline);
          deadline = `${date.getFullYear()}-${parseInt(date.getMonth()) + 1}-${date.getDate()}`;
        }
        {
          let date = new Date();
          createTime = `${date.getFullYear()}-${parseInt(date.getMonth()) + 1}-${date.getDate()}`;
          id = date.getTime();
        }

        this.props.addTask({
          ...values,
          createTime,
          deadline,
          id,
          status: 0,
        });
        this.props.form.resetFields();
        this.props.closeModal();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('taskName', {
            rules: [{ required: true, message: 'Please input your task!' }],
          })(
            <Input suffix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="TaskName" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('deadline', {
            rules: [{ required: true, message: 'Please input your deadline!' }],
          })(
            <DatePicker style={{ width: '100%' }} placeholder="Deadline" format="YYYY-MM-DD" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('detial', {
            rules: [{ required: false }],
          })(
            <TextArea placeholder="TaskDetial" autosize />
          )}
        </FormItem>
        <FormItem>
          <Button style={{ width: '100%' }} onClick={this.handleSubmit}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedTaskForm = Form.create()(TaskForm);

export default class PlusModal extends React.Component {

    handleCancel = (e) => {
      console.log(e);
      this.props.closeModal();
    }

  render() {
    return (
      <div>
        <Modal
          title="Task ?"
          visible={this.props.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <WrappedTaskForm addTask={this.props.addTask} closeModal={this.props.closeModal} />
        </Modal>
      </div>
    )
  }
}
