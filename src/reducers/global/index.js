const initialState = {
  status: null,
  currentUser: {}
}

const global = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return {
        ...state
      };
    }
  }
}

export default global;
