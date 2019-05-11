import {storage, generateUUID} from '@/utils';

export const queryListData = () => {
  return storage('medo-list') || [];
}

export const updateListData = payload => {
  return storage('medo-list', payload.list);
}
