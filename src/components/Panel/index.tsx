import React, {Fragment, Component} from 'react';
import {
  Card, Divider, Input, Popover, Icon,
  DatePicker, Tag, Row, Col, Typography
} from 'antd';
import moment from 'moment';
import styles from './index.module.less';
import {storage} from '../../utils';

const { Text } = Typography
const InputGroup = Input.Group;
const format = 'YYYY-MM-DD';

class Panel extends Component<Props, object> {
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

  delPlan = (timer, index) => {
    let {data} = this.state;
    data[timer].splice(index, 1);
    if (data[timer].length === 0) {
      delete data[timer];
    }
    this.setState({data}, () => {
      storage('medo-map', data);
    })
  }

  onItemClick = (timer) => {
    this.setState({datePickerValue: moment(timer)}, () => {
      this.input.focus();
    })
  }

  itemRender = () => {
    const {data} = this.state;
    let date = moment().startOf('week').subtract(8, 'days');
    return [...Array(21)].map((val, ind) => {
      let timer = date.add(1, 'days').format(format);
      if (!data[timer]) {
        return (
          <Col span={3} className={styles.item} key={timer} onClick={() => this.onItemClick(timer)}>
            <Tag style={{marginBottom: 3}} color={timer === moment().format(format) && "#00796B"}>{timer}</Tag>
          </Col>
        )
      } else {
        return (
          <Popover content={data[timer].map((text, numb) => (
            <div className={styles.itemDetail} key={numb}>* {text}<a style={{float: 'right'}} onClick={() => this.delPlan(timer, numb)}><Divider type="vertical" /><Icon type="delete" /></a></div>
          ))} placement={ind % 7 > 3 ? 'left' : 'right'} key={timer}>
            <Col span={3} className={styles.item} onClick={() => this.onItemClick(timer)}>
              <Tag style={{marginBottom: 3}} color={timer === moment().format(format) && "#00796B"}>{timer}</Tag>
              {
                data[timer].map((value, index) => (
                  <div key={index} className={styles.itemText}>* {value}</div>
                ))
              }
            </Col>
          </Popover>
        )
      }
    })
  }

  render() {
    return (
      <Card style={{padding: 5}}>
        <InputGroup compact>
          <DatePicker
            style={{ width: '20%' }}
            value={this.state.datePickerValue}
            onChange={date => this.setState({datePickerValue: date})}
            placeholder="计划日期"
          />
          <Input
            ref={el => this.input = el}
            style={{ width: '80%' }}
            value={this.state.inputValue}
            onChange={e => this.setState({inputValue: e.target.value})}
            onPressEnter={this.addPlan}
            placeholder="三十个字说出你的计划，回车提交。"
            maxLength={30}
            addonAfter={<Icon onClick={this.addPlan} type="enter" />}
          />
        </InputGroup>
        <Divider />
        <Row>
          {this.itemRender()}
        </Row>
      </Card>
    )
  }
}

export default Panel;
