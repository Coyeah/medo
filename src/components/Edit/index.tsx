import React, {Fragment, PureComponent} from 'react';
import {
  Drawer, Button, Divider
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
      onClose, visible, onDelete, onTop,
    } = this.props;

    return (
      <Drawer
        title={
          <div>
            任务编辑
            {
              !!this.props.init && (
                <Fragment>
                  <Divider type="vertical" />
                  <Button icon="to-top" size='small' onClick={onTop}>置顶</Button>
                </Fragment>
              )
            }
          </div>
        }
        width={620}
        onClose={onClose}
        visible={visible}
        className={styles.editLayout}
      >
        {
          visible && (<WrappedForm wrappedComponentRef={el => this.form = el}  init={this.props.init} onSubmit={this.onSubmit} />)
        }
        <div className={styles.footer}>
          <Button onClick={this.onSubmit} type="primary" style={{ marginRight: 8 }}>
            确认
          </Button>
          <Button onClick={onClose}>
            取消
          </Button>
          {
            !!this.props.init && (<Button onClick={onDelete} type='danger' style={{ float: 'right' }}>删除</Button>)
          }
        </div>
      </Drawer>
    )
  }
}

export default Edit;
