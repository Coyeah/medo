import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, Form, Modal, Input } from 'antd';
import _ from 'lodash';
import createBrowserHistory from 'history/createBrowserHistory';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import withRef from '../../decorators/withRef';
import withSetProps from '../../decorators/withSetProps';

const history = createBrowserHistory();

export default class Dialog extends PureComponent {
  state = {};

  componentDidMount() {
    this.unsubscribe = history.listen(() => this.destory());
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { onOk, onCancel, transition, render, content, component: BodyComponent, title, titleRender, footerRender, props, ...restProps} = this.props;
    let modalProps = {
      // wrapClassName: styles.center,
      visible: true,
      onOk: onOk.bind(this),
      onCancel: onCancel.bind(this),
      title,
      ...props,
      ...restProps
    };
    if (_.isBoolean(transition) && !transition) {
      modalProps = { ...modalProps, transitionName: '', maskTransitionName: '' };
    }
    if (_.isFunction(titleRender)) {
      modalProps = { ...modalProps, title: titleRender.apply(this) || title };
    }
    if (_.isFunction(footerRender)) {
      modalProps = { ...modalProps, footer: footerRender.apply(this) };
    }
    let body = content;
    if (!body && BodyComponent) {
      body = <BodyComponent {...restProps} />;
    }
    if (!body && render) {
      body = render.bind(this)(this);
    }
    return <Modal {...modalProps}>{body}</Modal>;
  }
}

Dialog.open = (options) => {
  const { ...restOptions } = options;
  options = _.merge({
    title: '弹窗',
    delay: 0,
    setPropsMerged: true,
    autoClose: true,
    maskClosable: false,
    transition: false,
    onOk() {
      this.destroy();
    },
    onCancel() {
      this.destroy();
    },
    redner: _.noop
  }, restOptions);
  setTimeout(() => {
    const container = document.createElement('div');
    const { setPropsMerged } = options;
    const { render, ...methods } = _.pickBy(options, _.isFunction);
    const saveRef = instance => {
      if (instance) {
        _.merge(instance, {
          destroy() {
            const { onDestroy } = instance;
            _.isFunction(onDestroy) && onDestroy();
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
          }
        });
        _.forEach(methods, (method, key) => {
          instance[key] = method.bind(instance);
        });
        const { state } = options;
        state && instance.setState(state);
        instance.props.forceUpdateProps();
      }
    };

    let WrappedComponent = Dialog;
    WrappedComponent = withRef(WrappedComponent);
    WrappedComponent = withSetProps(setPropsMerged)(WrappedComponent);

    document.body.appendChild(container);
    ReactDOM.render((
      <LocaleProvider locale={zhCN}>
        <WrappedComponent {...options} getInstance={saveRef} />
      </LocaleProvider>
    ), container);
  }, options.delay);
}
