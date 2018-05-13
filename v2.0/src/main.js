// main.js

import React, { Component, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './style.scss';

import Todo from './Todo';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="todo">
        <p className="todo-title">React - Todo</p>
        <Todo className="todo-block" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));