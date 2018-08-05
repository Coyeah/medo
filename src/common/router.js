import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Todo from '../containers/Todo/Todo';

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter basename="/">
        <Route path='/' component={Todo} />
      </HashRouter>
    )
  }
}
