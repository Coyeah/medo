import React from 'react';
import {Card} from 'antd';
import styles from './index.less';
import ListItem from './ListItem';

export default class ListBox extends React.Component {
  static defaultProps = {
    list: [], empty: false,
  };

  renderList = list => {
    return list.map((value, index) => (
      <ListItem
        key={index}
        time={value.createTime}
        status={value.status}
        onDoing={() => this.props.onDoing(index)}
        onDelete={() => this.props.onDelete(index)}
        onUrgent={() => this.props.onUrgent(index)}
        onWait={() => this.props.onWait(index)}
        onCancel={() => this.props.onCancel(index)}
        onOk={() => this.props.onOk(index)}
      >
        {value.content}
      </ListItem>
    ));
  }

  render() {
    const {list} = this.props;
    return (
      <Card className={styles.list}>
        {this.renderList(list)}
        {list.length === 0 && (
          <div className={styles.empty}>
            <div>空</div>
            <div>So ？不做点什么吗？</div>
          </div>
        )}
      </Card>
    )
  }
}
