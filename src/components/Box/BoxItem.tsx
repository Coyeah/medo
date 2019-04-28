import React from 'react';
import {Divider, Icon, Popover} from 'antd';

const BoxItem: React.FC = (props: object): React.ReactElement => {
  const {index, item, ...restProps} = props;
  if (!!item.remarks && item.remarks.length > 0) {
    const content = (
      <>
        {item.remarks.map((val, ind) => (
          <div key={ind}>{ind + 1}<Divider type="vertical" />{val}</div>
        ))}
      </>
    )
    return (
      <Popover placement="left" content={content} trigger="hover">
        <div {...restProps}>{index}<Divider type="vertical" />{item.name} <Icon style={{color: '#00796B'}} type="appstore" /></div>
      </Popover>
    )
  } else {
    return (
      <div {...restProps}>{index}<Divider type="vertical" />{item.name}</div>
    )
  }
}


export default BoxItem;
