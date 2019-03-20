import React, {Fragment, PureComponent} from 'react';
import {
  Drawer, Button,
} from 'antd';
import WrappedForm from './WrappedForm';
import styles from './index.module.less';

class Edit extends PureComponent<Props, object> {
  onSubmit = e => {
    if (!this.form) return;
    this.form.onSubmit(e).then((data) => {
      this.props.onSubmit(data);
    })
  }

  render() {
    const {
      onClose, visible, onDelete
    } = this.props;

    return (
      <Drawer
        title="任务编辑"
        width={620}
        onClose={onClose}
        visible={visible}
        className={styles.editLayout}
      >
        {
          visible && (<WrappedForm wrappedComponentRef={el => this.form = el}  init={this.props.init} />)
        }
        <div className={styles.footer}>
          <Button onClick={this.onSubmit} type="primary" style={{ marginRight: 8 }}>
            确认
          </Button>
          <Button onClick={onClose}>
            取消
          </Button>
          <Button onClick={onDelete} type='danger' style={{ float: 'right' }}>
            删除
          </Button>
        </div>
      </Drawer>
    )
  }
}

export default Edit;
