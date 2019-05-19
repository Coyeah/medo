import {storage, generateUUID} from '@/utils';

export const queryListData = () => {
  return storage('medo-list') || [];
}

export const updateListData = ({list}) => {
  return storage('medo-list', list);
}

export const queryCaleData = () => {
  return storage('medo-cale') || {};
}

export const updateCaleDate = ({data}) => {
  return storage('medo-cale', data);
}
