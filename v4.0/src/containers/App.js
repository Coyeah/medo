// App.js
import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import ListOperate from './ListOperate';

import style from '../style/style.scss';

class App extends Component {
  render() {
    return (
      <div>
        <AddTodo />
        <TodoList />
        <ListOperate />
      </div>
    );
  }
}

export default App;