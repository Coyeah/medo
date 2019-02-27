import React from 'react';
import { Card } from 'antd';
import Item from './Item';
import SubItem from './SubItem';

export default class Box extends React.Component {
  static defaultProps = {
    data: [],
  }

  render() {
    return (
      <Card bordered={false} style={{minHeight: 450}}>
        {
          this.props.data.map((value, index) => (
            <Item title={value.name} key={index}>
              {
                value.children.map((val, ind) => (
                  <SubItem key={ind}>{val.name}</SubItem>
                ))
              }
              <SubItem new>添加二级任务</SubItem>
            </Item>
          ))
        }
        <Item title={'添加一级任务'} new />
      </Card>
    )
  }
}
