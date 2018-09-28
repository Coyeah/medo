import config from './config';

const menuSet = (data => {
  return data;
})(config);

const menuMap = (data => {
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

const roleMap = (data => {
  let obj = {};
  data.forEach(value => {

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
    if (value.path && value.component || value.children) {
      if (value.children) {
        obj[value.path] = { component: value.component }
        value.children.forEach(value => {
          obj[value.path] = { component: value.component }
        })
      } else {
        obj[value.path] = { component: value.component }
      }
    }
  })
  return obj;
})(config);

export {
  menuSet,
  menuMap,
  roleMap,
  getRouterSet,
  getRouterMap,
}
