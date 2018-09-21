import React, { Fragment } from 'react';
import {
  Button,
  Icon,
} from 'antd';
import { connect } from 'react-redux';

import { ADD_NEW_TASK } from '../../reducers/task';
import { DONE_TASK } from '../../reducers/task';
import { DEL_OLD_TASK } from '../../reducers/task';
import { RESET_TASK } from '../../reducers/task';

import './index.less';
import InputModal from './InputModal';
import Card from './Card';

class Task extends React.Component {
  addTask = (item) => {
    this.props.dispatch({
      type: ADD_NEW_TASK,
      payload: {
        item,
      }
    })
  }

  doneTask = (id) => {
    this.props.dispatch({
      type: DONE_TASK,
      payload: {
        id,
      }
    })
  }

  delTask = (id) => {
    this.props.dispatch({
      type: DEL_OLD_TASK,
      payload: {
        id,
      }
    })
  }

  resetTask = (id) => {
    this.props.dispatch({
      type: RESET_TASK,
      payload: {
        id,
      }
    })
  }

  taskListRender = () => {
    const { taskList } = this.props.task;
    if (taskList.length) {
      return(
        <Fragment>
          {taskList.map((value, index) => {
            return (
              <Card
                key={value.id}
                info={value}
                title={value.taskName}
                handleOK={this.doneTask}
                handleCancel={this.delTask}
                handleBack={this.resetTask}
              />
            )
          })}
        </Fragment>
      )
    } else {
      return(
        <Fragment>
          暂无数据
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className={'taskLayout'}>
        <div className={'taskList'}>
          {this.taskListRender()}
        </div>
        <div>
          <InputModal addTask={this.addTask} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  task: state.task
})

export default connect(
  mapStateToProps
)(Task);
