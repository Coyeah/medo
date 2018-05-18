// Calendar.js

import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Calendar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: 'todo-main-calendar',
  };

  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    let newDate = e.target.getAttribute('data-date');
    if (newDate != this.props.onDate) {
      this.props.resetOnDate(newDate);
    }
  }

  getDateList() {
    const { classPrefix } = this.props;
    const { onDate } = this.props;

    let commYear = [31,28,31,30,31,30,31,31,30,31,30,31];
    let leapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
    let weekName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    let date = new Date();
    let this_year = date.getFullYear();
    let this_month = date.getMonth();
    let this_day = date.getDate();
    let this_weekDay = date.getDay();

    let arr = [];

    (() => {
      for (let i = 0; i < 7; i++) {
        let tmpDay = this_day + i;
        let tmpYear = (this_year % 4) ? commYear : leapYear;
        let tmpWeek = (this_weekDay + i > 6) ? (this_weekDay + i - 7) : (this_weekDay + i);

        let weekDay = weekName[tmpWeek];
        let day = tmpDay;
        let month = this_month;
        let year = this_year;
        if (tmpDay > tmpYear[this_month]) {
          day = tmpDay - tmpYear[this_month];
          month += 1;
          if (month == 12) {
            month = 0;
            year += 1;
          }
        }

        let dateStr = year + "/" + (month + 1) + "/" + day;

        let number = 0;

        this.props.todos.map((todo, index) => {
          if (todo.startTime == dateStr) {
            number++;
          }
        })

        let item = {
          weekDay: weekDay,
          date: dateStr,
          number: number,
        }

        arr.push(item);
      }

      for (let i = 1; i <= 3; i++) {
        let tmpDay = this_day - i;
        let tmpYear = (this_year % 4) ? commYear : leapYear;
        let tmpWeek = (this_weekDay - i < 0) ? (this_weekDay - i + 7) : (this_weekDay - i);

        let weekDay = weekName[tmpWeek];
        let day = tmpDay;
        let month = this_month;
        let year = this_year;
        if (day < 1) {
          month = month - 1;
          if (month  < 0) {
            month = 11;
            year -= 1;
          }
          day = tmpDay + tmpYear[month];
        }

        let dateStr = year + "/" + (month + 1) + "/" + day;

        let number = 0;

        this.props.todos.map((todo, index) => {
          if (todo.startTime == dateStr) {
            number++;
          }
        })

        let item = {
          weekDay: weekDay,
          date: dateStr,
          number: number,
        }

        arr.unshift(item);
      }
    })()

    return(
      arr.map((value, index) => {
        const { classPrefix } = this.props;
        const { onDate } = this.props;

        let isFocus = false;
        if (value.date == onDate) isFocus = true;

        const cx = classnames({
          [`${classPrefix}-item`]: true,
          [`${classPrefix}-focus`]: isFocus,
        });


        return(
          <li className={cx} onClick={this.handleOnClick} data-date={value.date} >{value.weekDay} - {value.date} - {value.number}</li>
        );
      })
    );
  }

  render() {
    const { className } = this.props;

    const cx = className;

    return(
      <ul className={cx}>
        {this.getDateList()}
      </ul>
    );
  }
}

export default Calendar;