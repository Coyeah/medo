export const ADD_NEW_TASK = 'ADD_NEW_TASK';

const initialState = {
  status: null,
  taskList: [],
}

const list = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK: {
      let { item } = action.payload;
      return {
        ...state,
        taskList: [
          ...state.taskList,
          item
        ]
      };
      break;
    }
    default: {
      return {
        ...state
      };
    }
  }
}

export default list;
