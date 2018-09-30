import { createHashHistory } from 'history';

import { setAuthority, getAuthority } from '../../utils/authority';
import { USER_LOGIN, USER_REGISTER } from '../../sagas/global';

export const USER_CLEAR = 'USER_CLEAR';

const initialState = {
  status: null,
  currentUser: {}
}

const global = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      createHashHistory().push('/user');
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
      break;
    }
    case USER_REGISTER: {
      createHashHistory().push('/user/login');
      return {
        ...state
      };
      break;
    }
    case USER_CLEAR: {
      setAuthority([]);
      return {
        status: null,
        currentUser: {}
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

export default global;
