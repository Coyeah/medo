import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DateItem from '../../components/DateItem/DateItem';

import style from './style.scss';

const weekTitle = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class DateFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: null,
    }
  }

  componentDidMount = () => {
    let date = new Date();
    this.setState({
      day: date.getDay(),
    });
  }

  render() {
    const cx = 'DateFooter';

    console.log(this.state.date, this.state.week);

    return (
      <div className={cx}>
        {weekTitle.map((value, index) => {
          return (
            <DateItem now={this.state.day===index} title={weekTitle[index]} />
          );
        })}
      </div>
    );
  }
}
