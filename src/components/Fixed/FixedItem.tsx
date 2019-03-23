import React, {Fragment, PureComponent} from 'react';
import {
  Button, Popover
} from 'antd';

const FixedItem: React.FC = (props: object): React.ReactElement => {
  let {text, icon, render, onClick, ...restProps} = props;

  let body = !!text && <b>{text}</b>;
  if (render) {
    body = render;
  }
  return (
    <Fragment>
      {body && (
        <Popover content={body} placement="right" trigger="hover">
          <Button onClick={onClick} icon={icon} style={{fontSize: 20, marginBottom: 8}} {...restProps} />
        </Popover>
      )}
      {!body && (<Button onClick={onClick} icon={icon} style={{fontSize: 20, marginBottom: 8}} {...restProps} />)}
    </Fragment>
  )
}

export default FixedItem;
