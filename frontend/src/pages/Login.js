import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd'
import { useState } from 'react'
import { useUser } from '../utils/userContext.js'
import {} from 'dotenv/config.js'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { Redirect } from 'react-router-dom'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
    flex: 'auto'
  }
}

const refreshPage = () => {
  window.location.reload()
}

function Login() {
  const { login, isAuthenticated } = useUser()
  const [toDashboard, setToDashboard] = useState(false)

  async function onFinish(values) {
    try {
      const { email, password } = values
      const response = await axios.post(URLs.login, { email, password })

      const user = {
        email: response.data.email,
        token: response.headers['x-auth-token'],
        _id: response.data._id,
        remember: values.remember
      }

      login(user)
      console.log('isAuth: ', isAuthenticated)
      setToDashboard(true)
    } catch (err) {
      console.log('Error when trying to Login', err)
      failure(err.message)
    }
  }

  function onFinishFailed(errorInfo) {
    failure(errorInfo)
    setToDashboard()
  }

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        style={{ position: 'relative' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {toDashboard ? <Redirect to="/dashboard" /> : null}
    </>
  )
}

export default Login
