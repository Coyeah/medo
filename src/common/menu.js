const menuData = [
  {
    name: '主页',
    icon: 'home',
    path: '/home',
    role: [],
  }, {
    name: '列表',
    icon: 'bars',
    path: '/list',
    role: ['admin'],
  }, {
    name: '关于',
    icon: 'file-text',
    path: '/about',
    role: [],
  }, {
    name: '用户',
    icon: 'user',
    path: '/user',
    role: [],
    children: [
      {
        name: '登录',
        path: '/user/login',
      }, {
        name: '注册',
        path: '/user/register',
      }
    ],
  },
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

const roleMap = (data => {
  let obj = {};
  data.map(value => {
    obj[value.path] = value.role;
  })
})(menuData);

export {
  menuData,
  menuMap,
  roleMap,
}
