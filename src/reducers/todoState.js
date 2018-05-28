// addTodo.js
// import { ADD_ITEN, DEL_ITEN, DEL_ALL, DONE_ITEN, DONE_ALL } from '../constants/actionTypes';

const initialState = {
  todoId: 0,
  todos: [],
}

const todoState = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEN": {
      let todos = state.todos;
      let todoId = state.todoId + 1;
      todos = todos.filter((value, index) => {
        if(value.text == action.newTodoItem.text) {
          if (!value.isDone) todoId = todoId - 1;
          return false;
        } else {
          return true;
        }
      })
      todos.unshift(action.newTodoItem);
      return {
        todoId: todoId,
        todos: todos,
      }
    }
    case "DONE_ITEN": {
      let todos = state.todos;
      todos.map((value, index) => {
        if (value.text == action.todoItemText) {
          value.isDone = !value.isDone;
        } 
      })
      return {
        ...state,
        todoId: state.todoId - 1,
        todos: todos,
      }
    }
    case "DEL_DONE": {
      let todos = state.todos;
      todos = todos.filter((value, index) => {
        if (value.isDone) {
          return false;
        } else {
          return true;
        }
      })      
      return {
        ...state,
        todos: todos,
      }
    }
    case "DONE_ALL": {
      let todos = state.todos;
      todos.map((value, index) => {
        value.isDone = !value.isDone;
      })
      return {
        ...state,
        todoId: 0,
        todos: todos,
      }
    }
    default:
      return state;
  }
}

export default todoState;