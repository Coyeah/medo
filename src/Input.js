// Input.js

import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      inputValue: '',
      textValue: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleKeyDown(e) {
    if (e.keyCode == '13') {
      const { inputValue } = this.state;
      this.setState({
        inputValue: '',
        textValue: inputValue,
      });
    }
  }

  render() {
    const { inputValue, textValue } = this.state;
    const placeholder = "What do you want to do?"
    return(
      <div>
        <input type="text" value={inputValue} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder={placeholder} />
        <p>{textValue}</p>
      </div>
    );
  }
}

export default Input;