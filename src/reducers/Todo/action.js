
export const addTodo = newTodoItem => {
  return {
    type: "ADD_ITEN",
    payload: newTodoItem
  }
}

export const doneTodo = todoItem => {
  return {
    type: "TOGGLE_ITEN",
    payload: todoItem
  }
}

export const delTodo = todoItem => {
  return {
    type: 'DEL_TODO',
    payload: todoItem
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
