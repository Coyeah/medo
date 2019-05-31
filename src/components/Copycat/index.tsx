import React, {useCallback} from 'react';
import {Icon} from 'antd';

const Copycat: React.FC = (props: object): React.ReactElement => {
  const {value, onClick, ...restProps} = props;
  const handleClick = useCallback(() => {
    let oInput = document.createElement('input');
    oInput.value = value;
    oInput.style.position = 'fixed';
    oInput.style.left = '-1000px';
    oInput.style.top = '-1000px';
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    document.body.removeChild(oInput);
    onClick && onClick();
  }, [value, onClick]);
  return (
    <Icon type="copy" onClick={handleClick} {...restProps} />
  )
}

export default Copycat;
