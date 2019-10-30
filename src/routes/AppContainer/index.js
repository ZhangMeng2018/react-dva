import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'dva/router';
import 'antd/dist/antd.css';

import Home from '../Home/index';
import NAMESPACE from '../../models/appContainer/namespace.js'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const mapStateToProps = (state) => ({
  ...state[NAMESPACE]
});

const mapDispatchToProps = (dispatch) => ({
  changeAB(cb) {
    dispatch({
      type: `${NAMESPACE}/changeAB`, // 如果在 model 外调用，需要添加 namespace
      payload: {
        a: '22222222',
        b: '33333333',
      }, // 需要传递的信息
      dispatch,
      cb
    })
  },
  fetch(cb) {
    dispatch({
      type: `${NAMESPACE}/fetch`, // 如果在 model 外调用，需要添加 namespace
      payload: {
        a: '22222222',
        b: '33333333',
      }, // 需要传递的信息
      dispatch,
      cb
    })
  }
});

@connect(mapStateToProps, mapDispatchToProps)


export default class AppContainer extends React.Component {

  changeAB = () => {
    this.props.fetch()
  };
  render() {
    const { a, b } = this.props;
    console.log(this.props, 'this.props')
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                <Icon type="user" />
                subnav 1
              </span>
                }
              >
                <Menu.Item key="1">option2</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                <Icon type="laptop" />
                subnav 2
              </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                <Icon type="notification" />
                subnav 3
              </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route path="/app/home" component={Home} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

