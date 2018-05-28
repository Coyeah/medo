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
      todos = todos.filter((value, index) => {
        if(value.text == action.newTodoItem.text) {
          return false;
        } else {
          return true;
        }
      })
      todos.unshift(action.newTodoItem);
      return {
        todoId: state.todoId + 1,
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
        todos: todos,
      }
    }
    default:
      return state;
  }
}

export default todoState;