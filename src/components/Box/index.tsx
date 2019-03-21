import React, {PureComponent} from 'react';
import {Card, Divider, Icon} from 'antd';
import styles from './index.module.less';

const indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

class Box extends PureComponent<Props, object> {
  static defaultProps = {
    index: 0,
    name: '测试用测试用测试用测试用测试用测试用测试用测试用测试用',
    list: ['测试用测试用', '测试用测试用测试用测试用', '测试用测试用', '测试用测试用测试用测试用'],
  }

  render() {
    const {index, name, list} = this.props;
    return (
      <Card hoverable onClick={this.props.onClick} bodyStyle={{ padding: 25 }}>
        <p>{`${indexMap[index]}、${name}`}</p>
        <div className={styles['box-list']}>
          {
            list.map((item, ind) => (
              <div className={styles['box-list-item']} key={ind}>{ind + 1}<Divider type="vertical" />{item.name}</div>
            ))
          }
        </div>
      </Card>
    )
  }
}

export default Box;
