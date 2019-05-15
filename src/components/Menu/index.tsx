import React from 'react';
import {Button} from 'antd';
import MenuItem from './MenuItem';
import './index.less';

const prefixCls = 'medo-menu';

const Menu: React.FC = (props: object): React.ReactElement => (
  <div className={`${prefixCls}-layout`}>
    {React.Children.map(props.children, (child, key) =>
      React.cloneElement(child, {
        prefixCls,
      })
    )}
  </div>
);

Menu.MenuItem = MenuItem;

export default Menu;
