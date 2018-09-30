import React, { Fragment } from 'react';
import {
  Route,
  IndexRoute,
  Switch,
  Redirect,
} from 'react-router-dom';

import {setAuthority, getAuthority} from '../../utils/authority';

class Authorized extends React.Component {
  static defaultProps = {
    auth: [],
  }

  authRouteRender = () => {
    // const { auth, routerMap } = this.props;
    const { routerMap } = this.props;
    const auth = getAuthority();

    let router = [];
    for (let key in routerMap) {
      // if (routerMap[key].role[0] === auth[0] || routerMap[key].role.length === 0)
      router.push(key);
    }
    console.log(routerMap);
    return (
      router.map((value, index) => {
        if (routerMap[value].role[0] === auth[0] || routerMap[value].role.length === 0) {
          return <Route key={index} path={value.toString()} exact component={routerMap[value].component} />
        } else if (routerMap[value].role[0] === 'common') {
          if (auth.length === 0) {
            return <Route key={index} path={value.toString()} exact component={routerMap[value].component} />
          } else {
            return <Route key={index} path={value.toString()} exact render={() => (
              <Redirect to={value.slice(0, value.lastIndexOf('/'))}/>
            )}/>
          }
        } else {
          return <Route key={index} path={value.toString()} exact component={routerMap['/exception/403'].component} />
        }
      })
    )
  }

  commonRouteRender = () => {
    const { routerMap } = this.props;
    return (
      <Fragment>
        <Route exact path="/" render={() => (
          <Redirect to="/home"/>
        )}/>
        <Route component={routerMap['/exception/404'].component} />
      </Fragment>
    )
  }

  render() {
    return (
      <Switch>
        {this.authRouteRender()}
        {this.commonRouteRender()}
      </Switch>
    )
  }
}

export default Authorized;

/**
 * in   => roleKey & children & routerMap
 * out  => component
 */
