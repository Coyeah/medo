import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import './index.less';

class TaskForm extends React.Component {
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
            <DatePicker style={{ width: '100%' }} placeholder="Deadline" format="YYYY-MM-DD" onChange={(date, dateString) => { console.log(date, dateString); }} />
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
          <Button style={{ width: '100%' }} onClick={this.props.handleSubmit}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedTaskForm = Form.create()(TaskForm);

class InputModal extends React.Component {
    handleSubmit = (e) => {
      console.log(e);
      this.props.closeModal();
    }

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
          <WrappedTaskForm handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    )
  }
}

class Task extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className={'taskLayout'}>
        <div className={'Task'}>
          暂无数据
        </div>
        <div><Button onClick={this.showModal}><Icon type="plus" theme="outlined" /></Button></div>
        <InputModal visible={this.state.visible} showModal={this.showModal} closeModal={this.closeModal} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Task: state.Task
})

export default connect(
  mapStateToProps
)(Task);
