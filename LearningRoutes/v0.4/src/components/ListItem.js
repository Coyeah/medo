// ListItem.js
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class ListItem extends Component {
  static propTypes = {
    todos: PropTypes.array,
    doneTodo: PropTypes.func,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: "todo",
  }

  constructor(props) {
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem(e) {
    this.props.doneTodo(e.target.innerHTML);
  }

  getList() {
    const { classPrefix } = this.props;

    return (
      this.props.todos.map((value, index) => {
        const cx = classnames({
          [`${classPrefix}-item`]: true,
          [`${classPrefix}-item-done`]: value.isDone,
        });

        return (
          <li className={cx} onClick={this.onClickItem} data-isDone={value.isDone}>{value.text}</li>
        );
      })
    );
  }

  render() {
    const { classPrefix } = this.props;
    const cx = classnames({
      [`${classPrefix}-list`]: true,
    });

    return (
      <ul className={cx}>
        {this.getList()}
      </ul>
    );
  }
}

export default ListItem;