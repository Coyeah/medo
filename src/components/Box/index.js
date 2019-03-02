import React from 'react';
import { Card } from 'antd';
import Item from './Item';
import SubItem from './SubItem';
import styles from './index.less';

export default class Box extends React.Component {
  static defaultProps = {
    data: [],
  }

  render() {
    const {addItem, onClick} = this.props;
    return (
      <Card bordered={false} className={styles.box}>
        {
          this.props.data.map((value, index) => (
            <Item title={value.name} key={index} onClick={() => onClick([index, -1])}>
              {
                value.children.map((val, ind) => (
                  <SubItem key={ind} index={ind} onClick={() => onClick([index, ind])}>{val.name}</SubItem>
                ))
              }
              {
                value.children.length < 10 && (
                  <SubItem new onClick={() => addItem(index)}>点击添加步骤</SubItem>
                )
              }
            </Item>
          ))
        }
        <Item new title={'点击添加任务'} onClick={() => addItem()} />
      </Card>
    )
  }
}
