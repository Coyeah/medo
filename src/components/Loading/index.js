import React, { Fragment } from 'react';

import './index.less';

export default class Loading extends React.Component {
  render () {
    return (
      <div className={'loadingLayout'}>
        <p>Loading......</p>
      </div>
    )
  }
}
