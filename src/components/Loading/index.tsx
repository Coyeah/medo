import React from 'react';
import './index.less';

const prefixCls = 'medo-loading';

const Loading: React.FC = (props: object): React.ReactElement => {
  const {text, size} = props;
  let bodyStyle = {
    width: 50,
    height: 50,
  }, textStyle = {
    fontSize: 14,
  };
  if (size === 'large') {
    bodyStyle = {
      width: 70,
      height: 70,
    };
    textStyle = {
      fontSize: 16,
    };
  } else if (size === 'small') {
    bodyStyle = {
      width: 30,
      height: 30,
    };
    textStyle = {
      fontSize: 12,
    };
  }
  return (
    <div className={`${prefixCls}-layout`}>
      <div className={`${prefixCls}-body`} style={bodyStyle}></div>
      <p className={`${prefixCls}-text`} style={textStyle}>{text || 'Loading...'}</p>
    </div>
  )
}

export default Loading;
