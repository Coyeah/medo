import React, {useState, useEffect} from 'react';
import {Input, Icon, Divider} from 'antd';

const Remarks: React.FC = (props: object): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState(props.list);
  const keyDownHandler = e => {
    if (e.keyCode === 13) onClick(list);
  }
  const onClick = () => {
    let newList = list;
    if (newList.length === 5) newList.shift();
    newList = [...list, inputValue];
    setInputValue('');
    setList(newList);
    props.onClick(newList);
  }
  const onDelete = index => {
    let newList = list;
    newList.splice(index, 1);
    setList([...newList]);
    props.onClick(newList);
  }
  return (
    <>
      <Input
        size="small"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={keyDownHandler}
        addonAfter={
          <Icon type="enter" onClick={onClick} />
        }
      />
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
