import React, { Fragment } from 'react';
import {
  Button,
  Icon,
} from 'antd';
import { connect } from 'react-redux';

import { ADD_NEW_TASK } from '../../reducers/task';
import { DONE_TASK } from '../../reducers/task';
import { CANCAL_TASK } from '../../reducers/task';
import { DEL_OLD_TASK } from '../../reducers/task';
import { RESET_TASK } from '../../reducers/task';

import './index.less';
import InputModal from './InputModal';
import FoldCard from '../../components/FoldCard';

class Task extends React.Component {
  stopPropagation = (e) => {
    e.stopPropagation();
  }

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

  cancalTask = (id) => {
    this.props.dispatch({
      type: CANCAL_TASK,
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
            let status = 'normal';
            if (value.status === 1) {
              status = 'success';
            } else if (value.status === 2) {
              status = 'danger';
            }
            return (
              <FoldCard
                key={value.id}
                title={value.taskName}
                status={status}
              >
                <p><span style={{ fontWeight: 'bold' }}>Detial: </span>{value.detial}</p>
                <p><span style={{ fontWeight: 'bold' }}>Deadline: </span>{value.deadline}</p>
                <p><span style={{ fontWeight: 'bold' }}>Create Time: </span>{value.createTime}</p>
                <div style={{ textAlign: 'right' }}>
                  <Button shape="circle" icon="check" onClick={ (e) => {
                    this.stopPropagation(e);
                    this.doneTask(value.id);
                  }} />
                  <Button shape="circle" icon="close" onClick={ (e) => {
                    this.stopPropagation(e);
                    this.cancalTask(value.id);
                  }} />
                  <Button shape="circle" icon="sync" onClick={ (e) => {
                    this.stopPropagation(e);
                    this.resetTask(value.id);
                  }} />
                  <Button shape="circle" icon="delete" onClick={ (e) => {
                    this.stopPropagation(e);
                    this.delTask(value.id);
                  }} />
                </div>
              </FoldCard>
            )
          })}
        </Fragment>
      )
    } else {
      return(
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
          暂无任务
        </p>
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
