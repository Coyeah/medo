import {storage, generateUUID} from '@/utils';

export const queryListData = () => {
  return storage('medo-list') || [];
}
