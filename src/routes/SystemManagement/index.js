import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import NAMESPACE from '../../models/appContainer/namespace.js'

const mapStateToProps = (state) => ({
  ...state[NAMESPACE]
});

const mapDispatchToProps = (dispatch) => ({
  changeAB(data, cb) {
    dispatch({
      type: `${NAMESPACE}/changeAB`, // 如果在 model 外调用，需要添加 namespace
      payload: data, // 需要传递的信息
      dispatch,
      cb
    })
  },
  fetch(data, cb) {
    dispatch({
      type: `${NAMESPACE}/fetch`, // 如果在 model 外调用，需要添加 namespace
      payload: data, // 需要传递的信息
      dispatch,
      cb
    })
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SystemManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTime: 60
    }
}

  onClick = () => {
    this.props.changeAB({
      a: '123',
      b: '456',
    })
  };

  onClick1 = () => {
    this.props.fetch({
      a: '789',
      b: '098',
    });
    this.startRunTime()
  };

  startRunTime = () => {
    const { lastTime } = this.state;
    if (!lastTime) {
      this.setState({ lastTime: 60 });
      return;
    }
    setTimeout(() => {
      this.setState({ lastTime: (lastTime - 1) }, this.startRunTime())
    }, 1000)
  };

  render() {
    const { a, b } = this.props;
    const { lastTime } = this.state;
    return (
      <div>
        a:{a}<br/>
        b:{b}<br/>
        倒计时：{lastTime}<br/>
        <Button onClick={this.onClick}>同步</Button>
        <Button onClick={this.onClick1}>异步</Button>
      </div>
    )
  }
}
