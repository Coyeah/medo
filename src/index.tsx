if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  // require('../mock/example.js');
}

import React, {Suspense} from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import {render} from 'react-dom';
import BasicLayout from './layout/BasicLayout';
import routerConfig from './common/router';
import './index.less';

const App = props => {
  return (
    <HashRouter>
      <BasicLayout config={routerConfig}>
        <Suspense fallback={<div>Loading...</div>}>
          {routerConfig.map(value => (
            <Route exact key={value.path} path={value.path} component={value.component} />
          ))}
        </Suspense>
      </BasicLayout>
    </HashRouter>
  )
}

render(
  <App />,
  document.getElementById('root')
);
