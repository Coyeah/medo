const menuData = [
  {
    name: '主页',
    icon: 'home',
    path: 'home',
  }, {
    name: '列表',
    icon: 'bars',
    path: 'list',
  }, {
    name: '关于',
    icon: 'user',
    path: 'about',
  }
];

const menuMap = (data => {
  let obj = {};
  data.map(value => {
    if (value.children) {
      obj[value.path] = value.name;
      value.children.map(value => {
        obj[value.path] = value.name;
      });
    } else {
      obj[value.path] = value.name;
    }
  });
  return obj;
})(menuData);

export {
  menuData,
  menuMap,
}
