import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Popover} from 'antd';

const MenuItem: React.FC = (props: object): React.ReactElement => {
  const {prefixCls, name, path, icon} = props
  return (
    <div className={`${prefixCls}-item`}>
      <Popover placement="right" content={<b>{name}</b>}>
        <Link to={path}>
          <Button type='primary' icon={icon} block />
        </Link>
      </Popover>
    </div>
)
}

export default MenuItem;
