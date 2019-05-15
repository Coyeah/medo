import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

const menuItemStyle = {marginBottom: 15};

const MenuItem: React.FC = (props: object): React.ReactElement => (
  <Link to={props.path}>
    <Button type='primary' style={menuItemStyle} icon={props.icon} block />
  </Link>
)

export default MenuItem;
