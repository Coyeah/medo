import config from './config';

const getMenuSet = (data => {
  return data;
})(config);

const getMenuMap = (data => {
  let obj = {};
  data.forEach(value => {
    if (value.name) {
      if (value.children) {
        obj[value.path] = value.name;
        value.children.forEach(value => {
          obj[value.path] = value.name;
        })
      } else {
        obj[value.path] = value.name;
      }
    }
  });
  return obj;
})(config);

const getRouterSet = (data => {
  let arr = [];
  data.forEach(value => {
    if (value.children) {
      arr.push(value.path);
      value.children.forEach(value => {
        arr.push(value.path);
      })
    } else {
      arr.push(value.path);
    }
  })
  return arr;
})(config);

const getRouterMap = (data => {
  let obj = {};
  data.forEach(value => {
    if (value.children) {
      obj[value.path] = { role: value.role, component: value.component }
      value.children.forEach(item => {
        obj[item.path] = { role: value.role, component: item.component }
      })
    } else {
      obj[value.path] = { role: value.role, component: value.component }
    }
  })
  return obj;
})(config);

export {
  getMenuSet,
  getMenuMap,
  getRouterSet,
  getRouterMap,
}
