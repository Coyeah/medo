import React, {Fragment, PureComponent} from 'react';
import {
  Timeline, Card, Divider, Input, Popover,
  DatePicker, Tag, Row, Col,
} from 'antd';
import moment from 'moment';
import {storage} from '../../utils';

const InputGroup = Input.Group;
const format = 'YYYY-MM-DD';

class Panel extends PureComponent<Props, object> {
  state = {
    data: {},
    datePickerValue: moment(),
    inputValue: '',
  }

  componentDidMount() {
    const data = storage('medo-map') || {};
    this.setState({data});
  }

  addPlan = () => {
    const {inputValue, datePickerValue, data} = this.state;
    if (!inputValue) return;
    let timer = datePickerValue.format(format);
    data[timer] = data[timer] ? [inputValue, ...data[timer]] : [inputValue];
    this.setState({data, inputValue: ''}, () => {
      storage('medo-map', data);
    });
  }

  // itemRender = () => {
  //   let date = moment().day(-14);
  //   return [...Array(21)].map((value, index) => {
  //     let timer = date.add(1, 'days').format(format);
  //     return (
  //       <Timeline.Item key={index}>
  //         <Tag color={timer === moment().format(format) && "#00796B"}>{timer}</Tag>
  //         <Divider type="vertical"/>
  //         {
  //           !this.state.data[timer]
  //             ? (
  //               <span>========</span>
  //             )
  //             : (
  //               <Popover content={this.state.data[timer].map((value, index) => (
  //                 <p key={index}>{index + 1}: {value}<a onClick={() => {}} style={{float: 'right', marginLeft: 20}}>X</a></p>
  //               ))} placement="top">
  //                 <b>{this.state.data[timer][0]}</b>
  //               </Popover>
  //             )
  //         }
  //       </Timeline.Item>
  //     )
  //   });
  // }

  render() {
    return (
      <Card>
        <InputGroup compact>
          <DatePicker
            style={{ width: '20%' }}
            value={this.state.datePickerValue}
            onChange={date => this.setState({datePickerValue: date})}
            placeholder="计划日期"
          />
          <Input
            style={{ width: '80%' }}
            value={this.state.inputValue}
            onChange={e => this.setState({inputValue: e.target.value})}
            onPressEnter={this.addPlan}
            placeholder="三十个字说出你的计划，回车提交。"
            maxLength={30}
          />
        </InputGroup>
      </Card>
    )
  }
}

export default Panel;
