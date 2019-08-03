import {storage, generateUUID} from '../utils';
// import connect from '../utils/connect';

const identity = (key) => {
  let id = storage(key);
  if (!id || typeof id !== 'string') {
    id = generateUUID();
    storage(key, id);
  }
  // connect(id);
  return WrappedComponent => WrappedComponent;
}

export default identity;
