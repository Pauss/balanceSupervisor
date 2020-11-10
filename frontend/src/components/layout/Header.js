import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import '../../App.css'
import { Link, BrowserRouter as Redirect } from 'react-router-dom'
import { useUser } from '../../userContext'
const rightStyle = { float: 'right' }

export default function Header() {
  const [redirect, setRedirect] = useState(false)
  const { isAuthenticated, logout } = useUser()

  console.log('Header, isAuth: ', isAuthenticated)

  function onClick(e) {
    e.preventDefault()

    try {
      logout()
      setRedirect(true)
    } catch (err) {
      console.log('Error when trying to Logout', err)
    }
  }
  if (isAuthenticated === true)
    return (
      <>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/logcost">Logcost</Link>
            </Menu.Item>

            <Menu.Item key="3" style={rightStyle}>
              <Link to="/" onClick={onClick}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        {redirect ? <Redirect to="/" /> : null}
      </>
    )
  else
    return (
      <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">
              <li>Home</li>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" style={rightStyle}>
            <Link to="/register">
              <li>Register</li>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={rightStyle}>
            <Link to="/login">
              <li>Login</li>
            </Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    )
}
