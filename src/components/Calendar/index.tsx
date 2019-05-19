import React, {useState, useCallback} from 'react';
import {Row, Col, Tag, Popover, Icon} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import './index.less';

const prefixCls = 'medo-calendar';
const formatString = 'YYYY-MM-DD';

const Calendar: React.FC = (props: object): React.ReactElement => {
  const {data, onChange, onDelete} = props;
  const now = moment(),
    weekday = now.format('E'),
    startBefore = now.subtract(+weekday + 7, 'days');
  const [target, setTarget] = useState(moment().format(formatString));
  const onClick = useCallback((dateString) => {
    setTarget(dateString);
    onChange && onChange(dateString);
  }, [onChange]);
  const onListChange = useCallback((date, index) => {
    const list = _.cloneDeep(data[date]);
    list.splice(index, 1);
    onDelete && onDelete(date, list);
  }, [onDelete, data]);
  const contentRender = [...Array(21)].map((value, index) => {
    startBefore.add(1, 'days');
    const dateString = startBefore.format(formatString),
      isToday = dateString === moment().format(formatString),
      cx = classnames({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-focus`]: dateString === target,
      }),
      list = data[dateString] || [],
      placement = index % 7 > 3 ? 'left' : 'right',
      content = list.map((val, ind) => (
        <div key={ind}>
          {ind + 1}、{val}
          <div style={{float: 'right', marginLeft: 10, cursor: 'pointer'}}>
            <Icon type="delete" onClick={() => onListChange(dateString, ind)} />
          </div>
        </div>
      ));
    const panelRender = list.length === 0 ? (null) : (
      <Popover content={content} placement={placement}>
        <div className={`${prefixCls}-item-panel`}>
          {list.slice(0, 2).map((value, index) => (
            <div key={index}><Ellipsis text={value} limit={7} /></div>
          ))}
          {list.length > 2 && (<div>......</div>)}
        </div>
      </Popover>
    );
    return (
      <div className={cx} key={index} onClick={() => onClick(dateString)}>
        <Tag color={isToday && '#00796B'}>{dateString}</Tag>
        {panelRender}
      </div>
    )
  });
  return (
    <div className={`${prefixCls}-layout`}>
      {contentRender}
    </div>
  )
}

export default Calendar;
