import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import Link from 'umi/link';


const {Header, Footer, Sider, Content} = Layout;

export default class BasicLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{minHeight: '100vh'}}>
          <div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={'/edit'}>
                <Icon type={'edit'}/>
                Management
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'/query'}>
                <Icon type={'search'}/>
                Query
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={'/rank'}>
                <Icon type={'trophy'}/>
                Rank
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', textAlign: 'center', padding: 0}}>
            Online Movie Database
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            <code>
              Online Movie Database ©2019 Created by
              <br/>
              <a href={'https://github.com/iosmanthus'}>
                Iosmanthus Teng
              </a>
            </code>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
