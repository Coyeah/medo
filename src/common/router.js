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
