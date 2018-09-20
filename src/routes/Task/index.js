import React, { Fragment } from 'react';
import {
  Button,
  Collapse,
} from 'antd';
import { connect } from 'react-redux';
const Panel = Collapse.Panel;

import { ADD_NEW_TASK } from '../../reducers/task';
import './index.less';
import InputModal from '../../components/InputModal';

class Task extends React.Component {
  addTask = (item) => {
    this.props.dispatch({
      type: ADD_NEW_TASK,
      payload: {
        item,
      }
    })
  }

  taskListRender = () => {
    const { taskList } = this.props.task;
    if (taskList.length) {
      return(
        <Fragment>
          <Collapse bordered={false}>
            {taskList.map((value, index) => {
              return (
                <Panel header={value.taskName} key={index}>
                  <p>{value.detial}</p>
                  <p>{new Date(value.deadline.toString()).getTime()}</p>
                </Panel>
              )
            })}
          </Collapse>
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
