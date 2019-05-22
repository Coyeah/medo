import React, {
  useState, useRef, useCallback
} from 'react';
import {Input, Icon, Divider} from 'antd';

const Remarks: React.FC = (props: object): React.ReactElement => {
  const {onClick: propsOnClick, list: propsList} = props;
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState(propsList || []);
  const keyDownHandler = e => {
    if (e.keyCode === 13) onClick();
  }
  const onClick = useCallback(() => {
    let newList = list;
    newList = [...list, inputValue];
    setInputValue('');
    setList(newList);
    propsOnClick(newList);
  }, [propsOnClick, list, inputValue]);
  const onDelete = useCallback(index => {
    let newList = list;
    newList.splice(index, 1);
    setList([...newList]);
    propsOnClick(newList);
  }, [propsOnClick, list]);
  return (
    <>
      {list.length < 5 && (
        <Input
        size="small"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={keyDownHandler}
        placeholder='请输入任务备注，最多保存五项。'
        addonAfter={
          <Icon type="enter" onClick={onClick} />
        }
        />
      )}
      {list.map((value, index) => (
        <div key={index} style={{marginTop: 10}}>
          {index + 1}
          <Divider type="vertical" />
          {value}
          <Icon type="delete" onClick={() => onDelete(index)} style={{marginLeft: 10}} />
        </div>
      ))}
    </>
  )
}

export default Remarks;
