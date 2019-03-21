import React, {Fragment, Component} from 'react';
import {
  Form, Input, Timeline, Button, Icon
} from 'antd';
import styles from './index.module.less';

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
    let {data} = this.state;
    data.children.splice(index, 1, null);
    this.setState({data});
  }

  onSubmit = e => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          const {data} = this.state;
          data.children = data.children.filter(value => !!value);
          resolve(data);
        }
      });
    });
  }

  keyDownHandler = e => {
    if (e.keyCode === 13) {
      this.props.onSubmit(e);
    }
  }

  render() {
    const {
      init,
      form: {getFieldDecorator}
    } = this.props;

    if (!this.state.data) {
      return null;
    }
    const {data: {children: items}} = this.state

    const formItems = items && items.map((item, index) => {
      if (!item) return null;
      return (
        <Timeline.Item key={index}>
          <Form.Item >
            {
              getFieldDecorator(`subtasks[${index}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, message: (<span className={styles.warning}>该选项不可为空</span>) }],
              })(
                <Input addonAfter={<Icon type="delete" onClick={() => this.delItem(index)} />} onChange={e => this.onInputChange(e.target.value, index)} autoComplete="off" onKeyDown={this.keyDownHandler} />
              )
            }
          </Form.Item>
        </Timeline.Item>
      )
    });

    return (
      <Fragment>
        <div className={styles.main}>
          <Form.Item >
            {
              getFieldDecorator('taskName', {
                rules: [{ required: true, message: (<span className={styles.warning}>该选项不可为空</span>) }],
              })(
                <Input addonBefore={'目标任务'} onChange={e => this.onInputChange(e.target.value, -1)} autoComplete="off" onKeyDown={this.keyDownHandler} />
              )
            }
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
