import React from 'react';

import style from './style.scss';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
  }

  handleInputValue = e => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  handleKeyDown = e => {
    if (e.keyCode == '13') {

      const createAt = new Date().toLocaleString();
      const newAddItem = {
        content: this.state.inputValue,
        createAt,
      }
      this.props.actions.addTodo(newAddItem);

      this.setState({
        inputValue: '',
      })
    }
  }

  render() {
    const { placeholder, disabled } = this.props;
    const { inputValue } = this.state;

    const cx = 'inputModule';

    return (
      <input className={cx} value={inputValue} disabled={disabled} placeholder={placeholder} onChange={this.handleInputValue} onKeyDown={this.handleKeyDown} />
    )
  }
}
