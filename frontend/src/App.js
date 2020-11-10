import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Logcost from './components/Logcost'
import Login from './components/Login'
import Register from './components/Register'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider, useUser } from './utils/userContext.js'

const contentLayout = {
  padding: '50px',
  marginTop: '64px'
}

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <UserProvider>
            <Header />
            <Layout.Content className="content" style={contentLayout}>
              <div>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                  <ProtectedRoute path="/logcost" exact component={Logcost} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                </Switch>
              </div>
            </Layout.Content>
          </UserProvider>
        </Router>

        <Footer />
      </Layout>
    </div>
  )
}

export default App
