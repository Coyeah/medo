
export const addTodo = newTodoItem => {
  return {
    type: "ADD_ITEN",
    payload: newTodoItem
  }
}

export const doneTodo = todoItemText => {
  return {
    type: "TOGGLE_ITEN",
    payload: todoItemText
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
