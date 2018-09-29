import React, { Fragment } from 'react';
import { Route, IndexRoute, Redirect } from 'react-router-dom';

class Authorized extends React.Component {
  static defaultProps = {
    auth: [],
  }

  authRouteRender = () => {
    const { auth, routerMap } = this.props;
    let router = [];
    for (let key in routerMap) {
      // if (routerMap[key].role[0] === auth[0] || routerMap[key].role.length === 0)
      router.push(key);
    }
    return (
      router.map((value, index) => {
        if (routerMap[value].role[0] === auth[0] || routerMap[value].role.length === 0) {
          return <Route key={index} path={value.toString()} exact component={routerMap[value].component} />
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
      <Fragment>
        {this.authRouteRender()}
        {this.commonRouteRender()}
      </Fragment>
    )
  }
}

export default Authorized;

/**
 * in   => roleKey & children & routerMap
 * out  => component
 */
