import React, { Fragment } from 'react';
import {
  Button,
} from 'antd';
import { connect } from 'react-redux';

import { ADD_NEW_TASK } from '../../reducers/task';
import './index.less';
import InputModal from './InputModal';
import Card from '../../components/Card';

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
          {taskList.map((value, index) => {
            return (
              <Card key={index} width={'25%'} title={value.taskName}>
                <p>{value.createTime}</p>
              </Card>
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
