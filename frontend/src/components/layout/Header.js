import React from 'react'
import { Layout, Menu } from 'antd'
import '../../App.css'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'

const rightStyle = { float: 'right' }

export default function Header() {
  return (
    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/">
            <li>Home</li>{' '}
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard">
            <li>Dashboard</li>{' '}
          </Link>
        </Menu.Item>

        <Menu.Item key="3" style={rightStyle}>
          <Link to="/login">
            <li>LogIn</li>{' '}
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}
