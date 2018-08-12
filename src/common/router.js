import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Todo from '../containers/Todo/Todo';
import DateFooter from '../containers/DateFooter/DateFooter';

class App extends React.Component {
  render() {
    return (
      <div style={{ margin: '0', padding: '0' }}>
        <DateFooter />
      </div>
    );
  }
}

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter basename="/">
          <App />
      </HashRouter>
    )
  }
}
