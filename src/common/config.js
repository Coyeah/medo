import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const config = [
  {
    name: '主页',
    icon: 'home',
    path: '/home',
    component: dynamicWrapper(() => import('../components/Home/')),
    role: [],
  }, {
    name: '列表',
    icon: 'bars',
    path: '/list',
    component: dynamicWrapper(() => import('../routes/Task/')),
    role: ['admin'],
  }, {
    name: '关于',
    icon: 'file-text',
    path: '/about',
    component: dynamicWrapper(() => import('../components/About/')),
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
        component: dynamicWrapper(() => import('../components/Loading/')),
      }, {
        name: '注册',
        path: '/user/register',
        component: dynamicWrapper(() => import('../components/Loading/')),
      }
    ],
  }, {
    path: '/exception',
    role: [],
    children: [
      {
        path: '/exception/403',
        component: dynamicWrapper(() => import('../routes/Exception/403.js')),
      }, {
        path: '/exception/404',
        component: dynamicWrapper(() => import('../routes/Exception/404.js')),
      }, {
        path: '/exception/500',
        component: dynamicWrapper(() => import('../routes/Exception/500.js')),
      },
    ]
  }
];

function dynamicWrapper (fn) {
  return Loadable({
    loader: fn,
    loading: Loading,
  });
}

export default config;
