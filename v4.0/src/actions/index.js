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
    type: "TOGGLE_ITEN",
    todoItemText
  }
}

export const delDone = () => {
  return {
    type: "DEL_DONE",
  }
}

export const doneAll = () => {
  return {
    type: "DONE_ALL",
  }
}