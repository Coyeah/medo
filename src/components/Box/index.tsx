import React from 'react';
import {Card} from 'antd';
import BoxItem from './BoxItem';
import styles from './index.module.less';

const indexMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const Box: React.FC = (props: object): React.ReactElement => {
  const {
    index, name, list,
    onClick,
  } = props;
  return (
    <Card hoverable onClick={onClick} bodyStyle={{ padding: 25 }}>
      <p><b>{`${indexMap[index]}、${name}`}</b></p>
      <div className={styles['box-list']}>
        {
          list.map((item, ind) => (
            <BoxItem
              key={ind}
              className={styles['box-list-item']}
              index={ind + 1}
              item={item}
            />
          ))
        }
      </div>
    </Card>
  )
}

export default Box;
