const initialState = {
  list: [],
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEN": {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case "TOGGLE_ITEN": {
      return state;
    }
    case "DEL_DONE": {
      return state;
    }
    case "DONE_ALL": {
      return state;
    }
    default:
      return state;
  }
}

export default todo;
