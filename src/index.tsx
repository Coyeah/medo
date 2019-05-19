if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  // require('../mock/example.js');
}

import React, {Suspense} from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import {render} from 'react-dom';
import BasicLayout from './layout/BasicLayout';
import routerConfig from './common/router';
import Loading from '@/components/Loading';
import identity from '@/decorators/identity';
import './index.less';

const spinStyle = {
  margin: 'auto',
  marginTop: '10%',
  width: '50%',
  padding: 50,
  borderRadius: 10,
  backgroundColor: 'rgba(255,255,255,0.7)'
};

const App = identity('medo-user')(props => {
  const wrappedSpin = (
    <div style={spinStyle}>
      <Loading />
    </div>
  );
  return (
    <HashRouter>
      <BasicLayout config={routerConfig}>
        <Suspense fallback={wrappedSpin}>
          {routerConfig.map(value => (
            <Route exact key={value.path} path={value.path} component={value.component} />
          ))}
        </Suspense>
      </BasicLayout>
    </HashRouter>
  )
});

render(
  <App />,
  document.getElementById('root')
);
