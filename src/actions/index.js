// index.js
// import { ADD_ITEN, DEL_ITEN, DEL_ALL, DONE_ITEN, DONE_ALL } from '../constants/actionTypes';

export const addTodo = newTodoItem => {
  return {
    type: "ADD_ITEN",
    newTodoItem
  }
}

export const doneTodo = todoItemText => {
  return {
    type: "DONE_ITEN",
    todoItemText
  }
}