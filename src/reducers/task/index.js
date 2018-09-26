export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const DONE_TASK = 'DONE_TASK';
export const CANCAL_TASK = 'CANCAL_TASK';
export const DEL_OLD_TASK = 'DEL_OLD_TASK';
export const RESET_TASK = 'RESET_TASK';

const initialState = {
  status: null,
  taskList: [],
}

const task = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK: {
      let { item } = action.payload;
      return {
        ...state,
        taskList: [
          ...state.taskList,
          item,
        ]
      };
      break;
    }
    case DONE_TASK: {
      let { id } = action.payload;
      let taskList = state.taskList;
      taskList.forEach(value => {
        if (value.id == id) {
          value.status = 1;
        }
      });
      return {
        ...state,
        taskList,
      }
      break;
    }
    case CANCAL_TASK: {
      let { id } = action.payload;
      let taskList = state.taskList;
      taskList.forEach(value => {
        if (value.id == id) {
          value.status = 2;
        }
      });
      return {
        ...state,
        taskList,
      }
      break;
    }
    case DEL_OLD_TASK: {
      let { id } = action.payload;
      let taskList = state.taskList;
      let target = taskList.findIndex(value => {
        return value.id == id;
      })
      taskList.splice(target, 1);
      return {
        ...state,
        taskList,
      }
      break;
    }
    case RESET_TASK: {
      let { id } = action.payload;
      let taskList = state.taskList;
      taskList.forEach(value => {
        if (value.id == id) {
          value.status = 0;
        }
      });
      return {
        ...state,
        taskList,
      }
      break;
    }
    default: {
      return {
        ...state
      };
    }
  }
}

export default task;
