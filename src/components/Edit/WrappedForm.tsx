import React, {Fragment, Component} from 'react';
import {
  Form, Input, Timeline, Button, Icon, Popover
} from 'antd';
import classnames from 'classnames';
import styles from './index.module.less';
import Dialog from '@/components/Dialog';
import Remarks from './Remarks';

@Form.create()
class WrappedForm extends Component<Props, object> {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        createTime: new Date(),
        children: [],
      },
      bin: [],
    }
  }

  componentDidMount() {
    const {init, form: {setFieldsValue}} = this.props;
    if (!!init) {
      this.setState({data: init}, () => {
        const subtasks = init.children.map(value => value.name);
        setFieldsValue({
          taskName: init.name,
          subtasks,
        });
      });
    }
  }

  onInputChange = (value, index) => {
    if (typeof index !== 'number') return;
    let {data} = this.state;
    if (index === -1) {
      data.name = value;
      this.props.form.setFieldsValue({
        taskName: value,
      });
    } else {
      data.children[index].name = value;
      let subtasks = this.props.form.getFieldValue('subtasks');
      subtasks[index] = value;
      this.props.form.setFieldsValue({subtasks});
    }
    this.setState({data});
  }

  addItem = () => {
    let {data} = this.state;
    data.children.push({
      name: '',
      createTime: new Date(),
    });
    this.setState({data});
  }

  delItem = index => {
    let {state: {data, bin}, props: {form: {setFieldsValue}}} = this;
    let del = data.children.splice(index, 1);
    if (del[0].name !== '') {
      bin = [...del, ...bin];
    }
    this.setState({data, bin}, () => {
      const subtasks = data.children.map(value => value.name);
      setFieldsValue({ taskName: data.name, subtasks });
    });
  }

  updateRemarks = (newList, index) => {
    let {data} = this.state;
    data.children[index].remarks = [...newList];
    this.setState({data});
  }

  remarksRender = (remarks = [], index) => {
    Dialog.open({
      titleRender: () => (<div><Icon type="appstore" /> 备注</div>),
      transition: true,
      content: (
        <Remarks list={remarks} onClick={newList => this.updateRemarks(newList, index)} />
      ),
      maskClosable: true,
      footerRender: () => null
    })
  }

  onSubmit = e => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const {data, bin} = this.state;
          data.children = data.children.filter(value => !!value);
          resolve({data, bin});
        }
      });
    });
  }

  keyDownHandler = e => {
    if (e.keyCode === 13) this.props.onSubmit(e);
  }

  render() {
    const { init, form: {getFieldDecorator} } = this.props;
    if (!this.state.data) return null;
    const {data: {children: items}} = this.state
    const formItems = items && items.map((item, index) => {
      if (!item) return null;
      const remarksCx = classnames({
        [styles.remarksExisted]: item.remarks && item.remarks.length > 0,
      })
      return (
        <Timeline.Item key={index}>
          <Form.Item >
            {getFieldDecorator(`subtasks[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: (<span className={styles.warning}>该选项不可为空</span>) }],
            })(
              <Input
                addonBefore={
                  <Popover content={'备注'} trigger="hover">
                    <Icon type="appstore" onClick={() => this.remarksRender(item.remarks, index)} className={remarksCx} />
                  </Popover>
                }
                addonAfter={
                  <Popover content={'删除'} trigger="hover">
                    <Icon type="delete" onClick={() => this.delItem(index)} />
                  </Popover>
                }
                onChange={e => this.onInputChange(e.target.value, index)}
                onKeyDown={this.keyDownHandler}
              />
            )}
          </Form.Item>
        </Timeline.Item>
      )
    });

    return (
      <Fragment>
        <div className={styles.main}>
          <Form.Item >
            {getFieldDecorator('taskName', {
              rules: [{ required: true, message: (<span className={styles.warning}>该选项不可为空</span>) }],
            })(
              <Input
                addonBefore={'目标任务'}
                onChange={e => this.onInputChange(e.target.value, -1)}
                onKeyDown={this.keyDownHandler}
              />
            )}
          </Form.Item>
          <div className={styles.sub}>
            <Timeline>
              {formItems}
              <Timeline.Item>
                <Button block onClick={this.addItem} type="dashed">添加子任务</Button>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default WrappedForm;
