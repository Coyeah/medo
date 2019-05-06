import React from 'react';
import _ from 'lodash';

/**
 * HTML5 会话存储方法
 * @param  key            [字段]
 * @param  value          [对应值]
 * @param  sessionStorage [会话存储对象：sessionStorage / localStorage]
 * @return                [description]
 */
export const storage = (key, value, memory = localStorage) => {
  if (_.isPlainObject(key)) {
    // key 为对象的情况下，分开存储
    _.forEach(key, (value, key) => {
      storage(key, value);
    });
  } else if (_.isString(key) && _.isNull(value)) {
    // value 值为 null，默认为删除 key对应存储对象
    memory.removeItem(key);
  } else if (_.isString(key) && _.isUndefined(value)) {
    // value 值为 undefined，默认为获取 key 对应存储对象
    value = memory.getItem(key) || null;
    try {
      value = JSON.parse(value);
    } catch (e) {
    }
    return value;
  } else if (_.isString(key)) {
    // 存入
    try {
      value = JSON.stringify(value);
    } catch (e) {
    }
    memory.setItem(key, value);
  } else if (_.isNull(key)) {
    // key 值为空，清空会话存储
    memory.clear();
  }
}

export const session = (key, value) => {
  return storage(key, value, sessionStorage);
};

/**
 * 生成唯一标识符 UUID
 * @return [uuid]
 */
export const generateUUID = () => {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

/**
 * react lazy 封装组件
 */
export const dynamicWrapper = (fn: object): object => {
  let WrapperComponent = React.lazy(fn);
  return () => <WrapperComponent />
}
