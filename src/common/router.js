import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const getRouterData = {
  '/home': {
    component: dynamicWrapper(() => import('../components/Home/'))
  },
  '/list': {
    component: dynamicWrapper(() => import('../routes/Task/'))
  },
  '/about': {
    component: dynamicWrapper(() => import('../components/About/'))
  },
  '/user/login': {
    component: dynamicWrapper(() => import('../components/Loading/'))
  },
  '/user/register': {
    component: dynamicWrapper(() => import('../components/Loading/'))
  },
  '/403': {
    component: dynamicWrapper(() => import('../routes/Exception/403.js'))
  },
  '/404': {
    component: dynamicWrapper(() => import('../routes/Exception/404.js'))
  },
  '/500': {
    component: dynamicWrapper(() => import('../routes/Exception/500.js'))
  },
};

function dynamicWrapper (fn) {
  return Loadable({
    loader: fn,
    loading: Loading,
  });
}

let getRouterSet = [];
for (let key in getRouterData) {
  getRouterSet.push(key);
}

export {
  getRouterSet,
  getRouterData,
};
