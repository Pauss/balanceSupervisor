import React from 'react'
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

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Header />
          {/* <Content> */}
          <Layout.Content className="content" style={{ padding: ' 50px', marginTop: 64 }}>
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/logcost" exact component={Logcost} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
              </Switch>
            </div>
          </Layout.Content>
          {/* </Content> */}
        </Router>

        <Footer />
      </Layout>
    </div>
  )
}

export default App
