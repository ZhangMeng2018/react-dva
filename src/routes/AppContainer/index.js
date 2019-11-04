import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link, Redirect } from 'dva/router';
import 'antd/dist/antd.css';

import CustomerManagement from '../CustomerManagement/index';
import ContactManagement from '../ContactManagement/index';
import SystemManagement from '../SystemManagement/index';
import NAMESPACE from '../../models/appContainer/namespace.js'
import navConfig from './navConfig'

import style from './index.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { sideNavConfig } = navConfig;

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
    console.log(sideNavConfig, 'sideNavConfig')
    return (
      <Layout className={style.container}>
        <Header className={style.header}>
          <div className={style.logo} />
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
              defaultSelectedKeys={['0']}
              defaultOpenKeys={[sideNavConfig[0].key]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                sideNavConfig.map(sideNav => (
                  <SubMenu
                    key={sideNav.key}
                    title={
                      <span>
                        <Icon type="user" />
                        {sideNav.title}
                      </span>
                    }
                  >
                    {
                      sideNav.items.map((item, index) => (
                        <Menu.Item key={index}>
                          <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                      ))
                    }
                  </SubMenu>
                ))
              }
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
              <Route
                exact
                path="/app"
                render={()=>(
                  <Redirect to="/app/customerManagement" />
                )}
              />
              <Route path="/app/customerManagement" component={CustomerManagement} />
              <Route path="/app/contactManagement" component={ContactManagement} />
              <Route path="/app/systemManagement" component={SystemManagement} />
              {/*<Redirect from="/app" to="/app/customerManagement" />*/}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

