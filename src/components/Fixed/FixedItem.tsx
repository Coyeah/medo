import React, {Fragment, PureComponent} from 'react';
import {
  Button, Popover
} from 'antd';

const FixedItem: React.FC = (props: object): React.ReactElement => {
  let body = !!props.text && <b>{props.text}</b>;
  if (props.render) {
    body = props.render;
  }
  return (
    <Fragment>
      {body && (
        <Popover content={body} placement="right" trigger="hover">
          <Button onClick={props.onClick} icon={props.icon} style={{fontSize: 20, marginBottom: 8}} />
        </Popover>
      )}
      {!body && (<Button onClick={props.onClick} icon={props.icon} style={{fontSize: 20, marginBottom: 8}} />)}
    </Fragment>
  )
}

export default FixedItem;
