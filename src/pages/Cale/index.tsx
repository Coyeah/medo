import React, {Fragment, Component} from 'react';
import {Card, Input, Divider, Icon} from 'antd';
import moment from 'moment';
import Calendar from '@/components/Calendar';
import {queryCaleData, updateCaleDate} from '@/services';
import styles from './index.module.less';

const formatString = 'YYYY-MM-DD';

class Cale extends Component {
  state = {
    data: {},
    date: moment().format(formatString),
    value: '',
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let data = {};
    try {
      data = await queryCaleData();
    } catch(e) {
      console.log(e);
    } finally {
      this.setState({ data });
    }
  }

  setData = async data => {
    await updateCaleDate({ data });
  }

  onDateChange = date => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
    this.setState({date});
  }

  onInputChange = e => {
    e && e.target && typeof e.target.value === 'string' && this.setState({
      value: e.target.value
    });
  }

  onInputEnter = () => {
    const {data, date, value} = this.state;
    if (value === '') return;
    if (data[date]) {
      data[date] = [value, ...data[date]];
    } else {
      data[date] = [value];
    }
    this.setState({
      data, value: ''
    }, () => {
      this.setData(data);
    });
  }

  onDataDelete = (date, list) => {
    const {data} = this.state;
    data[date] = list;
    this.setState({ data }, () => {
      this.setData(data);
    })
  }

  setInputRef = el => {
    this.inputRef = el;
  }

  render() {
    const {data, date, value} = this.state;
    return (
      <div className={styles.layout}>
        <Card hoverable>
          <Input
            ref={this.setInputRef}
            placeholder={date}
            value={value}
            onChange={this.onInputChange}
            onPressEnter={this.onInputEnter}
            suffix={<Icon type="enter" onClick={this.onInputEnter} />}
          />
          <Divider />
          <Calendar
            data={data}
            onChange={this.onDateChange}
            onDelete={this.onDataDelete}
          />
        </Card>
      </div>
    )
  }
}

export default Cale;
